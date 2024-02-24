export interface IOpenAIService {
    chat(sessionId: string, message: string): Promise<string>;
}

export const IOpenAIServiceToken = 'IOpenAIService';