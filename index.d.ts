declare class loc {
  constructor(l: { [key: string]: string }, lng: string);

  t(k: string, f?: string, p?: string[]): string;

  arr(o: object, k: string[]): string;
}
