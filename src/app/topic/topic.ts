import { signal } from "@angular/core";
import { Message } from "../message/message";

export class Topic {
    constructor(name: string) {
        this.name = name;
    }

    name: string;
    messages = signal<Message[]>([]);
}