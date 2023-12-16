import {
  Component,
  Input,
  OnInit,
  Signal,
  computed,
  signal,
} from '@angular/core';
import { KafkaService } from '../kafka.service';
import { Message } from '../message/message';
import { concatMap } from 'rxjs';
import { ConsumerService } from './consumer.service';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-consumer',
  standalone: true,
  imports: [MatCardModule, MatSelectModule, MatProgressBarModule],
  templateUrl: './consumer.component.html',
  styleUrl: './consumer.component.scss',
})
export class ConsumerComponent {
  @Input() consumerId!: `${string}-${string}-${string}-${string}-${string}`;

  topics: Signal<string>;
  action = signal('Waiting for messages...');
  info = signal('');
  status = computed(() => this.action() + this.info());
  progress = computed(() => {
    switch (this.action()) {
      case 'Waiting for messages...':
        return 'determinate';
      case 'Handling message...':
        return 'indeterminate';
      case 'Committing message...':
        return 'indeterminate';
      default:
        return 'determinate';
    }
  });

  constructor(private kafka: KafkaService, private consumer: ConsumerService) {
    this.topics = computed(
      () =>
        '[' +
        this.consumer.consumers().get(this.consumerId)!().topicsNames.join(
          ', '
        ) +
        ']'
    );
  }

  ngOnInit(): void {
    this.consume();
  }

  consume() {
    this.consumer.consumers().get(this.consumerId)!()
      .messages$.pipe(concatMap((message) => this.handle(message)))
      .subscribe();
  }

  async handle(message: Message) {
    this.action.set('Handling message...');
    this.info.set(' from ' + message.partition);
    await this.work(message);
    this.kafka.commit(message);
    this.action.set('Waiting for messages...');
    this.info.set('');
  }

  async work(message: Message) {
    await new Promise((_) => setTimeout(_, 1500));
  }
}
