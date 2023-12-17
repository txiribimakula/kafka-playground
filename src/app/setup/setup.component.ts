import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.scss',
})
export class SetupComponent {
  topicsQty = 1;
  topicsNames = [''];

  topicQtyChanged(value: number) {
    console.log(value);
    if(value > this.topicsNames.length) {
      for(let i = this.topicsNames.length; i < value; i++) {
        this.topicsNames.push('');
      }
    } else {
      this.topicsNames = this.topicsNames.slice(0, value);
    }
  }

  save() {
    console.log('save ' + this.topicsNames);
  }
}
