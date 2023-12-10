import { Injectable, computed, signal } from '@angular/core';
import { Message } from './message/message';
import { Topic } from './topic/topic';
import { Consumer } from './consumer/consumer';
import { ConsumerService } from './consumer/consumer.service';

@Injectable({
  providedIn: 'root',
})
export class KafkaService {

  topics = signal<Map<string, Topic>>(new Map<string, Topic>());

  consumerGroups = computed(() => {
    const groupIds = new Set<string>();
    this.consumer.consumers().forEach((consumer) => {
      groupIds.add(consumer.groupId);
    });
    return Array.from(groupIds);
  });

  constructor(private consumer: ConsumerService) {
    var topic1 = new Topic('one.topic', 2);
    var topic2 = new Topic('two.topic', 1);
    this.topics.set(this.topics().set(topic1.name, topic1));
    this.topics.set(this.topics().set(topic2.name, topic2));
  }

  private counter = 0;
  produce(topicName: string, msg: string) {
    const topic = this.topics().get(topicName);
    if (topic) {
      const partitionIndex = this.counter % topic.partitions().length;
      const partition = topic.partitions()[partitionIndex];
      partition.messages.update((values) => {
        values.push(new Message(msg, partition.messages().length, topicName, partitionIndex));
        return [...values];
      });
      this.counter++;
    } else {
      throw new Error(`Topic ${topicName} does not exist`);
    }
  }

  commit(message: Message) {
    const topic = this.topics().get(message.topic)!;
    topic.partitions()[message.partition].messages.update((values) => {
      const newValues = values.map((value) => {
        if (value.offset == message.offset) {
          value.isCommitted = true;
        }
        return value;
      });
      return newValues;
    });
    topic.partitions()[message.partition].offset.set(message.offset + 1);
  }

  consume() {}
}
