import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type RoadmapField = 'title' | 'steps' | 'template';

interface RoadmapState {
  title: string;
  steps: string[];
  template: string;
  setField: (field: RoadmapField, value: any) => void;
  setTemplate: (template: string) => void;
}

const useRoadmapStore = create<RoadmapState>()(
  persist(
    (set) => ({
      title: '',
      steps: [],
      template: '',
      setField: (field, value) => set({ [field]: value } as Partial<RoadmapState>),
      setTemplate: (template) => set({ template }),
    }),
    { name: 'roadmap-store' }
  )
);

export default useRoadmapStore;