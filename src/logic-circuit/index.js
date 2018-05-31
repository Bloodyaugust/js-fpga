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
      let gene1 = parseInt(genes[1]);
      let gene2 = parseInt(genes[2]);

      if (!isNaN(gene1)) {
        this.gates[i].sources[0] = !isNaN(gene1) ? this.gates[gene1] : null;
        this.gates[gene1].provides++;
      }

      if (!isNaN(gene2)) {
        this.gates[i].sources[1] = !isNaN(gene2) ? this.gates[gene2] : null;
        this.gates[gene2].provides++;
      }
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
