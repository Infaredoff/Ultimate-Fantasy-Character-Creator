
import { GoogleGenAI, Type } from "@google/genai";
import { UserInput, Character, Beast, BeastInput, RerollableSection } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const characterSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    race: { type: Type.STRING },
    characterClass: { type: Type.STRING },
    archetype: { type: Type.STRING },
    tags: { type: Type.ARRAY, items: { type: Type.STRING } },
    appearance: {
      type: Type.OBJECT,
      properties: {
        height: { type: Type.STRING },
        build: { type: Type.STRING },
        hair: { type: Type.STRING },
        eyes: { type: Type.STRING },
        sensoryDetail: { type: Type.STRING, description: "What do they smell like or what aura do they project?" },
        attire: { type: Type.STRING },
        distinguishingFeatures: { type: Type.STRING },
      },
      required: ["height", "build", "hair", "eyes", "sensoryDetail", "attire", "distinguishingFeatures"],
    },
    personality: {
      type: Type.OBJECT,
      properties: {
        traits: { type: Type.ARRAY, items: { type: Type.STRING } },
        quirks: { type: Type.ARRAY, items: { type: Type.STRING } },
        theMask: { type: Type.STRING },
        deepSecret: { type: Type.STRING },
        motivations: { type: Type.STRING },
        goals: { type: Type.STRING },
        fears: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ["traits", "quirks", "theMask", "deepSecret", "motivations", "goals", "fears"],
    },
    backstory: { type: Type.STRING },
    abilities: {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                name: { type: Type.STRING },
                type: { type: Type.STRING, enum: ["skill", "magic", "other"] },
                rarity: { type: Type.STRING },
                effect: { type: Type.STRING },
            },
            required: ["name", "type", "rarity", "effect"],
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
                dynamic: { type: Type.STRING },
                description: { type: Type.STRING }
            },
            required: ["role", "name", "dynamic", "description"],
        },
    },
    plotHooks: { type: Type.ARRAY, items: { type: Type.STRING } },
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
  required: ["name", "race", "characterClass", "archetype", "tags", "appearance", "personality", "backstory", "abilities", "equipment", "relationships", "plotHooks", "quote", "export"],
};

const beastSchema = {
    type: Type.OBJECT,
    properties: {
        display_name: { type: Type.STRING },
        taxonomy: { type: Type.STRING },
        archetype: { type: Type.STRING },
        appearance_description: { type: Type.STRING },
        rarity: { type: Type.STRING },
        size_class: { type: Type.STRING },
        taming_possibility: { type: Type.STRING },
        affinity: { type: Type.ARRAY, items: { type: Type.STRING } },
        environment: { type: Type.ARRAY, items: { type: Type.STRING } },
        intelligence_level: { type: Type.STRING },
        aggression: { type: Type.STRING },
        perception: { type: Type.STRING },
        durability: { type: Type.STRING },
        movement_modes: { type: Type.ARRAY, items: { type: Type.STRING } },
        key_features: { type: Type.ARRAY, items: { type: Type.STRING } },
        abilities: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    type: { type: Type.STRING },
                    effect_summary: { type: Type.STRING }
                },
                required: ["name", "type", "effect_summary"]
            }
        },
        combat_style: { type: Type.ARRAY, items: { type: Type.STRING } },
        weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
        flaw: { type: Type.STRING },
        ecological_role: { type: Type.STRING },
        social_structure: { type: Type.STRING },
        mythos_rumor: { type: Type.STRING },
        loot_table: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    item_name: { type: Type.STRING },
                    rarity: { type: Type.STRING },
                    narrative_use: { type: Type.STRING }
                },
                required: ["item_name", "rarity", "narrative_use"]
            }
        },
        example_encounters: { type: Type.ARRAY, items: { type: Type.STRING } },
        image_prompt: { type: Type.STRING }
    },
    required: ["display_name", "taxonomy", "archetype", "appearance_description", "rarity", "size_class", "taming_possibility", "affinity", "environment", "intelligence_level", "aggression", "perception", "durability", "movement_modes", "key_features", "abilities", "combat_style", "weaknesses", "flaw", "ecological_role", "social_structure", "mythos_rumor", "loot_table", "example_encounters", "image_prompt"]
};

export const generateCharacter = async (userInput: UserInput): Promise<Character> => {
  const prompt = `
    Generate a high-fidelity fantasy character dossier.
    Constraints:
    - Role: ${userInput.role}
    - Concept: ${userInput.description}
    - Race: ${userInput.race || 'Surprise me'}
    - Archetype: ${userInput.archetype || 'Surprise me'}
    - Tags: ${userInput.tags || 'Surprise me'}
    - Story Summary: ${userInput.storySummary || 'None'}
    - Subvert a common trope for this class.
    - Make the secret deeply impactful to their story arc.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: characterSchema,
    },
  });
  
  const data = JSON.parse(response.text);
  return { ...data, id: Date.now().toString() };
};

export const regenerateCharacterSection = async (
    character: Character,
    section: RerollableSection
): Promise<Partial<Character>> => {
    const properties = characterSchema.properties as any;
    const prompt = `Refine the '${section}' for ${character.name}, the ${character.characterClass}. Current: ${JSON.stringify(character[section])}. Make it even more unique and gritty.`;

    const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
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

export const generateBeast = async (userInput: BeastInput): Promise<Beast> => {
    const prompt = `Generate a high-fidelity fantasy beast dossier.
    Constraints:
    - Description: ${userInput.description}
    - Taxonomy: ${userInput.taxonomy || 'Any'}
    - Affinity: ${userInput.affinity || 'Any'}
    - Environment: ${userInput.environment || 'Any'}
    - Ensure the abilities are creative and narratively interesting.
    - The mythos/rumor should add depth to the creature's place in the world.
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: beastSchema,
        },
    });
    
    const data = JSON.parse(response.text);
    return { ...data, id: Date.now().toString() };
};
