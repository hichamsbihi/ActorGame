import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "../components/Home/Home";
import { Game } from "../components/Game/Game";
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game" element={<Game />} />
            </Routes>
        </Router>
    );
}

export default App;
