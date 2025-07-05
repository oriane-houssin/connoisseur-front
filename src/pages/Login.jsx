import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import API from '../services/api';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Header from '../composants/Header';
import Footer from '../composants/Footer';

export default function Login() {
    const [form, setForm] = useState({email: "", password: ""});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = e => setForm({...form, [e.target.id]: e.target.value });
    const handleSubmit = async e => {
        e.preventDefault();
        try{
            const res = await API.post('/auth/login', form);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/');
        } catch (err) {
            setError('email ou mot de passe incorrect');
        }
    }

    return (
        <div className="h-dvh">
            <Header/>
            <div className="place-self-center m-20">
                <form className="place-self-center" onSubmit={handleSubmit}>
                    <Box sx={{width: 400}}>
                        <Stack spacing={2}>
                            <h1 className='text-white text-center text-xl'>Connectez-vous</h1>
                            <TextField id="email" label="Email" variant="outlined" color="#F1F7ED" size="small"
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
                            <Button variant="contained" onClick={handleSubmit} sx={{backgroundColor: 'oklch(0.5977 0.137 127.7)', '&:hover': {backgroundColor: 'oklch(0.5265 0.137 127.7)'}}}><h3>Se connecter</h3></Button>
                            <Button variant="link" href="/register" ><h3 className="text-blue-green">Pas de compte ? S'inscrire</h3></Button>
                        </Stack>
                    </Box>
                    {error && <p>{error}</p>}
                </form>
            </div>
            <Footer/>
        </div>


    )
}