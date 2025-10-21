// Fix: Created the ProfilePage component.
import React, { useState, useEffect } from 'react';
import { User, Character, Beast } from '../types';

interface ProfilePageProps {
    user: User | null;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
    const [savedItems, setSavedItems] = useState<(Character & { savedType: 'character' } | Beast & { savedType: 'beast' })[]>([]);

    useEffect(() => {
        if (user) {
            try {
                const items = JSON.parse(localStorage.getItem('savedProfileItems') || '[]');
                setSavedItems(items);
            } catch (e) {
                console.error("Failed to load saved items", e);
            }
        }
    }, [user]);

    if (!user) {
        return (
            <main className="container mx-auto px-4 py-16 text-center">
                <h1 className="font-cinzel text-4xl text-teal-200">Please log in to view your profile.</h1>
            </main>
        );
    }
    
    return (
        <main className="container mx-auto px-4 py-16 flex flex-col items-center">
            <div className="w-full max-w-4xl">
                 <h1 className="font-cinzel text-5xl font-bold text-teal-200 text-glow mb-8 text-center">
                    Your Profile
                </h1>
                <div className="bg-gray-900/50 p-8 rounded-xl border border-teal-500/20 glow-border space-y-4 text-lg text-gray-300 mb-8">
                    <p><strong>Author Name:</strong> {user.authorName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>

                <h2 className="font-cinzel text-3xl text-teal-200 text-glow mb-4 text-center">Saved Creations</h2>
                {savedItems.length > 0 ? (
                    <div className="space-y-4">
                        {savedItems.map(item => (
                            <div key={item.id} className="bg-gray-800/50 p-4 rounded-lg border border-teal-800">
                                <h3 className="font-cinzel text-xl text-teal-300">
                                    {item.savedType === 'character' ? (item as Character).name : (item as Beast).display_name}
                                </h3>
                                <p className="text-sm text-gray-400 capitalize">{item.savedType}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-400">You haven't saved any creations yet. Go generate some!</p>
                )}
            </div>
        </main>
    );
};

export default ProfilePage;