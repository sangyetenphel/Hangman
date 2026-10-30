import { useCallback, useEffect, useState } from "react"
import { HangmanDrawing } from "../components/HangmanDrawing"
import { HangmanWord } from "../components/HangmanWord"
import { Keyboard } from "../components/Keyboard"
import words from "../wordList.json"
import { useParams } from "react-router-dom"
import api from "../api"
import "../styles/HangmanGame.css"

function getWord() {
    return words[Math.floor(Math.random() * words.length)]
}

function HangmanGame() {
    const [wordToGuess, setWordtoGuess] = useState('')
    const { id } = useParams();
    const [loadError, setLoadError] = useState('')

    useEffect(() => {
        if (id) {
            // SEND REQUEST TO BACKEND
            api.get(`/hangman/${id}`)
            .then(response => {
                setWordtoGuess(response.data.word)
            })
            .catch(error => {
                setLoadError(error.response?.status === 404
                    ? "This game link doesn't exist. Ask your friend for a new one."
                    : "Couldn't load this game. Please try again later.")
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
    const isWinner = wordToGuess !== "" && wordToGuess.split("").every(letter => guessedLetters.includes(letter))

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
    }, [addGuessedLetter])


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
    <div className="hangman-game-container">
        <div style={{ fontSize: "2rem", textAlign: "center", color: "yellow"}}>
        {loadError}
        {isWinner && "Winner! - Refresh to try again"}
        {isLoser && "Nice Try - Refresh to try again"}
        </div>
        <div className="hangman-word-container">
            <div className="hangman-drawing">
                <HangmanDrawing numberOfGuesses={incorrectLetters.length}/>
            </div>
            <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess}/>
        </div>
        <div style={{ alignSelf: "stretch" }}>
        <div className="keyboard">
            <Keyboard
                disabled={isWinner || isLoser}
                activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
                inactiveLetters={incorrectLetters}
                addGuessedLetter={addGuessedLetter}
                />
            </div>
        </div>
    </div>
    )
}

export default HangmanGame