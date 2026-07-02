import './main.ts';
import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { testRunner, assertEqual } from '../build/utils.test.ts';

// <SYMBOLS> :: testDefs :: /const[ ]([a-zA-Z0-9]+)[:]/
const add:       typeof cl.add       = cl.add;
const allArr:    typeof cl.allArr    = cl.allArr;
const allObj:    typeof cl.allObj    = cl.allObj;
const at:        typeof cl.at        = cl.at;
const assert:    typeof cl.assert    = cl.assert;
// const base32:    typeof cl.base32    = cl.base32; // TODO: Add tests for commented-out values...
// const base36:    typeof cl.base36    = cl.base36;
const base62:    typeof cl.base62    = cl.base62;
// const base64Std: typeof cl.base64Std = cl.base64Std;
const base64Url: typeof cl.base64Url = cl.base64Url;
const baseline:  typeof cl.baseline  = cl.baseline;
const char:      typeof cl.char      = cl.char;
const charset:   typeof cl.charset   = cl.charset;
const code:      typeof cl.code      = cl.code;
const count:     typeof cl.count     = cl.count;
const cut:       typeof cl.cut       = cl.cut;
const empty:     typeof cl.empty     = cl.empty;
const find:      typeof cl.find      = cl.find;
const fire:      typeof cl.fire      = cl.fire;
const group:     typeof cl.group     = cl.group;
const has:       typeof cl.has       = cl.has;
const hasHead:   typeof cl.hasHead   = cl.hasHead;
const hasTail:   typeof cl.hasTail   = cl.hasTail;
const indent:    typeof cl.indent    = cl.indent;
const int32:     typeof cl.int32     = cl.int32;
const int64:     typeof cl.int64     = cl.int64;
const isInt:     typeof cl.isInt     = cl.isInt;
const later:     typeof cl.later     = cl.later;
const limn:      typeof cl.limn      = cl.limn;
const lower:     typeof cl.lower     = cl.lower;
const map:       typeof cl.map       = cl.map;
const mapk:      typeof cl.mapk      = cl.mapk;
const merge:     typeof cl.merge     = cl.merge;
const mod:       typeof cl.mod       = cl.mod;
const padHead:   typeof cl.padHead   = cl.padHead;
const padTail:   typeof cl.padTail   = cl.padTail;
const rem:       typeof cl.rem       = cl.rem;
const slash:     typeof cl.slash     = cl.slash;
const slice:     typeof cl.slice     = cl.slice;
const suppress:  typeof cl.suppress  = cl.suppress;
const toArr:     typeof cl.toArr     = cl.toArr;
const toBin:     typeof cl.toBin     = cl.toBin;
const toNum:     typeof cl.toNum     = cl.toNum;
const toObj:     typeof cl.toObj     = cl.toObj;
const toStr:     typeof cl.toStr     = cl.toStr;
const upper:     typeof cl.upper     = cl.upper;
const walk:      typeof cl.walk      = cl.walk;
// </SYMBOLS>

// Type testing
(async () => {
  
  type Enforce<Provided, Expected extends Provided> = { provided: Provided, expected: Expected };
  
  type Tests = {
    
    1: Enforce<
      Dive<{ a: { b: { c: 'xyz' } } }, []>,
      { a: { b: { c: 'xyz' } } }
    >,
    
    2: Enforce<
      Dive<{ a: { b: { c: 'xyz' } } }, [ 'a', 'b', 'c' ]>,
      'xyz'
    >,
    
    3: Enforce<
      Dive<{ a: { b: { c: 'xyz' } } }, [ 'a', 'b' ]>,
      { c: 'xyz' }
    >,
    
    4: Enforce<
      Dive<{ a: { b: { c: 'xyz' } } }, [ 'a', 'b', 'd' ]>,
      undefined
    >,
    
    5: Enforce<
      Dive<{ a: { b: { c: 'xyz' } } }, [ 'a', 'c', 'b' ]>,
      undefined
    >,
    
    6: Enforce<
      Dive<{ [K: string]: 'z' }, [ 'a' ], 'def'>,
      'def' | 'z'
    >,
    
    7: Enforce<
      Dive<{ [K in 'a' | 'b']: 'z' }, [ 'a' ], 'def'>,
      'z'
    >,
    
    8: Enforce<
      DeepMerge<{ x: 0 }, { x: 1 }>,
      { x: 1 }
    >,
    
    9: Enforce<
      DeepMerge<{ x: 0 }, { x: 1 }>,
      { x: 1 }
    >,
    
    10: Enforce<
      DeepMerge<{}, { x: 1 }>,
      { x: 1 }
    >,
    
    11: Enforce<
      DeepMerge<{ x: { x: 0 } }, { x: 1 }>,
      { x: 1 }
    >,
    
    12: Enforce<
      DeepMerge<{ x: { x: 0 } }, { a: 1 }>,
      { x: { x: 0 }, a: 1 }
    >,
    
    13: Enforce<
      DeepMerge<{ x: { x: 0 } }, { a: 1 }>,
      { x: { x: 0 }, a: 1 }
    >,
    
    14: Enforce<
      DeepMerge<{ a: 1, x: { x: 0 } }, { x: { x: undefined } }>,
      { a: 1, x: { x: never } }
    >,
    
    15: Enforce<
      DeepMerge<{}, Obj<{ x: string }>>,
      { [K: string]: { x: string } }
    >,
    
    // It should be possible to call `cl.toArr` on any loopable whether or not a Promise
    16: Enforce<
      (Loopable<string>)[typeof cl.toArr],
      (...arr: any[]) => any
    >,
    
    // Promise resolving to loopable type supports `cl.toArr`
    17: Enforce<
      Promise<Loopable<any>>[typeof cl.toArr],
      (...args: any[]) => any
    >,
    
    // Promise resolving to non-loopable type does not support `cl.toArr`
    18: Enforce<
      Promise<null>[typeof cl.toArr],
      undefined
    >
    
  };
  void (0 as any as Tests);
  
})();

// Enforce symbol alignment for global.d.ts vs main.ts - typescript doesn't seem up to it!
(async () => {
  
  await (async () => {
    
    const fp = dirname(fileURLToPath(import.meta.url));
    const getSymbolSets = function*(str: string) {
      
      let lines = str.split('\n');
      while (true) {
        
        const ind0 = lines.findIndex(ln => ln.includes('<SYM' + 'BOLS>'));
        const ind1 = lines.findIndex(ln => ln.includes('</SYM' + 'BOLS>'));
        
        if (ind0 === -1) break;
        
        const split = lines[ind0].split('::');
        const location = split[1].trim();
        const regBody = split[2].trim().slice('/'.length, -'/'.length);
        const symLines = lines.slice(ind0 + 1, ind1);
        lines = lines.slice(ind1 + 1);
        
        const reg = new RegExp(regBody);
        yield {
          location,
          lines: symLines
            .map(line => {
              
              line = line.trim();
              if (!line) return null;
              
              const match = line.match(reg);
              if (!match) throw Object.assign(Error('bad symbol line'), { fp, location, reg, line });
              
              return match[1];
              
            })
            .filter(ln => !!ln) as string[]
        };
        
      }
      
    };
    
    const fileDataArr = await Promise.all(
      [ 'global.d.ts', 'main.ts' ]
        .map(fd => readFile(join(fp, fd), 'utf8'))
    );
    const symSets = fileDataArr.map(fileData => [ ...getSymbolSets(fileData) ]).flat(1);
    
    const maxLen = Math.max(...symSets.map(symSet => symSet.lines.length));
    for (const symSet of symSets)
      while (symSet.lines.length < maxLen)
        symSet.lines.push('<end of syms>');
    
    for (let i = 0; i < maxLen; i++) {
      
      const syms = symSets.map(symSet => symSet.lines[i]);
      if (!syms.every(sym => sym === syms[0]))
        throw Object.assign(Error('symbol mismatch'), {
          index: i,
          syms: symSets.map(symSet => ({ location: symSet.location, sym: symSet.lines[i] }))
        });
      
    }
    
  })();
  
})();

testRunner([
  
  { name: 'Typing sanity', fn: async () => {
    
    const obj0: Obj<number> = { a: 1, b: 2 };
    assertEqual(obj0[at]('a'), 1);
    
    const obj1 = ({ a: 1, b: 2 } as Obj<number>)
      [map](v => v * 2);
    
    const obj2 = ({ a: 1, b: 2 } as Obj<number>)
      [map](v => v * 2)
      [map](v => v * 2);
    
    const obj3 = ({ a: 1, b: 2 } as Obj<number>)
      [map](v => v * 2)
      [map](v => v * 2)
      [map](v => v * 2);
    
    const obj4 = ({ a: 1, b: 2 } as Obj<number>)
      [mapk]((v, k) => [ k.repeat(3), v * 2 ])
      [mapk]((v, k) => [ k.repeat(3), v * 2 ])
      [map]((v, k) => ({ v, str: k.repeat(v) }));
    
    if (0) ((v = [ obj1, obj2, obj3, obj4 ]) => void 0)();
    
    const v6 = [ 'a', 'b', 'c' ] as const;
    v6[toObj](v => [ v, v.repeat(3) ] as const);
    
    const v7 = [ 'a', 'b', 'c' ];
    v7[toObj](v => [ v, v.repeat(3) ] as const);
    
  }},
  { name: 'Object.prototype[at]', fn: async () => {
    
    const obj0 = { a: { b: { c: 'z' } } };
    
    const v0 = obj0[at]([ 'a', 'b' ] as const);
    if (v0 !== obj0.a.b) throw Error('failed');
    
    const v1 = obj0[at]([ 'a', 'b', 'c', 'd' ] as const);
    if (v1 !== undefined) throw Error('failed');
    
    const v2 = obj0[at]([ 'z' ] as const);
    if (v2 !== undefined) throw Error('failed');
    
    const obj1 = {};
    const v3 = obj1[at]([]);
    if (v3 !== obj1) throw Error('failed');
    
    const v4 = obj1[at]([ 'a' ]);
    if (v4 !== undefined) throw Error('failed');
    
    const v5 = obj1[at]([ 'a' ], 'hihi');
    if (v5 !== 'hihi') throw Error('failed');
    
  }},
  { name: 'Object.prototype[count]', fn: async () => {
    if (({})[count]() !== 0) throw Error('failed');
    if (({ a: 1, b: 2 })[count]() !== 2) throw Error('failed');
  }},
  { name: 'Object.prototype[empty]', fn: async () => {
    if (({})[empty]() !== true) throw Error('failed');
    if (({ a: 1 })[empty]() !== false) throw Error('failed');
  }},
  { name: 'Object.prototype[group]', fn: async () => {
    const obj = { a: 1, b: 10, c: 3 };
    const grouped = obj[group](n => n < 5 ? 'small' : 'big');
    assertEqual(grouped, { small: { a: 1, c: 3 }, big: { b: 10 } });
  }},
  { name: 'Object.prototype[has]', fn: async () => {
    const obj = { a: 1 };
    if (!obj[has]('a')) throw Error('failed');
    if (obj[has]('b')) throw Error('failed');
  }},
  { name: 'Object.prototype[map]', fn: async () => {
    const obj = { a: 1, b: 2 };
    const mapped = obj[map](v => v * 2);
    assertEqual(mapped, { a: 2, b: 4 });
  }},
  { name: 'Object.prototype[mapk]', fn: async () => {
    const obj = { a: 1, b: 2 };
    const mapped = obj[mapk]((v, k) => [ k.toUpperCase(), v * 10 ]);
    assertEqual(mapped, { A: 10, B: 20 });
  }},
  { name: 'Object.prototype[merge]', fn: async () => {
    
    assertEqual(
      { a: 1, b: { c: 2 } }[merge]({ b: { d: 3 }, e: 4 }),
      { a: 1, b: { c: 2, d: 3 }, e: 4 }
    );
    
    assertEqual(
      // Here the `undefined` value in the head object is preserved, while the `skip` in the tail
      // object causes a property deletion
      { a: 1, x: undefined, b: { c: 2 } }[merge]({ b: { d: 3, c: cl.skip }, e: 4 }),
      { a: 1, x: undefined, b: { d: 3 }, e: 4 }
    );
    
  }},
  { name: 'Object.prototype[slash]', fn: async () => {
    const obj = { a: 1, b: 2, c: 3 };
    const slashed = obj[slash]([ 'b' ]);
    assertEqual(slashed, { a: 1, c: 3 });
  }},
  { name: 'Object.prototype[slice]', fn: async () => {
    const obj = { a: 1, b: 2, c: 3 };
    const sliced = obj[slice]([ 'a', 'c' ]);
    assertEqual(sliced, { a: 1, c: 3 });
  }},
  { name: 'Object.prototype[toArr]', fn: async () => {
    const obj = { a: 1, b: 2 };
    const arr = obj[toArr]((v, k) => `${k}=${v}`);
    assertEqual(arr, [ 'a=1', 'b=2' ]);
  }},
  { name: 'Object.prototype[Symbol.iterator]', fn: async () => {
    const obj = { a: 1, b: 2 };
    const entries: [string, number][] = [];
    for (const [ key, val ] of obj[walk]()) entries.push([ key, val ]);
    assertEqual(
      entries,
      [ [ 'a', 1 ], [ 'b', 2 ] ]
    );
  }},
  
  { name: 'Array.prototype[add]', fn: async () => {
    const arr = [ 1, 2 ];
    const added = arr[add](3);
    if (added !== 3 || arr.length !== 3) throw Error('failed');
  }},
  { name: 'Array.prototype[count]', fn: async () => {
    if ([ 1, 2, 3 ][count]() !== 3) throw Error('failed');
    if (([] as any[])[count]() !== 0) throw Error('failed');
  }},
  { name: 'Array.prototype[empty]', fn: async () => {
    if (([] as any[])[empty]() !== true) throw Error('failed');
    if ([ 1 ][empty]() !== false) throw Error('failed');
  }},
  { name: 'Array.prototype[find]', fn: async () => {
    const arr = [ 10, 20, 30 ];
    const result = arr[find](v => v > 15);
    if (!result.found || result.val !== 20 || result.ind !== 1) throw Error('failed');
    
    const missing = arr[find](v => v > 100);
    if (missing.found) throw Error('failed missing');
  }},
  { name: 'Array.prototype[group]', fn: async () => {
    const arr = [ 1, 2, 3, 4, 5 ];
    const grouped = arr[group](n => n < 3 ? 'small' : 'big');
    assertEqual(grouped, { small: [ 1, 2 ], big: [ 3, 4, 5 ] });
  }},
  { name: 'Array.prototype[has]', fn: async () => {
    if (![ 1, 2, 3 ][has](2)) throw Error('failed');
    if ([ 1, 2, 3 ][has](5)) throw Error('failed');
  }},
  { name: 'Array.prototype[map]', fn: async () => {
    const arr = [ 1, 2, 3 ];
    const mapped = arr[map](v => v * 2);
    assertEqual(mapped, [ 2, 4, 6 ]);
  }},
  { name: 'Array.prototype[rem]', fn: async () => {
    const arr = [ 1, 2, 3, 2 ];
    arr[rem](2);
    if (arr.length !== 3 || arr[0] !== 1 || arr[1] !== 3) throw Error('failed');
  }},
  { name: 'Array.prototype[toObj]', fn: async () => {
    const arr = [ 'a', 'b', 'c' ];
    const obj = arr[toObj]((v, i) => [ v, i ]);
    assertEqual(obj, { a: 0, b: 1, c: 2 });
  }},
  
  { name: 'String[baseline]', fn: async () => {
    const result = String[baseline](`
      | line1
      | line2
    `);
    if (!result.includes('line1') || !result.includes('line2')) throw Error('failed');
  }},
  { name: 'String[charset]', fn: async () => {
    const hex = String[charset]('0123456789abcdef');
    if (hex.size !== 16n) throw Error('failed size');
    if (hex.charVal('a') !== 10n) throw Error('failed charVal');
    if (hex.valChar(15n) !== 'f') throw Error('failed valChar');
  }},
  { name: 'String.prototype[code]', fn: async () => {
    if ('A'[code]() !== 65) throw Error('failed');
    if ('AB'[code](1) !== 66) throw Error('failed');
  }},
  { name: 'String.prototype[count]', fn: async () => {
    if ('hello'[count]() !== 5) throw Error('failed');
    if (''[count]() !== 0) throw Error('failed');
  }},
  { name: 'String.prototype[cut]', fn: async () => {
    assertEqual(
      'a:b:c:d'[cut](':'),
      [ 'a', 'b:c:d' ]
    );
    
    assertEqual(
      'a:b:c:d'[cut](':', 1),
      [ 'a', 'b:c:d' ]
    );
    
    assertEqual(
      'a:b:c:d'[cut](':', 2),
      [ 'a', 'b', 'c:d' ]
    );
  }},
  { name: 'String.prototype[cut] typing', fn: async () => {
    
    const val1: [ string, string ] = 'a:b'[cut](':', 1);
    const val2: [ string, string ] = 'a:b'[cut](':', 1)[map](v => v) as [ string, string ]; // TODO: Can `map` preserve readonly array length? Ugh but what about `skip`??
    assertEqual(val1, val2);
    
  }},
  { name: 'String.prototype[has]', fn: async () => {
    if (!'hello world'[has]('world')) throw Error('failed');
    if ('hello world'[has]('xyz')) throw Error('failed');
  }},
  { name: 'String.prototype[hasHead]', fn: async () => {
    if (!'hello'[hasHead]('hel')) throw Error('failed');
    if ('hello'[hasHead]('llo')) throw Error('failed');
  }},
  { name: 'String.prototype[hasTail]', fn: async () => {
    if (!'hello'[hasTail]('llo')) throw Error('failed');
    if ('hello'[hasTail]('hel')) throw Error('failed');
  }},
  { name: 'String.prototype[indent]', fn: async () => {
    const result = 'line1\nline2'[indent](2);
    if (!result.startsWith('  line1')) throw Error('failed');
  }},
  { name: 'String.prototype[lower]', fn: async () => {
    if ('HELLO'[lower]() !== 'hello') throw Error('failed');
  }},
  { name: 'String.prototype[upper]', fn: async () => {
    if ('hello'[upper]() !== 'HELLO') throw Error('failed');
  }},
  { name: 'String.prototype[padHead]', fn: async () => {
    if ('5'[padHead](3, '0') !== '005') throw Error('failed');
  }},
  { name: 'String.prototype[padTail]', fn: async () => {
    if ('5'[padTail](3, '0') !== '500') throw Error('failed');
  }},
  { name: 'String.prototype[toNum]', fn: async () => {
    if ('ff'[toNum](String[charset]('0123456789abcdef')) !== 255n) throw Error('failed');
  }},
  
  { name: 'Number[int32] / Number[int64]', fn: async () => {
    if (Number[int32] !== 2 ** 32) throw Error('failed int32');
    if (Number[int64] !== 2 ** 64) throw Error('failed int64');
  }},
  { name: 'Number.prototype[char]', fn: async () => {
    if ((65)[char]() !== 'A') throw Error('failed');
    if ((97)[char]() !== 'a') throw Error('failed');
  }},
  { name: 'Number.prototype[isInt]', fn: async () => {
    if (!(5)[isInt]()) throw Error('failed');
    if ((5.5)[isInt]()) throw Error('failed');
  }},
  { name: 'Number.prototype[toArr]', fn: async () => {
    const arr = (3)[toArr](i => i * 2);
    assertEqual(arr, [ 0, 2, 4 ]);
  }},
  { name: 'Number.prototype[toObj]', fn: async () => {
    const obj = (3)[toObj](i => [ `k${i}`, i * 10 ]);
    assertEqual(obj, { k0: 0, k1: 10, k2: 20 });
  }},
  { name: 'Number.prototype[toStr]', fn: async () => {
    const hex = String[charset]('0123456789abcdef');
    if ((255)[toStr](hex) !== 'ff') throw Error('failed');
    if ((5)[toStr](String[base62], 4) !== '0005') throw Error('failed pad');
  }},
  { name: 'Number.prototype[Symbol.iterator]', fn: async () => {
    const arr = [ ...3 as any ];
    assertEqual(arr, [ 0, 1, 2 ]);
  }},
  
  { name: 'BigInt.prototype[toStr]', fn: async () => {
    const hex = String[charset]('0123456789abcdef');
    if ((255n)[toStr](hex) !== 'ff') throw Error('failed');
  }},
  
  { name: 'ArrayBuffer.prototype[toStr]', fn: async () => {
    
    const examples = [ '', 'z', '?', '\ufff1', '\u0f0f\uf0f0\uff00\u00ff', 'Testy man!' ];
    for (const str of examples)
      assertEqual(str[toBin]().buffer[toStr](), str);
    
  }},
  { name: 'ArrayBuffer.prototype[toNum]', fn: async () => {
    
    const examples = [ '', 'z', '?', '\ufff1', `\uffff`, '\u0f0f\uf0f0\uff00\u00ff', 'Testy man!' ];
    for (const str of examples) {
      
      const b64 = str
        [toBin]()                   // Convert to binary - uses TextEncoder
        [toNum]()                   // Convert binary to number; binary is treated as the digits of a base-256 number
        [toStr](String[base64Url]); // Convert number to string; the arbitrary target charset in this case is base64Url
      
      const ret = b64
        [toNum](String[base64Url])  // Convert string to number; specify that the string is currently using a base64Url charset
        [toBin]()                   // Convert number to binary; number will be represented as the digits of a base-256 number
        [toStr]();                  // Convert binary to string; uses TextDecoder
      
      assertEqual(ret, str);
      
    }
    
  }},
  { name: 'ArrayBuffer.prototype[toNum] ignores leading 0 bytes', fn: async () => {
    
    const str = '\u0000\u0000\u0000whats upppp';
    const b64 = str
      [toBin]()                   // Convert to binary - uses TextEncoder
      [toNum]()                   // Convert binary to number; binary is treated as the digits of a base-256 number
      [toStr](String[base64Url]); // Convert number to string; the arbitrary target charset in this case is base64Url
    
    const ret = b64
      [toNum](String[base64Url])  // Convert string to number; specify that the string is currently using a base64Url charset
      [toBin]()                   // Convert number to binary; number will be represented as the digits of a base-256 number
      [toStr]();                  // Convert binary to string; uses TextDecoder
    
    assertEqual(ret, 'whats upppp');
      
  }},
  
  { name: 'Error[assert]', fn: async () => {
    // Should not throw
    Error[assert]({ x: 5, y: 10 }, ({ x, y }) => x < y);
    
    // Should throw
    let threw = false;
    try {
      Error[assert]({ x: 10, y: 5 }, ({ x, y }) => x < y);
    } catch {
      threw = true;
    }
    if (!threw) throw Error('failed');
  }},
  { name: 'Error.prototype[mod]', fn: async () => {
    const err = Error('base')[mod]({ message: 'modified', code: 123 });
    if (err.message !== 'modified' || (err as any).code !== 123) throw Error('failed');
  }},
  { name: 'Error.prototype[fire]', fn: async () => {
    let threw = false;
    try {
      Error('test')[fire]({ code: 'ERR' });
    } catch (e: any) {
      threw = true;
      if (e.code !== 'ERR') throw Error('failed code');
    }
    if (!threw) throw Error('failed');
  }},
  { name: 'Error.prototype[limn]', fn: async () => {
    const err = Error('test');
    const limned = err[limn]();
    if (limned.msg !== 'test' || limned.form !== 'Error') throw Error('failed');
  }},
  { name: 'Error.prototype[suppress]', fn: async () => {
    const err = Error('test')[suppress]();
    if (!err[Symbol.for('@gershy.clearing.err.suppressed')]) throw Error('failed');
  }},
  
  { name: 'Promise[allArr]', fn: async () => {
    const results = await Promise[allArr]([ Promise.resolve(1), Promise.resolve(2) ]);
    assertEqual(results, [ 1, 2 ]);
  }},
  { name: 'Promise[allObj]', fn: async () => {
    const results = await Promise[allObj]({
      a: Promise.resolve(1),
      b: Promise.resolve(2)
    });
    assertEqual(results, { a: 1, b: 2 });
  }},
  { name: 'Promise[later]', fn: async () => {
    const p = Promise[later]<string>();
    setTimeout(() => p.resolve('done'), 1);
    const result = await p;
    if (result !== 'done') throw Error('failed');
  }},
  { name: 'Promise.prototype[toArr]', fn: async () => {
    
    const prm = Promise.resolve([ 1, 2, 3]).then(v => v);
    const vals = await prm[toArr](n => 'a'.repeat(n));
    assertEqual(vals, [ 'a', 'aa', 'aaa' ]);
    
    const prm2 = Promise.resolve([ 'a', 'b', 'c' ]).then(v => v);
    const vals2 = await prm2[toArr](c => c.repeat(2));
    assertEqual(vals2, [ 'aa', 'bb', 'cc' ]);
    
  }},
  
  { name: 'Set.prototype[count]', fn: async () => {
    if (new Set([ 1, 2, 3 ])[count]() !== 3) throw Error('failed');
  }},
  { name: 'Set.prototype[empty]', fn: async () => {
    if (!new Set()[empty]()) throw Error('failed');
    if (new Set([ 1 ])[empty]()) throw Error('failed');
  }},
  { name: 'Set.prototype[find]', fn: async () => {
    const s = new Set([ 10, 20, 30 ]);
    const result = s[find](v => v > 15);
    if (!result.found || result.val !== 20) throw Error('failed');
  }},
  { name: 'Set.prototype[map]', fn: async () => {
    const s = new Set([ 1, 2, 3 ]);
    const arr = s[map](v => v * 2);
    if (!arr.includes(2) || !arr.includes(4) || !arr.includes(6)) throw Error('failed');
  }},
  { name: 'Set.prototype[rem]', fn: async () => {
    const s = new Set([ 1, 2, 3 ]);
    s[rem](2);
    if (s.has(2) || s.size !== 2) throw Error('failed');
  }},
  { name: 'Set.prototype[toArr]', fn: async () => {
    const s = new Set([ 1, 2, 3 ]);
    const arr = s[toArr](v => v * 10);
    if (!arr.includes(10) || !arr.includes(20) || !arr.includes(30)) throw Error('failed');
  }},
  { name: 'Set.prototype[toObj]', fn: async () => {
    const s = new Set([ 'a', 'b' ]);
    const obj = s[toObj](v => [ v, v.toUpperCase() ]);
    assertEqual(obj, { a: 'A', b: 'B' });
  }},
  
  { name: 'Map.prototype[count]', fn: async () => {
    const m = new Map([ [ 'a', 1 ], [ 'b', 2 ] ]);
    if (m[count]() !== 2) throw Error('failed');
  }},
  { name: 'Map.prototype[empty]', fn: async () => {
    if (!new Map()[empty]()) throw Error('failed');
    if (new Map([ [ 'a', 1 ] ])[empty]()) throw Error('failed');
  }},
  { name: 'Map.prototype[find]', fn: async () => {
    const m = new Map([ [ 'a', 10 ], [ 'b', 20 ] ]);
    const result = m[find](v => v > 15);
    if (!result.found || result.val !== 20 || result.key !== 'b') throw Error('failed');
  }},
  { name: 'Map.prototype[map]', fn: async () => {
    const m = new Map([ [ 'a', 1 ], [ 'b', 2 ] ]);
    const obj = m[map]((v, k) => [ k.toUpperCase(), v * 10 ]);
    assertEqual(obj, { A: 10, B: 20 });
  }},
  { name: 'Map.prototype[rem]', fn: async () => {
    const m = new Map([ [ 'a', 1 ], [ 'b', 2 ] ]);
    m[rem]('a');
    if (m.has('a') || m.size !== 1) throw Error('failed');
  }},
  { name: 'Map.prototype[toArr]', fn: async () => {
    const m = new Map([ [ 'a', 1 ], [ 'b', 2 ] ]);
    const arr = m[toArr]((v, k) => `${k}=${v}`);
    if (!arr.includes('a=1') || !arr.includes('b=2')) throw Error('failed');
  }},
  { name: 'Map.prototype[toObj]', fn: async () => {
    const m = new Map([ [ 'a', 1 ], [ 'b', 2 ] ]);
    const obj = m[toObj]((v, k) => [ k, v * 100 ]);
    assertEqual(obj, { a: 100, b: 200 });
  }},
  
  { name: 'Generator.prototype[toArr]', fn: async () => {
    
    const genFn0 = function*() {
      yield 1;
      yield 2;
      yield 3;
    };
    const genFn = function*(): Generator<number, any, any> { yield* genFn0(); }
    
    const vals = genFn()[toArr](v => 'a'.repeat(v));
    assertEqual(vals, [ 'a', 'aa', 'aaa' ]);
    
  }},
  
  { name: 'AsyncGenerator.prototype[toArr]', fn: async () => {
    
    const genFn0 = async function*() {
      
      await Promise.resolve(0);
      
      yield Promise.resolve(1);
      yield Promise.resolve(2);
      yield await Promise.resolve(3);
      
      await Promise.resolve(4);
      
    };
    const genFn = async function*() { yield* genFn0(); }
    
    const vals = await genFn()[toArr](v => 'a'.repeat(v));
    assertEqual(vals, [ 'a', 'aa', 'aaa' ]);
    
  }},
  
]);
