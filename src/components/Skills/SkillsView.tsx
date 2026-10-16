import React from 'react';
import { SectionId } from '../../types';
import { SkillsPage } from './SkillsPage';

interface SkillsViewProps {
  onSelectSection?: (section: SectionId) => void;
}

export const SkillsView: React.FC<SkillsViewProps> = ({ onSelectSection }) => {
  return (
    <div className="relative w-full min-h-screen">
      <SkillsPage onBack={onSelectSection ? () => onSelectSection('start') : undefined} />
    </div>
  );
};
