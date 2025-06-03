import WatchLaterIcon from '@mui/icons-material/WatchLater';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import {useState, useEffect} from 'react';
import API from '../services/api.js';

export default function Restaurant3Butons({r_id, user}) {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (user && r_id) {
                try {
                    //VERIF FAVORIS
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
            }
        };
        fetchData();
    }, [r_id, user]);

    //LIKER UN RESTO
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
    
    return (
        <div className="flex justify-center gap-6 ">
            <WatchLaterIcon className=" hover:text-blue-green transition-colors"/>
            <FavoriteIcon onClick={toggleLike}
                          className={`cursor-pointer transition-colors ${liked ? "text-green" : ""}`}/>
            <LocalDiningIcon className=" hover:text-blue-green transition-colors"/>
        </div>
    )
}