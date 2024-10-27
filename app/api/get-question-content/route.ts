import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const idea = searchParams.get('idea');
  const module = searchParams.get('module');
  const point = searchParams.get('point');

  if (!idea || !module || !point) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  const businessPoint = await prisma.businessPoint.findFirst({
    where: {
      module: {
        name: module,
        canvas: {
          idea: {
            name: idea
          }
        }
      },
      content: {
        startsWith: point
      }
    }
  });

  if (!businessPoint) {
    return NextResponse.json({ error: 'Content not found' }, { status: 404 });
  }

  return NextResponse.json({ content: businessPoint.content });
}
