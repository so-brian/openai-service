import { Body, Controller, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { OpenAIService } from "../services/openai.service";
import { ChatDto } from "../dtos";

@Controller('openai')
export class OpenAIController {
    @Post('chat/:sessionId')
    @HttpCode(HttpStatus.CREATED)
    chat(
        @Param('sessionId') sessionId: string,
        @Body() chatDto: ChatDto
    ) {
        const message = new OpenAIService().chat(sessionId, chatDto.message);

        return message;
    }

}