import React from 'react';
import { ProjectVault } from '../Projects/ProjectVault';

interface WorkPageProps {
  onBack?: () => void;
  onGoHome?: () => void;
  initialProjectSlug?: string;
  onNavigate?: (route: string) => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({
  onBack,
  onGoHome,
  initialProjectSlug,
  onNavigate,
}) => {
  return (
    <ProjectVault
      onBack={onBack}
      onGoHome={onGoHome}
      initialSelectedSlug={initialProjectSlug}
      onNavigate={onNavigate}
    />
  );
};
