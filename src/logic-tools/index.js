import _ from 'lodash';
import Constants from '../constants';
import LogicCircuit from '../logic-circuit';

class LogicTools {

  constructor () {

  }

  averageBinaryFitness (result, solution) {
    let distance = 0;

    for (let i = 0; i < result.length; i++) {
        distance += Math.abs(result[i] - solution[i]);
    }

    return distance / result.length;
  }

  mutateGenome (genome, mutationRate) {
    let genes = genome.split('-');
    let newGenome = '';

    for (let i = 0; i < genes.length; i++) {
      let gateType = genes[i].split('.')[0];
      let gateConnections = _.drop(genes[i].split('.'));

      if (Math.random() <= mutationRate) {
        newGenome += Constants.GATE_TYPES[Math.floor(Math.random() * Constants.GATE_TYPES.length)];
      } else {
        newGenome += gateType;
      }

      newGenome += '.';

      for (let i2 = 0; i2 < gateConnections.length; i2++) {
        if (Math.random() < mutationRate) {
          newGenome += Math.floor(Math.random() * genes.length);
        } else {
          newGenome += gateConnections[i2];
        }

        if (i2 !== gateConnections.length - 1) {
          newGenome += '.';
        }
      }

      if (i !== genes.length - 1) {
        newGenome += '-';
      }
    }

    return newGenome;
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
