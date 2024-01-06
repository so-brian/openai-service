export class Chat {
    message: string;
    role: ChatRole;

    constructor(message: string, role: ChatRole) {
        this.message = message;
        this.role = role;
    }
}

export enum ChatRole {
    system,
    user,
    assistant,
}