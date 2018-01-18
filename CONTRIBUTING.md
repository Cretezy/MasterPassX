# Working on MasterPassX

Install [yarn](https://yarnpkg.com/). MasterPassX makes use of yarn's workspaces.

1) Clone project, `cd` into it.
2) Run `yarn` in the root directory of the project. This will get all dependencies for all sub-modules (`web`, `cli`, `core`).
3) Code!

## Web

To run the front-end, simply `cd web`, then `yarn watch`.

You may run tests with `yarn test`.

## Committing

Before committing, run `yarn prettier` (in the root or in any submodules) to format the files with Prettier.
