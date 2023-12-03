import { Component } from '@angular/core';
import { MessageComponent } from "../message/message.component";
import { KafkaService } from '../kafka.service';

@Component({
    selector: 'app-topic',
    standalone: true,
    templateUrl: './topic.component.html',
    styleUrl: './topic.component.scss',
    imports: [MessageComponent]
})
export class TopicComponent {
    messages;

    constructor(kafka: KafkaService) {
        this.messages = kafka.messages;
    }
}
