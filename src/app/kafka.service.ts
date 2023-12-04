import { Injectable, effect, signal } from '@angular/core';
import { Message } from './message/message';

@Injectable({
  providedIn: 'root',
})
export class KafkaService {
  index = 0;
  // instead of a list of messages this should be a dictionary.
  messages = signal<Message[]>([]);

  constructor() {}

  produce(msg: string) {
    this.messages.update((values) => {
      values.push(new Message("msg", this.index));
      this.index++;
      return [...values];
    });
  }

  commit(message: Message) {
    this.messages.update((values) => {
      const newValues = values.map((value) => {
        if(value.offset == message.offset){
          value.isCommitted = true;
        }
        return value;
      });
      return newValues;
    });
  }
}
