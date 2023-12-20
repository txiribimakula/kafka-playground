export class Message {
    offset: number;
    topic: string;
    partition: number;
    content: string;
    isCommitted = false;

    workTimeMs = 7500;

    constructor(content: string, offset: number, topic: string, partition: number, workTimeMs = 1500) {
        this.content = content;
        this.offset = offset;
        this.topic = topic;
        this.partition = partition;
        this.workTimeMs = workTimeMs;
    }
}