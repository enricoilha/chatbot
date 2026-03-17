export const DEFAULT_CHAT_MODEL = "gpt-4.1-mini";

export type ChatModel = {
  id: string;
  name: string;
  provider: string;
  description: string;
};

export const chatModels: ChatModel[] = [
  {
    id: "gpt-4.1-mini",
    name: "GPT-4.1 Mini",
    provider: "openai",
    description: "Fast and cost-effective for simple tasks",
  },
  {
    id: "gpt-4.1",
    name: "GPT-4.1",
    provider: "openai",
    description: "Highly capable for complex tasks",
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "openai",
    description: "Multimodal model with vision capabilities",
  },
  {
    id: "o4-mini",
    name: "o4 Mini",
    provider: "reasoning",
    description: "Reasoning model for complex problems",
  },
];

export const allowedModelIds = new Set(chatModels.map((m) => m.id));

export const modelsByProvider = chatModels.reduce(
  (acc, model) => {
    if (!acc[model.provider]) {
      acc[model.provider] = [];
    }
    acc[model.provider].push(model);
    return acc;
  },
  {} as Record<string, ChatModel[]>
);
