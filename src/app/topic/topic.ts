import { signal } from '@angular/core';
import { Partition } from './partition/partition';

export class Topic {
  constructor(name: string, partitionsQuantity: number) {
    this.name = name;
    this.partitions = signal(Array.from({length: partitionsQuantity}, (_, i) => new Partition(i)));
  }

  partitions;
  
  name: string;
}
