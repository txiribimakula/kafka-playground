import { Injectable } from '@angular/core';
import { Message } from './message/message';
import { TopicService } from './topic/topic.service';

@Injectable({
  providedIn: 'root',
})
export class KafkaService {
  constructor(private topic: TopicService) {}

  private counter = 0;
  produce(topicName: string, msg: string, workTimeMs = 1500) {
    const topic = this.topic.topics().get(topicName);
    if (topic) {
      const partitionIndex = this.counter % topic.partitions().length;
      const partition = topic.partitions()[partitionIndex];
      partition.messages.update((values) => {
        values.push(
          new Message(
            msg,
            partition.messages().length,
            topicName,
            partitionIndex,
            workTimeMs
          )
        );
        return [...values];
      });
      this.counter++;
    } else {
      throw new Error(`Topic ${topicName} does not exist`);
    }
  }

  commit(message: Message) {
    const topic = this.topic.topics().get(message.topic)!;
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
}
