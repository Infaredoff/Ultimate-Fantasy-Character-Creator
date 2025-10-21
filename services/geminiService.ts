// WARNING: This file contains server-side logic and uses an API key.
// In a production environment, this file and your API key should NEVER be exposed on the client-side.
// The logic within this file should be moved to a secure backend server,
// and your frontend application should make API calls to that server.
// The new `apiService.ts` file has been set up to facilitate this transition.

import { GoogleGenAI, Type } from "@google/genai";
import { UserInput, Character, Beast, BeastInput, RerollableSection } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const characterSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "The character's full name, including a surname if appropriate." },
    race: { type: Type.STRING, description: "The character's race (e.g., Elf, Dwarf, Human, Orc, etc.)." },
    characterClass: { type: Type.STRING, description: "The character's primary class or archetype (e.g., Mage, Warrior, Rogue)." },
    archetype: { type: Type.STRING, description: "A finer-grained archetype or trope variant, like 'Reluctant Redeemer' for a 'Cursed Knight'." },
    appearance: {
      type: Type.OBJECT,
      properties: {
        height: { type: Type.STRING, description: "Character's height." },
        build: { type: Type.STRING, description: "Character's physical build (e.g., slender, muscular, wiry)." },
        hair: { type: Type.STRING, description: "Character's hair color and style." },
        eyes: { type: Type.STRING, description: "Character's eye color and shape." },
        distinguishingFeatures: { type: Type.STRING, description: "Any scars, tattoos, or unique features." },
      },
      required: ["height", "build", "hair", "eyes", "distinguishingFeatures"],
    },
    personality: {
      type: Type.OBJECT,
      properties: {
        traits: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of 3-5 core personality traits." },
        quirks: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of 2-3 unique quirks or habits." },
        fears: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of 1-2 major fears." },
        motivations: { type: Type.STRING, description: "A detailed sentence about what fundamentally drives the character." },
        goals: { type: Type.STRING, description: "A concrete short, mid, or long-term goal the character is actively pursuing." },
      },
      required: ["traits", "quirks", "fears", "motivations", "goals"],
    },
    backstory: { type: Type.STRING, description: "A rich, detailed backstory of at least 3-4 paragraphs, covering origin, key life events, and what led them to their current path." },
    abilities: {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                name: { type: Type.STRING },
                type: { type: Type.STRING, enum: ['skill', 'magic', 'other'] },
                effect: { type: Type.STRING, description: "A concise description of what the ability does." },
                rarity: { type: Type.STRING, enum: ['common', 'uncommon', 'rare', 'unique'], description: "The rarity of this ability." },
            },
            required: ["name", "type", "effect", "rarity"],
        },
        description: "A list of 3-5 notable abilities or skills, including combat, magic, and others.",
    },
    equipment: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Notable gear, weapons (including the specified sword type), or personal items they carry." },
    relationships: {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                role: { type: Type.STRING, enum: ['mentor', 'rival', 'lover', 'family', 'patron', 'enemy', 'friend'] },
                name: { type: Type.STRING },
                description: { type: Type.STRING, description: "A brief description of the relationship." }
            },
            required: ["role", "name", "description"],
        },
        description: "1-2 key relationships that influence the character."
    },
    plotHooks: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of 2-3 micro-quests or plot hooks tied to the character's backstory or goals." },
    tags: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of 3-5 descriptive tags (e.g., 'witty', 'brooding', 'tragic') based on the user's input and generated character." },
    quote: { type: Type.STRING, description: "A memorable quote that encapsulates the character's personality or worldview." },
    export: {
        type: Type.OBJECT,
        properties: {
            imagePrompt: { type: Type.STRING, description: "A detailed, descriptive prompt for an AI image generator, including appearance, pose, palette, and style. (e.g., 'Full body portrait of a stoic elven ranger, ornate leather armor, silver longbow, misty forest background, fantasy art, detailed, atmospheric lighting')." },
            rpgStats: {
                type: Type.OBJECT,
                properties: {
                    STR: { type: Type.INTEGER, description: "Strength stat (d20 scale, 3-20)." },
                    DEX: { type: Type.INTEGER, description: "Dexterity stat (d20 scale, 3-20)." },
                    CON: { type: Type.INTEGER, description: "Constitution stat (d20 scale, 3-20)." },
                    INT: { type: Type.INTEGER, description: "Intelligence stat (d20 scale, 3-20)." },
                    WIS: { type: Type.INTEGER, description: "Wisdom stat (d20 scale, 3-20)." },
                    CHA: { type: Type.INTEGER, description: "Charisma stat (d20 scale, 3-20)." },
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
    You are an expert fantasy novelist and world-builder. Your task is to generate a complete character dossier based on the user's concept. Create a multi-dimensional character with a rich backstory, distinct personality, and compelling motivations.
    ${userInput.isVariant ? `
    You are generating a VARIANT of an existing character concept. Subvert one of their core traits, introduce an unexpected ability, give them a rare quirk, or explore an alternate path they might have taken. Be creative and emphasize surprising, less common traits while keeping the core identity recognizable.` : ''}

    User's Core Concept:
    - Role/Class: ${userInput.role}
    - Brief Description: ${userInput.description}

    Optional User-Provided Details:
    ${userInput.gender ? `- Gender: ${userInput.gender}` : ''}
    ${userInput.race ? `- Race: ${userInput.race}` : ''}
    ${userInput.characterType ? `- Character Type (in the story): ${userInput.characterType}` : ''}
    ${userInput.archetype ? `- Archetype/Trope Variant: ${userInput.archetype}` : ''}
    ${userInput.swordType ? `- Preferred Sword Type: ${userInput.swordType}` : ''}
    ${userInput.goals ? `- Goals/Drives: ${userInput.goals}` : ''}
    ${userInput.tags ? `- Desired Tags/Tones: ${userInput.tags}` : ''}
    ${userInput.storySummary ? `- Story Context: ${userInput.storySummary}` : ''}
    ${userInput.characterRelationships ? `- Key Relationships: ${userInput.characterRelationships}` : ''}

    Instructions:
    1. Flesh out the user's concept into a full character dossier, adhering strictly to the JSON schema.
    2. If the user provides a 'Race', you MUST use it for the 'race' field. If not, invent a suitable one.
    3. The 'characterClass' should be the broad role (e.g., Knight), while 'archetype' should be the specific variant (e.g., Reluctant Redeemer).
    4. Weave all provided optional details into the character's profile. If a sword type is given, it MUST be in their equipment list and influence their combat abilities. If goals are given, they MUST be reflected in the personality.goals field.
    5. Create a rich, multi-paragraph backstory that explains how they became who they are, incorporating their specified 'Character Type' if provided.
    6. Generate compelling plot hooks related to their backstory or goals.
    7. Generate a balanced set of d20-style RPG stats (3-20 range) that reflect the character's class and description.
    8. Create a detailed image prompt suitable for an AI image generator. If a 'Gender' is provided, it must be reflected in the prompt.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: characterSchema,
      },
    });
    
    const jsonText = response.text.trim();
    const cleanedJsonText = jsonText.replace(/^```json\n?/, '').replace(/```$/, '');
    const characterData: Omit<Character, 'id'> = JSON.parse(cleanedJsonText);
    
    return { ...characterData, id: Date.now().toString() };

  } catch (error) {
    console.error("Error generating character:", error);
    throw new Error("Failed to generate character. The model may be experiencing issues or the request was malformed.");
  }
};

export const regenerateCharacterSection = async (
    character: Character,
    section: RerollableSection
): Promise<Partial<Character>> => {
    // Ensure the section is a valid, defined property in our schema
    const schemaProperties = characterSchema.properties as { [key: string]: unknown };
    if (!schemaProperties[section]) {
        throw new Error(`Invalid section "${section}" provided for re-rolling.`);
    }

    const characterDataForContext = { ...character };
    // We don't need to send the section we're replacing in the context
    delete (characterDataForContext as Partial<Character>)[section];

    const prompt = `
        You are an expert fantasy novelist tasked with refining a character.
        Given the following character profile:
        ${JSON.stringify(characterDataForContext, null, 2)}

        Your task is to regenerate ONLY the "${section}" section. Create a new, compelling alternative that is consistent with the rest of the character's profile but offers a fresh perspective.
        
        Respond with a JSON object containing ONLY the newly generated "${section}" key and its value, adhering strictly to the provided schema. Do not include any other text, explanations, or markdown.
    `;

    const partialSchema = {
        type: Type.OBJECT,
        properties: {
            [section]: schemaProperties[section],
        },
        required: [section],
    };

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: partialSchema,
            },
        });

        const jsonText = response.text.trim();
        const cleanedJsonText = jsonText.replace(/^```json\n?/, '').replace(/```$/, '');
        const regeneratedData: Partial<Character> = JSON.parse(cleanedJsonText);

        return regeneratedData;

    } catch (error) {
        console.error(`Error regenerating section "${section}":`, error);
        throw new Error(`Failed to regenerate section "${section}". The model returned an invalid response.`);
    }
};


// --- New Beast Generator Service ---

const beastSchema = {
    type: Type.OBJECT,
    properties: {
        display_name: { type: Type.STRING, description: "Common name of the beast (e.g., 'Mirewight', 'Clockwork Drake')." },
        taxonomy: { type: Type.STRING, enum: ['Beast', 'Humanoid', 'Aberration', 'Construct', 'Fauna', 'Faerie', 'Undead'], description: "Broad biological or magical classification." },
        affinity: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of 1-3 elemental or magical affinities (e.g., 'Primal', 'Rot', 'Arcane')." },
        archetype: { type: Type.STRING, enum: ['predator', 'guardian', 'pack', 'solitary', 'parasitic', 'symbiotic', 'scavenger', 'apex', 'ambush'], description: "The beast's primary behavioral archetype." },
        intelligence_level: { type: Type.STRING, description: "A human-readable label and a 0-10 numeric scale, e.g., 'Tool-Using (6/10)'." },
        size_class: { type: Type.STRING, enum: ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'] },
        environment: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of 1-3 environments where this beast is typically found." },
        appearance_description: { type: Type.STRING, description: "A concise, sensory paragraph describing the beast's appearance, sound, smell, and movement." },
        key_features: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3-6 quick callouts of its most notable features (e.g., 'bioluminescent frills', 'oil-slick hide')." },
        abilities: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    type: { type: Type.STRING, enum: ['active', 'passive'] },
                    effect_summary: { type: Type.STRING, description: "A single sentence explaining the ability's effect." },
                },
                required: ["name", "type", "effect_summary"],
            },
            description: "A list of 3-5 key abilities."
        },
        weaknesses: { type: Type.ARRAY, items: { type: Type.STRING }, description: "2-4 mechanical and narrative weaknesses (e.g., 'Vulnerable to sunlight', 'Magnetism disrupts its clockwork')." },
        flaw: { type: Type.STRING, description: "A single roleplaying or mechanical quirk that makes the beast interesting (e.g., 'Hoards shiny things, ignoring threats to protect its hoard')." },
        combat_style: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Its typical approach to combat (e.g., 'ambusher', 'skirmisher', 'tank')." },
        perception: { type: Type.STRING, description: "Effectiveness of its senses as a label and numeric scale (e.g., 'Acute Hearing (18/20)')." },
        aggression: { type: Type.STRING, description: "A label for its aggression level and a numeric scale (e.g., 'Territorial (8/10)')." },
        durability: { type: Type.STRING, description: "A descriptive label for its durability (e.g., 'Armored', 'Regenerative', 'Fragile')." },
        movement_modes: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of movement types, with speeds if applicable (e.g., 'Walk 30ft', 'Fly 60ft', 'Burrow')." },
        social_structure: { type: Type.STRING, description: "How the beasts organize themselves (e.g., 'Solitary', 'Hierarchical Pack')." },
        loot_table: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    item_name: { type: Type.STRING },
                    rarity: { type: Type.STRING, enum: ['common', 'uncommon', 'rare', 'unique'] },
                    narrative_use: { type: Type.STRING, description: "A story-focused use for the item (e.g., 'Used to charm guards', 'Key ingredient in a sleeping potion')." },
                },
                required: ["item_name", "rarity", "narrative_use"],
            },
            description: "A short list of potential loot drops with narrative uses."
        },
        ecological_role: { type: Type.STRING, description: "How the beast fits into its environment (e.g., 'Apex predator of the swamp', 'Spreads magical seeds')." },
        mythos_rumor: { type: Type.STRING, description: "A local legend, rumor, or taboo associated with the beast." },
        taming_possibility: { type: Type.STRING, enum: ['wild', 'trainable', 'bondable', 'mountable', 'impossible'] },
        encounter_difficulty: { type: Type.STRING, description: "A label and numeric scale for its typical challenge (e.g., 'Deadly (9/10)')." },
        rarity: { type: Type.STRING, enum: ['common', 'uncommon', 'rare', 'unique'] },
        audio_cues: { type: Type.STRING, description: "A short description of sounds it makes (e.g., 'Scraping, wet clicks, and a harmonic hum')." },
        image_prompt: { type: Type.STRING, description: "A detailed, descriptive prompt for an AI image generator, including appearance, pose, environment, colors, and style." },
        example_encounters: { type: Type.ARRAY, items: { type: Type.STRING }, description: "2-3 short vignettes describing probable encounter scenarios." },
    },
    required: ["display_name", "taxonomy", "affinity", "archetype", "intelligence_level", "size_class", "environment", "appearance_description", "key_features", "abilities", "weaknesses", "flaw", "combat_style", "perception", "aggression", "durability", "movement_modes", "social_structure", "loot_table", "ecological_role", "mythos_rumor", "taming_possibility", "encounter_difficulty", "rarity", "audio_cues", "image_prompt", "example_encounters"],
};

export const generateBeast = async (userInput: BeastInput): Promise<Beast> => {
    const prompt = `
    You are an expert fantasy biologist and world-builder. Your task is to generate a complete beast dossier based on the user's concept. Create a unique and believable creature with a distinct ecological role, interesting behaviors, and compelling lore.

    User's Core Concept:
    - Description: ${userInput.description}

    Optional User-Provided Details:
    ${userInput.taxonomy ? `- Taxonomy: ${userInput.taxonomy}` : ''}
    ${userInput.affinity ? `- Affinity: ${userInput.affinity}` : ''}
    ${userInput.environment ? `- Environment: ${userInput.environment}` : ''}
    
    Instructions:
    1.  Flesh out the user's concept into a full beast dossier, adhering strictly to the JSON schema.
    2.  If no specific details are provided, be creative and invent a compelling creature. If details are provided, they MUST be incorporated.
    3.  The beast should feel like a natural part of its environment. Its abilities, appearance, and behavior should all be logically connected to its ecological role and affinities.
    4.  Create interesting abilities, narrative weaknesses, and a behavioral flaw that can be used for story or gameplay hooks.
    5.  The mythos and rumor should provide a hook for how local NPCs might react to the beast.
    6.  The example encounters should be short but evocative scenarios.
    7.  The image prompt must be detailed and suitable for generating art with an AI image generator.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro', // Using a more powerful model for this complex schema
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: beastSchema,
            },
        });
        
        const jsonText = response.text.trim();
        const cleanedJsonText = jsonText.replace(/^```json\n?/, '').replace(/```$/, '');
        const beastData: Omit<Beast, 'id'> = JSON.parse(cleanedJsonText);
        
        return { ...beastData, id: Date.now().toString() };

    } catch (error) {
        console.error("Error generating beast:", error);
        throw new Error("Failed to generate beast. The model may be experiencing issues or the request was malformed.");
    }
};
