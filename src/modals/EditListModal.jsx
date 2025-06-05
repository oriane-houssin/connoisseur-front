import { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';

export default function EditListModal({isOpen, onClose, onSubmit, error, initialData}) {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        description: initialData?.description || '',
    });

    useEffect(() => {
        if (isOpen) {
            setFormData({
                name: initialData?.name || '',
                description: initialData?.description || '',
            });
        }
    }, [isOpen]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md relative border border-gray-700">
                <CloseIcon
                    fontSize="large"
                    onClick={onClose}
                    className="cursor-pointer absolute top-2 right-2  p-2"
                />
                <h2 className="text-2xl font-bold mb-4 text-white">Modifier la liste</h2>
                {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

                <div className="mb-4">
                    <label htmlFor="editList_name" className="block text-gray-300 text-sm font-bold mb-2">
                        Nom de la liste:
                    </label>
                    <input
                        type="text"
                        id="editList_name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-green bg-gray-700"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="editList_description" className="block text-gray-300 text-sm font-bold mb-2">
                        Description (optionnel):
                    </label>
                    <textarea
                        id="editList_description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-green bg-gray-700"
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    className="bg-blue-green hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded w-full transition-colors duration-200"
                >
                    Enregistrer les modifications
                </button>
            </div>
        </div>
    )
}