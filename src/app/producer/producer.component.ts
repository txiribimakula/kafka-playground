import { Component } from '@angular/core';
import { KafkaService } from '../kafka.service';

@Component({
  selector: 'app-producer',
  standalone: true,
  imports: [],
  templateUrl: './producer.component.html',
  styleUrl: './producer.component.scss',
})
export class ProducerComponent {
  constructor(private kafka: KafkaService) {}

  produce() {
    this.kafka.produce('message');
  }
}
