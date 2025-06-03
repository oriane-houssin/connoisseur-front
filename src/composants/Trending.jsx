import {useEffect, useState} from "react";
import API from '../services/api';
import Restaurant3Butons from "./Restaurant3Butons";
import StarIcon from '@mui/icons-material/Star';
import {Link} from 'react-router-dom';

export default function Trending({user}) {
    const [restaurants, setRestaurants] = useState([]);
    const [error, setError] = useState('');
    const [liked, setLiked] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await API.get('/restaurants/latest');
                setRestaurants(res.data);
                console.log("API response:", res.data);
                console.log("typeof res.data =", typeof res.data);
            } catch (err) {
                console.error(err);
                setError("Erreur lors du chargement des restaurants");
            }
        };
        fetchData();
    }, []);
    return (
        <section className="px-6 py-8">
            <h2 className="text-white text-2xl py-8">TRENDING</h2>
            {error && <h3 className="text-red-500 font-bold">{error}</h3>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {restaurants.map((r) => (

                    <Link to={`/restaurant/${r.id}`} key={r.id}>
                        <div className="relative group rounded-lg overflow-hidden bg-gray-200 shadow-lg w-full md:w-[280px] aspect-[280/420]">
                            <div className="absolute inset-0 bg-cover bg-center bg-[url(/media/poster-restaurant-2.png)]"/>
                            {/*Overlay*/}
                            <div className="absolute inset-0 bg-light-black/25 backdrop-blur-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 h-full">
                                <h3 className="text-center text-xl font-semibold mt-2">{r.name}</h3>
                                <ul className="mt-4 space-y-1 text-sm">
                                    <li><span className="font-semibold">Cuisine :</span> {r.cuisine || 'Non précisée'}</li>
                                    <li><span className="font-semibold">Ville :</span> {r.city}</li>
                                    <li><span className="font-semibold">Marque :</span> {r.brand || '—'}</li>
                                </ul>
                                <div className="flex flex-col items-center gap-2 py-2">
                                    <Restaurant3Butons
                                        r_id={r.id}
                                        user={user}
                                    />
                                    <div className="flex gap-1 mt-1">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <StarIcon
                                                key={i}
                                                className={`w-4 h-4 ${i <= r.rating ? 'text-green' : 'text-light-black'}`}
                                                fill={i <= r.rating ? 'currentColor' : 'none'}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    ))}
            </div>
        </section>
    )
}
