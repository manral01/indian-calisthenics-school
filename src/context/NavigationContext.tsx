import { createContext, useContext, useState } from 'react';

export type TrainingType = 'calisthenics' | 'kids' | null;

interface NavState {
  trainingPage: TrainingType;
  goToTraining: (type: TrainingType) => void;
  goHome: () => void;
}

const NavigationContext = createContext<NavState>({
  trainingPage: null,
  goToTraining: () => {},
  goHome: () => {},
});

export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
  const [trainingPage, setTrainingPage] = useState<TrainingType>(null);

  const goToTraining = (type: TrainingType) => {
    setTrainingPage(type);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    setTrainingPage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <NavigationContext.Provider value={{ trainingPage, goToTraining, goHome }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);
