import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import {useState, useEffect} from 'react';
import API from '../services/api.js';
import ReviewModal from './ReviewModal.jsx';
import Restaurant3Butons from './Restaurant3Butons.jsx';

export default function RestaurantMeta({average, cuisine, vegan, vegetarian, wheelchair, delivery, takeaway, r_id, user, onReviewSubmittedExternally}) {
    const [userRating, setUserRating] = useState(0);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);


//FETCH RATING
    useEffect(() => {
        const fetchData = async () => {
            if (user && r_id) {
                try {
                    //VERIF RATING
                    const rating = await API.get(`ratings/${r_id}`);
                    if (rating.data.userRating !== null) {
                        setUserRating(rating.data.userRating);
                    } else {
                        setUserRating(0)
                    } console.log(rating.data.userRating);
                } catch (err) {
                    console.log(err);
                    setUserRating(0);
                }
            }
        };
        fetchData();
    }, [r_id, user]);

    //NOTER UN RESTO
    const handleRatingClick = async (newRating) => {
        if (!user) {
            return alert("Connexion requise");
        }
        try {
            const response = await API.post('/ratings', {
                restaurant_id: r_id,
                rating: newRating
            });
            if (response.data.success) {
                setUserRating(newRating);
                console.log(newRating);
            } else {
                console.error(error);
                alert("Une erreur est survenue");
            }
        } catch (err) {
            console.error(err);
        }
    };

    //OUVRIR MODAL REVIEW
    const openReviewModal = () => {
        setIsReviewModalOpen(true);
    }

    //FERMER MODAL REVIEW
    const closeReviewModal = () => {
        setIsReviewModalOpen(false);
    }

    //TRIGGER RE-FETCH DE REVIEWLIST
    const onReviewSubmitted = () => {
        if (onReviewSubmittedExternally) {
            onReviewSubmittedExternally();
        }
    };

    return (
        <div className="w-1/5 px-4 py-8 flex flex-col items-center gap-8">
            <Restaurant3Butons
                r_id={r_id}
                user={user}
            />
            {/*SEPARATOR*/}
            <div className="w-1/3 bg-black border border-b-white"/>

            {/*USER'S RATING*/}
            <div className="flex flex-col items-center gap-2 ">
                <p className="text-sm mb-2">Votre Note</p>
                <div className="flex justify-center gap-1">
                    {[1,2,3,4,5].map((i) => (
                        <StarIcon key={i} className={`cursor-pointer transition-colors ${i <= userRating ? 'text-green' : 'text-gray-600'}`}
                        fill={i <= userRating ? 'currentColor' : 'none'}
                        onClick={() => handleRatingClick(i)}/>
                    ))}
                </div>
            </div>
            {/*SEPARATOR*/}
            <div className="w-1/2 bg-black border border-b-white"/>

            {/*INTERACTION LINKS*/}
            <ul className="text-sm text-center ">
                <li className="mb-1 cursor-pointer hover:text-blue-green transition-colors" onClick={openReviewModal}>Review</li>
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
                            key={`average-star-${i}`}
                            className={`w-4 h-4 ${i <= average ? 'text-green' : 'text-gray-600'}`}
                            fill={i <= average ? 'currentColor' : 'none'}
                            data-testid={`average-star-${i}`}
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

            {/*REVIEW MODAL*/}
            <ReviewModal
                isOpen={isReviewModalOpen}
                onClose={closeReviewModal}
                r_id={r_id}
                user={user}
                onReviewSubmitted={onReviewSubmitted}
            />
        </div>
    )
}