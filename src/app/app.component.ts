import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ConsumerComponent } from "./consumer/consumer.component";
import { ProducerComponent } from "./producer/producer.component";
import { TopicComponent } from "./topic/topic.component";
import { KafkaService } from './kafka.service';
import { Consumer } from './consumer/consumer';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, ConsumerComponent, ProducerComponent, TopicComponent]
})
export class AppComponent {
  consumers = signal([new Consumer(['one.topic']), new Consumer(['two.topic'])]);

  constructor(protected kafka: KafkaService) {
  }
}
