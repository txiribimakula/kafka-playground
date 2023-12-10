import { Component, Input, OnInit, Signal, computed, signal } from '@angular/core';
import { KafkaService } from '../kafka.service';
import { Message } from '../message/message';
import { concatMap } from 'rxjs';
import { ConsumerService } from './consumer.service';

@Component({
  selector: 'app-consumer',
  standalone: true,
  imports: [],
  templateUrl: './consumer.component.html',
  styleUrl: './consumer.component.scss',
})
export class ConsumerComponent {
  @Input() consumerId!: `${string}-${string}-${string}-${string}-${string}`;

  topics: Signal<string>;
  status = signal("Waiting for messages...");

  constructor(private kafka: KafkaService, private consumer: ConsumerService) {
    this.topics = computed(
      () =>
        '[' + this.consumer.consumers().get(this.consumerId)!().topicsNames.join(', ') + ']'
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
    this.status.set("Handling message from partition " + message.partition);
    await this.work(message);
    this.kafka.commit(message);
    this.status.set("Waiting for messages...");
  }

  async work(message: Message) {
    await new Promise((_) => setTimeout(_, 1500));
  }
}
