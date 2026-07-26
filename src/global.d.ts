// <SYMBOLS> :: consts :: /declare[ ]const[ ]([a-zA-Z0-9]+)[:]/
declare const add:       unique symbol;
declare const allArr:    unique symbol;
declare const allObj:    unique symbol;
declare const at:        unique symbol;
declare const assert:    unique symbol;
declare const base32:    unique symbol;
declare const base36:    unique symbol;
declare const base62:    unique symbol;
declare const base64Std: unique symbol;
declare const base64Url: unique symbol;
declare const baseline:  unique symbol;
declare const char:      unique symbol;
declare const charset:   unique symbol;
declare const code:      unique symbol;
declare const count:     unique symbol;
declare const cut:       unique symbol;
declare const empty:     unique symbol;
declare const find:      unique symbol;
declare const fire:      unique symbol;
declare const group:     unique symbol;
declare const has:       unique symbol;
declare const hasHead:   unique symbol;
declare const hasTail:   unique symbol;
declare const indent:    unique symbol;
declare const int32:     unique symbol;
declare const int64:     unique symbol;
declare const isInt:     unique symbol;
declare const later:     unique symbol;
declare const limn:      unique symbol;
declare const lower:     unique symbol;
declare const map:       unique symbol;
declare const mapk:      unique symbol;
declare const merge:     unique symbol;
declare const mod:       unique symbol;
declare const padHead:   unique symbol;
declare const padTail:   unique symbol;
declare const rem:       unique symbol;
declare const slash:     unique symbol;
declare const slice:     unique symbol;
declare const suppress:  unique symbol;
declare const toArr:     unique symbol;
declare const toBin:     unique symbol;
declare const toNum:     unique symbol;
declare const toObj:     unique symbol;
declare const toStr:     unique symbol;
declare const upper:     unique symbol;
declare const walk:      unique symbol;
// </SYMBOLS>

declare global {
  
  const clearing: {
    
    skip:       Skip,
    // isCls:      ClsCheck,
    // inCls:      ClsCheck,
    getClsName: (v: any) => string,
    getCls:     (v: any) => any,
    then: {
      // <V, R0 = V, R1 = never>(val: Promise<V>, rsv?: (v: V) => R0, rjc?: (e: any) => R1): Promise<R0 | R1>,
      // <V, R0 = V, R1 = never>(val: V,          rsv?: (v: V) => R0, rjc?: (e: any) => R1): R0 | R1;
      
      <V, R0 = V, R1 = never>(val: Promise<V>, rsv?: (v: V) => Promise<R0> | R0, rjc?: (e: any) => Promise<R1> | R1): Promise<R0 | R1>,
      <V, R0 = V, R1 = never>(val:         V , rsv?: (v: V) =>               R0, rjc?: (e: any) =>               R1):         R0 | R1
    },
    safe: {
      <V, R0 = never>(fn: () => Promise<V>, rjc?: (e: any) => Promise<R0> | R0): Promise<V | R0>,
      <V, R0 = never>(fn: () =>         V , rjc?: (e: any) =>               R0): V | R0
    }
    
  } & {
    
    [K in 'isCls' | 'inCls']: {
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
    }
    
  } & {
    
    // <SYMBOLS> :: declarations :: /^[ ]*([a-zA-Z0-9]+)[:][ ]+typeof \1/
    add:       typeof add,          //`Symbol('@gershy/clearing:add')`,
    allArr:    typeof allArr,       //`Symbol('@gershy/clearing:allArr')`,
    allObj:    typeof allObj,       //`Symbol('@gershy/clearing:allObj')`,
    at:        typeof at,           //`Symbol('@gershy/clearing:at')`,
    assert:    typeof assert,       //`Symbol('@gershy/clearing:assert')`,
    base32:    typeof base32,       //`Symbol('@gershy/clearing:base32')`,
    base36:    typeof base36,       //`Symbol('@gershy/clearing:base36')`,
    base62:    typeof base62,       //`Symbol('@gershy/clearing:base62')`,
    base64Std: typeof base64Std,    //`Symbol('@gershy/clearing:base64Std')`,
    base64Url: typeof base64Url,    //`Symbol('@gershy/clearing:base64Url')`,
    baseline:  typeof baseline,     //`Symbol('@gershy/clearing:baseline')`,
    char:      typeof char,         //`Symbol('@gershy/clearing:char')`,
    charset:   typeof charset,      //`Symbol('@gershy/clearing:charset')`,
    code:      typeof code,         //`Symbol('@gershy/clearing:code')`,
    count:     typeof count,        //`Symbol('@gershy/clearing:count')`,
    cut:       typeof cut,          //`Symbol('@gershy/clearing:cut')`,
    empty:     typeof empty,        //`Symbol('@gershy/clearing:empty')`,
    find:      typeof find,         //`Symbol('@gershy/clearing:find')`,
    fire:      typeof fire,         //`Symbol('@gershy/clearing:fire')`,
    group:     typeof group,        //`Symbol('@gershy/clearing:group')`,
    has:       typeof has,          //`Symbol('@gershy/clearing:has')`,
    hasHead:   typeof hasHead,      //`Symbol('@gershy/clearing:hasHead')`,
    hasTail:   typeof hasTail,      //`Symbol('@gershy/clearing:hasTail')`,
    indent:    typeof indent,       //`Symbol('@gershy/clearing:indent')`,
    int32:     typeof int32,        //`Symbol('@gershy/clearing:int32')`,
    int64:     typeof int64,        //`Symbol('@gershy/clearing:int64')`,
    isInt:     typeof isInt,        //`Symbol('@gershy/clearing:isInt')`,
    later:     typeof later,        //`Symbol('@gershy/clearing:later')`,
    limn:      typeof limn,         //`Symbol('@gershy/clearing:limn')`,
    lower:     typeof lower,        //`Symbol('@gershy/clearing:lower')`,
    map:       typeof map,          //`Symbol('@gershy/clearing:map')`,
    mapk:      typeof mapk,         //`Symbol('@gershy/clearing:mapk')`,
    merge:     typeof merge,        //`Symbol('@gershy/clearing:merge')`,
    mod:       typeof mod,          //`Symbol('@gershy/clearing:mod')`,
    padHead:   typeof padHead,      //`Symbol('@gershy/clearing:padHead')`,
    padTail:   typeof padTail,      //`Symbol('@gershy/clearing:padTail')`,
    rem:       typeof rem,          //`Symbol('@gershy/clearing:rem')`,
    slash:     typeof slash,        //`Symbol('@gershy/clearing:slash')`,
    slice:     typeof slice,        //`Symbol('@gershy/clearing:slice')`,
    suppress:  typeof suppress,     //`Symbol('@gershy/clearing:suppress')`,
    toArr:     typeof toArr,        //`Symbol('@gershy/clearing:toArr')`,
    toBin:     typeof toBin,        //`Symbol('@gershy/clearing:toBin')`,
    toNum:     typeof toNum,        //`Symbol('@gershy/clearing:toNum')`,
    toObj:     typeof toObj,        //`Symbol('@gershy/clearing:toObj')`,
    toStr:     typeof toStr,        //`Symbol('@gershy/clearing:toStr')`,
    upper:     typeof upper,        //`Symbol('@gershy/clearing:upper')`,
    walk:      typeof walk,         //`Symbol('@gershy/clearing:walk')`
    // </SYMBOLS>
    
  };
  
  const cl = clearing;
  
  // Util
  type IsAny<T> = 0 extends (1 & T) ? true : false;
  type Obj<V = any> = { [K in string]: V };
  type Arr<V = any> = V[];
  type Equal<A, B> = 0 extends 1 ? never
    : IsAny<A> extends true ? IsAny<B>
    : IsAny<B> extends true ? IsAny<A>
    : [A] extends [B] ? [B] extends [A] ? true : false : false;
  
  // Differentiate between "map" and "rec" ("record") - maps have arbitrary keys; recs have fixed keys
  type ObjMode<O extends { [K: string]: any }> = O extends { [K in infer KK]: any } ? (string extends KK ? 'map' : 'rec') : never;
  type ObjKeys<O extends Obj> = (keyof O & string) | `${keyof O & number}`; // Convert numbers to strings; ignore symbols
  type ObjVals<O extends Obj> = O[Extract<keyof O, string>];
  type ObjIterator<O extends Obj> = Iterable<[ string, O[keyof O] ]>;
  
  type Loopable0<T> = T[] | Set<T> | (T extends [infer K, infer V] ? Map<K, V> : never) | Generator<T> | AsyncGenerator<T>;
  type Loopable<T> = Loopable0<T> | Promise<Loopable0<T>>;
  
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
  
  // Aggregate keys combined with `&`; strip properties set to `never` and `{}` (empty object)
  type Rekey<O> = O extends infer OO ? { [K in keyof OO as OO[K] extends never ? never : {} extends OO[K] ? never : string & K]: OO[K] } : never;
  
  type DeepMerge<A, B> = 0 extends 1 ? never
    
    : A extends { [K: string]: any }
    ? B extends { [K: string]: any }
    ? [ A, B ] extends [ { [K in infer KA]: any }, { [K in infer KB]: any } ]
  
    ? Rekey<{ [K in KA | KB]: 0 extends 1 ? never
        
        : K extends KB ? (
          
          // Remove undefined values
          B[K] extends undefined ? never
        
          // If K is also in KA it's in both - merge A and B
          : K extends KA         ? DeepMerge<A[K], B[K]>
          
          // Otherwise K is only in KB
          : B[K]
          
        )
        
        : A[K]
        
      }>
    
    : B : B : B;
  
  type CharSet = {
    str: string,
    size: bigint,
    charVal: (c: string) => bigint,
    valChar: (n: bigint) => string
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
    [clearing.upper]:     undefined,
    [clearing.walk]:      undefined
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
  interface ArrayProto<T> extends SymbolsProto {
    [clearing.has]:   (val: unknown) => boolean,
    [clearing.map]:   <R>(fn: (v: T, i: number) => Skip | R) => R[],
    [clearing.toArr]: <R>(fn: (v: T, i: number) => Skip | R) => R[], // Not ideal to allow `Array.prototype.toArr` in addition to `map`, but it allows it to be uniform with other Loopables
    [clearing.add]:   <TT extends T>(val: TT) => TT,
    [clearing.rem]:   <TT extends T>(val: TT) => void,
    [clearing.count]: () => number,
    [clearing.empty]: () => boolean,
    [clearing.toObj]: <R extends readonly [string, any]>(fn: (v: T, n: number) => Skip | R) => { [K in R[0]]: R[1] },
    [clearing.find]:  (fn: (val: T, n: number) => any) => ({ found: true, val: T, ind: number } | { found: false, val: null, ind: null }),
    [clearing.group]: <G extends string>(fn: (v: T, i: number) => Skip | G) => { [K in G]?: T[] }
  }
  interface Array<T> extends ArrayProto<T> {}
  interface ReadonlyArray<T> extends ArrayProto<T> {
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
  interface Object extends SymbolsProto {
    
    [clearing.empty]: <O extends Obj>                                                   (this: O)                                                        => this is Obj<never>,
    [clearing.at]:    <O extends Obj, K extends string | string[], D extends any = Skip>(this: O, k: K, def?: D)                                         => Dive<O, K extends string[] ? K : [ K ], D>,
    [clearing.has]:   <O extends Obj>                                                   (this: O, k: unknown)                                            => k is keyof O,
    [clearing.map]:   <O extends Obj, V>                                                (this: O, fn: (v: ObjVals<O>, k: ObjKeys<O>) => V)               => { [K in keyof O]: Exclude<V, Skip> },
    [clearing.mapk]:  <O extends Obj, K extends string, V>                              (this: O, fn: (v: ObjVals<O>, k: ObjKeys<O>) => Skip | [ K, V ]) => { [KK in K]: V },
    [clearing.merge]: <A extends Obj, B extends Obj>                                    (this: A, val: B)                                                => DeepMerge<A, B>,
    [clearing.slice]: <O extends Obj, K extends readonly (keyof O)[]>                   (this: O, keys: K)                                               => { [P in K[number]]: SkipNever<O[P]> },
    [clearing.slash]: <O extends Obj, T extends readonly (keyof O)[]>                   (this: O, keys: T)                                               => { [K in keyof O as Exclude<keyof O, T[number]>]: O[K] },
    [clearing.toArr]: <O extends Obj, Fn extends (v: O[keyof O], k: ObjKeys<O>) => any> (this: O, fn: Fn)                                                => Exclude<ReturnType<Fn>, Skip>[],
    [clearing.count]:                                                                   ()                                                               => number,
    [clearing.group]: <O extends Obj, G extends string>                                 (this: O, fn: (v: O[keyof O], k: keyof O) => Skip | G)           => { [K in G]?: Partial<O> },
    [clearing.walk]:  <O extends Obj>                                                   (this: O)                                                        => Iterable<[ ObjKeys<O>, ObjVals<O> ]>,
    
    $$inspect: <O>(this: O) => { v: O }
    
  }
  
  interface ArrayBufferConstructor {}
  interface ArrayBuffer {
    [clearing.toStr]: () => string,
    [clearing.toNum]: () => bigint
  }
  interface SharedArrayBuffer {
    [clearing.toStr]: () => string,
    [clearing.toNum]: () => bigint
  }
  
  interface Uint8ArrayConstructor {}
  interface Uint8Array {
    [clearing.toStr]: () => string,
    [clearing.toNum]: () => bigint
  }
  
  interface PromiseConstructor {
    [clearing.allArr]: <V>(arr: Arr<Promise<Skip | V>>) => Promise<Arr<V>>,
    [clearing.allObj]: <V>(obj: Obj<Promise<Skip | V>>) => Promise<Obj<V>>,
    
    [clearing.later]: <T=void>() => PromiseLater<T>
  }
  interface Promise<T> {
    
    // Promises of loopable types support `toArr`
    [clearing.toArr]: T extends (Loopable<infer TT>)
      ? (<R>(fn: (inp: TT) => Skip | R) => Promise<R[]>)
      : undefined
    
  }
  interface PromiseLater<T = void> extends Promise<T> {
    resolve: Equal<T, void> extends true ? () => void : (v: T) => void,
    reject: (err: any) => void
  }
  
  type VV = Equal<void, any>;
  
  interface SetConstructor {}
  interface Set<T> extends SymbolsProto {
    [clearing.count]: () => number,
    [clearing.empty]: () => boolean,
    [clearing.find]: (fn: (val: T) => any) => ({ found: true, val: T } | { found: false, val: null }),
    [clearing.map]: <V>(fn: (val: T, ind: number) => V) => Exclude<V, Skip>[],
    [clearing.toArr]: <V>(fn: (val: T, ind: number) => V) => Exclude<V, Skip>[],
    [clearing.toObj]: <R extends readonly [string, any]>(fn: (val: T) => Skip | R) => Obj<R[1]>,
    [clearing.rem]: (val: T) => void
  }

  interface MapConstructor {}
  interface Map<K, V> extends SymbolsProto {
    [clearing.add]:           (k: K, v: V)                                            => void,
    [clearing.count]:         (this: Map<K, V>)                                       => number,
    [clearing.empty]:         ()                                                      => this is Map<K, never>,
    [clearing.find]:          (fn: (val: V, key: K) => any)                           => ({ found: true, val: V, key: K } | { found: false, val: null, key: null }),
    [clearing.map]:   <T>     (fn: (val: V, key: K) => Skip | readonly [string, any]) => { [K: string]: any },
    [clearing.toArr]: <T>     (fn: (val: V, key: K) => T)                             => Exclude<T, Skip>[],
    [clearing.toObj]: <RK, RV>(fn: (val: V, key: K) => Skip | readonly [ RK, RV ])    => { [K in RK]: RV },
    [clearing.rem]:           (key: K)                                                => void
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
  
  interface Generator<T = unknown, TReturn = any, TNext = any> {
    [clearing.toArr]: <RR>(fn: (v: T) => Skip | RR) => RR[]
  }
  interface AsyncGenerator<T = unknown, TReturn = any, TNext = any> {
    [clearing.toArr]: <RR>(fn: (v: T) => Skip | RR) => Promise<RR[]>
  }
  
}

export {};
