import { Component, Input, OnInit, effect } from '@angular/core';
import { KafkaService } from '../kafka.service';
import { Message } from '../message/message';

@Component({
  selector: 'app-consumer',
  standalone: true,
  imports: [],
  templateUrl: './consumer.component.html',
  styleUrl: './consumer.component.scss',
})
export class ConsumerComponent implements OnInit {
  @Input() topicName!: string;

  constructor(private kafka: KafkaService) {}

  ngOnInit(): void {
    this.consume();
  }

  consume() {
    this.kafka
      .topics()
      .get(this.topicName)!
      .messages$.subscribe((message) => {
        this.handle(message);
      });
  }

  async handle(message: Message) {
    await this.work(message);
    this.kafka.commit(this.topicName, message);
  }

  async work(message: Message) {
    await new Promise((_) => setTimeout(_, 1500));
  }
}
