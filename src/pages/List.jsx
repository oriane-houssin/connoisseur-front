import { useState, useEffect, useCallback} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import API from '../services/api.js';
import { getUser } from '../utils/auth.jsx';
import Header from '../composants/Header';
import Footer from '../composants/Footer';

export default function List() {
    const { list_id } = useParams();
    const navigate = useNavigate();
    const [list, setList] = useState(null);
    const [restaurantsData, setRestaurantsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const user = getUser();

    const fetchListAndRestaurants = useCallback(async () => {
        if (!user) {
            setError("Veuillez vous connecter pour voir les détails de cette liste.");
            setList(null);
            setRestaurantsData([]);
            return;
        }

        setError(null);

        try {
            const listResponse = await API.get(`/lists/${list_id}`);
            setList(listResponse.data.list);
            const restaurantIdsInList = listResponse.data.restaurants;

            const fetchedRestaurants = [];
            for (const item of restaurantIdsInList) {
                try {
                    const restaurantDetailsResponse = await API.get(`/restaurants/${item.restaurant_id}`);
                    fetchedRestaurants.push(restaurantDetailsResponse.data);
                } catch (restError) {
                    console.error(`Erreur lors de la récupération du restaurant ${item.restaurant_id}:`, restError);
                    fetchedRestaurants.push({ id: item.restaurant_id, name: "Restaurant introuvable", error: true });
                }
            }
            setRestaurantsData(fetchedRestaurants);
        } catch (err) {
            console.error("Erreur lors de la récupération de la liste ou des restaurants:", err);
            setError("Erreur chargement des détails de la liste.");
            setList(null);
            setRestaurantsData([]);
            throw err;
        }
    }, [list_id, user, setList, setRestaurantsData, setError]);

    useEffect(() => {
        if (user) {
            if (!loading && !list) {
                setLoading(true);
                fetchListAndRestaurants().finally(() => { setLoading(false) });
            }
        } else {
            setLoading(false);
            setError("Veuillez vous connecter pour voir les détails de cette liste.");
            setList(null);
            setRestaurantsData([]);
        }
    }, [fetchListAndRestaurants, user, loading, list]);

    //DELETE RESTO DE LISTE
    const handleRemoveRestaurant = async (r_id) => {
        if (!user) {
            alert("Veuillez vous connecter pour modifier cette liste.");
            return;
        }
        if (!window.confirm("Êtes-vous sûr de vouloir retirer ce restaurant de cette liste ?")) {
            return;
        }
        setLoading(true);

        try {
            await API.delete(`/lists/${list_id}/restaurants/${r_id}`);
            await fetchListAndRestaurants();
            setRestaurantsData(prev => prev.filter(r => r.id !== r_id));
            alert("Restaurant retiré de la liste avec succès.");
        } catch (error) {
            console.error("Erreur lors de la suppression du restaurant de la liste:", error);
            setError(error.response?.data?.error || "Erreur lors du retrait du restaurant de la liste.");
        } finally {
            setLoading(false);
        }
    };

    //AFFICHAGE CHARGEMENT
    if (loading && !list && user) {
        return (
            <div className="font-raleway text-white min-h-screen flex flex-col">
                <Header />
                <p className="text-center text-2xl mt-10 flex-grow">Chargement de la liste...</p>
                <Footer />
            </div>
        );
    }

    //AFFICHAGE ERREUR
    if (error) {
        return (
            <div className="font-raleway text-white min-h-screen flex flex-col">
                <Header />
                <p className="text-center text-red-500 mt-10 flex-grow">{error}</p>
                <Footer />
            </div>
        );
    }

    //AFFICHAGE !LIST
    if (!list && !loading) {
        return (
            <div className="font-raleway text-white min-h-screen flex flex-col">
                <Header />
                <p className="text-center text-white mt-10 flex-grow">Liste introuvable ou vous n'avez pas les permissions pour la voir.</p>
                <Footer />
            </div>
        );
    }

    return (
        <div className="font-raleway text-white min-h-screen flex flex-col">
            <Header />
            <div className="container mx-auto py-8 px-4 flex-grow">
                <button
                    onClick={() => navigate('/lists')}
                    className="mb-6 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 text-sm"
                >
                    &larr; Retour à mes listes
                </button>

                <h1 className="text-4xl font-bold mb-4 text-blue-green">{list.name}</h1>
                {list.description && <p className="text-gray-400 text-lg mb-8">{list.description}</p>}

                <h2 className="text-3xl font-semibold mb-6">Restaurants ({restaurantsData.length})</h2>

                {restaurantsData.length === 0 ? (
                    <p className="text-gray-400 text-center text-lg mt-8">
                        Cette liste est vide. Ajoutez des restaurants en cliquant sur les icônes de liste !
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {restaurantsData.map(restaurant => (
                            <div key={restaurant.id} className="p-4 border border-gray-700 bg-gray-900 rounded-lg shadow-md flex flex-col">
                                {restaurant.error ? (
                                    <div className="text-red-400 text-center py-4">
                                        <p>Ce restaurant est introuvable.</p>
                                        <p className="text-sm">ID: {restaurant.id}</p>
                                    </div>
                                ) : (
                                    <>
                                        {restaurant.image && (
                                            <img
                                                src={restaurant.image}
                                                alt={restaurant.name}
                                                className="w-full h-48 object-cover rounded-md mb-4"
                                            />
                                        )}
                                        <h3 className="text-xl font-bold text-white mb-2">{restaurant.name}</h3>
                                        <p className="text-gray-300 text-sm mb-1">
                                            {restaurant.housenumber ? `${restaurant.housenumber} ` : ''}
                                            {restaurant.street}, {restaurant.city}, {restaurant.departmentCode}
                                        </p>
                                        <p className="text-gray-400 text-xs mb-3">Cuisine: {restaurant.cuisine}</p>
                                    </>
                                )}
                                <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-gray-700">
                                    <button
                                        onClick={() => handleRemoveRestaurant(restaurant.id)}
                                        className="flex-grow bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 text-sm"
                                    >
                                        Retirer de la liste
                                    </button>
                                    {!restaurant.error && (
                                        <a
                                            href={`/restaurant/${restaurant.id}`}
                                            className="flex-grow bg-blue-green hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded text-sm text-center transition-colors duration-200"
                                        >
                                            Voir le restaurant
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}