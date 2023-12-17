import { Injectable, signal } from '@angular/core';
import { Topic } from './topic';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  topics = signal<Map<string, Topic>>(new Map<string, Topic>());

  constructor() {
  }

  addTopic(name: string, partitions: number) {
    this.topics.set(
      this.topics().set(name, new Topic(name, partitions))
    );
  }
}
