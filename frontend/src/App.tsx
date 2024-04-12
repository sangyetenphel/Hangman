import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import HangmanOnline from "./pages/HangmanOnline"
import HangmanGame from "./pages/HangmanGame"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hangman/:id?" element={<HangmanGame />}/>
        <Route path="/online" element={<HangmanOnline />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
