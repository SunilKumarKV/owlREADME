"use client";

import React, { useState } from 'react';
import Button from '@/components/Button';
import Input from '@/components/Input';

const GitHubUsernameInput: React.FC = () => {
  const [username, setUsername] = useState('');

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-[#1e1e1e]">
      <h1 className="text-4xl font-bold text-black dark:text-white mb-8">Enter your GitHub username</h1>
      <Input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Your GitHub Username"
        className="mb-4"
      />
      <Button href={`/readme-builder?username=${username}`} disabled={!username} variant="primary">Start Building README</Button>
    </div>
  );
};

export default GitHubUsernameInput;