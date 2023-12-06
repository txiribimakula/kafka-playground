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
    const topic = this.topics().get(topicName);
    if (topic) {
      topic.messages.update((values) => {
        values.push(new Message(msg, this.index));
        this.index++;
        return [...values];
      });
    } else {
      throw new Error(`Topic ${topicName} does not exist`);
    }
  }

  commit(topicName: string, message: Message) {
    const topic = this.topics().get(topicName)!;
    topic.messages.update((values) => {
      const newValues = values.map((value) => {
        if (value.offset == message.offset) {
          value.isCommitted = true;
        }
        return value;
      });
      return newValues;
    });
    topic.offset.set(message.offset + 1);
  }
}
