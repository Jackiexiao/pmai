import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_BASE_URL || undefined,
});

const MODEL_NAME = process.env.OPENAI_MODEL_NAME || 'gpt-3.5-turbo-16k';

async function generateBusinessCanvas(idea: string) {
  console.log(`Generating business canvas for idea: ${idea}`);
  const startTime = Date.now();

  const prompt = `
基于用户输入的产品"${idea}"生成商业模式画布的九大要点，内容精炼，词汇精准直接。请按以下格式生成JSON响应：

{
  "客户细分": [
    { "point": "point1" },
    { "point": "point2" }
  ],
  "价值主张": [
    { "point": "point1" },
    { "point": "point2" }
  ],
  ...
  // 包含其他模块：渠道通路、客户关系、收入来源、核心资源、关键业务、重要合作、成本结构
}

每个模块应包含2-4个要点。`;

  console.log('Sending request to OpenAI API...');
  const response = await openai.chat.completions.create({
    model: MODEL_NAME,
    messages: [
      { role: "system", content: "你是一位经验丰富的商业分析师，专门创建商业模式画布。" },
      { role: "user", content: prompt }
    ],
    temperature: 0.7,
    response_format: { type: "json_object" },
    max_tokens: 3000,
  });
  console.log('Received response from OpenAI API');

  const generatedCanvas = JSON.parse(response.choices[0].message.content || '{}');
  
  const endTime = Date.now();
  console.log(`Business canvas generation completed in ${endTime - startTime}ms`);

  return generatedCanvas;
}

export async function POST(req: Request) {
  console.log('Received POST request to generate canvas');
  const startTime = Date.now();

  const { idea } = await req.json();
  
  try {
    const canvasData = await generateBusinessCanvas(idea);
    const endTime = Date.now();
    console.log(`Total POST request processed in ${endTime - startTime}ms`);
    return NextResponse.json({ idea, canvas: canvasData });
  } catch (error: any) {
    console.error('Error generating canvas:', error);
    return NextResponse.json({ error: 'Failed to generate canvas', details: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  console.log('Received GET request to generate canvas');
  const startTime = Date.now();

  const { searchParams } = new URL(req.url);
  const idea = searchParams.get('idea');

  if (!idea) {
    console.log('Missing idea parameter in GET request');
    return NextResponse.json({ error: 'Missing idea parameter' }, { status: 400 });
  }

  try {
    const canvasData = await generateBusinessCanvas(idea);
    const endTime = Date.now();
    console.log(`Total GET request processed in ${endTime - startTime}ms`);
    return NextResponse.json({ idea, canvas: canvasData });
  } catch (error: any) {
    console.error('Error generating canvas:', error);
    return NextResponse.json({ error: 'Failed to generate canvas', details: error.message }, { status: 500 });
  }
}
