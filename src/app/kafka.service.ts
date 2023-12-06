import { Injectable, signal } from '@angular/core';
import { Message } from './message/message';
import { Topic } from './topic/topic';

@Injectable({
  providedIn: 'root',
})
export class KafkaService {
  topics = signal<Map<string, Topic>>(new Map<string, Topic>());

  constructor() {
    var topic1 = new Topic('one.topic');
    var topic2 = new Topic('two.topic');
    this.topics.set(this.topics().set(topic1.name, topic1));
    this.topics.set(this.topics().set(topic2.name, topic2));
  }

  produce(topicName: string, msg: string) {
    const topic = this.topics().get(topicName);
    if (topic) {
      topic.partitions()[0].messages.update((values) => {
        values.push(new Message(msg, topic.partitions()[0].messages().length));
        return [...values];
      });
    } else {
      throw new Error(`Topic ${topicName} does not exist`);
    }
  }

  commit(topicName: string, message: Message) {
    const topic = this.topics().get(topicName)!;
    topic.partitions()[0].messages.update((values) => {
      const newValues = values.map((value) => {
        if (value.offset == message.offset) {
          value.isCommitted = true;
        }
        return value;
      });
      return newValues;
    });
    topic.partitions()[0].offset.set(message.offset + 1);
  }
}
