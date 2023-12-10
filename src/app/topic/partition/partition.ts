import { computed, signal } from "@angular/core";
import { Message } from "../../message/message";
import { filter } from "rxjs";
import { toObservable } from '@angular/core/rxjs-interop';

export class Partition {

  constructor(index: number) {
    this.index = index;
  }
  
  index: number;

  offset = signal(0);

  messages = signal<Message[]>([]);
  currentMessage = computed(() => this.messages()[this.offset()]);
  messages$ = toObservable(this.currentMessage).pipe(
    filter((message) => {
      console.log(message)
      return message != undefined
    })
  );
}
