// Fix: Populating the types file to be used across the application.
export interface UserInput {
  role: string;
  description: string;
  archetype?: string;
  goals?: string;
  tags?: string;
  swordType?: string;
  storySummary?: string;
  characterRelationships?: string;
  isVariant?: boolean;
  gender?: string;
  race?: string;
  characterType?: string;
}

export interface Character {
  id: string;
  name: string;
  race: string;
  characterClass: string;
  archetype: string;
  appearance: {
    height: string;
    build: string;
    hair: string;
    eyes: string;
    distinguishingFeatures: string;
  };
  personality: {
    traits: string[];
    quirks: string[];
    fears: string[];
    motivations: string;
    goals: string;
  };
  backstory: string;
  abilities: {
    name: string;
    type: 'skill' | 'magic' | 'other';
    effect: string;
    rarity: 'common' | 'uncommon' | 'rare' | 'unique';
  }[];
  equipment: string[];
  relationships: {
    role: 'mentor' | 'rival' | 'lover' | 'family' | 'patron' | 'enemy' | 'friend';
    name: string;
    description: string;
  }[];
  plotHooks: string[];
  tags: string[];
  quote: string;
  export: {
    imagePrompt: string;
    rpgStats: {
      STR: number;
      DEX: number;
      CON: number;
      INT: number;
      WIS: number;
      CHA: number;
    };
  };
}

export type RerollableSection = keyof Omit<Character, 'id' | 'export' | 'name' | 'race' | 'characterClass'>;

export interface BeastInput {
    description: string;
    taxonomy?: string;
    affinity?: string;
    environment?: string;
}

export interface Beast {
    id: string;
    display_name: string;
    taxonomy: 'Beast' | 'Humanoid' | 'Aberration' | 'Construct' | 'Fauna' | 'Faerie' | 'Undead';
    affinity: string[];
    archetype: 'predator' | 'guardian' | 'pack' | 'solitary' | 'parasitic' | 'symbiotic' | 'scavenger' | 'apex' | 'ambush';
    intelligence_level: string;
    size_class: 'Tiny' | 'Small' | 'Medium' | 'Large' | 'Huge' | 'Gargantuan';
    environment: string[];
    appearance_description: string;
    key_features: string[];
    abilities: {
        name: string;
        type: 'active' | 'passive';
        effect_summary: string;
    }[];
    weaknesses: string[];
    flaw: string;
    combat_style: string[];
    perception: string;
    aggression: string;
    durability: string;
    movement_modes: string[];
    social_structure: string;
    loot_table: {
        item_name: string;
        rarity: 'common' | 'uncommon' | 'rare' | 'unique';
        narrative_use: string;
    }[];
    ecological_role: string;
    mythos_rumor: string;
    taming_possibility: 'wild' | 'trainable' | 'bondable' | 'mountable' | 'impossible';
    encounter_difficulty: string;
    rarity: 'common' | 'uncommon' | 'rare' | 'unique';
    audio_cues: string;
    image_prompt: string;
    example_encounters: string[];
}

export type Page = 'home' | 'beast' | 'profile' | 'login' | 'contact' | 'privacy' | 'terms' | 'ai-warnings';

export interface User {
    email: string;
    authorName: string;
}