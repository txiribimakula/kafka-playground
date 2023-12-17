import { Routes } from '@angular/router';
import { KafkaComponent } from './kafka/kafka.component';
import { SetupComponent } from './setup/setup.component';

export const routes: Routes = [
  { path: '', component: SetupComponent },
  { path: 'kafka', component: KafkaComponent },
];
