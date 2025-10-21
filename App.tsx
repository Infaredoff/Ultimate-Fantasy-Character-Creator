// Fix: Created the main App component to structure the application, handle routing, and manage state.
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BeastPage from './pages/BeastPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import AiWarningsPage from './pages/AiWarningsPage';
import { Page, User } from './types';
import AiDisclosure from './components/AiDisclosure';
import CookieBanner from './components/CookieBanner';
import FirstUseConsent from './components/FirstUseConsent';

const App: React.FC = () => {
    const [page, setPage] = useState<Page>('home');
    const [user, setUser] = useState<User | null>(null);
    const [cookiesAccepted, setCookiesAccepted] = useState(false);
    const [firstUseConsent, setFirstUseConsent] = useState(false);

    useEffect(() => {
        const storedCookies = localStorage.getItem('cookiesAccepted');
        if (storedCookies) setCookiesAccepted(true);

        const storedConsent = localStorage.getItem('firstUseConsent');
        if (storedConsent) setFirstUseConsent(true);
    }, []);

    const handleLogin = (loggedInUser: User) => {
        setUser(loggedInUser);
        setPage('home');
    };

    const handleLogout = () => {
        setUser(null);
        setPage('home');
    };
    
    const handleAcceptCookies = () => {
        localStorage.setItem('cookiesAccepted', 'true');
        setCookiesAccepted(true);
    };

    const handleAcceptConsent = () => {
        localStorage.setItem('firstUseConsent', 'true');
        setFirstUseConsent(true);
    };

    const renderPage = () => {
        switch (page) {
            case 'home':
                return <HomePage isLoggedIn={!!user} />;
            case 'beast':
                return <BeastPage isLoggedIn={!!user} />;
            case 'login':
                return <LoginPage onLogin={handleLogin} />;
            case 'profile':
                return <ProfilePage user={user} />;
            case 'contact':
                return <ContactPage />;
            case 'privacy':
                return <PrivacyPage />;
            case 'terms':
                return <TermsPage />;
            case 'ai-warnings':
                return <AiWarningsPage />;
            default:
                return <HomePage isLoggedIn={!!user} />;
        }
    };

    return (
        <div className="bg-gray-900 text-gray-100 min-h-screen font-sans flex flex-col">
            <Navbar isLoggedIn={!!user} onNavigate={setPage} onLogout={handleLogout} />
            <div className="flex-grow">
                {renderPage()}
            </div>
            <Footer onNavigate={setPage} />
            <AiDisclosure />
            {!cookiesAccepted && <CookieBanner onAccept={handleAcceptCookies} />}
            {!firstUseConsent && <FirstUseConsent onAccept={handleAcceptConsent} />}
        </div>
    );
};

export default App;