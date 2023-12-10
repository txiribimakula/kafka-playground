import { Component, Input, computed } from '@angular/core';
import { ConsumerComponent } from '../consumer.component';
import { ConsumerService } from '../consumer.service';
import { Partition } from '../../topic/partition/partition';
import { TopicService } from '../../topic/topic.service';

@Component({
  selector: 'app-consumer-group',
  standalone: true,
  templateUrl: './consumer-group.component.html',
  styleUrl: './consumer-group.component.scss',
  imports: [ConsumerComponent],
})
export class ConsumerGroupComponent {
  @Input() id!: string;

  consumersByGroupId = computed(() => {
    const consumersByGroupId: `${string}-${string}-${string}-${string}-${string}`[] =
      [];
    this.consumer.consumers().forEach((consumer, key) => {
      if (consumer().groupId === this.id) {
        consumersByGroupId.push(key);
      }
    });
    return consumersByGroupId;
  });

  consumersByTopic = computed(() => {
    const consumersByTopic = new Map<
      string,
      `${string}-${string}-${string}-${string}-${string}`[]
    >();
    this.consumersByGroupId().forEach((key) => {
      this.consumer.consumers().get(key)!().topicsNames.forEach((topicName) => {
        if (!consumersByTopic.has(topicName)) {
          consumersByTopic.set(topicName, []);
        }
        consumersByTopic.get(topicName)!.push(key);
      });
    });
    return consumersByTopic;
  });

  consumerByPartitions = computed(() => {
    const consumerByPartitions = new Map<
      Partition,
      `${string}-${string}-${string}-${string}-${string}`
    >();
    this.consumersByGroupId().forEach((key) => {
      this.consumer.consumers().get(key)!().topicsNames.forEach((topicName) => {
        this.topic
          .topics()
          .get(topicName)!
          .partitions()
          .forEach((partition) => {
            consumerByPartitions.set(partition, key);
          });
      });
    });
    return consumerByPartitions;
  });

  constructor(
    protected topic: TopicService,
    private consumer: ConsumerService
  ) {}

  ngAfterViewInit() {
    this.topic.topics().forEach((topic) => {
      topic.partitions().forEach((partition) => {
        partition.messages$.subscribe((message) => {
          const consumerKey = this.consumerByPartitions().get(partition);
          if (consumerKey) {
            this.consumer.consumers().get(consumerKey)!().messagesSubject.next(
              message
            );
          }
        });
      });
    });
  }
}
