'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import IdeaInput from './components/IdeaInput';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (newIdea: string) => {
    setLoading(true);
    const response = await fetch('/api/generate-canvas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idea: newIdea }),
    });
    const data = await response.json();
    setLoading(false);
    router.push(`/${encodeURIComponent(newIdea)}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Business Canvas Generator</h1>
      <IdeaInput onGenerate={handleGenerate} />
      {loading && <div>Generating canvas...</div>}
    </div>
  );
}
