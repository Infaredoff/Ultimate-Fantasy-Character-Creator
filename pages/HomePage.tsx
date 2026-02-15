import React, { useState, useEffect } from 'react';
import InputForm from '../components/InputForm';
import CharacterDossier from '../components/CharacterDossier';
import * as apiService from '../services/apiService';
import { Character, UserInput, RerollableSection } from '../types';

const HomePage: React.FC<{ isLoggedIn: boolean }> = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoadingReroll, setIsLoadingReroll] = useState<RerollableSection | null>(null);

    useEffect(() => {
        const load = async () => {
            const saved = await apiService.getCharacters();
            setCharacters(saved);
        };
        load();
    }, []);

    const handleGenerate = async (input: UserInput) => {
        setIsLoading(true);
        setError(null);
        try {
            const char = await apiService.createCharacter(input);
            const newList = [char, ...characters];
            setCharacters(newList);
            await apiService.saveCharacters(newList);
        } catch (err) {
            setError("The ritual was interrupted. The veil did not tear.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleReroll = async (id: string, section: RerollableSection) => {
        setIsLoadingReroll(section);
        try {
            const current = characters.find(c => c.id === id);
            if (!current) return;
            const updated = await apiService.rerollCharacterSection(current, section);
            const newList = characters.map(c => c.id === id ? { ...c, ...updated } : c);
            setCharacters(newList);
            await apiService.saveCharacters(newList);
        } catch (err) {
            setError("Fate remained stubborn. Re-roll failed.");
        } finally {
            setIsLoadingReroll(null);
        }
    };

    const handleDelete = async (id: string) => {
        const newList = characters.filter(c => c.id !== id);
        setCharacters(newList);
        await apiService.saveCharacters(newList);
    };

    return (
        <main className="container mx-auto px-4 py-16 min-h-screen">
            <header className="text-center mb-16 space-y-4">
                <h1 className="font-cinzel text-5xl md:text-7xl font-black text-glow-gold tracking-tight">The Arch-Chronicle</h1>
                <p className="text-slate-500 font-medieval text-xl italic">Channeling high-fidelity fates through Gemini Pro</p>
            </header>

            <InputForm onGenerate={handleGenerate} isLoading={isLoading} />

            {isLoading && (
                <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                    <div className="ritual-loader mb-4"></div>
                    <span className="font-cinzel text-amber-500 text-sm tracking-[0.3em] uppercase">Forging Identity...</span>
                </div>
            )}

            {error && (
                <div className="max-w-xl mx-auto my-8 p-4 bg-red-950/30 border border-red-500/50 text-red-200 rounded-xl text-center font-medieval">
                    {error}
                </div>
            )}

            <div className="mt-20 max-w-6xl mx-auto">
                {characters.map(char => (
                    <CharacterDossier 
                        key={char.id} 
                        character={char} 
                        onReroll={(s) => handleReroll(char.id, s)} 
                        onDelete={() => handleDelete(char.id)}
                        isLoadingReroll={isLoadingReroll}
                    />
                ))}
            </div>
        </main>
    );
};

export default HomePage;