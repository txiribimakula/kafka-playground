export class Message {
    offset: number;
    topic: string;
    partition: number;
    content: string;
    isCommitted = false;

    constructor(content: string, offset: number, topic: string, partition: number) {
        this.content = content;
        this.offset = offset;
        this.topic = topic;
        this.partition = partition;
    }
}