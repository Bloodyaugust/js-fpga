(function(global) {
  global.LogicGate = function (config) {
    var me = this;

    me.tag = 'gate';
    me.type = config.type;
    me.sources = [];
    me.circuit = config.circuit;
    me.circuitIndex = config.circuitIndex;

    me.out = 0;

    me.resolve = function() {
      var a = me.sources[0].tag === 'gate' ? me.sources[0].out : me.circuit
        .input[me.sources[0]],
        b = me.sources[1].tag === 'gate' ? me.sources[1].out : me.circuit
        .input[me.sources[1]];

      switch (me.type) {
        case 'AND':
          me.out = (a && b) ? 1 : 0;
          break;
        case 'OR':
          me.out = (a || b) ? 1 : 0;
          break;
        case 'NOT':
          me.out = (!a) ? 1 : 0;
          break;
        case 'NAND':
          me.out = !(a && b) ? 1 : 0;
          break;
        case 'NOR':
          me.out = (!a && !b) ? 1 : 0;
          break;
        case 'XOR':
          me.out = ((a || b) && !(a && b)) ? 1 : 0;
          break;
        default:
          me.out = 0;
          break;
      }
    };

    me.clone = function() {
      return {
        tag: 'gate',
        type: me.type,
        sources: [],
        circuit: {},
        circuitIndex: me.circuitIndex,
        out: 0
      };
    };
  };

  global.LogicCircuit = function (genome) {
    var me = this;

    me.genome = genome;
    me.gates = [];
    me.gateTypes = [
      'AND',
      'OR',
      'NOT',
      'NAND',
      'NOR',
      'XOR'
    ];
    me.input = [];
    me.outputs = [];

    for (var i = 0; i < me.genome.length; i++) {
      me.gates.push(
        new global.LogicGate({
          type: me.gateTypes[parseInt(me.genome[i])],
          circuit: me,
          circuitIndex: i
        })
      );
    }

    me.addOutput = function(index) {
      me.outputs.push(me.gates[index]);
    };

    me.setOutputs = function(indices) {
      me.outputs = [];
      for (var i = 0; i < indices.length; i++) {
        me.outputs.push(me.gates[indices[i]]);
      }
    };

    me.resolve = function(input) {
      var output = [],
        gateVal;

      me.input = input ? input : me.input;

      for (i = 0; i < me.gates.length; i++) {
        me.gates[i].resolve();
      }

      for (i = 0; i < me.outputs.length; i++) {
        output.push(me.outputs[i].out);
      }

      return output;
    };

    me.clone = function() {
      var clone = {
        genome: me.genome,
        gates: [],
        gateTypes: me.gateTypes,
        input: [],
        outputs: []
      };

      for (var i = 0; i < me.gates.length; i++) {
        clone.gates.push(me.gates[i].clone());
      }

      for (i = 0; i < clone.gates.length; i++) {
        clone.gates[i].circuit = clone;

        clone.gates[i].sources[0] = me.gates[i].sources[0].tag === 'gate' ?
          clone.gates[me.gates[i].sources[0].circuitIndex] :
          me.gates[i].sources[0];
        clone.gates[i].sources[1] = me.gates[i].sources[1].tag === 'gate' ?
          clone.gates[me.gates[i].sources[1].circuitIndex] :
          me.gates[i].sources[1];
      }

      for (i = 0; i < me.outputs.length; i++) {
        clone.outputs.push(clone.gates[me.outputs[i].circuitIndex]);
      }

      return clone;
    };
  };

  global.seedCircuit = function (config) {
    var inputs = config.inputs,
      outputs = config.outputs,
      genomeLength = config.genomeLength,
      genome = '',
      usedOutputs = {},
      validGateFound = false,
      rnd, circuit;

    for (var i = 0; i < genomeLength; i++) {
      genome += Math.floor(Math.random() * 6);
    }

    circuit = new global.LogicCircuit(genome);

    for (i = 0; i < inputs; i++) {
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

    for (i = 0; i < outputs; i++) {
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

    for (i = 0; i < genomeLength; i++) {
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
  };
})(typeof(module) !== 'undefined' ? module.exports : window);
