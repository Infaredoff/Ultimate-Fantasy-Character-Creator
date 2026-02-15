
import React, { useState } from 'react';
import { Character, RerollableSection } from '../types';
import { toMarkdown, toJson } from '../utils/exportUtils';

interface CharacterDossierProps {
    character: Character;
    onReroll: (section: RerollableSection) => void;
    onGenerateVariant: () => void;
    onDelete: () => void;
    isLoadingReroll: RerollableSection | null;
    isLoggedIn: boolean;
    onSaveToProfile: () => void;
}

const SectionHeader: React.FC<{ title: string; onReroll?: () => void; isLoading?: boolean }> = ({ title, onReroll, isLoading }) => (
    <div className="flex items-center justify-between mb-4 border-b border-teal-500/30 pb-2">
        <h3 className="font-cinzel text-xl text-teal-300 font-bold tracking-wider uppercase">{title}</h3>
        {onReroll && (
            <button 
                onClick={onReroll} 
                disabled={isLoading}
                className="text-xs text-teal-500 hover:text-teal-300 transition-colors uppercase font-bold tracking-tighter disabled:opacity-50"
            >
                {isLoading ? 'Reshaping...' : '[ Reroll ]'}
            </button>
        )}
    </div>
);

const CharacterDossier: React.FC<CharacterDossierProps> = ({ character, onReroll, onGenerateVariant, onDelete, isLoadingReroll, isLoggedIn, onSaveToProfile }) => {
    const [copyText, setCopyText] = useState('Copy MD');
    
    const downloadFile = (content: string, fileName: string, mimeType: string) => {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(toMarkdown(character));
        setCopyText('Copied!');
        setTimeout(() => setCopyText('Copy MD'), 2000);
    };
    
    return (
        <div className="relative bg-slate-900/80 backdrop-blur-xl p-8 md:p-12 rounded-2xl border border-teal-500/20 shadow-2xl animate-slide-up mb-16 overflow-hidden">
            {/* Decorative Corner Accents */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-teal-500/40 rounded-tl-xl"></div>
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-teal-500/40 rounded-tr-xl"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-teal-500/40 rounded-bl-xl"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-teal-500/40 rounded-br-xl"></div>

            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
                <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                        <span className="px-3 py-1 bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-bold uppercase tracking-widest rounded-full">
                            {character.race}
                        </span>
                        <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold uppercase tracking-widest rounded-full">
                            {character.characterClass}
                        </span>
                    </div>
                    <h2 className="font-cinzel text-5xl md:text-6xl text-white font-black text-glow mb-2">{character.name}</h2>
                    <p className="font-medieval text-xl text-amber-200/80 italic tracking-wide">{character.archetype}</p>
                </div>
                
                <div className="flex flex-wrap gap-3 w-full md:w-auto">
                    <button onClick={handleCopy} className="flex-1 md:flex-none text-xs bg-slate-800 hover:bg-slate-700 text-teal-300 font-bold px-4 py-2 rounded-lg border border-teal-500/20 transition-all">{copyText}</button>
                    <button onClick={() => downloadFile(toJson(character), `${character.name}.json`, 'application/json')} className="flex-1 md:flex-none text-xs bg-slate-800 hover:bg-slate-700 text-teal-300 font-bold px-4 py-2 rounded-lg border border-teal-500/20 transition-all">Export JSON</button>
                    <button onClick={onDelete} className="flex-1 md:flex-none text-xs bg-red-950/40 hover:bg-red-900/60 text-red-400 font-bold px-4 py-2 rounded-lg border border-red-500/20 transition-all">Purge</button>
                </div>
            </div>

            <div className="mb-12 relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-teal-500 to-transparent"></div>
                <p className="font-medieval text-2xl text-slate-300 leading-relaxed italic px-4">
                    "{character.quote}"
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-12">
                    <section>
                        <SectionHeader title="Physical Manifestation" onReroll={() => onReroll('appearance')} isLoading={isLoadingReroll === 'appearance'} />
                        <div className="grid grid-cols-2 gap-4 text-slate-300">
                            <div><span className="text-teal-500/60 uppercase text-[10px] font-bold block tracking-tighter">Height</span> {character.appearance.height}</div>
                            <div><span className="text-teal-500/60 uppercase text-[10px] font-bold block tracking-tighter">Build</span> {character.appearance.build}</div>
                            <div><span className="text-teal-500/60 uppercase text-[10px] font-bold block tracking-tighter">Hair</span> {character.appearance.hair}</div>
                            <div><span className="text-teal-500/60 uppercase text-[10px] font-bold block tracking-tighter">Eyes</span> {character.appearance.eyes}</div>
                            <div className="col-span-2 mt-2"><span className="text-teal-500/60 uppercase text-[10px] font-bold block tracking-tighter">Distinctive Marks</span> {character.appearance.distinguishingFeatures}</div>
                        </div>
                    </section>

                    <section>
                        <SectionHeader title="Soul & Spirit" onReroll={() => onReroll('personality')} isLoading={isLoadingReroll === 'personality'} />
                        <div className="space-y-4 text-slate-300">
                            <p><strong>Core Nature:</strong> {character.personality.traits.join(' • ')}</p>
                            <p><strong>Peculiarities:</strong> {character.personality.quirks.join(' • ')}</p>
                            <p><strong>Deepest Dread:</strong> {character.personality.fears.join(' • ')}</p>
                            <div><span className="text-teal-500/60 uppercase text-[10px] font-bold block tracking-tighter">Primary Drive</span> {character.personality.motivations}</div>
                        </div>
                    </section>

                    <section>
                        <SectionHeader title="Abilities of Legend" onReroll={() => onReroll('abilities')} isLoading={isLoadingReroll === 'abilities'} />
                        <div className="space-y-4">
                            {character.abilities.map(ability => (
                                <div key={ability.name} className="p-3 bg-teal-500/5 border border-teal-500/10 rounded-xl">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-teal-300 font-bold">{ability.name}</span>
                                        <span className="text-[10px] uppercase font-black text-teal-600 bg-teal-500/10 px-2 py-0.5 rounded">{ability.rarity}</span>
                                    </div>
                                    <p className="text-xs text-slate-400">{ability.effect}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="space-y-12">
                    <section>
                        <SectionHeader title="The Chronicle (Backstory)" onReroll={() => onReroll('backstory')} isLoading={isLoadingReroll === 'backstory'} />
                        <p className="text-slate-300 text-sm leading-relaxed first-letter:text-4xl first-letter:font-cinzel first-letter:text-teal-400 first-letter:mr-1">
                            {character.backstory}
                        </p>
                    </section>

                    <section>
                        <SectionHeader title="Web of Connections" onReroll={() => onReroll('relationships')} isLoading={isLoadingReroll === 'relationships'} />
                        <div className="space-y-3">
                            {character.relationships.map(rel => (
                                <div key={rel.name} className="text-sm">
                                    <span className="text-amber-200 font-medieval text-lg">{rel.name}</span>
                                    <span className="text-[10px] text-slate-500 uppercase ml-2 tracking-widest">{rel.role}</span>
                                    <p className="text-slate-400 italic text-xs">{rel.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <SectionHeader title="Arcane Attributes" />
                        <div className="grid grid-cols-3 gap-3">
                            {Object.entries(character.export.rpgStats).map(([stat, val]) => (
                                <div key={stat} className="flex flex-col items-center justify-center p-3 bg-slate-800/50 rounded-xl border border-teal-500/10 group hover:border-teal-500/30 transition-all">
                                    <span className="text-[10px] text-teal-600 font-black uppercase tracking-tighter group-hover:text-teal-400">{stat}</span>
                                    <span className="text-2xl font-cinzel font-black text-white">{val as number}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            <div className="mt-16 pt-8 border-t border-teal-500/20 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                    <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest block mb-2">Artistic Visualization Prompt</span>
                    <p className="text-[10px] text-slate-500 font-mono bg-black/30 p-4 rounded-lg border border-white/5 max-w-xl">
                        {character.export.imagePrompt}
                    </p>
                </div>
                <button 
                    onClick={onGenerateVariant} 
                    className="w-full md:w-auto font-cinzel text-xl px-12 py-4 bg-teal-600 hover:bg-teal-500 text-white rounded-full shadow-lg shadow-teal-500/20 transition-all active:scale-95 whitespace-nowrap"
                >
                    Forge a Variant Path
                </button>
            </div>
        </div>
    );
};

export default CharacterDossier;
