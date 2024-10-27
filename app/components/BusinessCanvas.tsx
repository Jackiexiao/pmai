'use client';

import React from 'react';
import Link from 'next/link';

type CanvasData = {
  [key: string]: Array<{ point: string, content: string }>;
};

export default function BusinessCanvas({ idea, data }: { idea: string, data: CanvasData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Object.entries(data).map(([module, points]) => (
        <div key={module} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
            {module}
          </h2>
          <ul className="space-y-2">
            {points.map(({ point }, index) => (
              <li key={index}>
                <Link 
                  href={`/idea/${encodeURIComponent(idea)}/${encodeURIComponent(module)}/${encodeURIComponent(point)}`}
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  {point}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
