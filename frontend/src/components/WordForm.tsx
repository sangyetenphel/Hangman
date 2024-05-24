import { FormEvent, useState } from "react"
import {AxiosResponse, AxiosError} from "axios"
import "../styles/Form.css"
import api from "../api"

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
        api.post('/api/', {name, word, hint})
            .then((response: AxiosResponse) => {
                if (response.status === 201) {
                    alert("Word Created!")
                    const id = response.data.id
                    const generatedLink = `http://localhost:5173/hangman/${id}`
                    // const generatedLink = `https://82945370-9f6e-4a8c-89cd-30e7478680b7.e1-us-cdp-2.choreoapps.dev/hangman/${id}`
                    setLinkToShare(generatedLink)
                }
                else alert("Failed to generate the word!")
            })
            .catch((error: AxiosError) => alert(error))
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h3>Write a word to share with your friends!</h3>
                <div>
                    {/* <label htmlFor="name">Name: </label> */}
                    {/* <input type="text" id="name" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)}/> */}
                </div>
                <div>
                    {/* <label htmlFor="word">Word: </label> */}
                    <input type="text" id="word" value={word} placeholder="Word" onChange={(e) => setWord(e.target.value)}/>
                </div>
                <div>
                    {/* <label htmlFor="hint">Hint: </label> */}
                    {/* <input type="text" id="hint" value={hint} placeholder="Hint" onChange={(e) => setHint(e.target.value)}/> */}
                </div>
                <div className="button-container">
                    <button className="send-button" type="submit">Generate Word</button>
                </div>
            </form>

            {linkToShare && (
                <div className="generated-link">
                {/* <p>{linkToShare}</p> */}
                    <a onClick={() => copyToClipboard(linkToShare)}>Click here to copy the link to share with your friends!</a>
                </div>
            )}
        </div>
    )
}

export default WordForm