import { Character, Beast } from '../types';

export const toMarkdown = (character: Character): string => {
    const abilitiesByType = (type: 'skill' | 'magic' | 'other') => 
        character.abilities.filter(a => a.type === type)
            .map(a => `- **${a.name} (${a.rarity})**: ${a.effect}`)
            .join('\n');

    return `
# ${character.name}
*${character.race} ${character.characterClass} (${character.archetype})*
> "${character.quote}"

**Tags:** ${character.tags.join(', ')}

---

## Appearance
- **Height:** ${character.appearance.height}
- **Build:** ${character.appearance.build}
- **Hair:** ${character.appearance.hair}
- **Eyes:** ${character.appearance.eyes}
- **Distinguishing Features:** ${character.appearance.distinguishingFeatures}

---

## Personality
- **Core Traits:** ${character.personality.traits.join(', ')}
- **Quirks:** ${character.personality.quirks.join(', ')}
- **Fears:** ${character.personality.fears.join(', ')}
- **Motivations:** ${character.personality.motivations}
- **Goals:** ${character.personality.goals}

---

## Backstory
${character.backstory.split('\n').filter(p => p.trim() !== '').join('\n\n')}

---

## Skills & Abilities

### Combat / Skills
${abilitiesByType('skill')}
${abilitiesByType('other')}

### Magic
${abilitiesByType('magic')}

---

## Equipment
${character.equipment.map(item => `- ${item}`).join('\n')}

---

## Relationships
${character.relationships.map(r => `- **${r.name} (${r.role})**: ${r.description}`).join('\n')}

---

## Plot Hooks
${character.plotHooks.map(hook => `- ${hook}`).join('\n')}

---

## RPG Stats (d20 System)
- **STR:** ${character.export.rpgStats.STR}
- **DEX:** ${character.export.rpgStats.DEX}
- **CON:** ${character.export.rpgStats.CON}
- **INT:** ${character.export.rpgStats.INT}
- **WIS:** ${character.export.rpgStats.WIS}
- **CHA:** ${character.export.rpgStats.CHA}

---

## Image Prompt
\`\`\`
${character.export.imagePrompt}
\`\`\`
    `.trim();
};

export const toJson = (data: Character | Beast): string => {
    return JSON.stringify(data, null, 2);
};


export const toBeastMarkdown = (beast: Beast): string => {
    return `
# ${beast.display_name}
*${beast.taxonomy} (${beast.archetype})*
> ${beast.appearance_description}

**Rarity:** ${beast.rarity} | **Size:** ${beast.size_class} | **Taming:** ${beast.taming_possibility}

---

## Core Info
- **Affinities:** ${beast.affinity.join(', ')}
- **Environments:** ${beast.environment.join(', ')}
- **Intelligence:** ${beast.intelligence_level}
- **Aggression:** ${beast.aggression}
- **Perception:** ${beast.perception}
- **Durability:** ${beast.durability}
- **Movement:** ${beast.movement_modes.join(', ')}

---

## Key Features
${beast.key_features.map(f => `- ${f}`).join('\n')}

---

## Abilities
${beast.abilities.map(a => `- **${a.name} (${a.type})**: ${a.effect_summary}`).join('\n')}

---

## Combat & Weaknesses
- **Combat Style:** ${beast.combat_style.join(', ')}
- **Weaknesses:** ${beast.weaknesses.join(', ')}
- **Behavioral Flaw:** ${beast.flaw}

---

## Ecology & Lore
- **Ecological Role:** ${beast.ecological_role}
- **Social Structure:** ${beast.social_structure}
- **Mythos/Rumor:** ${beast.mythos_rumor}

---

## Loot Table
${beast.loot_table.map(l => `- **${l.item_name} (${l.rarity})**: ${l.narrative_use}`).join('\n')}

---

## Example Encounters
${beast.example_encounters.map(e => `- ${e}`).join('\n')}

---

## Image Prompt
\`\`\`
${beast.image_prompt}
\`\`\`
    `.trim();
};