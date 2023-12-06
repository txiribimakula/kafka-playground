import { computed, signal } from '@angular/core';
import { Message } from '../message/message';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

export class Topic {
  constructor(name: string) {
    this.name = name;
  }

  offset = signal(0);
  name: string;
  messages = signal<Message[]>([]);
  currentMessage = computed(() => this.messages()[this.offset()]);
  messages$ = toObservable(this.currentMessage).pipe(
    filter((message) => message != undefined)
  );
}
