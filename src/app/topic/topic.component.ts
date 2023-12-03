import { Component } from '@angular/core';
import { MessageComponent } from "../message/message.component";

@Component({
    selector: 'app-topic',
    standalone: true,
    templateUrl: './topic.component.html',
    styleUrl: './topic.component.scss',
    imports: [MessageComponent]
})
export class TopicComponent {

}
