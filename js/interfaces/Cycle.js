declare class C {
  createRenderer(s: string): Injectable;
  createIntent(f: (view: Injectable) => Object): Injectable;
}
declare var Cycle: C

declare class Injectable {
  inject(i: Injectable): void;
  get(s: string): Rx
}

declare class Rx {
  map(f: any): Rx
}
