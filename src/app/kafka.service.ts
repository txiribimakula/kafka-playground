import { Injectable, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class KafkaService {
  messages = signal<string[]>([]);

  constructor() {}

  produce(msg: string) {
    this.messages.update((values) => {
      values.push(msg);
      return [...values];
    });
  }

  commit() {
    this.messages.update((values) => {
      // this is a naive approach, because it should not be the last element.
      values.pop();
      return values;
    });
  }
}
