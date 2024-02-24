import { Body, Controller, HttpCode, HttpStatus, Inject, Param, Post } from "@nestjs/common";
import { ChatDto } from "../dtos";
import { IOpenAIService, IOpenAIServiceToken } from "../services";

@Controller('openai')
export class OpenAIController {
    constructor(@Inject(IOpenAIServiceToken) private readonly openAIService: IOpenAIService) { }

    @Post('chat/:sessionId')
    @HttpCode(HttpStatus.CREATED)
    chat(
        @Param('sessionId') sessionId: string,
        @Body() chatDto: ChatDto
    ) {
        const message = this.openAIService.chat(sessionId, chatDto.message);

        return message;
    }
}