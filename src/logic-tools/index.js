import Constants from '../constants';
import LogicCircuit from '../logic-circuit';

class LogicTools {

  constructor () {

  }

  seedCircuit (numGates) {
    let genome = '';

    for (let i = 0; i < numGates; i++) {
      genome += Constants.GATE_TYPES[Math.floor(Math.random() * Constants.GATE_TYPES.length)];
      genome += '.' + Math.floor(Math.random() * numGates) + '.' + Math.floor(Math.random() * numGates);

      if (i !== numGates - 1) {
        genome += '-';
      }
    }

    return new LogicCircuit(genome);
  }
}

export let logicTools = new LogicTools();
