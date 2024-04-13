import { FormEvent, useState } from "react"
import axios from "axios"
import "../styles/Form.css"

// const apiURL = '/choreo-apis/hangman/backend/hangman-be2/v1.0'
const apiURL = 'http://127.0.0.1:8000/api/'

function copyToClipboard(link: string): void {
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard!');
}

function WordForm() {
    const [name, setName] = useState<string>("")
    const [word, setWord] = useState<string>("")
    const [hint, setHint] = useState<string>("")
    const [linkToShare, setLinkToShare] = useState<string>("")

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        axios.post(apiURL, {name, word, hint})
            .then((response) => {
                if (response.status === 201) {
                    alert("Word Created!")
                    const id = response.data.id
                    // const generatedLink = `http://localhost:5173/hangman/${id}`
                    const generatedLink = `https://82945370-9f6e-4a8c-89cd-30e7478680b7.e1-us-cdp-2.choreoapps.dev/${id}`
                    setLinkToShare(generatedLink)
                }
                else alert("Failed to generate the word!")
            })
            .catch((error) => alert(error))
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="word">Word: </label>
                    <input type="text" id="word" value={word} placeholder="Word" onChange={(e) => setWord(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="hint">Hint: </label>
                    <input type="text" id="hint" value={hint} placeholder="Hint" onChange={(e) => setHint(e.target.value)}/>
                </div>
                <button className="send-button" type="submit">Send</button>
            </form>

            {linkToShare && (
                <div>
                {/* <p>{linkToShare}</p> */}
                <button className="link-button" onClick={() => copyToClipboard(linkToShare)}>Copy Link</button>
                </div>
            )}
        </div>
    )
}

export default WordForm