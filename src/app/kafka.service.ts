import { Injectable, effect, signal } from '@angular/core';
import { Message } from './message/message';
import { Topic } from './topic/topic';

@Injectable({
  providedIn: 'root',
})
export class KafkaService {
  topics = signal<Map<string, Topic>>(new Map<string, Topic>());

  index = 0;
  // instead of a list of messages this should be a dictionary.

  constructor() {
    var topic1 = new Topic('one.topic');
    var topic2 = new Topic('two.topic');
    this.topics.set(this.topics().set(topic1.name, topic1));
    this.topics.set(this.topics().set(topic2.name, topic2));
  }

  produce(topicName: string, msg: string) {
    // test for topic nos existing
    this.topics().get(topicName)!.messages.update((values) => {
      values.push(new Message(msg, this.index));
      this.index++;
      return [...values];
    });
  }

  commit(topicName: string, message: Message) {
    this.topics().get(topicName)!.messages.update((values) => {
      const newValues = values.map((value) => {
        if (value.offset == message.offset) {
          value.isCommitted = true;
        }
        return value;
      });
      return newValues;
    });
  }
}
