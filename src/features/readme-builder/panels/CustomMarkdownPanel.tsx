import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Textarea from '@/components/Textarea';
import { ArrowUp, ArrowDown, Copy, Trash2, Eye, Edit, ChevronDown, ChevronUp } from 'lucide-react';

const MarkdownPreview = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default.Markdown),
  { ssr: false }
);

export interface CustomMarkdownPanelProps {
  sectionId: string;
  title: string;
  setTitle: (val: string) => void;
  content: string;
  setContent: (val: string) => void;
  enabled: boolean;
  setEnabled: (val: boolean) => void;
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
}

export const CustomMarkdownPanel: React.FC<CustomMarkdownPanelProps> = ({
  sectionId,
  title,
  setTitle,
  content,
  setContent,
  enabled,
  setEnabled,
  collapsed,
  setCollapsed,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onDelete,
}) => {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  return (
    <div key={sectionId} className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm overflow-hidden select-none">
      {/* Panel Header */}
      <div className="px-4 py-3 bg-gray-50/50 dark:bg-[#151518] flex items-center justify-between gap-4 border-b border-gray-150 dark:border-gray-800 flex-wrap">
        <div className="flex items-center gap-3 flex-1 min-w-[200px]">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            className="rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
            aria-label={`Toggle ${title} section`}
          />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="font-bold text-xs bg-transparent border-b border-transparent hover:border-gray-300 dark:hover:border-gray-700 focus:border-blue-500 focus:outline-none text-black dark:text-white py-0.5 px-1 rounded transition max-w-[250px] w-full"
            placeholder="Section Title"
            aria-label="Section title edit"
          />
        </div>

        {/* Panel Actions */}
        <div className="flex items-center gap-1">
          {onMoveUp && (
            <button
              type="button"
              onClick={onMoveUp}
              title="Move Section Up"
              className="p-1.5 rounded hover:bg-gray-150 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-pointer"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          )}
          {onMoveDown && (
            <button
              type="button"
              onClick={onMoveDown}
              title="Move Section Down"
              className="p-1.5 rounded hover:bg-gray-150 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-pointer"
            >
              <ArrowDown className="h-3.5 w-3.5" />
            </button>
          )}
          {onDuplicate && (
            <button
              type="button"
              onClick={onDuplicate}
              title="Duplicate Section"
              className="p-1.5 rounded hover:bg-gray-150 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-pointer"
            >
              <Copy className="h-3.5 w-3.5" />
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              title="Delete Section"
              className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? 'Expand Section' : 'Collapse Section'}
            className="p-1.5 rounded hover:bg-gray-150 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-pointer ml-1"
          >
            {collapsed ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronUp className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Panel Content (only visible when enabled and expanded) */}
      {enabled && !collapsed && (
        <div className="p-4 space-y-4">
          {/* Tab Selector */}
          <div className="flex border-b border-gray-150 dark:border-gray-800">
            <button
              type="button"
              onClick={() => setActiveTab('edit')}
              className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider border-b-2 cursor-pointer transition flex items-center gap-1 ${
                activeTab === 'edit'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-655'
              }`}
            >
              <Edit className="h-3 w-3" />
              Write
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider border-b-2 cursor-pointer transition flex items-center gap-1 ${
                activeTab === 'preview'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-655'
              }`}
            >
              <Eye className="h-3 w-3" />
              Preview
            </button>
          </div>

          {/* Form Editor tab */}
          {activeTab === 'edit' && (
            <div className="space-y-1">
              <label className="block text-[10px] font-bold uppercase text-gray-400 tracking-wider">Custom Markdown Content</label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Type any custom markdown, Mermaid diagrams, or HTML blocks here..."
                rows={8}
                className="font-mono text-2xs leading-relaxed"
              />
            </div>
          )}

          {/* Live Preview tab */}
          {activeTab === 'preview' && (
            <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-gray-50/20 dark:bg-black/10 overflow-x-auto min-h-36 custom-editor-scrollbar">
              {content.trim() ? (
                <div className="prose dark:prose-invert max-w-none text-xs">
                  <MarkdownPreview source={content} />
                </div>
              ) : (
                <p className="text-2xs text-gray-400 italic">Nothing to preview. Enter markdown content in the write tab.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomMarkdownPanel;
