import React from 'react';
import { SwordIcon, UserIcon } from './icons';
import { Page } from '../types';

interface NavbarProps {
    isLoggedIn: boolean;
    onNavigate: (page: Page) => void;
    onLogout: () => void;
}

const NavButton: React.FC<{ onClick: () => void, children: React.ReactNode }> = ({ onClick, children }) => (
    <button onClick={onClick} className="font-cinzel text-gray-300 hover:text-teal-300 transition-colors duration-300 text-sm md:text-base">
        {children}
    </button>
);

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onNavigate, onLogout }) => {
    return (
        <nav className="bg-gray-900/50 backdrop-blur-sm border-b border-teal-500/20 sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <button onClick={() => onNavigate('home')} className="flex items-center space-x-2 group">
                        <SwordIcon className="w-8 h-8 text-teal-400 group-hover:text-teal-300 transition-colors duration-300 animate-hover-float" />
                        <span className="font-cinzel text-base md:text-xl text-white font-bold">The Ultimate Fantasy Character Creator</span>
                    </button>
                    <div className="flex items-center space-x-3 md:space-x-6">
                        <NavButton onClick={() => onNavigate('home')}>Characters</NavButton>
                        <NavButton onClick={() => onNavigate('beast')}>Beasts</NavButton>
                        {isLoggedIn ? (
                            <>
                                <NavButton onClick={() => onNavigate('profile')}>
                                    <UserIcon className="w-6 h-6 inline-block md:mr-2" />
                                    <span className="hidden md:inline">Profile</span>
                                </NavButton>
                                <button onClick={onLogout} className="bg-teal-600 text-white font-semibold px-3 py-2 rounded-md hover:bg-teal-500 transition-colors duration-300 text-sm">
                                    Logout
                                </button>
                            </>
                        ) : (
                             <button onClick={() => onNavigate('login')} className="bg-teal-600 text-white font-semibold px-3 py-2 rounded-md hover:bg-teal-500 transition-colors duration-300 text-sm">
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;