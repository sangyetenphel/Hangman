import { useCallback, useEffect, useState } from "react"
import { HangmanDrawing } from "../components/HangmanDrawing"
import { HangmanWord } from "../components/HangmanWord"
import { Keyboard } from "../components/Keyboard"
import words from "../wordList.json"
import { useParams } from "react-router-dom"
import axios from "axios"
import "../styles/HangmanGame.css"

function getWord() {
    return words[Math.floor(Math.random() * words.length)]
}

function HangmanGame() {
    const [wordToGuess, setWordtoGuess] = useState('')
    const { id } = useParams();
    // SEND REQUEST TO BACKEND
    // const apiUrl = 'https://hangman.us-cdp2.choreoapps.dev/hangman'
    const apiUrl = 'https://796fd882-42bc-49da-ba5a-67560d532b4d-dev.e1-us-cdp-2.choreoapis.dev/hangman/backend/hangman-be2/v1/hangman'
    const baseURL = import.meta.env.VITE_HANGMAN_API_URL ? import.meta.env.VITE_HANGMAN_API_URL: apiUrl

    useEffect(() => {
        if (id) {
            axios.get(`${baseURL}/${id}`)
            .then(response => {
                setWordtoGuess(response.data.word)
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
        console.log("guessed letters", guessedLetters)
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
    <div className="hangman-game-container">
        <div style={{ fontSize: "2rem", textAlign: "center", color: "yellow"}}>
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