import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class KafkaService {
  messages = signal<string[]>([]);

  constructor() {}

  produce(msg: string) {
    this.messages.update((values) => {
      values.push(msg);
      return values;
    });
  }
}
