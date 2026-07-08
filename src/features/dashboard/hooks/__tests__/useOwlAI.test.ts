import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useOwlAI } from '../../hooks/useOwlAI';
import useReadmeStore from '@/stores/readme-store';
import useRoadmapStore from '@/stores/roadmap-store';

// ── Mock AI service ────────────────────────────────────────────────────────────
const mockReadmeSugg = {
  introduction: 'Passionate developer',
  aboutMe: 'I love code.',
  skills: 'TypeScript, React',
  projects: '- [MyApp](https://github.com)',
};
const mockRoadmapSugg = {
  roadmapSteps: ['Learn TypeScript', 'Master React', 'Deploy on Cloud'],
};
const mockProfileSugg = {
  improvedBio: 'Building great software.',
  portfolioDescription: 'Portfolio of award-winning apps.',
};

const mockGenerateReadmeSuggestions = vi.fn().mockResolvedValue(mockReadmeSugg);
const mockGenerateRoadmapSuggestions = vi.fn().mockResolvedValue(mockRoadmapSugg);
const mockGenerateProfileSuggestions = vi.fn().mockResolvedValue(mockProfileSugg);

vi.mock('@/utils/ai/ai-service', () => ({
  getAIService: () => ({
    generateReadmeSuggestions: mockGenerateReadmeSuggestions,
    generateRoadmapSuggestions: mockGenerateRoadmapSuggestions,
    generateProfileSuggestions: mockGenerateProfileSuggestions,
  }),
}));

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeOptions() {
  return {
    setAiLoading: vi.fn(),
    setError: vi.fn(),
    addNotification: vi.fn(),
  };
}

describe('useOwlAI', () => {
  beforeEach(() => {
    useReadmeStore.getState().reset();
    useRoadmapStore.getState().reset();
    vi.clearAllMocks();
  });

  // ── handleConsultOwlAI — success ──────────────────────────────────────────

  it('handleConsultOwlAI calls all three AI generators on success', async () => {
    const opts = makeOptions();
    const { result } = renderHook(() => useOwlAI(opts));

    await act(async () => {
      await result.current.handleConsultOwlAI();
    });

    expect(mockGenerateReadmeSuggestions).toHaveBeenCalledTimes(1);
    expect(mockGenerateRoadmapSuggestions).toHaveBeenCalledTimes(1);
    expect(mockGenerateProfileSuggestions).toHaveBeenCalledTimes(1);
  });

  it('handleConsultOwlAI sets loading true then false', async () => {
    const opts = makeOptions();
    const { result } = renderHook(() => useOwlAI(opts));

    await act(async () => {
      await result.current.handleConsultOwlAI();
    });

    expect(opts.setAiLoading).toHaveBeenNthCalledWith(1, true);
    expect(opts.setAiLoading).toHaveBeenLastCalledWith(false);
  });

  it('handleConsultOwlAI stores suggestions and fires notification', async () => {
    const opts = makeOptions();
    const { result } = renderHook(() => useOwlAI(opts));

    await act(async () => {
      await result.current.handleConsultOwlAI();
    });

    const suggestions = useReadmeStore.getState().aiSuggestions;
    expect(suggestions?.readme).toEqual(mockReadmeSugg);
    expect(suggestions?.roadmap).toEqual(mockRoadmapSugg);
    expect(suggestions?.profile).toEqual(mockProfileSugg);
    expect(opts.addNotification).toHaveBeenCalledWith('Owl AI suggestions generated successfully!');
  });

  it('handleConsultOwlAI increments AI generation counter', async () => {
    const initialCount = useReadmeStore.getState().aiGenerationsCount;
    const opts = makeOptions();
    const { result } = renderHook(() => useOwlAI(opts));

    await act(async () => {
      await result.current.handleConsultOwlAI();
    });

    expect(useReadmeStore.getState().aiGenerationsCount).toBe(initialCount + 1);
  });

  // ── handleConsultOwlAI — failure ──────────────────────────────────────────

  it('handleConsultOwlAI sets error and does not crash on failure', async () => {
    mockGenerateReadmeSuggestions.mockRejectedValueOnce(new Error('Network error'));
    const opts = makeOptions();
    const { result } = renderHook(() => useOwlAI(opts));

    await act(async () => {
      await result.current.handleConsultOwlAI();
    });

    expect(opts.setError).toHaveBeenCalledWith('AI generation failed.');
    expect(opts.setAiLoading).toHaveBeenLastCalledWith(false);
  });

  // ── Apply helpers — null guard ────────────────────────────────────────────

  it('applyIntro does nothing when aiSuggestions is null', () => {
    const opts = makeOptions();
    const { result } = renderHook(() => useOwlAI(opts));

    act(() => {
      result.current.applyIntro();
    });

    expect(opts.addNotification).not.toHaveBeenCalled();
  });

  it('applyAboutMe does nothing when aiSuggestions is null', () => {
    const opts = makeOptions();
    const { result } = renderHook(() => useOwlAI(opts));

    act(() => {
      result.current.applyAboutMe();
    });

    expect(opts.addNotification).not.toHaveBeenCalled();
  });

  it('applySkills does nothing when aiSuggestions is null', () => {
    const opts = makeOptions();
    const { result } = renderHook(() => useOwlAI(opts));

    act(() => {
      result.current.applySkills();
    });

    expect(opts.addNotification).not.toHaveBeenCalled();
  });

  it('applyRoadmapSteps does nothing when aiSuggestions is null', () => {
    const opts = makeOptions();
    const { result } = renderHook(() => useOwlAI(opts));

    act(() => {
      result.current.applyRoadmapSteps();
    });

    expect(opts.addNotification).not.toHaveBeenCalled();
  });

  // ── Apply helpers — with data ─────────────────────────────────────────────

  it('applyIntro prepends AI introduction to existing about text', async () => {
    useReadmeStore.getState().setAbout('My original bio.');
    const opts = makeOptions();
    const { result } = renderHook(() => useOwlAI(opts));

    await act(async () => {
      await result.current.handleConsultOwlAI();
    });

    act(() => {
      result.current.applyIntro();
    });

    const about = useReadmeStore.getState().about;
    expect(about).toContain('Passionate developer');
    expect(about).toContain('My original bio.');
    expect(opts.addNotification).toHaveBeenCalledWith('AI Introduction appended to About Me!');
  });

  it('applyAboutMe replaces about with AI about text', async () => {
    const opts = makeOptions();
    const { result } = renderHook(() => useOwlAI(opts));

    await act(async () => {
      await result.current.handleConsultOwlAI();
    });

    act(() => {
      result.current.applyAboutMe();
    });

    expect(useReadmeStore.getState().about).toBe('I love code.');
    expect(opts.addNotification).toHaveBeenCalledWith('AI About Me set as profile description!');
  });

  it('applySkills sets skills from AI suggestions', async () => {
    const opts = makeOptions();
    const { result } = renderHook(() => useOwlAI(opts));

    await act(async () => {
      await result.current.handleConsultOwlAI();
    });

    act(() => {
      result.current.applySkills();
    });

    expect(useReadmeStore.getState().skills).toBe('TypeScript, React');
    expect(opts.addNotification).toHaveBeenCalledWith('AI Skills applied successfully!');
  });

  it('applyProjects sets projects from AI suggestions', async () => {
    const opts = makeOptions();
    const { result } = renderHook(() => useOwlAI(opts));

    await act(async () => {
      await result.current.handleConsultOwlAI();
    });

    act(() => {
      result.current.applyProjects();
    });

    expect(useReadmeStore.getState().projects).toBe('- [MyApp](https://github.com)');
    expect(opts.addNotification).toHaveBeenCalledWith('AI Projects markdown applied successfully!');
  });

  it('applyRoadmapSteps sets roadmap steps from AI suggestions', async () => {
    const opts = makeOptions();
    const { result } = renderHook(() => useOwlAI(opts));

    await act(async () => {
      await result.current.handleConsultOwlAI();
    });

    act(() => {
      result.current.applyRoadmapSteps();
    });

    expect(useRoadmapStore.getState().steps).toEqual(['Learn TypeScript', 'Master React', 'Deploy on Cloud']);
    expect(opts.addNotification).toHaveBeenCalledWith('AI learning steps applied to your roadmap!');
  });

  it('applyProfileBio sets about from AI profile bio', async () => {
    const opts = makeOptions();
    const { result } = renderHook(() => useOwlAI(opts));

    await act(async () => {
      await result.current.handleConsultOwlAI();
    });

    act(() => {
      result.current.applyProfileBio();
    });

    expect(useReadmeStore.getState().about).toBe('Building great software.');
    expect(opts.addNotification).toHaveBeenCalledWith('Improved Bio set to profile!');
  });

  it('applyPortfolioDescription sets about from AI portfolio description', async () => {
    const opts = makeOptions();
    const { result } = renderHook(() => useOwlAI(opts));

    await act(async () => {
      await result.current.handleConsultOwlAI();
    });

    act(() => {
      result.current.applyPortfolioDescription();
    });

    expect(useReadmeStore.getState().about).toBe('Portfolio of award-winning apps.');
    expect(opts.addNotification).toHaveBeenCalledWith('Portfolio tagline applied successfully!');
  });
});
