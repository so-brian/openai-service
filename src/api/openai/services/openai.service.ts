import { TableClient } from "@azure/data-tables";
import { IOpenAIService } from "./openai.service.interface";
import { DefaultAzureCredential } from "@azure/identity";
import { AzureKeyCredential, ChatMessage, ChatRole, OpenAIClient } from "@azure/openai";
import { Injectable } from "@nestjs/common";

@Injectable()
export class OpenAIService implements IOpenAIService {
    async chat(sessionId: string, message: string): Promise<string> {
        const tableName = 'openai';
        const url = 'https://sobrian.table.core.windows.net/';
        const credential = new DefaultAzureCredential();
        const tableClient = new TableClient(url, tableName, credential);
        tableClient.createTable();

        const iterator = tableClient.listEntities({
            queryOptions: {
                filter: `PartitionKey eq '${sessionId}'`
            }
        });

        const history: ChatMessage[] = [];
        history.push({ role: 'system', content: 'You are a helpful assistant.' } as ChatMessage);
        for await (const entity of iterator) {
            const message = entity.message as string;
            const role = entity.role as ChatRole;
            const chatMessage = { role: role, content: message } as ChatMessage;
            history.push(chatMessage);
        }

        await tableClient.createEntity({
            partitionKey: sessionId,
            rowKey: (history.length - 1).toString(),
            message: message,
            role: 'user'
        });

        history.push({ role: 'user', content: message } as ChatMessage);

        console.log(history);

        const client = new OpenAIClient('https://sobrian.openai.azure.com/', new AzureKeyCredential('36a50696827c410787bd77b41b9922b7'));
        const deploymentName = 'test';
        const result = await client.getChatCompletions(deploymentName, history)
        const response = result.choices[result.choices.length - 1].message!.content!;

        await tableClient.createEntity({
            partitionKey: sessionId,
            rowKey: (history.length - 1).toString(),
            message: response,
            role: 'assistant'
        });

        return response;
    }
}