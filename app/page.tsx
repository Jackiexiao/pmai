'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (idea: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/generate-canvas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea }),
      });
      if (!response.ok) {
        throw new Error('Failed to generate canvas');
      }
      await response.json();
      router.push(`/${encodeURIComponent(idea)}`);
    } catch (err) {
      setError('生成失败，请重试。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">
          01MVP AI 商业画布生成器
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-md mx-auto mb-4">
          输入您的创业想法，让 AI 为您生成商业画布
        </p>
        <p className="text-sm md:text-base text-gray-400 max-w-lg mx-auto">
          Join fellow innovators to reimagine, reinvent, and transform product workflows with AI - empowering you to change the world.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-md"
      >
        <IdeaForm onSubmit={handleGenerate} loading={loading} />
      </motion.div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 mt-4 text-sm"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

const IdeaForm = ({ onSubmit, loading }: { onSubmit: (idea: string) => void; loading: boolean }) => {
  const [idea, setIdea] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim()) {
      onSubmit(idea);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative">
        <Input
          type="text"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="输入您的创业想法"
          className="w-full py-6 px-4 text-lg bg-white bg-opacity-10 backdrop-blur-md border-0 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-300"
          required
          aria-label="创业想法"
        />
        <Button 
          type="submit" 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full px-6 py-2 text-sm font-medium hover:bg-opacity-90 transition-all duration-300"
          disabled={loading}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : '生成'}
        </Button>
      </div>
    </form>
  );
};
