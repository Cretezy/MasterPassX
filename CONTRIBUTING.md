# Working on MasterPassX

Install [yarn](https://yarnpkg.com/). MasterPassX makes use of yarn's workspaces.

1. Clone project, `cd` into it.
2. Run `yarn` in the root directory of the project. This will get all dependencies for all sub-modules (`packages/*`).
3. Code!

## Web

```bash
cd packages/web
```

Run development mode:

```bash
yarn watch
```

Run tests:

```bash
yarn test
```

Build to `build`:

```bash
yarn build
```

## CLI

```bash
cd packages/cli
```

Build & run:

```bash
yarn build-start <args>
```

Build to `dist`:

```bash
yarn build
```

## Committing

Before committing, run `yarn format` (in the root or in any package) to format the files with Prettier.
