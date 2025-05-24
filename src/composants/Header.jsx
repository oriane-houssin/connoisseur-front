import {Link} from 'react-router-dom';
import SearchBar from './SearchBar'
import React from 'react';

export default function Header() {
    return (
        <header className="shadow-md h-[50px] w-full fixed backdrop-blur-sm bg-light-black/25 z-50">
            <nav className="w-full flex justify-between items-center px-4 py-3 sm:px-6 lg:px-8 h-full">
                <Link to="/" className=" flex items-center h-full">
                    <img src="/media/logo-lg-white.png" alt="Logo" className="h-full"/>
                </Link>
                <Link to="/">
                    <h5 className="text-white font-raleway font-bold hover:text-blue-green">Restaurants</h5>
                </Link>
                <Link to="/">
                    <h5 className="text-white font-raleway font-bold hover:text-blue-green">Lists</h5>
                </Link>
                <SearchBar/>
            <Link to="/login">
                <h5 className="text-white font-raleway font-bold hover:text-blue-green">Sign-in</h5>
            </Link>
            </nav>
        </header>
)
}

// src/components/Header.jsx

// import {Link} from 'react-router-dom';
//
// function Header() {
//     return (
//         <AppBar position="static" className="bg-light-black/25 shadow-md">
//             <Toolbar className="flex justify-between items-center px-4 py-2 sm:px-6 lg:px-8">
//                 <div className="flex items-center">
//                     <Link to="/">
//                         <img src="/media/logo-lg-white.png" alt="Logo" className="h-5"/>
//                     </Link>
//                 </div>
//                 <nav className="hidden md:flex space-x-6">
//                     <Link to="/">
//                         <h5 className="text-white font-raleway font-bold">Restaurants</h5>
//                     </Link>
//                     <Link to="/">
//                         <h5 className="text-white font-raleway font-bold">Lists</h5>
//                     </Link>
//                 </nav>
//                 <div className="flex items-center space-x-2">
//                     <Button
//                         variant="contained"
//                         className="hidden sm:block bg-white-500 hover:bg-gray-200 text-white normal-case text-base rounded"
//                     >
//                         Search
//                         <IconButton color="inherit" aria-label="search" className="text-gray-700 hover:text-blue-600">
//                             <SearchIcon />
//                         </IconButton>
//                     </Button>
//                 </div>
//                 <Link to="/login">
//                     <h5 className="text-white font-raleway font-bold">Sign-in</h5>
//                 </Link>
//             </Toolbar>
//         </AppBar>
//     );
// }
//
// export default Header;