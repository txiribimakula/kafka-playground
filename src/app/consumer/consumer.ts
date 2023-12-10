import { Observable, Subject } from "rxjs";
import { Message } from "../message/message";

export class Consumer {
  topicsNames: string[];
  partitionIndex?: number;
  groupId: string;
  messagesSubject: Subject<Message> = new Subject<Message>();
  messages$: Observable<Message> = this.messagesSubject.asObservable();

  constructor(topicsNames: string[], groupId: string) {
    this.topicsNames = topicsNames;
    this.groupId = groupId;
  }
}
