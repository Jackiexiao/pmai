'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import BusinessCanvas from '../components/BusinessCanvas';

type CanvasData = {
  [key: string]: Array<{ point: string, content: string }>;
};

export default function IdeaPage() {
  const params = useParams();
  const [canvas, setCanvas] = useState<CanvasData | null>(null);
  const [decodedIdeaName, setDecodedIdeaName] = useState<string>('');

  useEffect(() => {
    const decoded = decodeURIComponent(params.idea_name as string);
    setDecodedIdeaName(decoded);

    const storedCanvas = localStorage.getItem(`canvas_${params.idea_name}`);
    if (storedCanvas) {
      setCanvas(JSON.parse(storedCanvas));
    } else {
      const fetchCanvas = async () => {
        const response = await fetch(`/api/generate-canvas?idea=${params.idea_name}`);
        const data = await response.json();
        setCanvas(data.canvas);
        localStorage.setItem(`canvas_${params.idea_name}`, JSON.stringify(data.canvas));
      };
      fetchCanvas();
    }
  }, [params.idea_name]);

  if (!canvas) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl text-white"
        >
          生成画布中...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <h1 className="text-4xl font-bold mb-8 pb-2 border-b border-gray-700">
          {decodedIdeaName} 的商业画布
        </h1>
        <BusinessCanvas idea={decodedIdeaName} data={canvas} />
      </motion.div>
    </div>
  );
}
