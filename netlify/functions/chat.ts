import { Handler } from '@netlify/functions';
import { createAISDK } from './ai-sdk';
import { subagents, subagentIds, SubagentId } from './ai-subagents';

type ChatRequest = {
  messages: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
  }>;
  temperature?: number;
  top_p?: number;
  max_tokens?: number;
  model?: string;
};

const aiClient = createAISDK({
  apiKey: process.env.API_TOKEN,
  baseURL: process.env.AI_BASE_URL ?? 'https://models.inference.ai.azure.com',
});

const normalizeSubagent = (value: string): SubagentId => {
  const cleaned = value.toLowerCase().replace(/[^a-z]/g, '');
  const match = subagentIds.find((id) => cleaned.includes(id));
  return match ?? 'general';
};

const selectSubagent = async (message: string): Promise<SubagentId> => {
  const routerPrompt = `You are a routing assistant for subagents.
Choose the best subagent for the user message and respond with only one id from this list:
${subagentIds.join(', ')}.

Subagent hints:
${subagentIds
  .map((id) => `- ${id}: ${subagents[id].routerHint}`)
  .join('\n')}`;

  const { text } = await aiClient.generateText({
    model: 'gpt-4o-mini',
    temperature: 0,
    maxTokens: 32,
    messages: [
      {
        role: 'system',
        content: routerPrompt,
      },
      {
        role: 'user',
        content: message || 'General inquiry',
      },
    ],
  });

  return normalizeSubagent(text.trim());
};

export const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
    };
  }

  try {
    if (!event.body) {
      throw new Error('No request body');
    }

    const request = JSON.parse(event.body) as ChatRequest;
    const { messages, temperature = 0.7, top_p = 0.9, max_tokens = 4000 } = request;
    const modelName = request.model ?? 'gpt-4o-mini';

    if (!messages?.length) {
      throw new Error('No messages provided');
    }

    const lastUserMessage = [...messages].reverse().find((message) => message.role === 'user');
    const routedSubagent = await selectSubagent(lastUserMessage?.content ?? '');
    const subagentConfig = subagents[routedSubagent];

    const baseSystemMessages = messages.filter((message) => message.role === 'system');
    const baseSystem = baseSystemMessages.map((message) => message.content).join('\n\n');
    const combinedSystem = [baseSystem, subagentConfig.systemPrompt].filter(Boolean).join('\n\n');

    const chatMessages = messages
      .filter((message) => message.role !== 'system')
      .map((message) => ({
        role: message.role,
        content: message.content,
      }));

    const { text } = await aiClient.generateText({
      model: modelName,
      temperature,
      topP: top_p,
      maxTokens: max_tokens,
      messages: [
        {
          role: 'system',
          content: combinedSystem,
        },
        ...chatMessages,
      ],
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        choices: [
          {
            message: {
              content: text,
            },
          },
        ],
        agent: {
          id: subagentConfig.id,
          label: subagentConfig.label,
        },
      }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error instanceof Error ? error.stack : undefined,
      }),
    };
  }
};
