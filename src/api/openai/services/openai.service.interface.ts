import { Chat } from "../models";

export interface IOpenAiService {
    chat(sessionId: string, message: string): Promise<string>;
}