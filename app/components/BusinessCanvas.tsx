'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type CanvasData = {
  [key: string]: Array<{ point: string, content: string }>;
};

export default function BusinessCanvas({ idea, data }: { idea: string, data: CanvasData }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Object.entries(data).map(([module, points]) => (
        <Card key={module}>
          <CardHeader>
            <CardTitle>{module}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5">
              {points.map(({ point }, index) => (
                <li key={index}>
                  <Link href={`/idea/${encodeURIComponent(idea)}/${encodeURIComponent(module)}/${encodeURIComponent(point)}`}>
                    {point}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
