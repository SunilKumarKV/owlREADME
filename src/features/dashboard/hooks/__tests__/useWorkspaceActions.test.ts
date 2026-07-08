import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useWorkspaceActions } from '../../hooks/useWorkspaceActions';
import useWorkspaceStore from '@/stores/workspace-store';
import useReadmeStore from '@/stores/readme-store';
import useRoadmapStore from '@/stores/roadmap-store';
import useThemeStore from '@/stores/theme-store';

function makeOptions(overrides: Partial<Parameters<typeof useWorkspaceActions>[0]> = {}) {
  return {
    addNotification: vi.fn(),
    setIsCreateModalOpen: vi.fn(),
    setEditingWorkspaceId: vi.fn(),
    setConfirmDeleteId: vi.fn(),
    setNewProjectName: vi.fn(),
    newProjectName: 'My Project',
    newProjectType: 'readme' as const,
    editingName: 'Renamed Project',
    ...overrides,
  };
}

describe('useWorkspaceActions', () => {
  beforeEach(() => {
    useReadmeStore.getState().reset();
    useRoadmapStore.getState().reset();
    useThemeStore.setState({ theme: 'minimal', templatesUsedCount: 0 });
    useWorkspaceStore.setState({ workspaces: [], activeWorkspaceId: null });
  });

  // ── handleCreateWorkspace ──────────────────────────────────────────────────

  it('handleCreateWorkspace creates a workspace and fires notification', () => {
    const opts = makeOptions();
    const { result } = renderHook(() => useWorkspaceActions(opts));

    const fakeEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;
    act(() => {
      result.current.handleCreateWorkspace(fakeEvent);
    });

    expect(fakeEvent.preventDefault).toHaveBeenCalled();
    expect(useWorkspaceStore.getState().workspaces).toHaveLength(1);
    expect(useWorkspaceStore.getState().workspaces[0].name).toBe('My Project');
    expect(opts.setNewProjectName).toHaveBeenCalledWith('');
    expect(opts.setIsCreateModalOpen).toHaveBeenCalledWith(false);
    expect(opts.addNotification).toHaveBeenCalledWith(expect.stringContaining('My Project'));
  });

  it('handleCreateWorkspace does nothing when name is blank', () => {
    const opts = makeOptions({ newProjectName: '   ' });
    const { result } = renderHook(() => useWorkspaceActions(opts));

    const fakeEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;
    act(() => {
      result.current.handleCreateWorkspace(fakeEvent);
    });

    expect(useWorkspaceStore.getState().workspaces).toHaveLength(0);
    expect(opts.addNotification).not.toHaveBeenCalled();
  });

  // ── handleRenameSave ───────────────────────────────────────────────────────

  it('handleRenameSave renames workspace and closes editor', () => {
    const id = useWorkspaceStore.getState().createWorkspace('Old Name', 'readme');
    const opts = makeOptions({ editingName: 'New Name' });
    const { result } = renderHook(() => useWorkspaceActions(opts));

    act(() => {
      result.current.handleRenameSave(id);
    });

    const ws = useWorkspaceStore.getState().workspaces.find((w) => w.id === id);
    expect(ws?.name).toBe('New Name');
    expect(opts.setEditingWorkspaceId).toHaveBeenCalledWith(null);
    expect(opts.addNotification).toHaveBeenCalledWith('Project renamed successfully!');
  });

  it('handleRenameSave does nothing when editingName is blank', () => {
    const id = useWorkspaceStore.getState().createWorkspace('Original', 'readme');
    const opts = makeOptions({ editingName: '' });
    const { result } = renderHook(() => useWorkspaceActions(opts));

    act(() => {
      result.current.handleRenameSave(id);
    });

    const ws = useWorkspaceStore.getState().workspaces.find((w) => w.id === id);
    expect(ws?.name).toBe('Original');
    expect(opts.setEditingWorkspaceId).not.toHaveBeenCalled();
  });

  // ── handleDeleteWorkspace ──────────────────────────────────────────────────

  it('handleDeleteWorkspace removes the workspace', () => {
    const id = useWorkspaceStore.getState().createWorkspace('To Delete', 'readme');
    const opts = makeOptions();
    const { result } = renderHook(() => useWorkspaceActions(opts));

    act(() => {
      result.current.handleDeleteWorkspace(id);
    });

    expect(useWorkspaceStore.getState().workspaces).toHaveLength(0);
    expect(opts.setConfirmDeleteId).toHaveBeenCalledWith(null);
  });

  // ── handleDuplicateWorkspace ───────────────────────────────────────────────

  it('handleDuplicateWorkspace creates a copy of the workspace', () => {
    const id = useWorkspaceStore.getState().createWorkspace('Original', 'combined');
    const opts = makeOptions();
    const { result } = renderHook(() => useWorkspaceActions(opts));

    act(() => {
      result.current.handleDuplicateWorkspace(id);
    });

    expect(useWorkspaceStore.getState().workspaces).toHaveLength(2);
    expect(useWorkspaceStore.getState().workspaces[1].name).toBe('Original (Copy)');
  });

  // ── handleLoadWorkspace ────────────────────────────────────────────────────

  it('handleLoadWorkspace sets the workspace as active', () => {
    const id1 = useWorkspaceStore.getState().createWorkspace('WS 1', 'readme');
    const id2 = useWorkspaceStore.getState().createWorkspace('WS 2', 'roadmap');
    const opts = makeOptions();
    const { result } = renderHook(() => useWorkspaceActions(opts));

    act(() => {
      result.current.handleLoadWorkspace(id1);
    });

    expect(useWorkspaceStore.getState().activeWorkspaceId).toBe(id1);
    // Ensure the previous active workspace (id2) is no longer active
    expect(useWorkspaceStore.getState().activeWorkspaceId).not.toBe(id2);
  });

  // ── isReadmeType / isRoadmapType computed values ───────────────────────────

  it('isReadmeType is true for readme and combined workspace types', () => {
    useWorkspaceStore.getState().createWorkspace('Readme WS', 'readme');
    const opts = makeOptions();
    const { result } = renderHook(() => useWorkspaceActions(opts));
    expect(result.current.isReadmeType).toBe(true);
  });

  it('isRoadmapType is true for roadmap and combined workspace types', () => {
    useWorkspaceStore.getState().createWorkspace('Roadmap WS', 'roadmap');
    const opts = makeOptions();
    const { result } = renderHook(() => useWorkspaceActions(opts));
    expect(result.current.isRoadmapType).toBe(true);
  });

  it('isReadmeType and isRoadmapType are both true for combined type', () => {
    useWorkspaceStore.getState().createWorkspace('Both WS', 'combined');
    const opts = makeOptions();
    const { result } = renderHook(() => useWorkspaceActions(opts));
    expect(result.current.isReadmeType).toBe(true);
    expect(result.current.isRoadmapType).toBe(true);
  });

  it('defaults to true for both types when no active workspace exists', () => {
    const opts = makeOptions();
    const { result } = renderHook(() => useWorkspaceActions(opts));
    expect(result.current.isReadmeType).toBe(true);
    expect(result.current.isRoadmapType).toBe(true);
  });
});
