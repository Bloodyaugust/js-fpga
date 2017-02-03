import LogicGate from '../logic-gate/';

class LogicCircuit {

  constructor (genome) {
    this.genome = genome;
    this.gates = [];
    this.gateTypes = [
      'AND',
      'OR',
      'NOT',
      'NAND',
      'NOR',
      'XOR'
    ];
    this.input = [];
    this.outputs = [];

    for (var i = 0; i < this.genome.length; i++) {
      this.gates.push(
        new LogicGate({
          type: this.gateTypes[parseInt(this.genome[i])],
          circuit: this,
          circuitIndex: i
        })
      );
    }
  }

  addOutput (index) {
    this.outputs.push(this.gates[index]);
  }

  setOutputs (indices) {
    this.outputs = [];
    for (var i = 0; i < indices.length; i++) {
      this.outputs.push(this.gates[indices[i]]);
    }
  }

  resolve (input) {
    var output = [];

    this.input = input ? input : this.input;

    for (let i = 0; i < this.gates.length; i++) {
      this.gates[i].resolve();
    }

    for (let i = 0; i < this.outputs.length; i++) {
      output.push(this.outputs[i].out);
    }

    return output;
  }

  clone () {
    var clone = {
      genome: this.genome,
      gates: [],
      gateTypes: this.gateTypes,
      input: [],
      outputs: []
    };

    for (var i = 0; i < this.gates.length; i++) {
      clone.gates.push(this.gates[i].clone());
    }

    for (i = 0; i < clone.gates.length; i++) {
      clone.gates[i].circuit = clone;

      clone.gates[i].sources[0] = this.gates[i].sources[0].tag === 'gate' ?
        clone.gates[this.gates[i].sources[0].circuitIndex] :
        this.gates[i].sources[0];
      clone.gates[i].sources[1] = this.gates[i].sources[1].tag === 'gate' ?
        clone.gates[this.gates[i].sources[1].circuitIndex] :
        this.gates[i].sources[1];
    }

    for (i = 0; i < this.outputs.length; i++) {
      clone.outputs.push(clone.gates[this.outputs[i].circuitIndex]);
    }

    return clone;
  }
}

export default LogicCircuit;
