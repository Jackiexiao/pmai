'use client';

import React from 'react';
import Link from 'next/link';

type CanvasData = {
  [key: string]: Array<{ point: string, content: string }>;
};

export default function BusinessCanvas({ idea, data }: { idea: string, data: CanvasData }) {
  console.log('BusinessCanvas data:', data);
  return (
    <div className="grid grid-cols-3 gap-4">
      {Object.entries(data).map(([module, points]) => (
        <div key={module} className="border p-4 rounded">
          <h2 className="text-xl font-bold mb-2">{module}</h2>
          <ul className="list-disc pl-5">
            {points.map(({ point }, index) => (
              <li key={index}>
                <Link href={`/idea/${encodeURIComponent(idea)}/${encodeURIComponent(module)}/${encodeURIComponent(point)}`}>
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
