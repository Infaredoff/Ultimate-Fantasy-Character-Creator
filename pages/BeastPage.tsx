// Fix: Created the BeastPage component for generating and displaying beasts.
import React, { useState, useEffect } from 'react';
import BeastInputForm from '../components/BeastInputForm';
import BeastDossier from '../components/BeastDossier';
import * as apiService from '../services/apiService';
import { Beast, BeastInput } from '../types';

interface BeastPageProps {
    isLoggedIn: boolean;
}

const BeastPage: React.FC<BeastPageProps> = ({ isLoggedIn }) => {
    const [beasts, setBeasts] = useState<Beast[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadBeasts = async () => {
            setIsLoading(true);
            try {
                const loadedBeasts = await apiService.getBeasts();
                setBeasts(loadedBeasts);
            } catch (e) {
                setError("Failed to load previously generated beasts.");
            } finally {
                setIsLoading(false);
            }
        };
        loadBeasts();
    }, []);

    const handleGenerate = async (input: BeastInput) => {
        setIsLoading(true);
        setError(null);
        try {
            const newBeast = await apiService.createBeast(input);
            const updatedBeasts = [newBeast, ...beasts];
            setBeasts(updatedBeasts);
            await apiService.saveBeasts(updatedBeasts);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleDeleteBeast = async (id: string) => {
        const updatedBeasts = beasts.filter(b => b.id !== id);
        setBeasts(updatedBeasts);
        await apiService.saveBeasts(updatedBeasts);
    };

    const handleSaveToProfile = async (beast: Beast) => {
        try {
            const savedItems = await apiService.getProfileItems();
            if (!savedItems.some((item: any) => item.id === beast.id)) {
                const newItems: any[] = [...savedItems, { ...beast, savedType: 'beast' }];
                await apiService.saveProfileItems(newItems);
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
