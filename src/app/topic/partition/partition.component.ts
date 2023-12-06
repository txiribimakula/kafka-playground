import { Component, Input, Signal } from '@angular/core';
import { KafkaService } from '../../kafka.service';
import { Message } from '../../message/message';
import { MessageComponent } from "../../message/message.component";
import { Partition } from './partition';

@Component({
    selector: 'app-partition',
    standalone: true,
    templateUrl: './partition.component.html',
    styleUrl: './partition.component.scss',
    imports: [MessageComponent]
})
export class PartitionComponent {
  @Input() partition!: Partition;
  messages?: Signal<Message[]>;

  constructor(private kafka: KafkaService) {
  }

  ngOnInit(): void {
      this.messages = this.partition.messages;
  }
}
