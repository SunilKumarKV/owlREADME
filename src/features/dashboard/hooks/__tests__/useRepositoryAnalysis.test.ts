import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRepositoryAnalysis } from '../../hooks/useRepositoryAnalysis';
import useReadmeStore from '@/stores/readme-store';
import type { RepoAnalysisResult } from '@/stores/readme-store';

const MOCK_ANALYSIS: RepoAnalysisResult = {
  languages: [{ name: 'TypeScript', count: 5 }],
  topStarred: [
    { name: 'awesome-project', stars: 42, description: 'My best project', url: 'https://github.com/user/awesome-project' },
    { name: 'second-project', stars: 10, description: 'Another one', url: 'https://github.com/user/second-project' },
  ],
  topActive: [],
  suggestedSkills: ['TypeScript', 'React', 'Docker'],
  suggestedTechStack: ['TypeScript', 'React'],
  suggestedReadmeSections: [],
  totalStars: 52,
  totalForks: 3,
};

describe('useRepositoryAnalysis', () => {
  beforeEach(() => {
    useReadmeStore.getState().reset();
    vi.clearAllMocks();
  });

  it('applySuggestedSkills does nothing when repoAnalysis is null', () => {
    const addNotification = vi.fn();
    const { result } = renderHook(() =>
      useRepositoryAnalysis({ addNotification, repoAnalysis: null })
    );

    act(() => {
      result.current.applySuggestedSkills();
    });

    expect(addNotification).not.toHaveBeenCalled();
    expect(useReadmeStore.getState().skills).toBe('');
  });

  it('applySuggestedSkills sets skills and fires notification', () => {
    const addNotification = vi.fn();
    const { result } = renderHook(() =>
      useRepositoryAnalysis({ addNotification, repoAnalysis: MOCK_ANALYSIS })
    );

    act(() => {
      result.current.applySuggestedSkills();
    });

    expect(useReadmeStore.getState().skills).toBe('TypeScript, React, Docker');
    expect(addNotification).toHaveBeenCalledWith('Suggested skills applied to your profile README!');
  });

  it('applySuggestedProjects does nothing when repoAnalysis is null', () => {
    const addNotification = vi.fn();
    const { result } = renderHook(() =>
      useRepositoryAnalysis({ addNotification, repoAnalysis: null })
    );

    act(() => {
      result.current.applySuggestedProjects();
    });

    expect(addNotification).not.toHaveBeenCalled();
    expect(useReadmeStore.getState().projects).toBe('');
  });

  it('applySuggestedProjects formats top starred repos as markdown and fires notification', () => {
    const addNotification = vi.fn();
    const { result } = renderHook(() =>
      useRepositoryAnalysis({ addNotification, repoAnalysis: MOCK_ANALYSIS })
    );

    act(() => {
      result.current.applySuggestedProjects();
    });

    const projects = useReadmeStore.getState().projects;
    expect(projects).toContain('awesome-project');
    expect(projects).toContain('https://github.com/user/awesome-project');
    expect(projects).toContain('⭐ 42');
    expect(addNotification).toHaveBeenCalledWith('Starred projects applied to your profile README!');
  });

  it('returns stable function references on re-render', () => {
    const addNotification = vi.fn();
    const { result, rerender } = renderHook(() =>
      useRepositoryAnalysis({ addNotification, repoAnalysis: MOCK_ANALYSIS })
    );

    const first = result.current.applySuggestedSkills;
    rerender();
    expect(result.current.applySuggestedSkills).toBe(first);
  });
});
