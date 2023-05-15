import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { Character, ResponseInfoResults } from '../shared/character.interface';

@Injectable({
  providedIn: 'root',
})
export class RickyMortyDataService {
  private readonly http = inject(HttpClient);

  constructor() {}

  filterCharacter(name: string): Observable<Character[]> {
    const API = `https://rickandmortyapi.com/api/character?name=${name}`;
    return this.http.get<ResponseInfoResults>(API).pipe(
      map((res) => res?.results),
      catchError(() => EMPTY)
    );
  }
}
