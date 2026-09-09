import React, { useEffect } from 'react';
import { DistrictId } from '../../types';
import { DISTRICTS_DATA } from '../../data/districtsData';
import { gtaAudio } from '../../utils/audio';
import { Sparkles } from 'lucide-react';

interface ContextualInteractPromptProps {
  currentDistrict: DistrictId;
  onInteract: () => void;
}

export const ContextualInteractPrompt: React.FC<ContextualInteractPromptProps> = ({
  currentDistrict,
  onInteract,
}) => {
  const district = DISTRICTS_DATA[currentDistrict] || DISTRICTS_DATA['player_hq'];
  const interactable = district.interactableObject;

  // Listen for 'E' or 'e' key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      const isTyping = activeTag === 'input' || activeTag === 'textarea';

      if (!isTyping && (e.key === 'e' || e.key === 'E')) {
        e.preventDefault();
        gtaAudio.playInteract();
        onInteract();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onInteract]);

  return (
    <div className="fixed bottom-14 left-1/2 -translate-x-1/2 z-40 pointer-events-auto select-none animate-in fade-in duration-300">
      <button
        onClick={() => {
          gtaAudio.playInteract();
          onInteract();
        }}
        className="bg-black/85 backdrop-blur-md border-2 border-pink-500 hover:border-pink-400 px-4 py-2 rounded shadow-[0_0_25px_rgba(236,0,140,0.7)] flex items-center gap-2.5 text-xs font-hud tracking-wider transition-all transform hover:scale-105 active:scale-95 cursor-pointer group"
      >
        <div className="px-2 py-0.5 bg-pink-600 text-white font-black rounded border border-pink-300 shadow group-hover:bg-pink-500">
          [ {interactable.actionKey} ]
        </div>
        <div className="text-left">
          <div className="text-white font-bold group-hover:text-pink-300 transition-colors">
            {interactable.name.toUpperCase()}
          </div>
          <div className="text-[10px] text-pink-400 font-mono">
            {interactable.prompt}
          </div>
        </div>
      </button>
    </div>
  );
};
