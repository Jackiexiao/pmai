'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type CanvasData = {
  [key: string]: Array<{ point: string, content: string }>;
};

export default function BusinessCanvas({ idea, data }: { idea: string, data: CanvasData }) {
  console.log('BusinessCanvas data:', data);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(data).map(([module, points]) => (
        <Card key={module}>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">{module}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {points.map(({ point }, index) => (
                <li key={index}>
                  <Button variant="link" asChild className="p-0 h-auto text-left">
                    <Link href={`/idea/${encodeURIComponent(idea)}/${encodeURIComponent(module)}/${encodeURIComponent(point)}`}>
                      {point}
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
