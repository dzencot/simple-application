import { Component } from '@angular/core';
import { ApiService } from './api.service';

import { Person } from './models/person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  users: Person[] = [];
  newUser: Person;

  constructor(private apiService: ApiService) {
    this.newUser = { firstname: '', lastname: '' };
    this.apiService.getPersons().subscribe((persons) => {
      this.users = persons;
    });
  }

  submit(): void {
    this.apiService.addPerson(this.newUser).subscribe(() => {
      this.newUser = { firstname: '', lastname: '' };
    });
  }
}
