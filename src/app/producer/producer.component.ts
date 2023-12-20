import { Component } from '@angular/core';
import { KafkaService } from '../kafka.service';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { TopicService } from '../topic/topic.service';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-producer',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule
  ],
  templateUrl: './producer.component.html',
  styleUrl: './producer.component.scss',
})
export class ProducerComponent {
  topicName: string = this.topic.topics().values().next().value.name;
  workTimeMs = 1500;

  constructor(private kafka: KafkaService, protected topic: TopicService) {}

  produce() {
    this.kafka.produce(this.topicName, 'message', this.workTimeMs);
  }
}
