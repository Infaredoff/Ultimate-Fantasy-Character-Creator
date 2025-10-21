// Fix: Created the CookieBanner component.
import React from 'react';

interface CookieBannerProps {
    onAccept: () => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ onAccept }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm p-4 border-t border-teal-500/20 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <p className="text-gray-300 text-sm">
                    We use local storage to save your generated characters. By using this site, you agree to our use of local storage.
                </p>
                <button 
                    onClick={onAccept}
                    className="bg-teal-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-teal-500 transition-colors duration-300 text-sm"
                >
                    Acknowledge
                </button>
            </div>
        </div>
    );
};

export default CookieBanner;
