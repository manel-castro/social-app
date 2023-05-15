import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

import {
  Observable,
  Subject,
  debounceTime,
  delay,
  distinctUntilChanged,
  filter,
  map,
  of,
  switchMap,
  tap,
  timestamp,
} from 'rxjs';
import { RickyMortyDataService } from 'src/app/services/ricky-morty-data.service';
import { Character } from 'src/app/shared/character.interface';
import { customOperator } from './custom-operator';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css'],
})
export class RxjsComponent {
  data$ = of(1, 2, 3, 4);
  ngOnInit() {
    // Tap Operator
    this.data$
      .pipe(
        map((number: number) => number * number),
        // doesn't affect the final result
        tap((number: number) => number * number),
        tap((res) => console.log(res))
      )
      .subscribe();

    // Delay Operator
    this.data$
      .pipe(
        tap((res) => console.log(res)),
        delay(1000),
        tap((res) => console.log(res))
      )
      .subscribe();

    // Timestamp Operator
    // Creates an object and adds a timestamp property to it
    this.data$
      .pipe(
        timestamp(),
        tap((res) => console.log(res))
      )
      .subscribe();
  }

  // SwitchMap operator
  searchTerm$ = new Subject<string>();
  characters$!: Observable<Character[]>;
  private filterSvc = inject(RickyMortyDataService);

  constructor() {
    this.characters$ = this.searchTerm$.pipe(
      customOperator(
        (term: string) => term.length >= 4,
        300,
        (prev, curr) => prev === curr
      ),
      switchMap((term: string) => this.filterSvc.filterCharacter(term))
    );
  }

  search(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    this.searchTerm$.next(element.value);
  }
}
