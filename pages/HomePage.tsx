import React, { useState, useEffect } from 'react';
import InputForm from '../components/InputForm';
import CharacterDossier from '../components/CharacterDossier';
import * as apiService from '../services/apiService';
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
        const loadCharacters = async () => {
            const chars = await apiService.getCharacters();
            setCharacters(chars);
        };
        loadCharacters();
    }, []);

    const handleGenerate = async (input: UserInput) => {
        setIsLoading(true);
        setError(null);
        setCurrentUserInput(input);
        try {
            const newCharacter = await apiService.createCharacter(input);
            const updatedCharacters = [newCharacter, ...characters];
            setCharacters(updatedCharacters);
            await apiService.saveCharacters(updatedCharacters);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'The forge grew cold. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleGenerateVariant = async (originalCharacter: Character, originalInput: UserInput) => {
        const variantInput = {
            ...originalInput,
            description: `${originalInput.description} (a twisted variant of ${originalCharacter.name})`,
            isVariant: true,
        };
        handleGenerate(variantInput);
    }
    
    const handleRerollSection = async (characterId: string, section: RerollableSection) => {
        setIsLoadingReroll(section);
        try {
            const characterToUpdate = characters.find(c => c.id === characterId);
            if (!characterToUpdate) return;

            const updatedSection = await apiService.rerollCharacterSection(characterToUpdate, section);
            const updatedCharacters = characters.map(c => 
                c.id === characterId ? { ...c, ...updatedSection } : c
            );
            setCharacters(updatedCharacters);
            await apiService.saveCharacters(updatedCharacters);
        } catch (err) {
             setError("The fates refused to turn. Reroll failed.");
        } finally {
            setIsLoadingReroll(null);
        }
    };

    const handleDeleteCharacter = async (id: string) => {
        const updatedCharacters = characters.filter(c => c.id !== id);
        setCharacters(updatedCharacters);
        await apiService.saveCharacters(updatedCharacters);
    };

    const handleSaveToProfile = async (character: Character) => {
        try {
            const savedItems = await apiService.getProfileItems();
            if (!savedItems.some((item: any) => item.id === character.id)) {
                const newItems: any[] = [...savedItems, { ...character, savedType: 'character' }];
                await apiService.saveProfileItems(newItems);
                alert(`${character.name} etched into your profile.`);
            } else {
                alert(`${character.name} already exists in your archives.`);
            }
        } catch (e) {
            setError("The archives are full or inaccessible.");
        }
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="font-cinzel text-5xl font-bold text-teal-200 text-glow">
                    Character Creator
                </h1>
                <p className="text-lg text-gray-400 mt-2">
                    Craft legendary heroes and villains. Your data is stored locally in your browser.
                </p>
            </div>

            <InputForm onGenerate={handleGenerate} isLoading={isLoading} initialData={currentUserInput} />

            {error && (
                <div className="my-4 p-4 bg-red-900/40 border border-red-500/50 text-red-200 rounded-md text-center backdrop-blur-sm">
                    {error}
                </div>
            )}

            <div className="mt-12 space-y-12">
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