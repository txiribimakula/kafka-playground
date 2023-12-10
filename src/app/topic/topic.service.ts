import { Injectable, signal } from '@angular/core';
import { Topic } from './topic';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  topics = signal<Map<string, Topic>>(new Map<string, Topic>());

  constructor() {
    var topic1 = new Topic('one.topic', 3);
    var topic2 = new Topic('two.topic', 1);
    this.topics.set(this.topics().set(topic1.name, topic1));
    this.topics.set(this.topics().set(topic2.name, topic2));
  }
}
