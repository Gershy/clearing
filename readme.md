# Clearing

Ok Bob, give them the analogy.

Bob:

> Javascript is... a dense forest. And you... want to pitch your tent somewhere. You just need a
friendly plot of flat earth, to use as a home base, so you can move on to follow your dreams. You
search through the dense forest, looking for... a *clearing*.

Thanks Bob that's plenty.

The clearing module gives you all the features any sane person would want to see in javascript.

## Basic bootstrapping

Clearing uses an unorthodox (controversial??) technique to achieve a lot of convenience.
Functionality is added by extending native classes and prototypes with _non-enumerable_, _Symbol_ properties comparable to the following:

```ts
const coolNewHelper = Symbol();
Object.defineProperty(Object.prototype, coolNewHelper, { enumerable: false, value: function() {
  return Object.keys(this).map(key => key.toUpperCase());
}});

const obj = { a: 1, b: 2, c: 3 };
console.log(obj[coolNewHelper]());
```

Extending native classes and prototypes is kind of crazy, but only doing so with non-enumerable,
Symbol properties maintains compatibility with the vast majority of npm modules. All symbols are
accessible via the `clearing` (or `cl`) global object.

Simply import the clearing module to make all functionality globally available:

```ts
import '@gershy/clearing';
```

## Utility functions

### `clearing.isCls(value, Constructor)`
Type guard for strict class/constructor matching. Handles primitives, null, undefined, and NaN correctly.

```ts
const { isCls } = clearing;

isCls(5,         Number);    // true
isCls(5,         NaN);       // false
isCls(5,         String);    // false
isCls('abc',     String);    // true
isCls(null,      null);      // true
isCls(undefined, undefined); // true
isCls(null,      undefined); // false
isCls(undefined, null);      // false
isCls(NaN,       NaN);       // true
isCls({},        Object);    // true
isCls([],        Array);     // true
isCls(new Map(), Map);       // true
```

### `clearing.inCls(value, Constructor)`
Type guard for `instanceof` checks (including inheritance).

```ts
const { inCls } = clearing;

inCls([], Array); // true
inCls(new (class X extends Array {})(), Array); // true
inCls({}, Object); // true
inCls(5, Number); // false (primitives are not instanceof)
```

### `clearing.getClsName(value)`
Returns the class/constructor name of a value, or special names for null/undefined/NaN.

```ts
const { getClsName } = clearing;

getClsName(5); // 'Number'
getClsName('abc'); // 'String'
getClsName(null); // 'Null'
getClsName(undefined); // 'Undef'
getClsName(NaN); // 'Nan'
getClsName({}); // 'Object'
getClsName(Object.create(null)); // 'Prototypeless'
```

### `clearing.getCls(value)`
Returns the constructor function of a value, or null if not available.

```ts
const { getCls } = clearing;

getCls(5);                   // Number
getCls('abc');               // String
getCls(null);                // null
getCls(undefined);           // null
getCls({});                  // Object
getCls(Object.create(null)); // null
```

### `clearing.skip`
Special value (undefined) used to signal omission in mapping helpers.

```ts
const { skip } = clearing;

[1, 2, 3].map(v => v > 1 ? v : skip); // [skip, 2, 3]
```

### `clearing.then(value, onFulfilled?, onRejected?)`
Unified handler for both Promise and non-Promise values. Applies `onFulfilled`/`onRejected` as appropriate.

```ts
const { then } = clearing;

then(Promise.resolve(5), v => v * 2); // Promise resolving to 10
then(5, v => v * 2); // 10
then(Promise.reject('fail'), undefined, e => 'fallback'); // Promise resolving to 'fallback'
```

### `clearing.safe(fn, onRejected?)`
Runs a function (sync or async), catching errors and returning a Promise. Optionally handles errors with `onRejected`.

```ts
const { safe } = clearing;

await safe(() => JSON.parse('{ bad }'), e => 'fallback'); // 'fallback'
await safe(async () => await fetch('bad-url'), e => null); // null if fetch throws
```

## Prototype extensions

Along with utility functions, `@gershy/clearing` adds functionality to native prototypes, keyed by symbols, and exposes those symbols via the `clearing` (or `cl`) globals. These symbols are `unique symbols`, in typescript terms. Note that `unique symbol` is widened only to `symbol` on assignment-to-property-reference:

```ts
clearing.map; // Typescript knows this is `unique symbol`

const symbol = clearing.map;
symbol; // Typescript thinks this is a regular `symbol`! Ouch.
```

In order to gain the sophisticated typing provided by clearing, you must preserve the `unique symbol` typing of all `@gershy/clearing` symbols. My greatest apology to `@gershy/clearing` users it the lack of a succinct way to reference a bunch of symbols at once, while retaining strong typing. For example, the most intuitive way to reference a batch of symbols - via destructuring - is *the easiest way to lose your typing*:

```ts
const { map, toArr, toObj } = clearing; // Typescript thinks these are regular `symbol`s
{ a: 1, b: 2 }[map](v => v * 3);        // Typescript thinks this is `any` - very sad!
```

To preserve your typing you can:

1. Reference directly from the clearing global:

```ts
{ a: 1, b: 2 }[cl.map](v => v * 3); // Typescript gets `{ a: number, b: number }`!
```

2. Use explicit typing:

```ts
const map: typeof clearing.map = clearing.map; // `map` is now a `unique symbol`!
{ a: 1, b: 2 }[map](v => v * 3); // Typescript gets `{ a: number, b: number }`!
```

3. Riot against the typescript maintainers for making things work this way (just kidding just kidding, they have their reasonssssss. I mean, kinda. Don't riot. They're smart people.)

## `Object` extensions

There are currently no extensions on the `Object` class.

## `Object.prototype` extensions

### `Object.prototype[cl.at]`

References a potentially nested own property.

```ts
const obj = { a: { b: { c: 'z' } } };
console.log(obj[cl.at]([ 'a', 'b', 'c' ])); // "z"
```

A default value can be supplied if nested lookup finds nothing.

```ts
const obj = { a: { b: { c: 'z' } } };
console.log(obj[cl.at]([ 'missing' ], 'default'));        // "default"
console.log(obj[cl.at]([ 'a', 'lol', 'c' ], 'default'));  // "default"
console.log(obj[cl.at]([ 'a', 'b', 'haha' ], 'default')); // "default"
```

### `Object.prototype[cl.count]`

Returns the number of own properties in an object.

```ts
const { count } = clearing;

console.log({                  }[cl.count]()); // 0
console.log({ a: 1, b: 2       }[cl.count]()); // 2
console.log({ a: 1, b: 2, c: 3 }[cl.count]()); // 3
```

### `Object.prototype[cl.empty]`

Returns whether an object has any properties.

```ts
console.log({      }[cl.empty]()); // true
console.log({ a: 1 }[cl.empty]()); // false
```

### `Object.prototype[cl.group]`

Splits an object into sub-object groups based on a function returning group names.

```ts
const obj = { a: 1, b: 10, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 2 };

console.log(obj[cl.group](n => {
  if (n < 4) return 'small';
  if (n < 8) return 'medium';
  return 'big';
});

/*
{
  small:  { a: 1, c: 3, j: 2 },
  medium: { d: 4, e: 5, f: 6, g: 7 },
  big:    { b: 10, h: 8, i: 9 }
}
*/
```

### `Object.prototype[cl.has]`

Determines own property existence.

```ts
const obj = { a: 1, b: 2 };
console.log(obj[cl.has]('a')); // true
console.log(obj[cl.has]('b')); // true
console.log(obj[cl.has]('z')); // false
```

### `Object.prototype[cl.map]`

Maps over object values, returning a new object. Return `skip` to omit a property.

```ts
const obj = { a: 1, b: 2, c: 3 };
console.log(obj[cl.map](v => v * 2));            // { a: 2, b: 4, c: 6 }
console.log(obj[cl.map](v => v > 1 ? v : cl.skip)); // { b: 2, c: 3 }
```

### `Object.prototype[cl.mapk]`

Maps over object entries returning `[key, value]` pairs to construct a new object; allows remapping
keys.

```ts
const obj = { a: 1, b: 2 };
console.log(obj[cl.mapk]((v, k) => [ k.toUpperCase(), v * 10 ])); // { A: 10, B: 20 }
```

### `Object.prototype[cl.merge]`

Deep merges another object into `this` (mutates in place). Use `skip` for deletion.

```ts
const obj = { a: 1, b: { c: 2, d: 3 } };
obj[cl.merge]({ b: { c: 100 }, e: 4 });
console.log(obj); // { a: 1, b: { c: 100, d: 3 }, e: 4 }

// Deleting properties
obj[cl.merge]({ a: skip });
console.log(obj); // { b: { c: 100, d: 3 }, e: 4 }
```

### `Object.prototype[cl.slash]`

Returns a copy of the object with specified keys removed/omitted.

```ts
const obj = { a: 1, b: 2, c: 3, d: 4 };
console.log(obj[cl.slash]([ 'b', 'd' ])); // { a: 1, c: 3 }
```

### `Object.prototype[cl.slice]`

Returns a copy of the object containing only the specified keys.

```ts
const obj = { a: 1, b: 2, c: 3, d: 4 };
console.log(obj[cl.slice]([ 'b', 'd' ])); // { b: 2, d: 4 }
```

### `Object.prototype[cl.toArr]`

Converts an object to an array by mapping over its entries.

```ts
const obj = { a: 1, b: 2, c: 3 };
console.log(obj[cl.toArr]((v, k) => `${k}=${v}`)); // [ 'a=1', 'b=2', 'c=3' ]
```

### `Object.prototype[cl.walk]`

Makes objects iterable, yielding `[key, value]` pairs.

```ts
const obj = { a: 1, b: 2 };
for (const [ k, v ] of obj[cl.walk]())
  // Logs twice:
  // 1. a 1
  // 2. b 2
  console.log(k, v);
```

## `Array` extensions

There are currently no extensions on the `Array` class.

## `Array.prototype` extensions

### `Array.prototype[cl.add]`

Pushes an item onto the array and returns that item.

```ts
const arr = [ 1, 2, 3 ];
const added = arr[cl.add](4);
console.log(added); // 4
console.log(arr);   // [ 1, 2, 3, 4 ]
```

### `Array.prototype[cl.count]`

Returns the length of the array.

```ts
console.log([ 1, 2, 3 ][cl.count]()); // 3
console.log([][cl.count]());          // 0
```

### `Array.prototype[cl.empty]`

Returns whether the array has no elements.

```ts
console.log([][cl.empty]());          // true
console.log([ 1, 2, 3 ][cl.empty]()); // false
```

### `Array.prototype[cl.find]`

Finds an element matching a predicate, returning `{ found, val, ind }`.

```ts
const arr = [ 10, 20, 30, 40 ];

const result = arr[cl.find](v => v > 25);
console.log(result); // { found: true, val: 30, ind: 2 }

const missing = arr[cl.find](v => v > 100);
console.log(missing); // { found: false, val: null, ind: null }
```

### `Array.prototype[cl.group]`

Splits an array into sub-arrays based on a function returning group names.

```ts
const arr = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

console.log(arr[cl.group](n => {
  if (n < 4) return 'small';
  if (n < 8) return 'medium';
  return 'big';
}));

/*
{
  small:  [ 1, 2, 3 ],
  medium: [ 4, 5, 6, 7 ],
  big:    [ 8, 9, 10 ]
}
*/
```

### `Array.prototype[cl.has]`

Checks if an array includes a value.

```ts
console.log([ 1, 2, 3 ][cl.has](2)); // true
console.log([ 1, 2, 3 ][cl.has](5)); // false
```

### `Array.prototype[map]`

Maps over array values. Return `cl.skip` to omit an element; it's filter + map in one.

```ts
const arr = [ 1, 2, 3, 4, 5 ];
console.log(arr[cl.map](v => v * 2));                    // [ 2, 4, 6, 8, 10 ]
console.log(arr[cl.map](v => v > 2 ? v * 10 : cl.skip)); // [ 30, 40, 50 ]
```

### `Array.prototype[cl.rem]`

Removes the first occurrence of a value from the array (mutates in place).

```ts
const arr = [ 1, 2, 3, 2, 4 ];
arr[cl.rem](2);
console.log(arr); // [ 1, 3, 2, 4 ]
```

### `Array.prototype[cl.toObj]`

Converts an array to an object by mapping each element to a `[key, value]` pair.

```ts
const arr = [ 'a', 'b', 'c' ];
console.log(arr[cl.toObj]((v, i) => [ v, i ])); // { a: 0, b: 1, c: 2 }
```

## `String` extensions

### `String[cl.baseline]`

Allows writing coherent multiline strings with predictable indentation.

```ts
const text = (() => {
  
  return (() => {
    
    return (() => {
      
      return String[cl.baseline](`
        | Even though this text is in an indented scope, it will have predictable indentation.
        | 
        | This is achieved by using the pipe ("|") character plus a space as a delimiter for
        | every line.
        | 
        | You can also pass a 2nd argument to String[baseline] to change the delimiter.
        | 
        | Thanks for your attention :)
      `);
      
    })();
    
  })();
  
})();
```

### `String[cl.base32]`, `String[cl.base36]`, `String[cl.base62]`, `String[cl.base64Url]`, `String[cl.base64Std]`

Character sets for encoding/decoding numbers to strings.

```ts
console.log(String[cl.base32]);    // '0123456789abcdefghijklmnopqrstuv'
console.log(String[cl.base36]);    // '0123456789abcdefghijklmnopqrstuvwxyz'
console.log(String[cl.base62]);    // '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
console.log(String[cl.base64Url]); // '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_'
console.log(String[cl.base64Std]); // '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/'
```

## `String.prototype` extensions

### `String.prototype[cl.code]`

Returns the character code at a given index (default 0).

```ts
console.log('A'[cl.code]());   // 65
console.log('AB'[cl.code](1)); // 66
```

### `String.prototype[cl.count]`

Returns the length of the string.

```ts
console.log('hello'[cl.count]()); // 5
console.log(''[cl.count]());      // 0
```

### `String.prototype[cl.cut]`

Splits a string by a delimiter with a maximum number of cuts.

```ts
console.log('a:b:c:d:e'[cl.cut](':'));           // [ 'a', 'b:c:d:e' ]
console.log('a:b:c:d:e'[cl.cut](':', 2));        // [ 'a', 'b', 'c:d:e' ]
console.log('a:b:c:d:e'[cl.cut](':', Infinity)); // [ 'a', 'b', 'c', 'd', 'e' ]
```

### `String.prototype[cl.has]`

Checks if a string contains a substring.

```ts
console.log('hello world'[cl.has]('world')); // true
console.log('hello world'[cl.has]('xyz'));   // false
```

### `String.prototype[cl.hasHead]`

Checks if a string starts with a given prefix.

```ts
console.log('hello world'[cl.hasHead]('hello')); // true
console.log('hello world'[cl.hasHead]('world')); // false
```

### `String.prototype[cl.hasTail]`

Checks if a string ends with a given suffix.

```ts
console.log('hello world'[cl.hasTail]('world')); // true
console.log('hello world'[cl.hasTail]('hello')); // false
```

### `String.prototype[cl.indent]`

Indents each line of a string.

```ts
const text = 'line1\nline2\nline3';

console.log(text[cl.indent]());         // 2 spaces (default)
console.log(text[cl.indent](4));        // 4 spaces
console.log(text[cl.indent](2, '-'));   // '--' prefix
console.log(text[cl.indent]('>>> ')); // custom prefix
```

### `String.prototype[cl.lower]`

Converts the string to lowercase.

```ts
console.log('HELLO'[cl.lower]()); // 'hello'
```

### `String.prototype[cl.upper]`

Converts the string to uppercase.

```ts
console.log('hello'[cl.upper]()); // 'HELLO'
```

### `String.prototype[cl.padHead]`

Pads the start of the string to a given length.

```ts
console.log('5'[cl.padHead](3, '0')); // '005'
```

### `String.prototype[cl.padTail]`

Pads the end of the string to a given length.

```ts
console.log('5'[cl.padTail](3, '0')); // '500'
```

### `String.prototype[cl.toNum]`

Decodes a string to a BigInt using a given charset.

```ts
console.log('ff'[cl.toNum](String[cl.charset]('0123456789abcdef'))); // 255n
console.log('10'[cl.toNum](String[cl.base62])); // 62n
```

## `Number` extensions

### `Number[cl.int32]`, `Number[cl.int64]`

Constants for 32-bit and 64-bit integer ranges.

```ts
console.log(Number[cl.int32]); // 4294967296 (2^32)
console.log(Number[cl.int64]); // 18446744073709551616 (2^64)
```

## `Number.prototype` extensions

### `Number.prototype[cl.char]`

Converts a character code to its character.

```ts
console.log((65)[cl.char]()); // 'A'
console.log((97)[cl.char]()); // 'a'
```

### `Number.prototype[cl.isInt]`

Returns whether a number is an integer.

```ts
console.log((5)[cl.isInt]());   // true
console.log((5.1)[cl.isInt]()); // false
```

### `Number.prototype[cl.toArr]`

Creates an array of length `n` by mapping over indices.

```ts
console.log((5)[cl.toArr](i => i * 2)); // [ 0, 2, 4, 6, 8 ]
```

### `Number.prototype[cl.toObj]`

Creates an object by mapping over indices, returning `[key, value]` pairs.

```ts
console.log((3)[cl.toObj](i => [ `key${i}`, i * 10 ])); // { key0: 0, key1: 10, key2: 20 }
```

### `Number.prototype[cl.toStr]`

Encodes a number to a string using a given charset.

```ts
console.log((255)[cl.toStr](String[cl.charset]('0123456789abcdef'))); // 'ff'
console.log((62)[cl.toStr](String[cl.base62]));    // '10'
console.log((5)[cl.toStr](String[cl.base62], 4));  // '0005' (padded)
```

### `Number.prototype[Symbol.iterator]`

Makes numbers iterable from 0 to n-1.

```ts
for (const i of 3) console.log(i);
// 0
// 1
// 2

console.log([ ...5 ]); // [ 0, 1, 2, 3, 4 ]
```

### `Number.prototype[cl.bits]`

Yields the bits of a number (least significant first).

```ts
console.log([ ...(13)[cl.bits]() ]); // [ 1, 0, 1, 1 ] (13 is 1101 in binary)
```

## `BigInt.prototype` extensions

### `BigInt.prototype[cl.toStr]`

Same as `Number.prototype[cl.toStr]`, but for BigInt values.

```ts
console.log((1000000000000n)[cl.toStr](String[cl.base62])); // 'bLY38W'
```
## `Error` extensions

### `Error[cl.assert]`

Throws an error if the assertion function returns false.

```ts
Error[cl.assert]({ x: 5, y: 10 }, ({ x, y }) => x < y); // passes
Error[cl.assert]({ x: 10, y: 5 }, ({ x, y }) => x < y); // throws!
```

## `Error.prototype` extensions

### `Error.prototype[cl.mod]`

Modifies an error's message and adds properties. Returns the error for chaining.

```ts
// Add context to errors:
throw Error('oops')[cl.mod]({ code: 'err99', context: { userId: 123 } });

// Overwrite the error message by passing a string, or supplying "message" or "msg" properties:
throw Error('oops')[cl.mod]('new message');
throw Error('oops')[cl.mod]({ msg:     'new message', extra: 'data' });
throw Error('oops')[cl.mod]({ message: 'new message', extra: 'data' });

// Pass a callback to succinctly reference the original message:
throw Error('oops')[cl.mod](msg => `Modified message! Original: ${msg}`);
throw Error('oops')[cl.mod](msg => ({
  msg: `Modified message! Original: ${msg}`,
  extra: 'data'
}));
```

### `Error.prototype[cl.fire]`

Shorthand for `throw error[cl.mod](props)`.

```ts
Error('something failed')[cl.fire]({ code: 'err99' });
```

### `Error.prototype[cl.limn]`

Converts an error (and its cause chain) to a plain, json-serializable object.

```ts
const err = Error('outer')[cl.mod]({ cause: Error('inner') });
console.log(err[cl.limn]());
/*
{
  form: 'Error',
  msg: 'outer',
  trace: [ ... ],
  cause: { form: 'Error', msg: 'inner', trace: [ ... ], cause: null }
}
*/
```

### `Error.prototype[cl.suppress]`

Marks an error (and its causes) as suppressed for custom error handling.

```ts
const err = Error('handled gracefully');
err[cl.suppress]();
console.log(err[Symbol.for('clearing.err.suppressed')]); // true
```

Useful for preventing certain errors from crashing the js process, for example in node.js:
```ts
process.on('unhandledException', err => {
  
  // Ignore suppressed errors
  if (err[Symbol.for('clearing.err.suppressed')]) return;
  
  console.log('Fatal error!');
  process.exit(1);
  
});
```

## `Promise` extensions

### `Promise[cl.allArr]`

Alias for `Promise.all`.

```ts
const results = await Promise[cl.allArr]([ fetch('/a'), fetch('/b'), fetch('/c') ]);
```

### `Promise[cl.allObj]`

Like `Promise.all`, but for an object of promises, returning an object of results.

```ts
const results = await Promise[cl.allObj]({
  user: fetchUser(),
  posts: fetchPosts(),
  comments: fetchComments()
});
console.log(results.user, results.posts, results.comments);
```

### `Promise[cl.later]`

Creates a promise with externally accessible `resolve` and `reject` functions.

```ts
const p = Promise[cl.later]();

setTimeout(() => p.resolve('done!'), 1000);

console.log(await p); // 'done!'
```

## `Set.prototype` extensions

### `Set.prototype[cl.count]`

Returns the size of the set.

```ts
console.log(new Set([ 1, 2, 3 ])[cl.count]()); // 3
```

### `Set.prototype[cl.empty]`

Returns whether the set is empty.

```ts
console.log(new Set()[cl.empty]());       // true
console.log(new Set([ 1 ])[cl.empty]()); // false
```

### `Set.prototype[cl.find]`

Finds an element matching a predicate, returning `{ found, val }`.

```ts
const s = new Set([ 10, 20, 30 ]);
console.log(s[cl.find](v => v > 15)); // { found: true, val: 20 }
```

### `Set.prototype[cl.map]`

Maps over set values to produce an array.

```ts
const s = new Set([ 1, 2, 3 ]);
console.log(s[cl.map](v => v * 2)); // [ 2, 4, 6 ]
```

### `Set.prototype[cl.rem]`

Removes a value from the set.

```ts
const s = new Set([ 1, 2, 3 ]);
s[cl.rem](2);
console.log([ ...s ]); // [ 1, 3 ]
```

### `Set.prototype[cl.toArr]`

Converts a set to an array by mapping over its values.

```ts
const s = new Set([ 1, 2, 3 ]);
console.log(s[cl.toArr](v => v * 10)); // [ 10, 20, 30 ]
```

### `Set.prototype[cl.toObj]`

Converts a set to an object by mapping each value to a `[key, value]` pair.

```ts
const s = new Set([ 'a', 'b', 'c' ]);
console.log(s[cl.toObj](v => [ v, v.toUpperCase() ])); // { a: 'A', b: 'B', c: 'C' }
```

## `Map.prototype` extensions

### `Map.prototype[cl.add]`

Alias for `Map.prototype.set` (for consistency with Set).

```ts
const m = new Map();
m[cl.add]('key', 'value');
```

### `Map.prototype[cl.count]`

Returns the size of the map.

```ts
const m = new Map([ [ 'a', 1 ], [ 'b', 2 ] ]);
console.log(m[cl.count]()); // 2
```

### `Map.prototype[cl.empty]`

Returns whether the map is empty.

```ts
console.log(new Map()[cl.empty]());                  // true
console.log(new Map([ [ 'a', 1 ] ])[cl.empty]()); // false
```

### `Map.prototype[cl.find]`

Finds an entry matching a predicate, returning `{ found, val, key }`.

```ts
const m = new Map([ [ 'a', 10 ], [ 'b', 20 ], [ 'c', 30 ] ]);
console.log(m[cl.find](v => v > 15)); // { found: true, val: 20, key: 'b' }
```

### `Map.prototype[cl.map]`

Maps entries to produce an object; iterator receives `(val, key)` and returns `[key, val]`.

```ts
const m = new Map([ [ 'a', 1 ], [ 'b', 2 ] ]);
console.log(m[cl.map]((v, k) => [ k.toUpperCase(), v * 10 ])); // { A: 10, B: 20 }
```

### `Map.prototype[cl.rem]`

Removes an entry from the map by key.

```ts
const m = new Map([ [ 'a', 1 ], [ 'b', 2 ] ]);
m[cl.rem]('a');
console.log(m[cl.count]()); // 1
```

### `Map.prototype[cl.toArr]`

Converts a map to an array by mapping over its entries.

```ts
const m = new Map([ [ 'a', 1 ], [ 'b', 2 ] ]);
console.log(m[cl.toArr]((v, k) => `${k}=${v}`)); // [ 'a=1', 'b=2' ]
```

### `Map.prototype[cl.toObj]`

Converts a map to an object by mapping over its entries.

```ts
const m = new Map([ [ 'a', 1 ], [ 'b', 2 ] ]);
console.log(m[cl.toObj]((v, k) => [ k, v * 100 ])); // { a: 100, b: 200 }
```