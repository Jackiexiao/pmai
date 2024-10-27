import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateBusinessCanvas(idea: string) {
  const prompt = `Generate a business canvas for the following idea: ${idea}. Include the following modules: Customer Segments, Value Propositions, Channels, Customer Relationships, Revenue Streams, Key Resources, Key Activities, Key Partnerships, Cost Structure. For each module, provide 3-5 questions or descriptions.`;

  const response = await openai.completions.create({
    model: "text-davinci-002",
    prompt: prompt,
    max_tokens: 1000,
  });

  return JSON.parse(response.choices[0].text || '{}');
}

export async function generateQuestionContent(idea: string, module: string, question: string) {
  const prompt = `For the business idea "${idea}", regarding the "${module}" module, answer the following question: ${question}`;

  const response = await openai.completions.create({
    model: "text-davinci-002",
    prompt: prompt,
    max_tokens: 500,
  });

  return response.choices[0].text || '';
}
