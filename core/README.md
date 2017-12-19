# Core

Core library for MasterPassX, implementation of [original MasterPassword algorithm](http://masterpasswordapp.com/algorithm.html).

## API

### `createKey`

`createKey(name, master)` creates an base key for a user.

### `createSeed`

`createSeed(key, site, counter)` creates a base seed for a site with a user key.

### `createPassword`

`createPassword(seed, template)` creates a password from a site seed and template.

## Example

See [`test.mjs`](test.mjs)

## Tests

`yarn test` or `npm test`