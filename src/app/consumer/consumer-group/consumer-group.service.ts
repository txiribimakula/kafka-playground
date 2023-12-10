import { Injectable, computed } from '@angular/core';
import { ConsumerService } from '../consumer.service';
import { Consumer } from '../consumer';

@Injectable({
  providedIn: 'root'
})
export class ConsumerGroupService {

  consumersByGroupId = computed(() => {
    const consumersByGroupId = new Map<string, Consumer[]>();
    this.consumer.consumers().forEach((consumer) => {
      const groupId = consumer.groupId;
      if (!consumersByGroupId.has(groupId)) {
        consumersByGroupId.set(groupId, []);
      }
      consumersByGroupId.get(groupId)!.push(consumer);
    });
    return consumersByGroupId;
  });

  consumersByTopic = computed(() => {
    const consumersByTopic = new Map<string, Consumer[]>();
    this.consumer.consumers().forEach((consumer) => {
      consumer.topics.forEach((topic) => {
        if (!consumersByTopic.has(topic)) {
          consumersByTopic.set(topic, []);
        }
        consumersByTopic.get(topic)!.push(consumer);
      });
    });
    return consumersByTopic;
  });

  constructor(private consumer: ConsumerService) { }

  consume() {

  }
}
