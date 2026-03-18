declare global {

  // Util
  type Obj<V = any> = { [k: string]: V };
  type Arr<V = any> = V[];
  
  // Differentiate between "map" and "rec" ("record") - maps have arbitrary keys; recs have fixed keys
  type ObjMode<O extends { [K: string]: any }> = O extends { [K in infer KK]: any } ? (string extends KK ? 'map' : 'rec') : never;
  type ObjKeys<O extends Obj> = Extract<keyof O, string> | `${Extract<keyof O, number>}`; // Convert numbers to strings; ignores symbols
  type ObjVals<O extends Obj> = O[Extract<keyof O, string>];
  type ObjIterator<O extends Obj> = Iterable<[ string, O[keyof O] ]>;
  
  type Json = null | boolean | number | string | Json[] | { [K: string]: Json };
  type Skip = undefined;
  type SkipNever<V> = V extends Skip ? Skip extends V ? never : V : V;
  
  type Dive<O extends Obj, K extends readonly string[], D = undefined> =
    K extends [ infer K0 extends string, ...infer KM extends string[] ]
      ? K0 extends keyof O
        // For maps, where the type implies "any string" but we know that can't be the case, add
        // the default value into the union of possible results, reflecting the possibility that
        // the dive key misses
        ? (ObjMode<O> extends 'map' ? D : never) | Dive<O[K0], KM, D>
        : D
      : O;
  
  type CharSet = {
    str: string,
    size: bigint,
    charVal: (c: string) => bigint,
    valChar: (n: bigint) => string
  };
  
  type Then = {
    <V, R0 = V, R1 = never>(val: Promise<V>, rsv?: (v: V) => R0, rjc?: (e: any) => R1): Promise<R0 | R1>,
    <V, R0 = V, R1 = never>(val: V,          rsv?: (v: V) => R0, rjc?: (e: any) => R1): R0 | R1;
  };
  type Safe = {
    <V, R0 = never>(fn: () => Promise<V>, rjc?: (e: any) => R0): Promise<V | R0>,
    <V, R0 = never>(fn: () =>          V, rjc?: (e: any) => R0): Promise<V | R0>
  };
  type ClsCheck = {
    (i: unknown, num:    BooleanConstructor):  i is boolean,
    (i: unknown, num:    NumberConstructor):   i is number,
    (i: unknown, str:    StringConstructor):   i is string,
    (i: unknown, buff:   Buffer):              i is Buffer,
    (i: unknown, arr:    ArrayConstructor):    i is any[],
    (i: unknown, obj:    ObjectConstructor):   i is Obj<unknown>,
    (i: unknown, fn:     FunctionConstructor): i is (...args: any[]) => any,
    (i: unknown, fn:     SymbolConstructor):   i is symbol,
    <T>(i: unknown, prm: PromiseConstructor):  i is Promise<T>,
    <C extends abstract new (...args: any) => any>(i: unknown, cls: C): i is InstanceType<C>
  };
  
  const clearing: readonly {
    
    skip:       Skip,
    isCls:      ClsCheck,
    inCls:      ClsCheck,
    getClsName: (v: any) => string,
    getCls:     (v: any) => any,
    
    // <SYMBOLS> :: declarations :: /([a-zA-Z0-9]+)[:]/
    add:       '@gershy/clearing/add',
    allArr:    '@gershy/clearing/allArr',
    allObj:    '@gershy/clearing/allObj',
    at:        '@gershy/clearing/at',
    assert:    '@gershy/clearing/assert',
    base32:    '@gershy/clearing/base32',
    base36:    '@gershy/clearing/base36',
    base62:    '@gershy/clearing/base62',
    base64Std: '@gershy/clearing/base64Std',
    base64Url: '@gershy/clearing/base64Url',
    baseline:  '@gershy/clearing/baseline',
    char:      '@gershy/clearing/char',
    charset:   '@gershy/clearing/charset',
    code:      '@gershy/clearing/code',
    count:     '@gershy/clearing/count',
    cut:       '@gershy/clearing/cut',
    empty:     '@gershy/clearing/empty',
    find:      '@gershy/clearing/find',
    fire:      '@gershy/clearing/fire',
    group:     '@gershy/clearing/group',
    has:       '@gershy/clearing/has',
    hasHead:   '@gershy/clearing/hasHead',
    hasTail:   '@gershy/clearing/hasTail',
    indent:    '@gershy/clearing/indent',
    int32:     '@gershy/clearing/int32',
    int64:     '@gershy/clearing/int64',
    isInt:     '@gershy/clearing/isInt',
    later:     '@gershy/clearing/later',
    limn:      '@gershy/clearing/limn',
    lower:     '@gershy/clearing/lower',
    map:       '@gershy/clearing/map',
    mapk:      '@gershy/clearing/mapk',
    merge:     '@gershy/clearing/merge',
    mod:       '@gershy/clearing/mod',
    padHead:   '@gershy/clearing/padHead',
    padTail:   '@gershy/clearing/padTail',
    rem:       '@gershy/clearing/rem',
    slash:     '@gershy/clearing/slash',
    slice:     '@gershy/clearing/slice',
    suppress:  '@gershy/clearing/suppress',
    toArr:     '@gershy/clearing/toArr',
    toBin:     '@gershy/clearing/toBin',
    toNum:     '@gershy/clearing/toNum',
    toObj:     '@gershy/clearing/toObj',
    toStr:     '@gershy/clearing/toStr',
    upper:     '@gershy/clearing/upper',
    // </SYMBOLS>
  };
  
  // Adding symbol properties to Object.prototype will cause typescript to think these properties
  // are also available for extending types, e.g. Array - to avoid this we merge in an object which
  // defines every symbol as `undefined`!
  type SymbolsProto = {
    // <SYMBOLS> :: proto :: /\[clearing[.]([a-zA-Z0-9]+)\][ ]*[:][ ]*undefined
    [clearing.add]:       undefined,
    [clearing.allArr]:    undefined,
    [clearing.allObj]:    undefined,
    [clearing.at]:        undefined,
    [clearing.assert]:    undefined,
    [clearing.base32]:    undefined,
    [clearing.base36]:    undefined,
    [clearing.base62]:    undefined,
    [clearing.base64Std]: undefined,
    [clearing.base64Url]: undefined,
    [clearing.baseline]:  undefined,
    [clearing.char]:      undefined,
    [clearing.charset]:   undefined,
    [clearing.code]:      undefined,
    [clearing.count]:     undefined,
    [clearing.cut]:       undefined,
    [clearing.empty]:     undefined,
    [clearing.find]:      undefined,
    [clearing.fire]:      undefined,
    [clearing.group]:     undefined,
    [clearing.has]:       undefined,
    [clearing.hasHead]:   undefined,
    [clearing.hasTail]:   undefined,
    [clearing.indent]:    undefined,
    [clearing.int32]:     undefined,
    [clearing.int64]:     undefined,
    [clearing.isInt]:     undefined,
    [clearing.later]:     undefined,
    [clearing.limn]:      undefined,
    [clearing.lower]:     undefined,
    [clearing.map]:       undefined,
    [clearing.mapk]:      undefined,
    [clearing.merge]:     undefined,
    [clearing.mod]:       undefined,
    [clearing.padHead]:   undefined,
    [clearing.padTail]:   undefined,
    [clearing.rem]:       undefined,
    [clearing.slash]:     undefined,
    [clearing.slice]:     undefined,
    [clearing.suppress]:  undefined,
    [clearing.toArr]:     undefined,
    [clearing.toBin]:     undefined,
    [clearing.toNum]:     undefined,
    [clearing.toObj]:     undefined,
    [clearing.toStr]:     undefined,
    [clearing.upper]:     undefined
    // </SYMBOLS>
  };
  
  interface ErrorConstructor {
    [clearing.assert]: <V = any>(args: V, fn: (args: V) => boolean) => void
  }
  interface Error extends SymbolsProto {
    [clearing.mod]:      (props:  string | Obj<any> | ((msg: string, err: Error) => Obj<any>)) => Error,
    [clearing.fire]:     (props?: string | Obj<any> | ((msg: string, err: Error) => Obj<any>)) => never,
    [clearing.suppress]: () => Error,
    [clearing.limn]: (seen?: Map<any, any>) => (Obj<Json> & {
      form: string,
      msg: string,
      trace: string[],
      cause: null | ReturnType<Error[typeof limn]>
    })
  }
  
  interface ArrayConstructor {}
  interface Array<T> extends SymbolsProto {
    [clearing.has]: (val: unknown) => boolean,
    [clearing.map]: <Fn extends (v: T, i: number) => any>(fn: Fn) => Exclude<ReturnType<Fn>, Skip>[],
    [clearing.add]: <TT extends T>(val: TT) => TT,
    [clearing.rem]: <TT extends T>(val: TT) => void,
    [clearing.count]: () => number,
    [clearing.empty]: () => boolean,
    [clearing.toObj]: <R extends readonly [string, any]>(fn: (v: T, n: number) => Skip | R) => { [K in R[0]]: R[1] },
    [clearing.find]: (fn: (val: T, n: number) => any) => ({ found: true, val: T, ind: number } | { found: false, val: null, ind: null }),
    [clearing.group]: <G extends string>(fn: (v: T, i: number) => Skip | G) => { [K in G]?: T[] }
  }
  
  interface NumberConstructor {
    [clearing.int32]: number,
    [clearing.int64]: number
  }
  interface Number extends SymbolsProto {
    [clearing.char]: () => string,
    [clearing.isInt]: () => boolean,
    [clearing.toStr]: (str: string | CharSet, len?: number) => string,
    [clearing.toArr]: <T>(fn: (n: number) => T) => T[],
    [clearing.toObj]: <R extends readonly [string, any]>(fn: (n: number) => Skip | R) => { [K in R[0]]: R[1] },
    [clearing.toBin]: () => Uint8Array,
    [Symbol.iterator]: () => Generator<number>
  }
  
  interface BigIntConstructor {}
  interface BigInt extends SymbolsProto {
    [clearing.toStr]: (str: string | CharSet, len?: number) => string,
    [clearing.toBin]: () => Uint8Array
  }
  
  interface ObjectConstructor {}
  interface Object {
    [clearing.empty]: () => boolean,
    [clearing.at]: <O extends Obj, K extends string | string[], D extends any = undefined>(this: O, k: K, def?: D) => Dive<O, K extends string[] ? K : [ K ], D>,
    [clearing.has]: <O extends Obj>(this: O, k: unknown) => k is keyof O,
    [clearing.map]: <O extends Obj, Fn extends (v: ObjVals<O>, k: ObjKeys<O>) => any>(this: O, fn: Fn) => { [K in keyof O]: Exclude<ReturnType<Fn>, Skip> },
    [clearing.mapk]: <O extends Obj, Fn extends (v: O[keyof O], k: ObjKeys<O>) => undefined | [ string, any ]>(this: O, fn: Fn) => { [K: string]: any },
    [clearing.merge]: <O1 extends Obj, O2 extends Obj>(this: O1, val: O2) => O1 & O2,
    [clearing.slice]: <O extends Obj, K extends readonly (keyof O)[]>(this: O, keys: K) => { [P in K[number]]: SkipNever<O[P]> },
    [clearing.slash]: <O extends Obj, T extends readonly (keyof O)[]>(this: O, keys: T) => { [K in keyof O as Exclude<keyof O, T[number]>]: O[K] },
    [clearing.toArr]: <O extends Obj, Fn extends (v: O[keyof O], k: ObjKeys<O>) => any>(this: O, fn: Fn) => Exclude<ReturnType<Fn>, Skip>[],
    [clearing.count]: () => number,
    [clearing.group]: <O extends Obj, G extends string>(this: O, fn: (v: O[keyof O], k: keyof O) => Skip | G) => { [K in G]?: Partial<O> },
    [Symbol.iterator]: <O extends Obj>(this: O) => Iterator<[ ObjKeys<O>, ObjVals<O> ]>,
    
    $$inspect: <O>(this: O) => { v: O }
    
  }
  
  interface ArrayBufferConstructor {}
  interface ArrayBuffer {
    [clearing.toStr]: () => string,
    [clearing.toNum]: () => bigint
  }
  
  interface Uint8ArrayConstructor {}
  interface Uint8Array {
    [clearing.toStr]: () => string,
    [clearing.toNum]: () => bigint
  }
  
  interface PromiseConstructor {
    [clearing.allArr]: <V extends Promise<any>>(arr: Arr<V>) => Promise<Arr<Exclude<Awaited<V>, Skip>>>,
    [clearing.allObj]: <V extends Promise<any>>(obj: Obj<V>) => Promise<Obj<Exclude<Awaited<V>, Skip>>>,
    // [allObj]: <O extends { [K: string]: Promise<any> }>(obj: O)   => Promise<{ [K in keyof O]: Exclude<Awaited<O[K]>, Skip> }>,
    [clearing.later]: <T=void>() => PromiseLater<T>
  }
  interface Promise<T> {}
  interface PromiseLater<T=void> extends Promise<T> {
    resolve: T extends void ? () => void : (v: T) => void,
    reject: (err: any) => void
  }
  
  interface SetConstructor {}
  interface Set<T> extends SymbolsProto {
    [clearing.count]: () => number,
    [clearing.empty]: () => boolean,
    [clearing.find]: (fn: (val: T) => any) => ({ found: true, val: T } | { found: false, val: null }),
    [clearing.map]: <V>(fn: (val: T, ind: number) => V) => Exclude<V, Skip>[],
    [clearing.toArr]: <V>(fn: (val: T, ind: number) => V) => Exclude<V, Skip>[],
    [clearing.toObj]: <R extends readonly [string, any]>(fn: (val: T) => Skip | R) => { [K: string]: any },
    [clearing.rem]: (val: T) => void
  }

  interface MapConstructor {}
  interface Map<K, V> extends SymbolsProto {
    [clearing.add]: (k: K, v: V) => void,
    [clearing.count]: () => number,
    [clearing.empty]: () => boolean,
    [clearing.find]: (fn: (val: V, key: K) => any) => ({ found: true, val: V, key: K } | { found: false, val: null, key: null }),
    [clearing.map]: <T>(fn: (val: V, key: K) => Skip | readonly [string, any]) => { [K: string]: any },
    [clearing.toArr]: <T>(fn: (val: V, key: K) => T) => Exclude<T, Skip>[],
    [clearing.toObj]: <R extends [ string, any ]>(fn: (val: V, key: K) => Skip | R) => { [K in R[0]]: R[1] },
    [clearing.rem]: (key: K) => void
  }

  interface StringConstructor {
    [clearing.base32]:    string,
    [clearing.base36]:    string,
    [clearing.base62]:    string,
    [clearing.base64Url]: string,
    [clearing.base64Std]: string,
    [clearing.baseline]:  (str: string) => string,
    [clearing.charset]:   (str: string) => CharSet,
  }
  interface String extends SymbolsProto {
    [clearing.code]: (ind?: number) => number,
    [clearing.count]: () => number,
    [clearing.has]: (s: string) => boolean,
    [clearing.padHead]: (n: number, s?: string) => string,
    [clearing.padTail]: (n: number, s?: string) => string,
    [clearing.toNum]: (chrs: string | CharSet) => bigint,
    [clearing.toBin]: () => Uint8Array,
    [clearing.hasHead]: <H extends string>(this: string, head: H) => this is `${H}${string}`,
    [clearing.hasTail]: <T extends string>(this: string, tail: T) => this is `${string}${T}`,
    [clearing.upper]: <S extends string>(this: S) => Uppercase<S>,
    [clearing.lower]: <S extends string>(this: S) => Lowercase<S>,
    [clearing.cut]: {
      (str: string, cuts: 1): [ string, string ],
      (str: string, cuts: 2): [ string, string, string ],
      (str: string, cuts: 3): [ string, string, string, string ],
      (str: string, cuts: 4): [ string, string, string, string, string ],
      (str: string, cuts?: number): string[]
    },
    [clearing.indent]: {
      (amount: number, char?: string): string,
      (str: string): string
    }
  }

}

export {};

