// Fix: Created the PrivacyPage component.
import React from 'react';

const PrivacyPage: React.FC = () => {
    return (
        <main className="container mx-auto px-4 py-16">
            <div className="w-full max-w-3xl mx-auto">
                 <h1 className="font-cinzel text-5xl font-bold text-teal-200 text-glow mb-8 text-center">
                    Privacy Policy
                </h1>
                <div className="bg-gray-900/50 p-8 rounded-xl border border-teal-500/20 glow-border space-y-4 text-lg text-gray-300">
                    <p>This is a demonstration application. We do not collect or store any personal information on our servers.</p>
                    <p>All data you generate, such as characters and beasts, is stored exclusively in your web browser's local storage. This means the data never leaves your computer. If you clear your browser's data, your creations will be permanently deleted.</p>
                    <p>The "login" functionality is a simulation and does not involve real user accounts or databases.</p>
                </div>
            </div>
        </main>
    );
};

export default PrivacyPage;
