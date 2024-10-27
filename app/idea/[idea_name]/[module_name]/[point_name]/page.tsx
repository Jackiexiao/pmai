'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

export default function PointPage() {
  const params = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const response = await fetch(`/api/get-question-content?idea=${params.idea_name}&module=${params.module_name}&point=${params.point_name}`);
      const data = await response.json();
      setContent(data.content);
      setLoading(false);
    };
    fetchContent();
  }, [params.idea_name, params.module_name, params.point_name]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{decodeURIComponent(params.point_name as string)}</h1>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
