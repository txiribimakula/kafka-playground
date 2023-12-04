import { Component, Input, OnInit, Signal, WritableSignal } from '@angular/core';
import { MessageComponent } from "../message/message.component";
import { KafkaService } from '../kafka.service';
import { Message } from '../message/message';

@Component({
    selector: 'app-topic',
    standalone: true,
    templateUrl: './topic.component.html',
    styleUrl: './topic.component.scss',
    imports: [MessageComponent]
})
export class TopicComponent implements OnInit {
    @Input({required: true}) index!: number;
    messages?: Signal<Message[]>;

    constructor(private kafka: KafkaService) {
    }

    ngOnInit(): void {
        this.messages = this.kafka.topics()[this.index].messages;
    }
}
