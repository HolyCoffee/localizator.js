declare class loc {
  constructor(l: { [key: string]: string }, lng: string);

  t(k: string, f?: string, p?: string[], pl?: { [key: string]: number }): string;

  arr(o: object, k: string[]): string;

  plural(t: string, pl: { [key: string]: number }): string;

  replacer(v: string): number;
}
