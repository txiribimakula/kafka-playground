import { Injectable, computed } from '@angular/core';
import { ConsumerService } from '../consumer.service';
import { Partition } from '../../topic/partition/partition';
import { TopicService } from '../../topic/topic.service';

@Injectable({
  providedIn: 'root'
})
export class ConsumerGroupService {

  consumerGroups = computed(() => {
    const groupIds = new Set<string>();
    this.consumer.consumers().forEach((consumer) => {
      groupIds.add(consumer().groupId);
    });
    return Array.from(groupIds);
  });

  consumersByGroupId = computed(() => {
    const consumersByGroupId: Map<string, `${string}-${string}-${string}-${string}-${string}`[]> = new Map();
    this.consumerGroups().forEach((groupId) => {
      consumersByGroupId.set(groupId, []);
      this.consumer.consumers().forEach((consumer, key) => {
        if (consumer().groupId === groupId) {
          consumersByGroupId.get(groupId)!.push(key);
        }
      });
    });
    return consumersByGroupId;
  });

  topicsByGroupId = computed(() => {
    const topicsByGroupId: Map<string, string[]> = new Map();
    this.consumerGroups().forEach((groupId) => {
      topicsByGroupId.set(groupId, []);
      this.consumersByGroupId().get(groupId)!.forEach((consumerKey) => {
        this.consumer.consumers().get(consumerKey)!().topicsNames.forEach((topicName) => {
          if (!topicsByGroupId.get(groupId)!.includes(topicName)) {
            topicsByGroupId.get(groupId)!.push(topicName);
          }
        });
      });
    });
    return topicsByGroupId;
  });

  consumersByTopic = computed(() => {
    const consumersByTopic = new Map<string, `${string}-${string}-${string}-${string}-${string}`[]>();
    this.consumer.consumers().forEach((consumer, key) => {
      consumer().topicsNames.forEach((topicName) => {
        if (!consumersByTopic.has(topicName)) {
          consumersByTopic.set(topicName, []);
        }
        consumersByTopic.get(topicName)!.push(key);
      });
    });
    return consumersByTopic;
  });

  consumerByPartitions = computed(() => {
    const consumerByPartitions = new Map<Partition, `${string}-${string}-${string}-${string}-${string}`>();
    this.topic.topics().forEach((topic) => {
      let partitionIndex = 0;
      const consumersByTopic = this.consumersByTopic().get(topic.name)!;
      topic.partitions().forEach((partition) => {
        const consumerIndex = partitionIndex % consumersByTopic.length;
        consumerByPartitions.set(partition, consumersByTopic[consumerIndex]);
        partitionIndex++;
      });
    });
    return consumerByPartitions;
  });
  
  constructor(private consumer: ConsumerService, private topic: TopicService) { }
}
