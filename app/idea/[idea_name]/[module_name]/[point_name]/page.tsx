'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function PointPage() {
  const params = useParams();
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      const storedCanvas = localStorage.getItem(`canvas_${params.idea_name}`);
      if (storedCanvas) {
        const canvas = JSON.parse(storedCanvas);
        const pointData = canvas[params.module_name as string]?.find((item: { point: string, content: string }) => item.point === params.point_name);
        if (pointData) {
          setContent(pointData.content);
        }
      }
      // Simulate a delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoading(false);
    };

    fetchContent();
  }, [params.idea_name, params.module_name, params.point_name]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-xl text-white">AI 正在思考中，请稍候...</p>
        </motion.div>
      </div>
    );
  }

  if (content === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto px-4"
        >
          <h1 className="text-3xl font-bold text-white mb-4">AI 还在路上</h1>
          <p className="text-xl text-gray-300 mb-8">我们的 AI 正在努力生成内容，请稍后再试。</p>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white bg-opacity-10 h-24 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 min-h-screen bg-gradient-to-br from-gray-900 to-black text-white"
    >
      <h1 className="text-3xl font-bold mb-6 text-blue-300">
        {decodeURIComponent(params.point_name as string)}
      </h1>
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg">
        <ReactMarkdown className="prose prose-invert max-w-none">
          {content}
        </ReactMarkdown>
      </div>
    </motion.div>
  );
}
