import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor() {}

  search$(user: string): Observable<any> {
    const found = users.find((item) => item.name === user);
    return found ? of(found) : EMPTY;
  }
}

export interface User {
  name: string;
}

const users = [
  {
    name: 'test',
  },
  {
    name: 'test1',
  },
  {
    name: 'test2',
  },
  {
    name: 'test3',
  },
];
