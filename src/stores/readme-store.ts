import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type READMEStyleTemplate = 'minimal' | 'professional' | 'developer' | 'open-source' | 'portfolio';

export interface ExportHistoryItem {
  id: string;
  timestamp: string;
  format: string;
  projectName: string;
}

export type READMEField =
  | 'name'
  | 'role'
  | 'about'
  | 'skills'
  | 'projects'
  | 'socials'
  | 'avatarUrl'
  | 'followers'
  | 'following'
  | 'publicRepos'
  | 'template'
  | 'readmeExportsCount'
  | 'templatesUsedCount';

interface READMEState {
  name: string;
  role: string;
  about: string;
  skills: string;
  projects: string;
  socials: string;
  avatarUrl: string;
  followers: number | undefined;
  following: number | undefined;
  publicRepos: number | undefined;
  template: READMEStyleTemplate;
  readmeExportsCount: number;
  templatesUsedCount: number;
  exportHistory: ExportHistoryItem[];
  setField: (field: READMEField, value: any) => void;
  setName: (value: string) => void;
  setRole: (value: string) => void;
  setAbout: (value: string) => void;
  setSkills: (value: string) => void;
  setProjects: (value: string) => void;
  setSocials: (value: string) => void;
  setAvatarUrl: (value: string) => void;
  setFollowers: (value: number | undefined) => void;
  setFollowing: (value: number | undefined) => void;
  setPublicRepos: (value: number | undefined) => void;
  setTemplate: (value: READMEStyleTemplate) => void;
  incrementReadmeExports: () => void;
  incrementTemplatesUsed: () => void;
  addExportHistoryItem: (format: string, projectName: string) => void;
  reset: () => void;
}

const useREADMEStore = create<READMEState>()(
  persist(
    (set) => ({
      name: '',
      role: '',
      about: '',
      skills: '',
      projects: '',
      socials: '',
      avatarUrl: '',
      followers: undefined,
      following: undefined,
      publicRepos: undefined,
      template: 'minimal',
      readmeExportsCount: 0,
      templatesUsedCount: 0,
      exportHistory: [],
      setField: (field, value) => set({ [field]: value } as Partial<READMEState>),
      setName: (value) => set({ name: value }),
      setRole: (value) => set({ role: value }),
      setAbout: (value) => set({ about: value }),
      setSkills: (value) => set({ skills: value }),
      setProjects: (value) => set({ projects: value }),
      setSocials: (value) => set({ socials: value }),
      setAvatarUrl: (value) => set({ avatarUrl: value }),
      setFollowers: (value) => set({ followers: value }),
      setFollowing: (value) => set({ following: value }),
      setPublicRepos: (value) => set({ publicRepos: value }),
      setTemplate: (value) => {
        set((state) => ({
          template: value,
          templatesUsedCount: state.templatesUsedCount + 1,
        }));
      },
      incrementReadmeExports: () => set((state) => ({ readmeExportsCount: state.readmeExportsCount + 1 })),
      incrementTemplatesUsed: () => set((state) => ({ templatesUsedCount: state.templatesUsedCount + 1 })),
      addExportHistoryItem: (format, projectName) =>
        set((state) => ({
          exportHistory: [
            {
              id: Math.random().toString(36).substring(2, 9),
              timestamp: new Date().toISOString(),
              format,
              projectName: projectName || 'Untitled Project',
            },
            ...(state.exportHistory || []),
          ].slice(0, 50),
        })),
      reset: () =>
        set({
          name: '',
          role: '',
          about: '',
          skills: '',
          projects: '',
          socials: '',
          avatarUrl: '',
          followers: undefined,
          following: undefined,
          publicRepos: undefined,
          template: 'minimal',
          readmeExportsCount: 0,
          templatesUsedCount: 0,
          exportHistory: [],
        }),
    }),
    { name: 'readme-store' }
  )
);

export default useREADMEStore;