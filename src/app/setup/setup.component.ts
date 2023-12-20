import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TopicService } from '../topic/topic.service';
import { Router } from '@angular/router';
import { Topic } from '../topic/topic';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.scss',
})
export class SetupComponent {
  constructor(private topic: TopicService, private router: Router) {}

  topicsQty = 1;
  topics = [{name: '', quantity: 1}];

  topicQtyChanged(value: number) {
    if (value > this.topics.length) {
      for (let i = this.topics.length; i < value; i++) {
        this.topics.push({name: '', quantity: 1});
      }
    } else {
      this.topics = this.topics.slice(0, value);
    }
  }

  save() {
    this.topics.forEach((topic) => {
      this.topic.addTopic(topic.name, topic.quantity);
    });
    this.router.navigate(['kafka']);
  }
}
