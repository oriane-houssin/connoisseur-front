import {useState} from 'react';
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar({onSearch}) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    }
    return (
        <div className="w-200/1440 h-full">
            <Button
                variant="contained"
                className="hidden sm:block !bg-white hover:bg-gray-200 !text-blue-green !normal-case !text-sm size-full flex !items-center !justify-between space-x-2"
                sx={{borderRadius: '16px'}}
            >
                Search

                <SearchIcon className="!h-5" sx={{m: 0}}/>
            </Button>
        </div>
    // <form onSubmit={handleSubmit} className="max-h-24/60 max-w-[200px]">
    //     <input type="text" placeholder="Chercher..." value={query} onChange={(e) => setQuery(e.target.value)}/>
    //     <span><SearchIcon/></span>
    // </form>
)
}