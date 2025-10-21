import { Character, UserInput, RerollableSection, Beast, BeastInput } from '../types';
import { generateCharacter, regenerateCharacterSection, generateBeast } from './geminiService';

// --- THIS FILE IS A BRIDGE TO YOUR BACKEND ---
// Currently, it calls the Gemini service directly and uses localStorage.
// To prepare for deployment, you should:
// 1. Create a backend server (e.g., using Node.js/Express).
// 2. Move the logic from `geminiService.ts` to your backend.
// 3. Create API endpoints on your backend (e.g., POST /api/characters).
// 4. Update the functions in this file to use `fetch()` to call your backend endpoints.
//    - This will secure your API key and allow you to persist data in MongoDB.

// --- Character Functions ---

export const getCharacters = async (): Promise<Character[]> => {
    // TODO: Replace with: return fetch('/api/characters').then(res => res.json());
    try {
        const saved = localStorage.getItem('characters');
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        console.error("Failed to parse characters from localStorage", e);
        return [];
    }
};

export const saveCharacters = async (characters: Character[]): Promise<void> => {
    // This function will not be needed once you have a backend.
    if (characters.length > 0) {
        localStorage.setItem('characters', JSON.stringify(characters));
    } else {
        localStorage.removeItem('characters');
    }
}

export const createCharacter = async (userInput: UserInput): Promise<Character> => {
    // TODO: Replace this with a fetch call to your backend.
    // const response = await fetch('/api/characters', { method: 'POST', ... });
    // return response.json();
    return generateCharacter(userInput);
};

export const rerollCharacterSection = async (character: Character, section: RerollableSection): Promise<Partial<Character>> => {
    // TODO: Replace this with a fetch call to your backend.
    return regenerateCharacterSection(character, section);
};

// --- Beast Functions ---

export const getBeasts = async (): Promise<Beast[]> => {
    // TODO: Replace with: return fetch('/api/beasts').then(res => res.json());
     try {
        const saved = localStorage.getItem('beasts');
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        console.error("Failed to parse beasts from localStorage", e);
        return [];
    }
};

export const saveBeasts = async (beasts: Beast[]): Promise<void> => {
    // This function will not be needed once you have a backend.
    if (beasts.length > 0) {
        localStorage.setItem('beasts', JSON.stringify(beasts));
    } else {
        localStorage.removeItem('beasts');
    }
}

export const createBeast = async (userInput: BeastInput): Promise<Beast> => {
    // TODO: Replace this with a fetch call to your backend.
    return generateBeast(userInput);
};

// --- Profile Functions ---

export const getProfileItems = async (): Promise<(Character | Beast)[]> => {
    // TODO: Replace with: return fetch('/api/profile/items').then(res => res.json());
    try {
        const saved = localStorage.getItem('savedProfileItems');
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        console.error("Failed to parse profile items from localStorage", e);
        return [];
    }
};

export const saveProfileItems = async (items: (Character | Beast)[]): Promise<void> => {
    // This function will not be needed once you have a backend.
    localStorage.setItem('savedProfileItems', JSON.stringify(items));
};
