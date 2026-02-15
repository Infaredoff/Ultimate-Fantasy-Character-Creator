
export interface UserInput {
  role: string;
  description: string;
  race?: string;
  archetype?: string;
  goals?: string;
  tags?: string;
  swordType?: string;
  storySummary?: string;
  characterRelationships?: string;
  gender?: string;
  characterType?: string;
}

export interface Character {
  id: string;
  name: string;
  race: string;
  characterClass: string;
  archetype: string;
  tags: string[];
  appearance: {
    height: string;
    build: string;
    hair: string;
    eyes: string;
    sensoryDetail: string;
    attire: string;
    distinguishingFeatures: string;
  };
  personality: {
    traits: string[];
    quirks: string[];
    theMask: string;
    deepSecret: string;
    motivations: string;
    goals: string;
    fears: string[];
  };
  backstory: string;
  abilities: {
    name: string;
    type: 'skill' | 'magic' | 'other';
    rarity: string;
    effect: string;
  }[];
  equipment: string[];
  relationships: {
    role: string;
    name: string;
    dynamic: string;
    description: string;
  }[];
  plotHooks: string[];
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

export type RerollableSection = 'backstory' | 'appearance' | 'personality' | 'abilities' | 'relationships';

export interface BeastInput {
    description: string;
    taxonomy?: string;
    affinity?: string;
    environment?: string;
}

export interface Beast {
    id: string;
    display_name: string;
    taxonomy: string;
    archetype: string;
    appearance_description: string;
    rarity: string;
    size_class: string;
    taming_possibility: string;
    affinity: string[];
    environment: string[];
    intelligence_level: string;
    aggression: string;
    perception: string;
    durability: string;
    movement_modes: string[];
    key_features: string[];
    abilities: {
        name: string;
        type: string;
        effect_summary: string;
    }[];
    combat_style: string[];
    weaknesses: string[];
    flaw: string;
    ecological_role: string;
    social_structure: string;
    mythos_rumor: string;
    loot_table: {
        item_name: string;
        rarity: string;
        narrative_use: string;
    }[];
    example_encounters: string[];
    image_prompt: string;
}

export type Page = 'home' | 'beast' | 'profile' | 'login' | 'contact' | 'privacy' | 'terms' | 'ai-warnings';

export interface User {
    email: string;
    authorName: string;
}
