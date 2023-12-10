import { Component, Input, Signal, computed, signal } from '@angular/core';
import { ConsumerComponent } from '../consumer.component';
import { KafkaService } from '../../kafka.service';
import { Consumer } from '../consumer';
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
    const consumersByGroupId: Signal<Consumer>[] = [];
    this.consumer.consumers().forEach((consumer) => {
      if (consumer().groupId === this.id) {
        consumersByGroupId.push(consumer);
      }
    });
    return consumersByGroupId;
  });

  usedPartitions = computed(() => {
    const usedPartitions = new Set<Partition>();
    this.consumersByGroupId().forEach((consumer) => {
      consumer().topicsNames.forEach((topicName) => {
        this.topic
          .topics()
          .get(topicName)!
          .partitions()
          .forEach((partition) => {
            usedPartitions.add(partition);
          });
      });
    });
    return usedPartitions;
  });

  consumerByPartitions = computed(() => {
    const consumerByPartitions = new Map<Partition, Signal<Consumer>>();
    this.consumersByGroupId().forEach((consumer) => {
      consumer().topicsNames.forEach((topicName) => {
        this.topic
          .topics()
          .get(topicName)!
          .partitions()
          .forEach((partition) => {
            consumerByPartitions.set(partition, consumer);
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
          const consumer = this.consumerByPartitions().get(partition);
          if(consumer){
            consumer().messagesSubject.next(message);
          }
        });
      });
    });
  }
}
