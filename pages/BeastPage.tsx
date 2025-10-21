// Fix: Created the BeastPage component for generating and displaying beasts.
import React, { useState, useEffect } from 'react';
import BeastInputForm from '../components/BeastInputForm';
import BeastDossier from '../components/BeastDossier';
import { generateBeast } from '../services/geminiService';
import { Beast, BeastInput } from '../types';

interface BeastPageProps {
    isLoggedIn: boolean;
}

const BeastPage: React.FC<BeastPageProps> = ({ isLoggedIn }) => {
    const [beasts, setBeasts] = useState<Beast[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            const savedBeasts = localStorage.getItem('beasts');
            if (savedBeasts) {
                setBeasts(JSON.parse(savedBeasts));
            }
        } catch (e) {
            console.error("Failed to parse beasts from localStorage", e);
            localStorage.removeItem('beasts');
        }
    }, []);

    useEffect(() => {
        try {
            if (beasts.length > 0) {
                localStorage.setItem('beasts', JSON.stringify(beasts));
            } else {
                 localStorage.removeItem('beasts');
            }
        } catch(e) {
            console.error("Failed to save beasts to localStorage", e);
        }
    }, [beasts]);

    const handleGenerate = async (input: BeastInput) => {
        setIsLoading(true);
        setError(null);
        try {
            const newBeast = await generateBeast(input);
            setBeasts(prev => [newBeast, ...prev]);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleDeleteBeast = (id: string) => {
        setBeasts(prev => prev.filter(b => b.id !== id));
    };

    const handleSaveToProfile = (beast: Beast) => {
        try {
            const savedItems = JSON.parse(localStorage.getItem('savedProfileItems') || '[]');
            if (!savedItems.some((item: Beast) => item.id === beast.id)) {
                savedItems.push({ ...beast, savedType: 'beast' });
                localStorage.setItem('savedProfileItems', JSON.stringify(savedItems));
                alert(`${beast.display_name} saved to profile!`);
            } else {
                alert(`${beast.display_name} is already saved.`);
            }
        } catch (e) {
            console.error("Failed to save to profile", e);
            setError("Could not save beast to profile.");
        }
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="font-cinzel text-5xl font-bold text-teal-200 text-glow">
                    Ultimate beast
                </h1>
                <p className="text-lg text-gray-400 mt-2">
                    Create unique and terrifying creatures for your world.
                </p>
            </div>

            <BeastInputForm onGenerate={handleGenerate} isLoading={isLoading} />

            {error && (
                <div className="my-4 p-4 bg-red-900/50 border border-red-500 text-red-200 rounded-md text-center">
                    {error}
                </div>
            )}

            <div className="mt-12 space-y-8">
                {beasts.map(beast => (
                    <BeastDossier 
                        key={beast.id} 
                        beast={beast}
                        onDelete={() => handleDeleteBeast(beast.id)}
                        isLoggedIn={isLoggedIn}
                        onSaveToProfile={() => handleSaveToProfile(beast)}
                    />
                ))}
            </div>
        </main>
    );
};

export default BeastPage;