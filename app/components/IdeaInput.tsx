'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function IdeaInput({ onGenerate }: { onGenerate: (idea: string) => void }) {
  const [idea, setIdea] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(idea);
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <Input
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="Enter your business idea"
      />
      <Button type="submit">Generate Canvas</Button>
    </form>
  );
}
