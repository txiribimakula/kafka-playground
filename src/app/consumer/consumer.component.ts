import { Component, Input, OnInit, Signal, computed } from '@angular/core';
import { KafkaService } from '../kafka.service';
import { Message } from '../message/message';
import { Consumer } from './consumer';
import { concat, concatMap } from 'rxjs';

@Component({
  selector: 'app-consumer',
  standalone: true,
  imports: [],
  templateUrl: './consumer.component.html',
  styleUrl: './consumer.component.scss',
})
export class ConsumerComponent implements OnInit {
  @Input() consumer!: Signal<Consumer>;

  status: Signal<string>;

  constructor(private kafka: KafkaService) {
    this.status = computed(() => this.consumer().topicsNames.join(', ') + ' - ');
  }

  ngOnInit(): void {
    this.consume();
  }

  ngAfterViewInit(): void {
    console.log(this.consumer);
  }

  consume() {
    this.consumer().messages$
      .pipe(concatMap((message) => this.handle(message)))
      .subscribe();
  }

  async handle(message: Message) {
    await this.work(message);
    console.log(this.consumer);
    this.kafka.commit(message);
  }

  async work(message: Message) {
    await new Promise((_) => setTimeout(_, 1500));
  }
}
