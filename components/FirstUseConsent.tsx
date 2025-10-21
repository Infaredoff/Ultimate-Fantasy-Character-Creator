// Fix: Created the FirstUseConsent component.
import React from 'react';

interface FirstUseConsentProps {
    onAccept: () => void;
}

const FirstUseConsent: React.FC<FirstUseConsentProps> = ({ onAccept }) => {
    return (
        <div className="fixed inset-0 bg-gray-900/90 flex items-center justify-center z-50 p-4">
             <div className="bg-gray-800 p-8 rounded-xl border border-teal-500/30 max-w-2xl text-center">
                <h2 className="font-cinzel text-2xl text-teal-200 mb-4">Content Acknowledgment</h2>
                <p className="text-gray-300 mb-6">
                    This tool uses generative AI. The content created is for creative and entertainment purposes. Please review our AI Warnings and Terms of Service before proceeding.
                </p>
                <button 
                    onClick={onAccept}
                    className="w-full font-cinzel text-lg py-3 px-6 rounded-lg bg-teal-600 text-white hover:bg-teal-500 transition-all duration-300"
                >
                    I Understand and Accept
                </button>
            </div>
        </div>
    );
};

export default FirstUseConsent;
