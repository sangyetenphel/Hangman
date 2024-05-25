import styles from "../modules/HangmanWord.module.css"

type HangmanWordProps = {
    guessedLetters: string[]
    wordToGuess: string
    reveal?: boolean
}

export function HangmanWord({guessedLetters, wordToGuess, reveal = false}: HangmanWordProps) {
    return (
        <div className={styles.hangmanwordContainer}>
            {wordToGuess.split("").map((letter, index) => (
                <span className={styles.key} key={index}>
                    <span style={{ visibility: guessedLetters.includes(letter) || reveal ? "visible" : "hidden",
                        color: !guessedLetters.includes(letter) && reveal ? "red" : "white",
                    }}>
                        {letter}
                    </span>
                </span>
            ))}
        </div>
    )
}