import { signal } from '@angular/core';
import { Partition } from './partition/partition';

export class Topic {
  constructor(name: string) {
    this.name = name;
  }
  partitions = signal([new Partition(0), new Partition(1)]);
  
  name: string;
}
