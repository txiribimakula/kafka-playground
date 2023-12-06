import { Component, Input, OnInit, Signal, computed } from '@angular/core';
import { KafkaService } from '../kafka.service';
import { Message } from '../message/message';
import { Topic } from '../topic/topic';

@Component({
  selector: 'app-consumer',
  standalone: true,
  imports: [],
  templateUrl: './consumer.component.html',
  styleUrl: './consumer.component.scss',
})
export class ConsumerComponent implements OnInit {
  @Input() topicName!: string;
  topic!: Topic;

  hasPendingMessages?: Signal<boolean>;
  status?: Signal<string>;

  constructor(private kafka: KafkaService) {}

  ngOnInit(): void {
    this.topic = this.kafka.topics().get(this.topicName)!;
    this.consume();

    this.hasPendingMessages = computed(() => {
      if (this.topic) {
        return this.topic.partitions()[0].messages().length > this.topic.partitions()[0].offset();
      }
      return false;
    });

    this.status = computed(() => {
      if (this.hasPendingMessages) {
        return this.hasPendingMessages()
          ? 'Handling existing msgs...'
          : 'Waiting for new msgs...';
      }
      return 'Loading...';
    });
  }

  consume() {
    this.topic.partitions()[0].messages$.subscribe((message) => {
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
