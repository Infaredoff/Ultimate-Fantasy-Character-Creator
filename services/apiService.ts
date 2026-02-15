import { Character, UserInput, RerollableSection, Beast, BeastInput } from '../types';
import { generateCharacter, regenerateCharacterSection, generateBeast } from './geminiService';

// This application is designed as a standalone static site. 
// It uses browser localStorage for persistence and interacts directly with the Gemini API.

export const getCharacters = async (): Promise<Character[]> => {
    const saved = localStorage.getItem('characters');
    return saved ? JSON.parse(saved) : [];
};

export const saveCharacters = async (characters: Character[]): Promise<void> => {
    localStorage.setItem('characters', JSON.stringify(characters));
}

export const createCharacter = async (userInput: UserInput): Promise<Character> => {
    return generateCharacter(userInput);
};

export const rerollCharacterSection = async (character: Character, section: RerollableSection): Promise<Partial<Character>> => {
    return regenerateCharacterSection(character, section);
};

export const getBeasts = async (): Promise<Beast[]> => {
     const saved = localStorage.getItem('beasts');
     return saved ? JSON.parse(saved) : [];
};

export const saveBeasts = async (beasts: Beast[]): Promise<void> => {
    localStorage.setItem('beasts', JSON.stringify(beasts));
}

export const createBeast = async (userInput: BeastInput): Promise<Beast> => {
    return generateBeast(userInput);
};

export const getProfileItems = async (): Promise<(Character | Beast)[]> => {
    const saved = localStorage.getItem('savedProfileItems');
    return saved ? JSON.parse(saved) : [];
};

export const saveProfileItems = async (items: (Character | Beast)[]): Promise<void> => {
    localStorage.setItem('savedProfileItems', JSON.stringify(items));
};