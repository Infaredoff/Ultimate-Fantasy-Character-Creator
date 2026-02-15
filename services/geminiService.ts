import { GoogleGenAI, Type } from "@google/genai";
import { UserInput, Character, Beast, BeastInput, RerollableSection } from '../types';

// The API_KEY is provided by the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const characterSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "The character's full name, including a surname if appropriate." },
    race: { type: Type.STRING, description: "The character's race (e.g., Elf, Dwarf, Human, Orc, etc.)." },
    characterClass: { type: Type.STRING, description: "The character's primary class or archetype (e.g., Mage, Warrior, Rogue)." },
    archetype: { type: Type.STRING, description: "A finer-grained archetype or trope variant." },
    appearance: {
      type: Type.OBJECT,
      properties: {
        height: { type: Type.STRING },
        build: { type: Type.STRING },
        hair: { type: Type.STRING },
        eyes: { type: Type.STRING },
        distinguishingFeatures: { type: Type.STRING },
      },
      required: ["height", "build", "hair", "eyes", "distinguishingFeatures"],
    },
    personality: {
      type: Type.OBJECT,
      properties: {
        traits: { type: Type.ARRAY, items: { type: Type.STRING } },
        quirks: { type: Type.ARRAY, items: { type: Type.STRING } },
        fears: { type: Type.ARRAY, items: { type: Type.STRING } },
        motivations: { type: Type.STRING },
        goals: { type: Type.STRING },
      },
      required: ["traits", "quirks", "fears", "motivations", "goals"],
    },
    backstory: { type: Type.STRING },
    abilities: {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                name: { type: Type.STRING },
                type: { type: Type.STRING },
                effect: { type: Type.STRING },
                rarity: { type: Type.STRING },
            },
            required: ["name", "type", "effect", "rarity"],
        },
    },
    equipment: { type: Type.ARRAY, items: { type: Type.STRING } },
    relationships: {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                role: { type: Type.STRING },
                name: { type: Type.STRING },
                description: { type: Type.STRING }
            },
            required: ["role", "name", "description"],
        },
    },
    plotHooks: { type: Type.ARRAY, items: { type: Type.STRING } },
    tags: { type: Type.ARRAY, items: { type: Type.STRING } },
    quote: { type: Type.STRING },
    export: {
        type: Type.OBJECT,
        properties: {
            imagePrompt: { type: Type.STRING },
            rpgStats: {
                type: Type.OBJECT,
                properties: {
                    STR: { type: Type.INTEGER },
                    DEX: { type: Type.INTEGER },
                    CON: { type: Type.INTEGER },
                    INT: { type: Type.INTEGER },
                    WIS: { type: Type.INTEGER },
                    CHA: { type: Type.INTEGER },
                },
                required: ["STR", "DEX", "CON", "INT", "WIS", "CHA"]
            }
        },
        required: ["imagePrompt", "rpgStats"]
    }
  },
  required: ["name", "race", "characterClass", "archetype", "appearance", "personality", "backstory", "abilities", "equipment", "relationships", "plotHooks", "tags", "quote", "export"],
};

export const generateCharacter = async (userInput: UserInput): Promise<Character> => {
  const prompt = `
    Generate a complete fantasy novel character dossier based on these details:
    - Role/Class: ${userInput.role}
    - Description: ${userInput.description}
    ${userInput.gender ? `- Gender: ${userInput.gender}` : ''}
    ${userInput.race ? `- Race: ${userInput.race}` : ''}
    ${userInput.characterType ? `- Story Role: ${userInput.characterType}` : ''}
    ${userInput.archetype ? `- Specific Archetype: ${userInput.archetype}` : ''}
    ${userInput.swordType ? `- Weapon Preference: ${userInput.swordType}` : ''}
    ${userInput.isVariant ? `SUBVERT the original concept for a unique twist.` : ''}
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: characterSchema,
    },
  });
  
  const data: Omit<Character, 'id'> = JSON.parse(response.text);
  return { ...data, id: Date.now().toString() };
};

export const regenerateCharacterSection = async (
    character: Character,
    section: RerollableSection
): Promise<Partial<Character>> => {
    const properties = characterSchema.properties as any;
    const prompt = `
        Refine this character's ${section}. 
        Character Context: ${character.name}, a ${character.race} ${character.characterClass}.
        Current backstory: ${character.backstory.substring(0, 100)}...
        Generate a new, fresh ${section} that fits this profile.
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: { [section]: properties[section] },
                required: [section],
            },
        },
    });

    return JSON.parse(response.text);
};

const beastSchema = {
    type: Type.OBJECT,
    properties: {
        display_name: { type: Type.STRING },
        taxonomy: { type: Type.STRING },
        affinity: { type: Type.ARRAY, items: { type: Type.STRING } },
        archetype: { type: Type.STRING },
        intelligence_level: { type: Type.STRING },
        size_class: { type: Type.STRING },
        environment: { type: Type.ARRAY, items: { type: Type.STRING } },
        appearance_description: { type: Type.STRING },
        key_features: { type: Type.ARRAY, items: { type: Type.STRING } },
        abilities: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    type: { type: Type.STRING },
                    effect_summary: { type: Type.STRING },
                },
                required: ["name", "type", "effect_summary"],
            },
        },
        weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
        flaw: { type: Type.STRING },
        combat_style: { type: Type.ARRAY, items: { type: Type.STRING } },
        perception: { type: Type.STRING },
        aggression: { type: Type.STRING },
        durability: { type: Type.STRING },
        movement_modes: { type: Type.ARRAY, items: { type: Type.STRING } },
        social_structure: { type: Type.STRING },
        loot_table: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    item_name: { type: Type.STRING },
                    rarity: { type: Type.STRING },
                    narrative_use: { type: Type.STRING },
                },
                required: ["item_name", "rarity", "narrative_use"],
            },
        },
        ecological_role: { type: Type.STRING },
        mythos_rumor: { type: Type.STRING },
        taming_possibility: { type: Type.STRING },
        encounter_difficulty: { type: Type.STRING },
        rarity: { type: Type.STRING },
        audio_cues: { type: Type.STRING },
        image_prompt: { type: Type.STRING },
        example_encounters: { type: Type.ARRAY, items: { type: Type.STRING } },
    },
    required: ["display_name", "taxonomy", "affinity", "archetype", "intelligence_level", "size_class", "environment", "appearance_description", "key_features", "abilities", "weaknesses", "flaw", "combat_style", "perception", "aggression", "durability", "movement_modes", "social_structure", "loot_table", "ecological_role", "mythos_rumor", "taming_possibility", "encounter_difficulty", "rarity", "audio_cues", "image_prompt", "example_encounters"],
};

export const generateBeast = async (userInput: BeastInput): Promise<Beast> => {
    const prompt = `Generate a unique fantasy creature based on: ${userInput.description}. Environment: ${userInput.environment || 'Any'}. Taxonomy: ${userInput.taxonomy || 'Any'}.`;
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: beastSchema,
        },
    });
    
    const data: Omit<Beast, 'id'> = JSON.parse(response.text);
    return { ...data, id: Date.now().toString() };
};