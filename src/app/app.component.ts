import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ConsumerComponent } from "./consumer/consumer.component";
import { ProducerComponent } from "./producer/producer.component";
import { TopicComponent } from "./topic/topic.component";
import { KafkaService } from './kafka.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, ConsumerComponent, ProducerComponent, TopicComponent]
})
export class AppComponent {
  consumersTopics = signal(['one.topic', 'two.topic'])

  constructor(protected kafka: KafkaService) {
  }
}
