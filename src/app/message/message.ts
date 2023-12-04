export class Message {
    offset: number;
    content: string;
    isCommitted = false;

    constructor(content: string, offset: number) {
        this.content = content;
        this.offset = offset;
    }
}