import { Component, effect } from '@angular/core';
import { KafkaService } from '../kafka.service';
import { Message } from '../message/message';
import { toObservable } from '@angular/core/rxjs-interop';
import { first, take } from 'rxjs';

@Component({
  selector: 'app-consumer',
  standalone: true,
  imports: [],
  templateUrl: './consumer.component.html',
  styleUrl: './consumer.component.scss',
})
export class ConsumerComponent {
  constructor(private kafka: KafkaService) {
    this.consume();
  }

  consume() {
    this.kafka.topics().get('one.topic')!.messages$.subscribe((message) => {
      this.handle(message);
    });
  }

  async handle(message: Message) {
    await this.work(message);
    this.kafka.commit('one.topic', message);
  }

  async work(message: Message) {
    await new Promise(_ => setTimeout(_, 1500));
  }
}
