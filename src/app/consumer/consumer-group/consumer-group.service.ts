import { Injectable, computed } from '@angular/core';
import { ConsumerService } from '../consumer.service';

@Injectable({
  providedIn: 'root'
})
export class ConsumerGroupService {

  consumerGroups = computed(() => {
    const groupIds = new Set<string>();
    this.consumer.consumers().forEach((consumer) => {
      groupIds.add(consumer().groupId);
    });
    return Array.from(groupIds);
  });
  
  constructor(private consumer: ConsumerService) { }
}
