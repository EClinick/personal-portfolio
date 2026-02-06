type AISDKConfig = {
  apiKey?: string;
  baseURL?: string;
};

type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

type GenerateTextOptions = {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  topP?: number;
  maxTokens?: number;
};

type GenerateTextResult = {
  text: string;
  raw: unknown;
};

export type AISDKClient = {
  generateText: (options: GenerateTextOptions) => Promise<GenerateTextResult>;
};

export const createAISDK = ({ apiKey, baseURL }: AISDKConfig): AISDKClient => {
  const resolvedBaseURL = (baseURL ?? 'https://models.inference.ai.azure.com').replace(/\/$/, '');

  const generateText = async ({
    model,
    messages,
    temperature,
    topP,
    maxTokens,
  }: GenerateTextOptions): Promise<GenerateTextResult> => {
    const response = await fetch(`${resolvedBaseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        top_p: topP,
        max_tokens: maxTokens,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`AI SDK error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content ?? '';

    return { text, raw: data };
  };

  return { generateText };
};
