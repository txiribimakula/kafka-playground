import { Injectable, signal } from '@angular/core';
import { Consumer } from './consumer';

@Injectable({
  providedIn: 'root',
})
export class ConsumerService {
  consumers = signal<
    Map<`${string}-${string}-${string}-${string}-${string}`, Consumer>
  >(new Map<`${string}-${string}-${string}-${string}-${string}`, Consumer>());

  constructor() {
    this.consumers.set(
      this.consumers().set(
        crypto.randomUUID(),
        new Consumer(['one.topic'], 'MyGroupId0')
      )
    );
    this.consumers.set(
      this.consumers().set(
        crypto.randomUUID(),
        new Consumer(['two.topic'], 'MyGroupId1')
      )
    );
  }

  add(consumer: Consumer) {}

}
