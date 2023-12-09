import { Injectable, computed, signal } from '@angular/core';
import { Message } from './message/message';
import { Topic } from './topic/topic';
import { Consumer } from './consumer/consumer';

@Injectable({
  providedIn: 'root',
})
export class KafkaService {
  topics = signal<Map<string, Topic>>(new Map<string, Topic>());
  consumers = signal([new Consumer(['one.topic'], "MyGroupId0"), new Consumer(['two.topic'], "MyGroupId1")]);
  consumersByGroupId = computed(() => {
    const map = new Map<string, Consumer[]>();
    this.consumers().forEach((consumer) => {
      const groupId = consumer.groupId;
      if (map.has(groupId)) {
        map.get(groupId)?.push(consumer);
      } else {
        map.set(groupId, [consumer]);
      }
    });
    return map;
  });
  consumerGroups = computed(() => {
    const groupIds = new Set<string>();
    this.consumers().forEach((consumer) => {
      groupIds.add(consumer.groupId);
    });
    return Array.from(groupIds);
  });

  constructor() {
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
        values.push(new Message(msg, partition.messages().length));
        return [...values];
      });      
      this.counter++;

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
