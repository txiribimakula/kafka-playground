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
  offset = 0;

  messages$;
  delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  constructor(private kafka: KafkaService) {
    this.messages$ = toObservable(this.kafka.messages, {});
    this.subscribe();
  }

  subscribe() {
    this.messages$.pipe(take(2)).subscribe(async (values) => {
      if (values.length  == this.offset) {
        return;
      }
      await this.consume();
    });
  }

  async consume() {
    for (
      let index = this.offset;
      index < this.kafka.messages().length;
      index++
    ) {
      await this.handle(this.kafka.messages()[index]);
    }
    if (this.offset < this.kafka.messages().length - 1) {
      await this.consume();
    }
    this.subscribe();
  }

  async handle(message: Message) {
    await this.delay(300);
    this.kafka.commit(message);
    this.offset++;
  }
}
