import {useState} from 'react';
import axios from 'axios';
import API from '../services/api';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Header from '../composants/Header';
import Footer from '../composants/Footer';

export default function Register() {
    const [form, setForm] = useState({username: "", email: "", password: "",  password2: ""});
    const [error, setError] = useState('');
    const [fieldError, setFieldError] = useState({});

    const handleChange = (e) => {
        setForm({...form, [e.target.id]: e.target.value });
        setFieldError({...fieldError, [e.target.id]: ''});
    }

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setFieldError({});

        const newError = {};
        if (!form.username) newError.username = "Nom d'utilisateur requis";
        if (!form.email) {
            newError.email = "Adresse mail requise";
        } else if (!validateEmail(form.email)) {
            newError.email = 'Adresse mail invalide';
        }
        if (!form.password) {
            newError.password = "Veuillez remplir le mot de passe";
        } else if (form.password.length < 6) {
            newError.password = "Mot de passe trop court (min. 6 caracctères)";
        }
        if (!form.password2) {
            newError.password2 = "Veuillez remplir le mot de passe de confirmation";
        } else if (form.password2 !== form.password) {
            newError.password2 = "Mot de passe non identique";
        }

        if (Object.keys(newError).length > 0) { setFieldError(newError); return;}
        try {
            const res = await API.post('/auth/register', form);
            alert('User registered successfully');
            console.log(res.data);
        } catch (err) {
            setError(err.response?.data?.error || 'Erreur');
        }
    };

    return (
        <div>
            <Header />
            <form className="place-self-center m-20" onSubmit={handleSubmit}>
                <Box sx={{width: 400}}>
                    <Stack spacing={2}>
                        <h1 className="text-white text-xl text-center">Merci de vous inscrire</h1>
                        <TextField id="username" label="Username" variant="outlined" size="small"
                                   onChange={handleChange}
                                   sx={{
                                       '& .MuiOutlinedInput-root' : {
                                           '& fieldset': {borderColor: 'oklch(0.9689 0.0146 132.47)'},
                                           '&:hover fieldset': {borderColor: 'oklch(0.4692 0.0661 196.53)'},
                                           '&.Mui-focused fieldset': {
                                               borderColor: 'oklch(0.4692 0.0661 196.53)',
                                               borderWidth: '3px',
                                           },
                                           '& input': {color: 'oklch(0.9689 0.0146 132.47)'},
                                           '& label': {color: 'oklch(0.9689 0.0146 132.47)'},
                                       },
                                       '& .MuiInputLabel-root': {color: 'oklch(0.9689 0.0146 132.47)',},
                                       '& .MuiInputLabel-root.Mui-focused': {color: 'oklch(0.4692 0.0661 196.53)'}
                                   }}/>
                        {fieldError.username && <p className="text-red-500 text-sm">{fieldError.username}</p>}
                        <TextField id="email" label="Email" variant="outlined" size="small" onChange={handleChange}
                                   sx={{
                                       '& .MuiOutlinedInput-root' : {
                                           '& fieldset': {borderColor: 'oklch(0.9689 0.0146 132.47)'},
                                           '&:hover fieldset': {borderColor: 'oklch(0.4692 0.0661 196.53)'},
                                           '&.Mui-focused fieldset': {
                                               borderColor: 'oklch(0.4692 0.0661 196.53)',
                                               borderWidth: '3px',
                                           },
                                           '& input': {color: 'oklch(0.9689 0.0146 132.47)'},
                                           '& label': {color: 'oklch(0.9689 0.0146 132.47)'},
                                       },
                                       '& .MuiInputLabel-root': {color: 'oklch(0.9689 0.0146 132.47)',},
                                       '& .MuiInputLabel-root.Mui-focused': {color: 'oklch(0.4692 0.0661 196.53)'}
                                   }}/>
                        {fieldError.email && <p className="text-red-500 text-sm">{fieldError.email}</p>}
                        <TextField id="password" label="Password" variant="outlined" size="small"
                                   onChange={handleChange}
                                   sx={{
                                       '& .MuiOutlinedInput-root' : {
                                           '& fieldset': {borderColor: 'oklch(0.9689 0.0146 132.47)'},
                                           '&:hover fieldset': {borderColor: 'oklch(0.4692 0.0661 196.53)'},
                                           '&.Mui-focused fieldset': {
                                               borderColor: 'oklch(0.4692 0.0661 196.53)',
                                               borderWidth: '3px',
                                           },
                                           '& input': {color: 'oklch(0.9689 0.0146 132.47)'},
                                           '& label': {color: 'oklch(0.9689 0.0146 132.47)'},
                                       },
                                       '& .MuiInputLabel-root': {color: 'oklch(0.9689 0.0146 132.47)',},
                                       '& .MuiInputLabel-root.Mui-focused': {color: 'oklch(0.4692 0.0661 196.53)'}
                                   }}/>
                        {fieldError.password && <p className="text-red-500 text-sm">{fieldError.password}</p>}
                        <TextField id="password2" label="Confirmez le mot de passe" variant="outlined" size="small"
                                   onChange={handleChange}
                                   sx={{
                                       '& .MuiOutlinedInput-root' : {
                                           '& fieldset': {borderColor: 'oklch(0.9689 0.0146 132.47)'},
                                           '&:hover fieldset': {borderColor: 'oklch(0.4692 0.0661 196.53)'},
                                           '&.Mui-focused fieldset': {
                                               borderColor: 'oklch(0.4692 0.0661 196.53)',
                                               borderWidth: '3px',
                                           },
                                           '& input': {color: 'oklch(0.9689 0.0146 132.47)'},
                                           '& label': {color: 'oklch(0.9689 0.0146 132.47)'},
                                       },
                                       '& .MuiInputLabel-root': {color: 'oklch(0.9689 0.0146 132.47)',},
                                       '& .MuiInputLabel-root.Mui-focused': {color: 'oklch(0.4692 0.0661 196.53)'}
                                   }}/>
                        {fieldError.password2 && <p className="text-red-500 text-sm">{fieldError.password2}</p>}
                        <Button variant="contained" onClick={handleSubmit} sx={{backgroundColor: 'oklch(0.5977 0.137 127.7)', '&:hover': {backgroundColor: 'oklch(0.5265 0.137 127.7)'}}}>S'inscrire</Button>
                        <Button variant="link" href="/login"><h3 className="text-blue-green">Déjà inscrit ? Se connecter</h3></Button>
                    </Stack>
                </Box>


                {error && <p>{error}</p>}
            </form>
            <Footer />
        </div>

    )
}