import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../services/api';
import Header from '../composants/Header';
import Footer from '../composants/Footer';
import RestaurantMain from '../composants/RestaurantMain';
import RestaurantInfo from '../composants/RestaurantInfo';
import RestaurantMeta from '../composants/RestaurantMeta';

export default function Restaurant() {
    const {id} = useParams();
    const [restaurant, setRestaurant] = useState(null);

    useEffect(() => {
        API.get(`restaurants/${id}`)
            .then(res => setRestaurant(res.data))
            .catch(err => console.error(err));
    }, [id]);
    if (!restaurant) return <p className="text-center text-2xl text-white mt-10">Chargement...</p>
    return (
        <div className="text-white font-raleway">
            <Header />
            <div className="py-4 flex w-full">
                <RestaurantInfo 
                    image="/media/poster-restaurant-2.png" 
                    creation={restaurant.creation}
                    horaires={restaurant.opening_hours || 'Non spécifiées'} 
                    num_rue={restaurant.housenumber || ''} 
                    rue={restaurant.street || ''} 
                    city={restaurant.city || ''} 
                    department={restaurant.department || ''} 
                    dep_code={restaurant.departmentCode || ''} 
                    michelin={restaurant.michelin}
                />
                <div className="px-8 w-3/5">
                    <RestaurantMain name={restaurant.name} website={restaurant.website} tel={restaurant.phone} />
                </div>
                <RestaurantMeta 
                    average={restaurant.rating} 
                    cuisine={restaurant.cuisine} 
                    wheelchair={restaurant.wheelchair} 
                    takeaway={restaurant.takeaway} 
                    vegan={restaurant.vegan} 
                    vegetarian={restaurant.vegetarian} 
                    delivery={restaurant.delivery} 
                />
            </div>
            <Footer />
        </div>
    )
}