interface Article {
  expiresAt: Date;
  available: number;
  name: string;
}

// Status of experitation
type Status = string;

interface Filter {
  name: string;
  filter(item: Article, now: Date): Status | null;
}

const pipe = (...filters: Array<Filter>) => (item: Article, now: Date): Status | null => {
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
