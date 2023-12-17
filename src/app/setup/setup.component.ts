import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TopicService } from '../topic/topic.service';
import { Router } from '@angular/router';

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
  topicsNames = [''];

  topicQtyChanged(value: number) {
    if (value > this.topicsNames.length) {
      for (let i = this.topicsNames.length; i < value; i++) {
        this.topicsNames.push('');
      }
    } else {
      this.topicsNames = this.topicsNames.slice(0, value);
    }
  }

  save() {
    this.topicsNames.forEach((name) => {
      this.topic.addTopic(name, 1);
    });
    this.router.navigate(['kafka']);
  }
}
