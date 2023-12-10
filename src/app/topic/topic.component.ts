import { Component, Input, OnInit } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { PartitionComponent } from './partition/partition.component';
import { KafkaService } from '../kafka.service';
import { Partition } from './partition/partition';
import { TopicService } from './topic.service';

@Component({
  selector: 'app-topic',
  standalone: true,
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.scss',
  imports: [MessageComponent, PartitionComponent],
})
export class TopicComponent implements OnInit {
  @Input({ required: true }) name!: string;

  partitions!: Partition[];

  constructor(private topic: TopicService) {}

  ngOnInit(): void {
    this.partitions = this.topic.topics().get(this.name)!.partitions();
  }
}
