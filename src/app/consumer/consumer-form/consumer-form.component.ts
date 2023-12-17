import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ConsumerService } from '../consumer.service';

@Component({
  selector: 'app-consumer-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './consumer-form.component.html',
  styleUrl: './consumer-form.component.scss',
})
export class ConsumerFormComponent {
  topicName: string = '';
  groupId: string = '';

  constructor(private consumer: ConsumerService) {}

  addConsumer() {
    this.consumer.addConsumer([this.topicName], this.groupId);
  }
}
