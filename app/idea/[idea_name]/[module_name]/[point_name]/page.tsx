'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

export default function PointPage() {
  const params = useParams();
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    console.log('Params:', params);
    const storedCanvas = localStorage.getItem(`canvas_${params.idea_name}`);
    if (storedCanvas) {
      const canvas = JSON.parse(storedCanvas);
      console.log('Stored canvas:', canvas);
      console.log('Looking for module:', params.module_name);
      console.log('Looking for point:', params.point_name);
      const pointData = canvas[params.module_name as string]?.find((item: { point: string, content: string }) => item.point === params.point_name);
      console.log('Found point data:', pointData);
      if (pointData) {
        setContent(pointData.content);
      }
    } else {
      console.log('No canvas found in localStorage');
    }
  }, [params.idea_name, params.module_name, params.point_name]);

  if (content === null) {
    return <div>Content not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{decodeURIComponent(params.point_name as string)}</h1>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
