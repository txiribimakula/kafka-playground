import { Observable, Subject } from "rxjs";
import { Message } from "../message/message";

export class Consumer {
  topics: string[];
  partition?: number;
  groupId: string;
  messagesSubject: Subject<Message> = new Subject<Message>();
  messages$: Observable<Message> = this.messagesSubject.asObservable();

  constructor(topics: string[], groupId: string) {
    this.topics = topics;
    this.groupId = groupId;
  }
}
