import {useState} from 'react';
import API from '../services/api';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

export default function Login() {
    const [form, setForm] = useState({email: "", password: ""});
    const [error, setError] = useState('');

    const handleChange = e => setForm({...form, [e.target.id]: e.target.value });
    const handleSubmit = async e => {
        e.preventDefault();
        try{
            const res = await API.post('/auth/login', form);
        } catch (err) {
            setError('email ou mot de passe incorrect');
        }
    }
    return (
        <form className="place-self-center" onSubmit={handleSubmit}>
            <Box sx={{width: 400}}>
                <Stack spacing={2}>
                    <h1>Connectez-vous</h1>
                    <TextField id="email" label="Email" variant="outlined" size="small" onChange={handleChange}/>
                    <TextField id="password" label="Password" variant="outlined" size="small" onChange={handleChange}/>
                    <Button variant="contained" onClick={handleSubmit}>Se connecter</Button>
                    <Button variant="link" href="/register">Pas de compte ? S'inscrire</Button>
                </Stack>
            </Box>
            {error && <p>{error}</p>}
        </form>
    )
}