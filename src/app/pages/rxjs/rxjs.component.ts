import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

import { Observable, map } from 'rxjs';

interface Response {
  info: any;
  results: any[];
}

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css'],
})
export class RxjsComponent {
  data$!: Observable<any[]>;

  private readonly API = 'https://rickandmortyapi.com/api/character';
  private readonly http = inject(HttpClient);

  ngOnInit() {
    this.data$ = this.http.get<Response>(this.API).pipe(
      map((response: Response) => response.results)
      // map(() => Math.floor(Math.random() * 20))
    );
  }
}
