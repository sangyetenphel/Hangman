type HangmanWordProps = {
    guessedLetters: string[]
    wordToGuess: string
    reveal?: boolean
}

export function HangmanWord({guessedLetters, wordToGuess, reveal = false}: HangmanWordProps) {
    return (
        <div style={{
            display: "flex",
            gap: ".25rem",
            fontSize: "6rem",
            fontWeight: "bold",
            textTransform: "uppercase",
            fontFamily: "monospace",
        }}>
            {wordToGuess.split("").map((letter, index) => (
                <span key={index} style={{ borderBottom: ".1em solid white", marginRight: "20px"}}>
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