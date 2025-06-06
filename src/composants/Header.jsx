import {Link} from 'react-router-dom';
import SearchBar from './SearchBar'
import React from 'react';

export default function Header() {
    return (
        <header className="shadow-md h-[50px] w-full sticky top-0 backdrop-blur-sm bg-light-black/25 z-50">
            <nav className="w-full flex justify-between items-center px-4 py-3 sm:px-6 lg:px-8 h-full">
                <Link to="/" className=" flex items-center h-full">
                    <img src="/media/logo-lg-white.png" alt="Logo" className="h-full"/>
                </Link>
                <Link to="/">
                    <h5 className="text-white font-raleway font-bold hover:text-blue-green">Restaurants</h5>
                </Link>
                <Link to="/lists">
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