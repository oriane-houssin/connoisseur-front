import {useState, useEffect} from 'react';
import API from '../services/api';

export default function LatestRestaurants() {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLatest = async () => {
            try {
                const res = await API.get('http://localhost:5000/api/restaurants/latest');
                setRestaurants(res.data);
            } catch (err) {
                setError('Erreur lors du chargement des restaurants');
            } finally {
                setLoading(false);
            }
        };
        fetchLatest();
    }, []);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>
    
    return (
        <div>
            <h2>Derniers restaurants ajoutés</h2>
            <ul>
                {restaurants.map((r) => (
                    <li key={r.id}>
                        <div>{r.name}</div>
                        <div>{r.cuisine}</div>
                        <div>{r.brand}</div>
                        <div>{r.city}</div>
                    </li>
                ))}
            </ul>
        </div>
    )
}