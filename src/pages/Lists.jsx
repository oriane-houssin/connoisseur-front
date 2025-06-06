import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api.js';
import { getUser } from '../utils/auth.jsx';
import Header from '../composants/Header';
import Footer from '../composants/Footer';
import AddIcon from '@mui/icons-material/Add';

import NewListModal from '../modals/NewListModal.jsx';
import EditListModal from '../modals/EditListModal.jsx';

export default function Lists() {
    const [lists, setLists] = useState([]);
    const [newListModalOpen, setNewListModalOpen] = useState(false);
    const [editListModalOpen, setEditListModalOpen] = useState(false);
    const [currentListToEdit, setCurrentListToEdit] = useState(null);
    const [apiError, setApiError] = useState(null);
    const [apiLoading, setApiLoading] = useState(false);
    const user = getUser();

    //FETCH LISTES
    const fetchLists = useCallback(async () => {
        if (!user) {
            setApiError("Veuillez vous connecter pour voir vos listes.");
            return;
        }
        setApiError(null);

        try {
            const response = await API.get('/lists');
            setLists(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des listes:", error);
            setApiError("Erreur chargement des listes");
            setLists([]);
            throw error;
        }
    }, [user, setLists]);

    useEffect(() => {
        if (user && !apiLoading) {
            setApiLoading(true);
            fetchLists().finally(() => { setApiLoading(false) });
        } else if (!user && apiLoading) {
            setApiLoading(false);
            setApiError("Veuillez vous connecter pour voir vos listes.");
            setLists([]);
        } else if (!user && !apiLoading) {
            setApiError("Veuillez vous connecter pour voir vos listes.");
            setLists([]);
        }
    }, [fetchLists, user, apiLoading]);


    //SOUMISSION NEWLISTMODAL
    const handleCreateList = async (formData) => {
        if (!formData.name.trim()) {
            setApiError("Un nom de liste est requis");
            return;
        }
        setApiLoading(true);
        setApiError(null);

        try {
            await API.post('/lists', formData);
            setNewListModalOpen(false);
            await fetchLists();
        } catch (error) {
            console.error("Erreur lors de la création de la liste:", error);
            setApiError("Erreur création de liste");
        } finally {
            setApiLoading(false);
        }
    };

    //SOUMISSION EDITLISTMODAL
    const handleEditList = async (formData) => {
        if (!currentListToEdit) return;
        if (!formData.name.trim()) {
            setApiError("Un nom de liste est requis");
            return;
        }
        setApiError(null);

        try {
            await API.put(`/lists/${currentListToEdit.id}`, formData);
            setEditListModalOpen(false);
            await fetchLists();
        } catch (error) {
            console.error("Erreur lors de la modification de la liste:", error);
            setApiError("Erreur modif liste");
        }
    };

    //DELETE LISTE
    const handleDeleteList = async (listId) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette liste ? Cette action est irréversible et supprimera tous les restaurants qu'elle contient.")) {
            return;
        }
        setApiError(null);

        try {
            await API.delete(`/lists/${listId}`);
            await fetchLists();
        } catch (error) {
            console.error("Erreur lors de la suppression de la liste:", error);
            setApiError("Erreur lors de la suppression de la liste");
        }
    };

    //AFFICHAGE CHARGEMENT
    if (apiLoading && !lists.length && user) {
        return (
            <div className="font-raleway text-white min-h-screen flex flex-col">
                <Header />
                <p className="text-center text-2xl mt-10 flex-grow">Chargement de vos listes...</p>
                <Footer />
            </div>
        );
    }

    // AFFICHAGE !USER
    if (!user) {
        return (
            <div className="font-raleway text-white min-h-screen flex flex-col">
                <Header />
                <p className="text-center text-white mt-10 flex-grow">Veuillez vous connecter pour gérer vos listes.</p>
                <Footer />
            </div>
        );
    }

    return (
        <div className="font-raleway text-white min-h-screen flex flex-col">
            <Header />
            <div className="container mx-auto py-8 px-4 flex-grow">
                <h1 className="text-4xl font-bold mb-6 text-center md:text-left">Mes Listes de Restaurants</h1>
                <AddIcon
                    onClick={() => setNewListModalOpen(true)}
                    ontSize="large"
                    className="cursor-pointer transition-colors mb-6"
                />

                {apiError && <p className="text-red-500 mb-4 text-center">{apiError}</p>}

                {lists.length === 0 ? (
                    <p className="text-gray-400 text-center text-lg mt-8">
                        Vous n'avez pas encore de listes. Créez-en une pour commencer !
                    </p>
                ) : (
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {lists.map(list => (
                            <li key={list.id} className="p-6 border border-gray-700 bg-gray-900 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-200 flex flex-col justify-between">
                                <div>
                                    <h2 className="text-2xl font-semibold text-blue-green mb-2">{list.name}</h2>
                                    {list.description && <p className="text-gray-400 text-sm mb-4">{list.description}</p>}
                                </div>
                                <div className="flex flex-wrap gap-3 mt-4">
                                    <Link
                                        to={`/lists/${list.id}`}
                                        className="flex-grow bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm text-center transition-colors duration-200"
                                    >
                                        Voir les détails
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setCurrentListToEdit(list);
                                            setEditListModalOpen(true);
                                        }}
                                        className="flex-grow bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded text-sm transition-colors duration-200"
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        onClick={() => handleDeleteList(list.id)}
                                        className="flex-grow bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm transition-colors duration-200"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <Footer />

            {/* CREATION LISTE */}
            <NewListModal
                isOpen={newListModalOpen}
                onClose={() => {
                    setNewListModalOpen(false);
                    setApiError(null);
                }}
                onSubmit={handleCreateList}
                error={apiError}
            />
            {/*MODIFICATION LISTE*/}
            {currentListToEdit && (
                <EditListModal
                    isOpen={editListModalOpen}
                    onClose={() => {
                        setEditListModalOpen(false);
                        setCurrentListToEdit(null);
                        setApiError(null);
                    }}
                    onSubmit={handleEditList}
                    error={apiError}
                    initialData={{ name: currentListToEdit.name, description: currentListToEdit.description }}
                />
            )}
        </div>
    );
}