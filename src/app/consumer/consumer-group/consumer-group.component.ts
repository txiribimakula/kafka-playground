import { Component, Input } from '@angular/core';
import { ConsumerComponent } from '../consumer.component';
import { KafkaService } from '../../kafka.service';

@Component({
  selector: 'app-consumer-group',
  standalone: true,
  templateUrl: './consumer-group.component.html',
  styleUrl: './consumer-group.component.scss',
  imports: [ConsumerComponent],
})
export class ConsumerGroupComponent {
  @Input() id!: string;

  constructor(protected kafka: KafkaService) {}
}
