import { useNavigate } from 'react-router-dom'
import '../styles/Home.css'
import ropeImage from '../images/rope.png';

function Home() {
    const navigate = useNavigate();
    const handleClick = (mode: 'offline' | 'online'): void => {
        if (mode === 'offline') {
            navigate('/hangman')
        } else {
            navigate('/online')
        }
    }

    return (
        <div className='container'>
            <img src={ropeImage} alt="" className='ropeImage'/>
            <h1 className='title'>Hangman</h1>
            <div className="offline-online-container">
                <div className='dialog-info-box'>
                    <p>Experience the classic hangman game offline, where you'll be challenged with a series of randomly generated words. Put your word-solving skills to the test and see if you have what it takes to emerge victorious!</p>
                    <button className='button button-offline' onClick={()=> handleClick("offline")}>Play offline</button>
                </div>
                <div className='dialog-info-box'>
                    <p>Challenge your friends with your very own hangman game! Send them your custom game and see if they have what it takes to solve it. Test their word-solving skills and find out who will emerge victorious!</p>
                    <button className='button button-online' onClick={()=> handleClick("online")}>Play online</button>
                </div>
            </div>
            <div className='creator'>
                <p>Created by <a href='https://sangyetenphel.com/'>Sangye Tenphel</a></p>
            </div>
        </div>
    )
}

export default Home