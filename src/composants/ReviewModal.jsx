import {useState, useEffect} from "react";
import API from "../services/api.js";
import CloseIcon from '@mui/icons-material/Close';

export default function ReviewModal({isOpen, onClose, r_id, user, onReviewSubmitted}) {
    const [reviewText, setReviewText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isOpen) {
            setReviewText('');
            setError(null);
        }
    }, [isOpen]);

    const handleSubmit = async () => {
        if (!user)  {
            setError("Connexion requise");
            return;
        }
        if (!reviewText.trim()) {
            setError("Veuillez saisir un avis");
            return;
        }
        setIsLoading(true);
        setError(null);

        try {
            const response = await API.post('/reviews', {
                restaurant_id: r_id,
                comment: reviewText,
            });
            if (response.data.success) {
                alert('Avis soumis avec succès');
                onReviewSubmitted();
                onClose();
            } else {
                setError(response.data.error);
            }
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;
    return (
        <div className=" fixed inset-0 bg-black/25 flex justify-center items-center z-50">
            <div className="bg-blue-green p-6 rounded-lg shadow-lg w-full max-w-md relative">
                <CloseIcon
                    fontSize="large"
                    onClick={onClose}
                    className="cursor-pointer absolute top-2 right-2  p-2"
                />
                <h2 className="text-xl font-bold mb-4 ">Donnez votre avis</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <textarea
                    className="w-full p-3 mb-4 rounded-md bg-gray-700  placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-light-black"
                    rows="5"
                    placeholder="Votre avis ici..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    disabled={isLoading}
                ></textarea>
                <button
                    onClick={handleSubmit}
                    className="cursor-pointer bg-green hover:bg-green/80  font-bold py-2 px-4 rounded w-full transition-colors"
                    disabled={isLoading}
                >
                    {isLoading ? 'Soumission...' : 'Soumettre l\'avis'}
                </button>
            </div>
        </div>
    )
}