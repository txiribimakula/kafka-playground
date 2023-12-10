import { Injectable, Signal, signal } from '@angular/core';
import { Consumer } from './consumer';

@Injectable({
  providedIn: 'root',
})
export class ConsumerService {
  consumers = signal<
    Map<`${string}-${string}-${string}-${string}-${string}`, Signal<Consumer>>
  >(new Map<`${string}-${string}-${string}-${string}-${string}`, Signal<Consumer>>());

  constructor() {
    this.consumers.set(
      this.consumers().set(
        crypto.randomUUID(),
        signal(new Consumer(['one.topic'], 'MyGroupId0'))
      )
    );
    this.consumers.set(
      this.consumers().set(
        crypto.randomUUID(),
        signal(new Consumer(['one.topic'], 'MyGroupId0'))
      )
    );
    this.consumers.set(
      this.consumers().set(
        crypto.randomUUID(),
        signal(new Consumer(['two.topic'], 'MyGroupId1'))
      )
    );
  }

  addConsumer(topics: string[], groupId: string) {
    this.consumers.update(
      () => new Map(this.consumers().set(crypto.randomUUID(), signal(new Consumer(topics, groupId))))
    );
  }
}
