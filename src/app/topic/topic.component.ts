import { Component, Input, OnInit } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { PartitionComponent } from './partition/partition.component';
import { Partition } from './partition/partition';
import { TopicService } from './topic.service';
import { ConsumerGroupService } from '../consumer/consumer-group/consumer-group.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-topic',
  standalone: true,
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.scss',
  imports: [MessageComponent, PartitionComponent, MatCardModule],
})
export class TopicComponent implements OnInit {
  @Input({ required: true }) name!: string;

  partitions!: Partition[];

  constructor(private topic: TopicService, protected consumerGroup: ConsumerGroupService) {}

  ngOnInit(): void {
    this.partitions = this.topic.topics().get(this.name)!.partitions();
  }
}
