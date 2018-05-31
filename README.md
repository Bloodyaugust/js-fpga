# Build, evolve, and utilize virtual FPGA's.

To use, you'll need to:

* `npm i`
* `npm i http-server -g` (to use `npm start` for development)

`npm start` kicks off the dev server

`npm run build` runs webpack

Navigate to [localhost:9000/src](http://localhost:9000/src/) to see the test page.

***

## Why does this exist?
The hotness around Machine Learning is all tensors and convolutional filters, which are awesome! This explores a different strategy, called [Genetic and Evolutionary Programming, or "Genetic Algorithms".](https://en.wikipedia.org/wiki/Genetic_algorithm) Mostly it's for fun, but I think it's a valuable tool in helping to make understanding of ML easier for those of us that are less... math-inclined.
