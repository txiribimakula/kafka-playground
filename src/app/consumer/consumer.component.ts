import { AfterViewInit, Component, effect } from '@angular/core';
import { KafkaService } from '../kafka.service';

@Component({
  selector: 'app-consumer',
  standalone: true,
  imports: [],
  templateUrl: './consumer.component.html',
  styleUrl: './consumer.component.scss',
})
export class ConsumerComponent {
  constructor(private kafka: KafkaService) {
    effect(() => this.handle(kafka.messages()), { allowSignalWrites: true });
  }

  index = 0;
  handle(msg: string[]) {
    console.log('handling: ' + this.index);
    this.index++;
    setTimeout(() => {
      this.kafka.commit();
    }, 5000);
  }
}
