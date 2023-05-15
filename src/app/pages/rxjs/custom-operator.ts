import {
  Observable,
  OperatorFunction,
  debounceTime,
  distinctUntilChanged,
  filter,
} from 'rxjs';

export function customOperator<T>(
  filterFn: (value: T) => boolean,
  debounceTimeFn: number,
  distinctFn: (value: T, otherValue: T) => boolean
  // True continua flujo, false rompe flujo
): OperatorFunction<T, T> {
  return (source: Observable<T>) =>
    source.pipe(
      filter(filterFn),
      debounceTime(debounceTimeFn),
      distinctUntilChanged(distinctFn)
    );
}
