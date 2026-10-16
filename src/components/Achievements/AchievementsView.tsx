import React from 'react';
import { SectionId } from '../../types';
import { AchievementsPage } from './AchievementsPage';

interface AchievementsViewProps {
  onSelectSection: (section: SectionId) => void;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({ onSelectSection }) => {
  return <AchievementsPage onBack={() => onSelectSection('start')} />;
};
