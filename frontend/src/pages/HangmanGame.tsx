import { useCallback, useEffect, useState } from "react"
import { HangmanDrawing } from "../components/HangmanDrawing"
import { HangmanWord } from "../components/HangmanWord"
import { Keyboard } from "../components/Keyboard"
import words from "../wordList.json"
import { useParams } from "react-router-dom"
import axios from "axios"

function getWord() {
    return words[Math.floor(Math.random() * words.length)]
}

function HangmanGame() {
    const [wordToGuess, setWordtoGuess] = useState('')
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            axios.get(`http://127.0.0.1:8000/hangman/${id}`)
            .then(response => {
                setWordtoGuess(response.data.word)
                console.log(response.data)
            })
        }
        else {
            setWordtoGuess(words[Math.floor(Math.random() * words.length)])
        }
    }, [id])

    const [guessedLetters, setGuessedLetters] = useState<string[]>([])

    const incorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
    )

    const isLoser = incorrectLetters.length >= 6
    const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter))

    const addGuessedLetter = useCallback(
    (letter: string) => {
        if (guessedLetters.includes(letter) || isLoser || isWinner) return

        setGuessedLetters(curentLetters => [...curentLetters, letter])
    },
    [guessedLetters, isWinner, isLoser]
    )

    useEffect(() => {
    const handler = (e: KeyboardEvent) => {
        const key = e.key
        if (!key.match(/^[a-z]$/)) return

        e.preventDefault()
        addGuessedLetter(key)
    }

    document.addEventListener("keypress", handler)

    return () => {
        document.removeEventListener("keypress", handler)
    }
    }, [guessedLetters])


    useEffect(() => {
    const handler = (e: KeyboardEvent) => {
        const key = e.key
        if (key !== "Enter") return

        e.preventDefault()
        setGuessedLetters([])
        setWordtoGuess(getWord())
    }

    document.addEventListener("keypress", handler)

    return () => {
        document.removeEventListener("keypress", handler)
    }
    }, [])


    return (
    <div
        style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center"
        }}
    >
        <div style={{ fontSize: "2rem", textAlign: "center" }}>
        {isWinner && "Winner! - Refresh to try again"}
        {isLoser && "Nice Try - Refresh to try again"}
        </div>
        <HangmanDrawing numberOfGuesses={incorrectLetters.length}/>
        <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess}/>
        <div style={{ alignSelf: "stretch" }}>
        <Keyboard
        disabled={isWinner || isLoser}
        activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
        inactiveLetters={incorrectLetters}
        addGuessedLetter={addGuessedLetter}
        />
        </div>
    </div>
    )
}

export default HangmanGame