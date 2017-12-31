# MasterPassX Cli

A simple command-line interface for MasterPassX. Requires Node.js v8 or higher.

## Install

`yarn global add masterpassx-cli`

or

`npm install --global masterpassx-cli`

Make sure to have `yarn global bin` or `npm bin --global` in your PATH.

## Usage

Command: `mpx`

When no user found, it will ask you to setup a user (name & master password).

To generate a password for a site, simply do `mpx` for a prompt or supply the site as an argument (i.e.: `mpx github.com`).

Flags:

* `-t, --template <template>`: Set template/type from: maximum, long (default), medium, basic, short, pin, name, phrase.
* `-c, --counter <counter>`: Set counter (integer, default: 1).
* `-r, --reset`: Reset stored user (will ask for new user information).
* `-n, --no-save`: Will not save current user.
* `-p, --config-path <path>`: Path to config (default: ~/.config/masterpassx)