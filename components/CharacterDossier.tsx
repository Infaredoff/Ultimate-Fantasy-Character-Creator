
import React from 'react';
import { Character, RerollableSection } from '../types';

interface CharacterDossierProps {
    character: Character;
    onReroll: (section: RerollableSection) => void;
    onDelete: () => void;
    isLoadingReroll: RerollableSection | null;
}

const CharacterDossier: React.FC<CharacterDossierProps> = ({ character, onReroll, onDelete, isLoadingReroll }) => {
    return (
        <div className="dossier-card p-6 md:p-10 rounded-3xl border border-white/5 mb-12 animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
                <button onClick={onDelete} className="text-gray-500 hover:text-red-400 transition-colors text-sm">Dismiss</button>
            </div>
            
            <header className="mb-8">
                <div className="flex flex-col md:flex-row md:items-end gap-4 mb-4">
                    <h2 className="font-cinzel text-4xl md:text-6xl font-black text-glow-gold tracking-tight">{character.name}</h2>
                    <span className="font-medieval text-xl text-amber-500/80 mb-1">{character.race} {character.characterClass}</span>
                </div>
                <p className="font-medieval text-2xl text-slate-400 italic">"{character.quote}"</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-10">
                    <section>
                        <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                            <h3 className="font-cinzel text-xl text-cyan-400 uppercase tracking-widest">The Narrative Path</h3>
                            <button onClick={() => onReroll('backstory')} className="text-xs text-slate-500 hover:text-cyan-400">[ Reroll History ]</button>
                        </div>
                        <p className="text-slate-300 leading-relaxed first-letter:text-4xl first-letter:font-cinzel first-letter:mr-2">{character.backstory}</p>
                    </section>

                    <section className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-cinzel text-lg text-amber-400 mb-3 uppercase underline decoration-amber-500/30">The Mask</h4>
                            <p className="text-sm text-slate-400">{character.personality.theMask}</p>
                        </div>
                        <div>
                            <h4 className="font-cinzel text-lg text-red-400 mb-3 uppercase underline decoration-red-500/30">The Burden</h4>
                            <p className="text-sm text-slate-400 italic">"{character.personality.deepSecret}"</p>
                        </div>
                    </section>

                    <section>
                        <h3 className="font-cinzel text-xl text-cyan-400 mb-4 uppercase border-b border-white/10 pb-2">Gifts of the Arcane</h3>
                        <div className="grid gap-4">
                            {character.abilities.map(ab => (
                                <div key={ab.name} className="p-4 bg-white/5 rounded-xl border border-white/5 group hover:border-cyan-500/20 transition-all">
                                    <div className="flex justify-between mb-1">
                                        <span className="font-bold text-cyan-200">{ab.name}</span>
                                        <span className="text-[10px] uppercase tracking-tighter text-slate-500">{ab.rarity}</span>
                                    </div>
                                    <p className="text-xs text-slate-400">{ab.effect}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="space-y-10 bg-black/20 p-6 rounded-2xl border border-white/5">
                    <section>
                        <h3 className="font-cinzel text-lg text-amber-500 mb-4 uppercase">Essence</h3>
                        <div className="space-y-4 text-sm text-slate-300">
                            <div><span className="text-slate-500 uppercase text-[10px] block">Aura & Scent</span>{character.appearance.sensoryDetail}</div>
                            <div><span className="text-slate-500 uppercase text-[10px] block">Build</span>{character.appearance.build} ({character.appearance.height})</div>
                            <div><span className="text-slate-500 uppercase text-[10px] block">Markings</span>{character.appearance.distinguishingFeatures}</div>
                        </div>
                    </section>

                    <section>
                        <h3 className="font-cinzel text-lg text-amber-500 mb-4 uppercase">Aura Attributes</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {Object.entries(character.export.rpgStats).map(([k, v]) => (
                                <div key={k} className="flex justify-between p-2 bg-white/5 rounded border border-white/5">
                                    <span className="text-[10px] text-slate-500 font-bold">{k}</span>
                                    <span className="font-cinzel text-amber-400">{v as number}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h3 className="font-cinzel text-lg text-amber-500 mb-4 uppercase">Tethers</h3>
                        <div className="space-y-3">
                            {character.relationships.map(rel => (
                                <div key={rel.name} className="text-xs">
                                    <div className="flex justify-between text-slate-200 font-bold mb-1">
                                        <span>{rel.name}</span>
                                        <span className="text-slate-500 italic">{rel.role}</span>
                                    </div>
                                    <p className="text-slate-500 leading-tight">{rel.dynamic}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
            
            <footer className="mt-12 pt-6 border-t border-white/10 text-center">
                <span className="text-[10px] uppercase text-slate-600 tracking-widest font-bold">Dreamt into existence by Gemini Pro</span>
            </footer>
        </div>
    );
};

export default CharacterDossier;
