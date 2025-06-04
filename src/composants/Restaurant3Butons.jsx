import WatchLaterIcon from '@mui/icons-material/WatchLater';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import {useState, useEffect} from 'react';
import API from '../services/api.js';

export default function Restaurant3Butons({r_id, user}) {
    const [liked, setLiked] = useState(false);
    const [isVisited, setIsVisited] = useState(false);
    const [isToVisit, setIsToVisit] = useState(false);

    const [visitedListId, setVisitedListId] = useState(null);
    const [toVisitListId, setToVisitListId] = useState(null);

    //CREATE OR FETCH LISTE PAR NAME
    const getOrCreateList = async (listName) => {
        try {
            const response = await API.get(`/lists`);
            const existingList = response.data.find(list => list.name === listName);

            if (existingList) {
                return existingList.id;
            } else {
                const createResponse = await API.post('/lists', {name: listName, description: `${listName}`});
                return createResponse.data.list_id;
            }
        } catch (error) {
            console.error(`Erreur lors de la récupération ou création de la liste "${listName}":`, error);
            return null;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (user && r_id) {
                try {
                    //VERIF FAVORIS
                    const response = await API.get(`favorites/${r_id}`);
                    setLiked(response.data.favorite);

                    //FETCH OR CREATE
                    const visitedId = await getOrCreateList('restaurants visités');
                    const toVisitId = await getOrCreateList('restaurants à visiter');

                    setVisitedListId(visitedId);
                    setToVisitListId(toVisitId);

                    //VISITES
                    if (visitedId) {
                        try {
                            const visitedStatus = await API.get(`lists/${visitedId}`);
                            setIsVisited(visitedStatus.data.restaurants.some(r => r.restaurant_id === r_id));
                        } catch (error) {
                            console.error("Erreur vérification liste visités:", error);
                            setIsVisited(false);
                        }
                    }

                    //A VISITER
                    if (toVisitId) {
                        try {
                            const toVisitStatus = await API.get(`lists/${toVisitId}`);
                            setIsToVisit(toVisitStatus.data.restaurants.some(r => r.restaurant_id === r_id));
                        } catch (error) {
                            console.error("Erreur vérification liste à visiter:", error);
                            setIsToVisit(false);
                        }

                    }
                } catch (err) {
                    console.log(err);
                    setLiked(false);
                    setIsVisited(false);
                    setIsToVisit(false);
                }
            }
        };
        fetchData();
    }, [r_id, user]);

    //BOUTON FAVORIS
    const toggleLike = async () => {
        if(!user) return alert("Connexion requise");
        try {
            if(!liked) {
                await API.post('/favorites', {restaurant_id: r_id});
                console.log('ajouté aux favoris');
                setLiked(true);
            } else {
                await API.delete(`favorites/${r_id}`);
                console.log('Supprimé des favoris');
                setLiked(false);
            }
        } catch (err) {
            console.error(err);
        }
    };

    //BOUTON VISITES
    const toggleVisited = async () => {
        if (!user) return alert("Connexion requise");
        if (!visitedListId) return alert("Impossible de trouver / créer la liste 'restaurants visités'");

        try {
            if (isVisited) {
                await API.delete(`lists/${visitedListId}/restaurants/${r_id}`);
                setIsVisited(false);
            } else {
                await API.post(`lists/${visitedListId}/restaurants`, {restaurant_id: r_id});
                setIsVisited(true);
            }
        } catch (error) {
            console.error("Erreur liste visités", error);
            alert("Une erreur est survenue lors de la mise à jour de la liste 'visitée'.");
        }
    };

    //BOUTON A VISITER
    const toggleToVisit = async () => {
        if (!user) return alert("Connexion requise");
        if (!toVisitListId) return alert("Impossible de trouver / créer la liste 'à visiter'");

        try {
            if (isToVisit) {
                await API.delete(`lists/${toVisitListId}/restaurants/${r_id}`);
                setIsToVisit(false);
            } else {
                await API.post(`lists/${toVisitListId}/restaurants`, {restaurant_id: r_id});
                setIsToVisit(true);
            }
        } catch (error) {
            console.error("Erreur liste à visiter", error);
            alert("Une erreur est survenue lors de la mise à jour de la liste 'à visiter'.");
        }
    }
    
    return (
        <div className="flex justify-center gap-6 ">
            <WatchLaterIcon onClick={toggleToVisit}
                            className={`cursor-pointer transition-colors ${isToVisit ? "text-green" : ""}`}/>
            <FavoriteIcon onClick={toggleLike}
                          className={`cursor-pointer transition-colors ${liked ? "text-green" : ""}`}/>
            <LocalDiningIcon onClick={toggleVisited}
                             className={`cursor-pointer transition-colors ${isVisited ? "text-green" : ""}`}/>
        </div>
    )
}