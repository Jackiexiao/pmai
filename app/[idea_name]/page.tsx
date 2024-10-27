'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
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
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-pulse text-2xl text-gray-400">生成画布中...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 pb-2 border-b border-gray-200">
        {decodedIdeaName} 的商业画布
      </h1>
      <BusinessCanvas idea={decodedIdeaName} data={canvas} />
    </div>
  );
}
