import {useEffect, useState} from 'react';
import API from '../services/api.js';

export default function  ReviewList({r_id, onReviewSubmittedExternally}) {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchReviews = async () => {
        if (!r_id){
            setReviews([]);
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const reviewResponse = await API.get(`reviews/${r_id}`);
            setReviews(reviewResponse.data);
        } catch (error) {
            console.error(error);
            setError("Impossible de charger les avis");
            setReviews([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [r_id]);

    //MAJ de ReviewList quand un nouvel avis est créé
    useEffect(() => {
        if (onReviewSubmittedExternally !== undefined) {
            fetchReviews();
        }
    }, [onReviewSubmittedExternally]);

    if (isLoading) {
        return <p className="text-gray-400 text-center">Chargement des avis...</p>;
    }
    if (error) {
        return <p className="text-red-500 text-center">{error}</p>;
    }

    if (!reviews || reviews.length === 0) {
        return <p className="text-gray-400 text-center">Aucun avis pour le moment.</p>;
    }

    return (
        <div className="w-full max-h-64 overflow-y-auto pr-2 custom-scrollbar">
            {reviews.map(review => (
                <div key={review.id} className="mb-4 p-3">
                    <p className="text-xs mb-4">
                        {review.username} - <span className="text-gray-400 text-xs">{new Date(review.created_at).toLocaleDateString()}</span>
                    </p>
                    <p className="text-sm">{review.comment}</p>
                </div>
            ))}
        </div>
    );
}