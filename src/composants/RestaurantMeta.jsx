import WatchLaterIcon from '@mui/icons-material/WatchLater';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import StarIcon from '@mui/icons-material/Star';
import {useState} from 'react';

export default function RestaurantMeta({average, cuisine, vegan, vegetarian, wheelchair, delivery, takeaway}) {
    const [rating, setRating] = useState(0);
    return (
        <div className="w-1/5 px-4 py-8 flex flex-col items-center gap-8">

            {/*INTERACTION BUTTONS*/}
            <div className="flex justify-center gap-6 ">
                <WatchLaterIcon className="text-white hover:text-blue-green transition-colors"/>
                <FavoriteIcon className="text-white hover:text-blue-green transition-colors"/>
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