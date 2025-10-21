// Fix: Created the HomePage component to serve as the main view for character generation.
import React, { useState, useEffect } from 'react';
import InputForm from '../components/InputForm';
import CharacterDossier from '../components/CharacterDossier';
import { generateCharacter, regenerateCharacterSection } from '../services/geminiService';
import { Character, UserInput, RerollableSection } from '../types';

interface HomePageProps {
    isLoggedIn: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ isLoggedIn }) => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentUserInput, setCurrentUserInput] = useState<UserInput | undefined>(undefined);
    const [isLoadingReroll, setIsLoadingReroll] = useState<RerollableSection | null>(null);

    useEffect(() => {
        try {
            const savedCharacters = localStorage.getItem('characters');
            if (savedCharacters) {
                setCharacters(JSON.parse(savedCharacters));
            }
        } catch (e) {
            console.error("Failed to parse characters from localStorage", e);
            localStorage.removeItem('characters');
        }
    }, []);

    useEffect(() => {
        try {
            if (characters.length > 0) {
                localStorage.setItem('characters', JSON.stringify(characters));
            } else {
                localStorage.removeItem('characters');
            }
        } catch (e) {
            console.error("Failed to save characters to localStorage", e);
        }
    }, [characters]);

    const handleGenerate = async (input: UserInput) => {
        setIsLoading(true);
        setError(null);
        setCurrentUserInput(input);
        try {
            const newCharacter = await generateCharacter(input);
            setCharacters(prev => [newCharacter, ...prev]);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleGenerateVariant = async (originalCharacter: Character, originalInput: UserInput) => {
        const variantInput = {
            ...originalInput,
            description: `${originalInput.description} (variant of ${originalCharacter.name})`,
            isVariant: true,
        };
        handleGenerate(variantInput);
    }
    
    const handleRerollSection = async (characterId: string, section: RerollableSection) => {
        setIsLoadingReroll(section);
        setError(null);
        try {
            const characterToUpdate = characters.find(c => c.id === characterId);
            if (!characterToUpdate) throw new Error("Character not found for reroll");

            const updatedSection = await regenerateCharacterSection(characterToUpdate, section);
            setCharacters(prev => prev.map(c => 
                c.id === characterId ? { ...c, ...updatedSection } : c
            ));
        } catch (err) {
             setError(err instanceof Error ? err.message : 'An unknown error occurred during reroll.');
        } finally {
            setIsLoadingReroll(null);
        }
    };

    const handleDeleteCharacter = (id: string) => {
        setCharacters(prev => prev.filter(c => c.id !== id));
    };

    const handleSaveToProfile = (character: Character) => {
        try {
            const savedItems = JSON.parse(localStorage.getItem('savedProfileItems') || '[]');
            if (!savedItems.some((item: Character) => item.id === character.id)) {
                savedItems.push({ ...character, savedType: 'character' });
                localStorage.setItem('savedProfileItems', JSON.stringify(savedItems));
                alert(`${character.name} saved to profile!`);
            } else {
                alert(`${character.name} is already saved.`);
            }
        } catch (e) {
            console.error("Failed to save to profile", e);
            setError("Could not save character to profile.");
        }
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="font-cinzel text-5xl font-bold text-teal-200 text-glow">
                    Character Creator
                </h1>
                <p className="text-lg text-gray-400 mt-2">
                    Craft legendary heroes and villains for your stories and campaigns.
                </p>
            </div>

            <InputForm onGenerate={handleGenerate} isLoading={isLoading} initialData={currentUserInput} />

            {error && (
                <div className="my-4 p-4 bg-red-900/50 border border-red-500 text-red-200 rounded-md text-center">
                    {error}
                </div>
            )}

            <div className="mt-12 space-y-8">
                {characters.map(char => (
                    <CharacterDossier 
                        key={char.id} 
                        character={char}
                        onReroll={(section) => handleRerollSection(char.id, section)}
                        onGenerateVariant={() => handleGenerateVariant(char, currentUserInput || {role: char.characterClass, description: char.archetype})}
                        onDelete={() => handleDeleteCharacter(char.id)}
                        isLoadingReroll={isLoadingReroll}
                        isLoggedIn={isLoggedIn}
                        onSaveToProfile={() => handleSaveToProfile(char)}
                    />
                ))}
            </div>
        </main>
    );
};

export default HomePage;