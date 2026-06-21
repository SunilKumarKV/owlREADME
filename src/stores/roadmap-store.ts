import create from 'zustand';
import { persist } from 'zustand/middleware';

interface RoadmapState {
  title: string;
  steps: string[];
  setField: (field: keyof RoadmapState, value: any) => void;
}

const useRoadmapStore = create<persist<RoadmapState>>(persist(
  (set) => ({
    title: '',
    steps: [],
    setField: (field, value) => set({ [field]: value }),
  }),
  {
    name: 'roadmap-store',
  }
));

export default useRoadmapStore;