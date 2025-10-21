// Fix: Created the Footer component.
import React from 'react';
import { Page } from '../types';

interface FooterProps {
    onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    return (
        <footer className="bg-gray-900/50 border-t border-teal-500/20 mt-16">
            <div className="container mx-auto px-4 py-8 text-center text-gray-400">
                <p>&copy; {new Date().getFullYear()} The Ultimate Fantasy Character Creator. All rights reserved.</p>
                <div className="flex justify-center space-x-4 mt-4">
                    <button onClick={() => onNavigate('contact')} className="hover:text-teal-300 transition">Contact</button>
                    <span>|</span>
                    <button onClick={() => onNavigate('privacy')} className="hover:text-teal-300 transition">Privacy Policy</button>
                    <span>|</span>
                    <button onClick={() => onNavigate('terms')} className="hover:text-teal-300 transition">Terms of Service</button>
                    <span>|</span>
                    <button onClick={() => onNavigate('ai-warnings')} className="hover:text-teal-300 transition">AI Warnings</button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
