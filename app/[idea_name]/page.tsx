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

  useEffect(() => {
    const storedCanvas = localStorage.getItem(`canvas_${params.idea_name}`);
    if (storedCanvas) {
      console.log('Canvas found in localStorage:', JSON.parse(storedCanvas));
      setCanvas(JSON.parse(storedCanvas));
    } else {
      const fetchCanvas = async () => {
        const response = await fetch(`/api/generate-canvas?idea=${params.idea_name}`);
        const data = await response.json();
        console.log('Canvas fetched from API:', data.canvas);
        setCanvas(data.canvas);
        localStorage.setItem(`canvas_${params.idea_name}`, JSON.stringify(data.canvas));
      };
      fetchCanvas();
    }
  }, [params.idea_name]);

  if (!canvas) {
    return <div>Generating canvas...</div>;
  }

  console.log('Rendering canvas:', canvas);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Business Canvas for: {params.idea_name}</h1>
      <BusinessCanvas idea={params.idea_name as string} data={canvas} />
    </div>
  );
}
