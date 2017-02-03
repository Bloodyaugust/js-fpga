import {logicTools} from './logic-tools/';

var testCircuit = logicTools.seedCircuit({
  inputs: 12,
  outputs: 2,
  genomeLength: 48
});

console.log(testCircuit);
