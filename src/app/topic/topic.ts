import { signal } from "@angular/core";
import { Message } from "../message/message";

export class Topic {
    messages = signal<Message[]>([]);
}