import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import API from '../services/api';
import Header from '../composants/Header';
import Footer from '../composants/Footer';
import RestaurantMain from '../composants/RestaurantMain';
import RestaurantInfo from '../composants/RestaurantInfo';
import RestaurantMeta from '../composants/RestaurantMeta';
import ReviewList from '../composants/ReviewList';
import {getUser} from '../utils/auth.jsx';

export default function Restaurant() {
    const {id} = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const user = getUser();
    const [reviewSubmitCount, setReviewSubmitCount] = useState(0);

    useEffect(() => {
        API.get(`restaurants/${id}`)
            .then(res => setRestaurant(res.data))
            .catch(err => console.error(err));
    }, [id]);

    const handleReviewSubmitted = useCallback(() => {
        setReviewSubmitCount(prev => prev + 1);
    }, []);
    
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
                    <div className="mt-8">
                        <h2 className="text-2xl uppercase mb-8">Avis récents</h2>
                        <ReviewList r_id={restaurant.id} onReviewSubmittedExternally={reviewSubmitCount} />
                    </div>
                </div>
                <RestaurantMeta
                    r_id={restaurant.id}
                    user={user}
                    average={restaurant.rating} 
                    cuisine={restaurant.cuisine} 
                    wheelchair={restaurant.wheelchair} 
                    takeaway={restaurant.takeaway} 
                    vegan={restaurant.vegan} 
                    vegetarian={restaurant.vegetarian} 
                    delivery={restaurant.delivery}
                    onReviewSubmittedExternally={handleReviewSubmitted}
                />
            </div>
            <Footer />
        </div>
    )
}