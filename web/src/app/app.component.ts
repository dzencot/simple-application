import { Component } from '@angular/core';
import { ApiService } from './api.service';;
import { Observable } from 'rxjs';

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

  submit() {
    this.apiService.addPerson(this.newUser).subscribe((result) => {
      this.users.push(this.newUser);
      this.newUser = { firstname: '', lastname: '' };
    });
  }
}

interface Person {
  firstname: string,
  lastname: string,
};
