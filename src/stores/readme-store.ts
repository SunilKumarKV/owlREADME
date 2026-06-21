import create from 'zustand';
import { persist } from 'zustand/middleware';

interface READMEState {
  name: string;
  role: string;
  about: string;
  skills: string;
  projects: string;
  socials: string;
  setField: (field: keyof READMEState, value: string) => void;
}

const useREADMEStore = create<persist<READMEState>>(persist(
  (set) => ({
    name: '',
    role: '',
    about: '',
    skills: '',
    projects: '',
    socials: '',
    setField: (field, value) => set({ [field]: value }),
  }),
  {
    name: 'readme-store',
  }
));

export default useREADMEStore;