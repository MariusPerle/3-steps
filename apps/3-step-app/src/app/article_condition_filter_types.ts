import { Food } from '@3-steps/interfaces';

// Status of experitation
type Status = string;

export interface Filter {
  name: string;
  filter(item: Food, now: Date): Status | null;
}

export const pipe = (...filters: Array<Filter>) => (item: Food, now: Date): Status | null => {
  for( const filter of filters ) {
    const result = filter.filter(item, now);

    // If rule matched
    if( result ) {
      return result;
    }
  }

  // No rule matched
  return null;
}
