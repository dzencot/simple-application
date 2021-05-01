import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Person } from './models/person';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  addPerson(person: Person): Observable<void> {
    return this.http.post<void>('/person', person);
  }

  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>('/persons');
  }
}
