import { Component, Input } from '@angular/core';
import { Message } from './message';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  @Input({ required: true }) message!: Message;
}
