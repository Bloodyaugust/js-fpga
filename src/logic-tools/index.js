import LogicCircuit from '../logic-circuit';

class LogicTools {

  constructor () {

  }

  seedCircuit (config) {
    var inputs = config.inputs,
      outputs = config.outputs,
      genomeLength = config.genomeLength,
      genome = '',
      usedOutputs = {},
      validGateFound = false,
      rnd, circuit;

    for (let i = 0; i < genomeLength; i++) {
      genome += Math.floor(Math.random() * 6);
    }

    circuit = new LogicCircuit(genome);

    for (let i = 0; i < inputs; i++) {
      while (!validGateFound) {
        rnd = Math.floor(Math.random() * genomeLength);

        if (!circuit.gates[rnd].sources[0]) {
          circuit.gates[rnd].sources[0] = i;
          validGateFound = true;
        }
      }
      validGateFound = false;

      circuit.input.push(0);
    }

    for (let i = 0; i < outputs; i++) {
      while (!validGateFound) {
        rnd = Math.floor(Math.random() * genomeLength);

        if (!usedOutputs[rnd]) {
          circuit.addOutput(rnd);
          usedOutputs[rnd] = true;
          validGateFound = true;
        }
      }
      validGateFound = false;
    }

    for (let i = 0; i < genomeLength; i++) {
      while (!circuit.gates[i].sources[0]) {
        rnd = Math.floor(Math.random() * genomeLength);

        if (rnd !== i) {
          circuit.gates[i].sources[0] = circuit.gates[rnd];
        }
      }
      while (!circuit.gates[i].sources[1]) {
        rnd = Math.floor(Math.random() * genomeLength);

        if (rnd !== i) {
          circuit.gates[i].sources[1] = circuit.gates[rnd];
        }
      }
    }

    return circuit;
  }
}

export let logicTools = new LogicTools();
