declare class loc {
  constructor(l: { [key: string]: string });

  c(l: { [key: string]: string }): void;

  t(k: string, f?: string | null, p?: Array<string | number> | { [key: string]: string }, pl?: { [key: string]: number }): string;

  a(o: object, k: string[]): string;

  p(t: string, pl: { [key: string]: number }): string;

  r(v: string): number;
}

export default loc;

declare const vuel: {
  install(V: any, o: { loc: loc; locale: { [key: string]: string } }): void;
};

export { vuel };
