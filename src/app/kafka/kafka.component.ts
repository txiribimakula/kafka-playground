import { Component } from '@angular/core';
import { ProducerComponent } from '../producer/producer.component';
import { TopicComponent } from '../topic/topic.component';
import { ConsumerGroupComponent } from '../consumer/consumer-group/consumer-group.component';
import { TopicService } from '../topic/topic.service';
import { ConsumerGroupService } from '../consumer/consumer-group/consumer-group.service';

@Component({
  selector: 'app-kafka',
  standalone: true,
  templateUrl: './kafka.component.html',
  styleUrl: './kafka.component.scss',
  imports: [ProducerComponent, TopicComponent, ConsumerGroupComponent],
})
export class KafkaComponent {
  constructor(
    protected topic: TopicService,
    protected consumerGroup: ConsumerGroupService
  ) {}
}
