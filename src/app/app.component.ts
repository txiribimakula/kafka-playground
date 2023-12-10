import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ConsumerComponent } from "./consumer/consumer.component";
import { ProducerComponent } from "./producer/producer.component";
import { TopicComponent } from "./topic/topic.component";
import { KafkaService } from './kafka.service';
import { ConsumerGroupComponent } from "./consumer/consumer-group/consumer-group.component";
import { ConsumerGroupService } from './consumer/consumer-group/consumer-group.service';
import { TopicService } from './topic/topic.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, ConsumerComponent, ProducerComponent, TopicComponent, ConsumerGroupComponent]
})
export class AppComponent {
  constructor(protected topic: TopicService, protected consumerGroup: ConsumerGroupService) {
  }
}
