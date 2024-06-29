// frontend/src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './pages/Home';
import Game from './games/rockPaper';
import TicTacToe from './games/TicTacToe';
import MemoryGame from './games/memoryGame/MemoryGame';
import LandingPage from './pages/Landing';


function App() {
    return (
        <Router>
            <div>
                <Routes>
                     <Route path='/' element={<LandingPage/>}/>

                    <Route path='/memoryGame' element={<MemoryGame/>}/>
                    <Route path='/tictactoe' element={<TicTacToe/>}/>
                    <Route path='/game' element={<Game/>}/>
                    <Route path='/home' element={<Home/>}/>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
