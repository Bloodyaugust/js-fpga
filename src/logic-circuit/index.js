import LogicGate from '../logic-gate/';

class LogicCircuit {

  constructor (genome) {
    this.fitness = 1;
    this.genome = genome;
    this.gates = [];

    let gateGenomes = genome.split('-');

    for (let i = 0; i < gateGenomes.length; i++) {
      let genes = gateGenomes[i].split('.');

      this.gates.push(
        new LogicGate({
          type: genes[0],
          circuit: this,
          circuitIndex: i
        })
      );
    }

    for (let i = 0; i < gateGenomes.length; i++) {
      let genes = gateGenomes[i].split('.');

      this.gates[i].sources[0] = !isNaN(parseInt(genes[1])) ? this.gates[parseInt(genes[1])] : null;
      this.gates[i].sources[1] = !isNaN(parseInt(genes[2])) ? this.gates[parseInt(genes[2])] : null;
    }
  }

  resolve (input, outputLength) {
    var output = [];

    for (let i = 0; i < input.length; i++) {
      this.gates[i].type = input[i] === 1 ? 'ON' : 'OFF';
    }

    for (let i = 0; i < this.gates.length; i++) {
      this.gates[i].resolve();
    }

    for (let i = this.gates.length - outputLength; i < this.gates.length; i++) {
      output.push(this.gates[i].out);
    }

    return output;
  }
}

export default LogicCircuit;
