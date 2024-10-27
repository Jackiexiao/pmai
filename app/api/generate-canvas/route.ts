import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { PrismaClient } from '@prisma/client';

// 模拟生成商业画布的函数
function generateMockBusinessCanvas(idea: string) {
  const modules = {
    'Customer Segments': [
      'Who are your most important customers?',
      'What are the characteristics of your ideal customer?',
      'Are there different customer groups with different needs?'
    ],
    'Value Propositions': [
      'What value do you deliver to the customer?',
      'Which customer problems are you helping to solve?',
      'What bundles of products and services are you offering to each segment?'
    ],
    'Channels': [
      'Through which channels do your customer segments want to be reached?',
      'How are you reaching them now?',
      'Which channels work best? Which ones are most cost-efficient?'
    ],
    'Customer Relationships': [
      'What type of relationship does each of your customer segments expect you to establish?',
      'How costly are they?',
      'How are they integrated with the rest of your business model?'
    ],
    'Revenue Streams': [
      'For what value are your customers really willing to pay?',
      'How would they prefer to pay?',
      'How much does each revenue stream contribute to overall revenues?'
    ],
    'Key Resources': [
      'What key resources does your value proposition require?',
      'What resources are needed for your distribution channels, customer relationships, revenue streams?'
    ],
    'Key Activities': [
      'What key activities does your value proposition require?',
      'What activities are needed for your distribution channels?',
      'What activities are needed for your customer relationships?'
    ],
    'Key Partnerships': [
      'Who are your key partners?',
      'Who are your key suppliers?',
      'Which key resources are you acquiring from partners?'
    ],
    'Cost Structure': [
      'What are the most important costs inherent in your business model?',
      'Which key resources are most expensive?',
      'Which key activities are most expensive?'
    ]
  };

  return modules;
}

export async function POST(req: Request) {
  const { idea } = await req.json();
  
  // 生成模拟的商业画布数据
  const canvasData = generateMockBusinessCanvas(idea);
  
  try {
    // 保存到数据库
    const savedCanvas = await prisma.$transaction(async (tx: PrismaClient) => {
      const businessIdea = await tx.businessIdea.create({
        data: {
          name: idea,
          canvas: {
            create: {}
          }
        },
        include: {
          canvas: true
        }
      });

      const modulePromises = Object.entries(canvasData).map(([moduleName, points]) =>
        tx.businessModule.create({
          data: {
            name: moduleName,
            canvas: { connect: { id: businessIdea.canvas!.id } },
            points: {
              create: points.map(point => ({
                content: generateMockMarkdownContent(idea, moduleName, point)
              }))
            }
          }
        })
      );

      await Promise.all(modulePromises);

      return businessIdea;
    }, {
      maxWait: 5000, // 5 seconds
      timeout: 10000, // 10 seconds
    });

    return NextResponse.json({ idea: savedCanvas.name, canvasId: savedCanvas.canvas!.id });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Prisma error:', error.message);
      return NextResponse.json({ error: 'Database operation failed' }, { status: 500 });
    }
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const idea = searchParams.get('idea');

  if (!idea) {
    return NextResponse.json({ error: 'Missing idea parameter' }, { status: 400 });
  }

  const businessIdea = await prisma.businessIdea.findUnique({
    where: { name: idea },
    include: {
      canvas: {
        include: {
          modules: {
            include: {
              points: true
            }
          }
        }
      }
    }
  });

  if (!businessIdea) {
    return NextResponse.json({ error: 'Business idea not found' }, { status: 404 });
  }

  const formattedCanvas = businessIdea.canvas!.modules.reduce((acc: Record<string, Array<{ point: string, content: string }>>, module: any) => {
    acc[module.name] = module.points.map((point: any) => ({
      point: point.content.split('\n')[0], // 假设第一行是问题
      content: point.content
    }));
    return acc;
  }, {});

  return NextResponse.json({ idea: businessIdea.name, canvas: formattedCanvas });
}

function generateMockMarkdownContent(idea: string, module: string, point: string): string {
  return `${point}

## Overview
This is a mock analysis for the business idea: "${idea}".

## Key Points
- Point 1 related to this ${module}
- Point 2 related to this ${module}
- Point 3 related to this ${module}

## Detailed Analysis
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## Recommendations
1. Recommendation 1 for this point
2. Recommendation 2 for this point
3. Recommendation 3 for this point

## Conclusion
In conclusion, this aspect of the ${module} for "${idea}" requires careful consideration and strategic planning.
`;
}
