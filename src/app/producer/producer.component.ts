import { Component } from '@angular/core';
import { KafkaService } from '../kafka.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-producer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './producer.component.html',
  styleUrl: './producer.component.scss',
})
export class ProducerComponent {
  topic: string = "one.topic";

  constructor(private kafka: KafkaService) {}

  produce() {
    this.kafka.produce(this.topic, 'message');
  }
}
