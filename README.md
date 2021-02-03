# Yet Another Game of Life in React

Implementing a [GOL](https://en.wikipedia.org/wiki/Conway's_Game_of_Life) is always undoubtedly fun, and that should already settle the "why?"; I also wanted to get more comfortable with some React aspects (Context and rendering of many nodes) so this problem was also perfect fit.

Yagolir uses React by itself without any help from other libraries, so that this project can also be used as a starter or a tutorial of some sort, without nasty dependencies. And maybe as a simple benchmark too.

## Features

- Each generation (10k cells) renders in 0.3s (on a 2015 MBP, ymmv)
- You can switch cells on and off while the game is running
- You can step forward and back (uses in-memory snapshots)

## Install

Just `npm install` and `npm start`.

License is MIT.
