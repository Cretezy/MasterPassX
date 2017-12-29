# MasterPassX Core

Core library for MasterPassX, implementation of [original MasterPassword algorithm](http://masterpasswordapp.com/algorithm.html).

## API

### `createKey`

`createKey(name, master)` creates an base key for a user from name & master password.

### `createSeed`

`createSeed(key, site, counter)` creates a base seed for a site with a user key (from `createKey`), a site (usually domain), and a counter (start at `1`).

### `createPassword`

`createPassword(seed, template)` creates a password from a site seed (from `createSeed`) and template (from: 	`maximum`, `long` (default), `medium`, `basic`, `short`, `pin`, `name`, `phrase`).

## Example

See [`test/index.js`](test/index.js)

## Tests

`yarn test` or `npm test`

## Dependencies

For the base key derivation, we use `scrypt-async`. This is a fully JavaScript scrypt implentation, which works in browser (and is quick, takes ~0.5 seconds on average).

Next we use `crypto-js` for a JavaScript HMAC-SHA256. Very quick. Could be used alongside WebCrypto when more support is available.

We also use `buffer` to mimic the Node.js `Buffer` in the browser.

The goal was to have a set of library and code that works both on browsers and Node.js, and is very quick.