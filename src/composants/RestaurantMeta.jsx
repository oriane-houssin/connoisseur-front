import WatchLaterIcon from '@mui/icons-material/WatchLater';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import StarIcon from '@mui/icons-material/Star';
import {useState, useEffect} from 'react';
import API from '../services/api.js';

export default function RestaurantMeta({average, cuisine, vegan, vegetarian, wheelchair, delivery, takeaway, r_id, user}) {
    const [rating, setRating] = useState(0);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const checkIsFavorite = async () => {
            if (user && r_id) {
                try {
                    const response = await API.get(`favorites/${r_id}`);
                    if (response.data.favorite) {
                        setLiked(true);
                    } else {
                        setLiked(false)
                    }
                } catch (err) {
                    console.log(err);
                    setLiked(false);
                }
                console.log(liked);
            }
        };
        checkIsFavorite();
    }, [r_id, user]);

    const toggleLike = async () => {
        if(!user) return alert("Connexion requise");

        try {
            if(!liked) {
                await API.post('/favorites', {restaurant_id: r_id});
                console.log('ajouté aux favoris');
                setLiked(true);
            } else {
                console.log(liked);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="w-1/5 px-4 py-8 flex flex-col items-center gap-8">
            {/*INTERACTION BUTTONS*/}
            <div className="flex justify-center gap-6 ">
                <WatchLaterIcon className="text-white hover:text-blue-green transition-colors"/>
                <FavoriteIcon onClick={toggleLike}
                              className={`cursor-pointer transition-colors ${liked ? "text-green" : "text-white"}`}/>
                <LocalDiningIcon className="text-white hover:text-blue-green transition-colors"/>
            </div>
            {/*SEPARATOR*/}
            <div className="w-1/3 bg-black border border-b-white"/>

            {/*USER'S RATING*/}
            <div className="flex flex-col items-center gap-2 ">
                <p className="text-sm mb-2">Rate</p>
                <div className="flex justify-center gap-1">
                    {[1,2,3,4,5].map((i) => (
                        <StarIcon key={i} className={`cursor-pointer ${i <= rating ? 'text-green' : 'text-gray-600'}`}
                        fill={i <= rating ? 'currentColor' : 'none'}
                        onClick={() => setRating(i)}/>
                    ))}
                </div>
            </div>
            {/*SEPARATOR*/}
            <div className="w-1/2 bg-black border border-b-white"/>

            {/*INTERACTION LINKS*/}
            <ul className="text-sm text-center ">
                <li className="mb-1">Review</li>
                <li className="mb-1">Add to lists</li>
                <li className="mb-1">Share</li>
            </ul>

            {/*AVERAGE RATING*/}
            <div className="flex flex-col items-center">
                <div className="flex justify-between items-center mb-2 w-full">
                    <h2 className="text-xl uppercase">Ratings</h2>
                    <span>{average}</span>
                </div>
                <div className="flex gap-1 mt-1 text-center">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <StarIcon
                            key={i}
                            className={`w-4 h-4 ${i <= average ? 'text-green' : 'text-gray-600'}`}
                            fill={i <= average ? 'currentColor' : 'none'}
                        />
                    ))}
                </div>
            </div>

            {/*CATEGORIES*/}
            <div className="flex flex-col items-center ">
                <h2 className="text-xl uppercase mb-2">Catégories</h2>
                <div className="flex flex-col items-center text-blue-green text-sm">
                    {cuisine && (<span>{cuisine}</span>)}
                    {wheelchair && wheelchair !== "no" && (<span>Accès handicapé</span>)}
                    {vegan && vegan !== "no" && (<span>Végane</span>)}
                    {vegetarian && vegetarian !== "no" && (<span>Végétarien</span>)}
                    {takeaway && takeaway !== "no" && (<span>A emporter</span>)}
                    {delivery && delivery !== "no" && (<span>Livraison</span>)}
                </div>
            </div>
        </div>
    )
}