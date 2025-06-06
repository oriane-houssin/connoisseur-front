import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import LatestRestaurants from './composants/LatestRestaurants.jsx';
import Home from './pages/Home.jsx';
import Restaurant from './pages/Restaurant.jsx';
import Lists from './pages/Lists.jsx';
import List from './pages/List.jsx';
import TermsOfUse from './pages/TermsOfUse.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/restaurants/latest" element={<LatestRestaurants />} />
                <Route path="/restaurant/:id" element={<Restaurant />} />
                <Route path="/lists" element={<Lists />} />
                <Route path="/lists/:list_id" element={<List />} />
                <Route path="/terms" element={<TermsOfUse />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Routes>
        </Router>
    )
}
