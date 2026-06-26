"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { GitHubIcon } from '@/components/Icons';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Layout,
  Code,
  FileCode,
  LineChart,
  Grid,
  Shield,
  HelpCircle,
  Menu,
  X,
  CheckCircle,
  FileDown
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [activePreviewTab, setActivePreviewTab] = useState<'readme' | 'roadmap' | 'themes'>('readme');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleStartBuilding = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      router.push(`/dashboard?username=${encodeURIComponent(username.trim())}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-300 overflow-hidden relative">
      
      {/* Background Animated Glow Bubbles */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl pointer-events-none animate-glow-bubble-1" />
      <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl pointer-events-none animate-glow-bubble-2" />
      <div className="absolute bottom-20 left-1/3 w-80 h-80 rounded-full bg-green-500/10 blur-3xl pointer-events-none animate-glow-bubble-3" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-black/60 backdrop-blur-md border-b border-gray-100 dark:border-gray-900 transition-colors">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="p-2 bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              OwlRoadmap
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-gray-600 dark:text-gray-400">
            <a href="#features" className="hover:text-blue-500 dark:hover:text-blue-400 transition">Features</a>
            <a href="#templates" className="hover:text-blue-500 dark:hover:text-blue-400 transition">Templates</a>
            <a href="#how-it-works" className="hover:text-blue-500 dark:hover:text-blue-400 transition">How it Works</a>
            <a href="#faq" className="hover:text-blue-500 dark:hover:text-blue-400 transition">FAQ</a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-3">
            <Button href="/dashboard" variant="secondary" className="text-xs py-1.5">
              Open Dashboard
            </Button>
            <Button
              href="#hero-form"
              variant="primary"
              className="text-xs py-1.5"
            >
              Start Building
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-500 dark:text-gray-400 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-2 pb-6 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-900 animate-fade-in flex flex-col space-y-4">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="font-semibold text-gray-600 dark:text-gray-400"
            >
              Features
            </a>
            <a
              href="#templates"
              onClick={() => setMobileMenuOpen(false)}
              className="font-semibold text-gray-600 dark:text-gray-400"
            >
              Templates
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="font-semibold text-gray-600 dark:text-gray-400"
            >
              How it Works
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="font-semibold text-gray-600 dark:text-gray-400"
            >
              FAQ
            </a>
            <hr className="border-gray-100 dark:border-gray-900" />
            <div className="flex flex-col gap-2">
              <Button
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                variant="secondary"
                className="w-full text-center"
              >
                Open Dashboard
              </Button>
              <Button
                href="#hero-form"
                onClick={() => setMobileMenuOpen(false)}
                variant="primary"
                className="w-full text-center"
              >
                Start Building
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Main Body */}
      <main className="flex-1">

        {/* Hero Section */}
        <section id="hero" className="max-w-4xl mx-auto px-4 py-20 text-center space-y-8 z-10 relative">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold border border-blue-100 dark:border-blue-900/30">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Introducing OwlRoadmap SaaS 0.1.0</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-none bg-gradient-to-r from-gray-900 via-blue-950 to-purple-950 dark:from-white dark:via-blue-100 dark:to-purple-200 bg-clip-text text-transparent">
            Your Developer Portfolio, <br />
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Automated in Seconds.</span>
          </h1>

          <p className="text-gray-500 dark:text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Instantly create professional developer profile READMEs, customize step-by-step learning roadmaps, and track repository metrics in a unified local developer workspace.
          </p>

          {/* GitHub Onboarding input box */}
          <form
            id="hero-form"
            onSubmit={handleStartBuilding}
            className="flex flex-col sm:flex-row items-center justify-center max-w-md mx-auto gap-3 pt-4"
          >
            <div className="w-full relative">
              <label htmlFor="hero-github-username" className="sr-only">GitHub Username</label>
              <Input
                id="hero-github-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter GitHub username"
                className="text-center sm:text-left h-11 pr-4 shadow-sm"
              />
            </div>
            <Button
              type="submit"
              disabled={!username.trim()}
              variant="primary"
              className="w-full sm:w-auto h-11 shrink-0 px-6 font-bold shadow-md shadow-blue-500/10"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Get Started
            </Button>
          </form>

          {/* Alternative triggers & social badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400 pt-2">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-green-500" /> Free & Open Source
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-green-500" /> Offline Local Caching
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-green-500" /> Zero DB setup required
            </span>
          </div>
        </section>

        {/* Feature grid Section */}
        <section id="features" className="max-w-6xl mx-auto px-4 py-24 border-t border-gray-100 dark:border-gray-900/50">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight">Everything you need to showcase your skills</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              We leverage public data and light local workspace models to synthesize portfolios instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: README Builder */}
            <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700 transition duration-300">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 text-blue-500 rounded-xl w-fit mb-5">
                <Layout className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">README Profile Builder</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Generate markdown profiles configured dynamically with star counts, primary languages, locations, and social badges.
              </p>
            </div>

            {/* Card 2: Roadmap timeline builder */}
            <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700 transition duration-300">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 text-blue-500 rounded-xl w-fit mb-5">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Roadmap Curriculum</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Map custom step-by-step learning roadmap timelines using built-in pre-fills or completely blank templates.
              </p>
            </div>

            {/* Card 3: GitHub syncing */}
            <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700 transition duration-300">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 text-blue-500 rounded-xl w-fit mb-5">
                <Code className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">GitHub Repository Sync</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Seamlessly read public repository languages, stars, updates, and structures to sync content suggestions automatically.
              </p>
            </div>

            {/* Card 4: AI helper */}
            <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700 transition duration-300">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 text-blue-500 rounded-xl w-fit mb-5">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Owl AI Assistant</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Consult server-secured AI flash models to improve bios, compile core skill listings, and propose learning paths.
              </p>
            </div>

            {/* Card 5: SVG analytics */}
            <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700 transition duration-300">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 text-blue-500 rounded-xl w-fit mb-5">
                <LineChart className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Interactive Analytics</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Visualize language distributions, export history frequencies, and active timelines in custom, themeable SVG graphs.
              </p>
            </div>

            {/* Card 6: Project workspaces */}
            <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700 transition duration-300">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 text-blue-500 rounded-xl w-fit mb-5">
                <Grid className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Workspace Manager</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Manage multiple projects simultaneously with debounced local auto-saving, duplication, and workspace renaming actions.
              </p>
            </div>
          </div>
        </section>

        {/* Templates Showcase Section */}
        <section id="templates" className="max-w-6xl mx-auto px-4 py-24 border-t border-gray-100 dark:border-gray-900/50">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            
            {/* Description side */}
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center space-x-1 px-3 py-1 bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 rounded-full text-xs font-bold border border-purple-100 dark:border-purple-900/30">
                <span>Showcase</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight">Flexible design configurations to match your personal brand</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                OwlRoadmap includes diverse presets for templates, timelines, and style rendering. Instantly apply, test, and swap designs on the fly.
              </p>

              {/* Sub-tabs selector for preview showcase */}
              <div role="tablist" className="flex bg-gray-100 dark:bg-black/30 p-1 rounded-lg text-xs font-semibold w-fit">
                <button
                  role="tab"
                  aria-selected={activePreviewTab === 'readme'}
                  onClick={() => setActivePreviewTab('readme')}
                  className={`px-4 py-1.5 rounded-md transition cursor-pointer ${
                    activePreviewTab === 'readme' ? 'bg-white dark:bg-gray-800 text-blue-500 shadow-sm' : 'text-gray-500'
                  }`}
                >
                  README styles
                </button>
                <button
                  role="tab"
                  aria-selected={activePreviewTab === 'roadmap'}
                  onClick={() => setActivePreviewTab('roadmap')}
                  className={`px-4 py-1.5 rounded-md transition cursor-pointer ${
                    activePreviewTab === 'roadmap' ? 'bg-white dark:bg-gray-800 text-blue-500 shadow-sm' : 'text-gray-500'
                  }`}
                >
                  Roadmap structures
                </button>
                <button
                  role="tab"
                  aria-selected={activePreviewTab === 'themes'}
                  onClick={() => setActivePreviewTab('themes')}
                  className={`px-4 py-1.5 rounded-md transition cursor-pointer ${
                    activePreviewTab === 'themes' ? 'bg-white dark:bg-gray-800 text-blue-500 shadow-sm' : 'text-gray-500'
                  }`}
                >
                  Workspace themes
                </button>
              </div>
            </div>

            {/* Interactive Preview Cards Column */}
            <div className="flex-1 w-full max-w-md">
              <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-md p-6 min-h-[300px] flex flex-col justify-between">
                {activePreviewTab === 'readme' && (
                  <div className="space-y-4 animate-fade-in">
                    <span className="text-[10px] uppercase font-bold text-gray-400">Available Templates</span>
                    <div className="space-y-2">
                      <div className="p-3 border border-gray-100 dark:border-gray-800 rounded-lg flex items-center justify-between">
                        <span className="font-bold text-sm">Minimal</span>
                        <span className="text-xs text-gray-400">Clean details bio text layout</span>
                      </div>
                      <div className="p-3 border border-gray-100 dark:border-gray-800 rounded-lg flex items-center justify-between">
                        <span className="font-bold text-sm text-blue-500">Professional</span>
                        <span className="text-xs text-gray-400">Centered avatar & sections</span>
                      </div>
                      <div className="p-3 border border-gray-100 dark:border-gray-800 rounded-lg flex items-center justify-between">
                        <span className="font-bold text-sm">Developer</span>
                        <span className="text-xs text-gray-400">Highlighting technology stack</span>
                      </div>
                      <div className="p-3 border border-gray-100 dark:border-gray-800 rounded-lg flex items-center justify-between">
                        <span className="font-bold text-sm">Portfolio</span>
                        <span className="text-xs text-gray-400">Clean visual grid design</span>
                      </div>
                    </div>
                  </div>
                )}

                {activePreviewTab === 'roadmap' && (
                  <div className="space-y-4 animate-fade-in">
                    <span className="text-[10px] uppercase font-bold text-gray-400">Predefined Learning Paths</span>
                    <div className="space-y-2.5">
                      <div className="p-3 border border-gray-100 dark:border-gray-800 rounded-lg">
                        <span className="font-bold text-sm block">Frontend Developer</span>
                        <span className="text-[10px] text-gray-400">HTML/CSS, React hooks, build pipelines</span>
                      </div>
                      <div className="p-3 border border-gray-100 dark:border-gray-800 rounded-lg">
                        <span className="font-bold text-sm block text-blue-500">Backend Developer</span>
                        <span className="text-[10px] text-gray-400">REST APIs, database optimization, Redis, Docker</span>
                      </div>
                      <div className="p-3 border border-gray-100 dark:border-gray-800 rounded-lg">
                        <span className="font-bold text-sm block">DevOps Engineer</span>
                        <span className="text-[10px] text-gray-400">CI/CD automation, Kubernetes, Terraform cloud</span>
                      </div>
                    </div>
                  </div>
                )}

                {activePreviewTab === 'themes' && (
                  <div className="space-y-4 animate-fade-in">
                    <span className="text-[10px] uppercase font-bold text-gray-400">Interface Themes</span>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 border border-gray-200 dark:border-gray-800 bg-white rounded-xl text-center shadow-sm">
                        <span className="font-bold text-xs text-gray-800 block">Minimal</span>
                        <span className="text-[10px] text-gray-400">Clean Light UI</span>
                      </div>
                      <div className="p-3 border border-gray-800 bg-[#121212] rounded-xl text-center text-white">
                        <span className="font-bold text-xs block">Dark</span>
                        <span className="text-[10px] text-gray-500">Soft Charcoal</span>
                      </div>
                      <div className="p-3 bg-gradient-to-r from-indigo-900 to-purple-900 rounded-xl text-center text-white">
                        <span className="font-bold text-xs block">Gradient</span>
                        <span className="text-[10px] text-indigo-300">Neon Purple Glow</span>
                      </div>
                      <div className="p-3 bg-black border border-[#39ff14]/30 rounded-xl text-center text-[#39ff14]">
                        <span className="font-bold text-xs block font-mono">Terminal</span>
                        <span className="text-[10px] text-[#1f8b0c] font-mono">Retro Monospace</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-xs text-gray-400">
                  <span>Configuration sets</span>
                  <Link href="/theme" className="text-blue-500 font-semibold hover:underline flex items-center gap-0.5">
                    Customize themes <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Screenshots Showcase cards Section */}
        <section id="screenshots" className="max-w-6xl mx-auto px-4 py-24 border-t border-gray-100 dark:border-gray-900/50">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight">Explore the developer workspace</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Take a visual tour through our pre-rendered builders, analytics console, and export suites.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Screenshot 1: Dashboard */}
            <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 group">
              <div className="p-5 border-b border-gray-100 dark:border-gray-900 flex justify-between items-center bg-gray-50 dark:bg-black/10">
                <span className="font-bold text-xs text-gray-600 dark:text-gray-300">Workspace Dashboard</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">Console</span>
              </div>
              <div className="p-6 h-52 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-1/3" />
                  <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/2" />
                </div>
                <div className="flex gap-2">
                  <div className="h-8 bg-blue-500/20 rounded-md w-24 border border-blue-500/10" />
                  <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded-md w-24" />
                </div>
              </div>
            </div>

            {/* Screenshot 2: Timeline Builder */}
            <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 group">
              <div className="p-5 border-b border-gray-100 dark:border-gray-900 flex justify-between items-center bg-gray-50 dark:bg-black/10">
                <span className="font-bold text-xs text-gray-600 dark:text-gray-300">Roadmap Curriculum Designer</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 font-bold uppercase tracking-wider">Editor</span>
              </div>
              <div className="p-6 h-52 flex flex-col justify-between">
                <div className="relative pl-6 space-y-4">
                  <div className="absolute left-1.5 top-2 bottom-2 w-0.5 bg-blue-500/30" />
                  <div className="flex items-center space-x-2">
                    <div className="h-3.5 w-3.5 rounded-full bg-blue-500 border-2 border-white dark:border-[#121212]" />
                    <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/2" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-3.5 w-3.5 rounded-full bg-blue-500 border-2 border-white dark:border-[#121212]" />
                    <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-2/3" />
                  </div>
                </div>
                <div className="h-8 bg-blue-500 text-white rounded-md w-full flex items-center justify-center font-bold text-xs">
                  Generate Roadmap
                </div>
              </div>
            </div>

            {/* Screenshot 3: Analytics */}
            <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 group">
              <div className="p-5 border-b border-gray-100 dark:border-gray-900 flex justify-between items-center bg-gray-50 dark:bg-black/10">
                <span className="font-bold text-xs text-gray-600 dark:text-gray-300">SVG Analytics Console</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider">Charts</span>
              </div>
              <div className="p-6 h-52 flex items-center justify-center">
                {/* Simulated Chart visual */}
                <div className="w-full max-w-[240px] flex items-end justify-between h-28 px-4 border-b border-gray-200 dark:border-gray-800 pb-1">
                  <div className="w-6 bg-blue-500/70 hover:bg-blue-500 rounded-t h-12 transition-all" />
                  <div className="w-6 bg-purple-500/70 hover:bg-purple-500 rounded-t h-20 transition-all" />
                  <div className="w-6 bg-green-500/70 hover:bg-green-500 rounded-t h-16 transition-all" />
                  <div className="w-6 bg-yellow-500/70 hover:bg-yellow-500 rounded-t h-24 transition-all" />
                </div>
              </div>
            </div>

            {/* Screenshot 4: Owl AI Assistant */}
            <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 group">
              <div className="p-5 border-b border-gray-100 dark:border-gray-900 flex justify-between items-center bg-gray-50 dark:bg-black/10">
                <span className="font-bold text-xs text-gray-600 dark:text-gray-300">Owl AI Recommendations</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider">AI</span>
              </div>
              <div className="p-6 h-52 flex flex-col justify-between">
                <div className="p-3 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100/30 dark:border-blue-900/20 rounded-xl space-y-1.5">
                  <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest block">Suggested Biography</span>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse" />
                </div>
                <div className="flex justify-end">
                  <div className="h-7 px-3 bg-blue-500 text-white font-bold text-[10px] rounded-md flex items-center justify-center">
                    Apply Suggestion
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="max-w-6xl mx-auto px-4 py-24 border-t border-gray-100 dark:border-gray-900/50">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight">Four simple steps to your new portfolio</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              No databases, no cloud accounts, no friction. Start building in under a minute.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-3 relative group">
              <div className="z-10 flex items-center justify-center h-12 w-12 rounded-2xl bg-blue-500 text-white font-bold text-lg shadow-md shadow-blue-500/20">
                1
              </div>
              <h3 className="font-bold text-base pt-2">Connect GitHub</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Type your GitHub username. We query the public API to fetch avatar urls, star counts, and language logs safely.
              </p>
            </div>

            <div className="space-y-3 relative group">
              <div className="z-10 flex items-center justify-center h-12 w-12 rounded-2xl bg-blue-500 text-white font-bold text-lg shadow-md shadow-blue-500/20">
                2
              </div>
              <h3 className="font-bold text-base pt-2">Generate README</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Select a style template (minimal, professional, developer) and customize description text fields, links, and featured repos.
              </p>
            </div>

            <div className="space-y-3 relative group">
              <div className="z-10 flex items-center justify-center h-12 w-12 rounded-2xl bg-blue-500 text-white font-bold text-lg shadow-md shadow-blue-500/20">
                3
              </div>
              <h3 className="font-bold text-base pt-2">Build Roadmap</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Add structured learning steps manually or choose template curricula. Get next-topic suggestions from Owl AI.
              </p>
            </div>

            <div className="space-y-3 relative group">
              <div className="z-10 flex items-center justify-center h-12 w-12 rounded-2xl bg-blue-500 text-white font-bold text-lg shadow-md shadow-blue-500/20">
                4
              </div>
              <h3 className="font-bold text-base pt-2">Export & Share</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Download raw markdown files, compile ZIP package bundles, print PDFs, or copy encoded public share URLs instantly.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="max-w-6xl mx-auto px-4 py-24 border-t border-gray-100 dark:border-gray-900/50">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight">Loved by developers worldwide</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              See what engineers are saying about their new automated portfolios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm space-y-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 italic leading-relaxed">
                "I compiled my portfolio README in 10 seconds. The GitHub repo analyzer calculated my language stats, and the layout looks incredibly sleek."
              </p>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-500 text-xs">
                  JD
                </div>
                <div>
                  <h4 className="font-bold text-xs">Jane Doe</h4>
                  <span className="text-[10px] text-gray-400">Full Stack Engineer</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm space-y-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 italic leading-relaxed">
                "Mapping learning curriculums with the Roadmap builder has kept our dev team completely aligned. We exported milestones into markdown sitemaps instantly."
              </p>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-500 text-xs">
                  AS
                </div>
                <div>
                  <h4 className="font-bold text-xs">Alex Smith</h4>
                  <span className="text-[10px] text-gray-400">DevOps Specialist</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm space-y-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 italic leading-relaxed">
                "The server-secure AI integration is brilliant. Owl AI suggested concrete adjustments to my profile biography and pinned projects that actually look professional."
              </p>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-500 text-xs">
                  TB
                </div>
                <div>
                  <h4 className="font-bold text-xs">Taylor Brown</h4>
                  <span className="text-[10px] text-gray-400">UI/UX Designer</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section id="faq" className="max-w-4xl mx-auto px-4 py-24 border-t border-gray-100 dark:border-gray-900/50">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight">Frequently Asked Questions</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Everything you need to know about the platform.
            </p>
          </div>

          <div className="space-y-4">
            <details className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-xl p-4 cursor-pointer group transition-colors duration-200">
              <summary className="font-bold text-sm flex justify-between items-center list-none select-none text-black dark:text-white">
                <span>Is it free?</span>
                <span className="text-blue-500 font-bold transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">
                Yes! OwlRoadmap is 100% free and open-source. All core builder workspaces run entirely inside your browser environment.
              </p>
            </details>

            <details className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-xl p-4 cursor-pointer group transition-colors duration-200">
              <summary className="font-bold text-sm flex justify-between items-center list-none select-none text-black dark:text-white">
                <span>Does it require a GitHub account?</span>
                <span className="text-blue-500 font-bold transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">
                No, you can skip username syncs entirely! Simply click "Open Dashboard" to create a blank workspace and write your README and roadmap curriculum manually.
              </p>
            </details>

            <details className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-xl p-4 cursor-pointer group transition-colors duration-200">
              <summary className="font-bold text-sm flex justify-between items-center list-none select-none text-black dark:text-white">
                <span>How is my developer data stored?</span>
                <span className="text-blue-500 font-bold transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">
                All data is saved locally inside your browser's Local Storage cache under secure workspace namespaces. No personal credentials or draft codes are ever uploaded to any database cloud servers.
              </p>
            </details>
          </div>
        </section>

      </main>

      {/* Footer Section */}
      <footer className="bg-white dark:bg-black border-t border-gray-100 dark:border-gray-900 py-12 px-4 transition-colors">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
            <Sparkles className="h-5 w-5 text-blue-500" />
            <span className="font-extrabold text-sm tracking-tight text-black dark:text-white">OwlRoadmap</span>
            <span className="text-xs">© 2026. MIT License.</span>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-xs font-semibold text-gray-500 dark:text-gray-400">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center gap-1"
            >
              <GitHubIcon className="h-4 w-4" /> GitHub Repository
            </a>
            <a href="#features" className="hover:text-blue-500 dark:hover:text-blue-400 transition">Documentation</a>
            <a href="#faq" className="hover:text-blue-500 dark:hover:text-blue-400 transition">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
