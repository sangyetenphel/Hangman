import { useState } from "react"
import axios from "axios"
import "../styles/Form.css"

function copyToClipboard(link) {
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard!');
}

function WordForm() {
    const [name, setName] = useState("")
    const [word, setWord] = useState("")
    const [hint, setHint] = useState("")
    const [linkToShare, setLinkToShare] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/api/", {name, word, hint})
            .then((response) => {
                if (response.status === 201) {
                    alert("Word Created!")
                    const id = response.data.id
                    const generatedLink = `http://localhost:5173/hangman/${id}`
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
                    <input type="text" id="name" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} variant="outlined"/>
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