import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import LatestRestaurants from './composants/LatestRestaurants.jsx';
import Header from './composants/Header.jsx';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Header/>}/>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/restaurants/latest" element={<LatestRestaurants />} />
            </Routes>
        </Router>
    )
}
