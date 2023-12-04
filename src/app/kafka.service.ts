import { Injectable, effect, signal } from '@angular/core';
import { Message } from './message/message';
import { Topic } from './topic/topic';

@Injectable({
  providedIn: 'root',
})
export class KafkaService {
  topics = signal<Topic[]>([new Topic(), new Topic(), new Topic()]);

  index = 0;
  // instead of a list of messages this should be a dictionary.

  constructor() {}

  produce(topicIndex: number, msg: string) {
    this.topics()[topicIndex].messages.update((values) => {
      values.push(new Message("msg", this.index));
      this.index++;
      return [...values];
    });
  }

  commit(topicIndex: number,message: Message) {
    this.topics()[topicIndex].messages.update((values) => {
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
