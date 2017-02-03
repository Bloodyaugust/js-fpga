class LogicGate {

  constructor (config) {
    this.tag = 'gate';
    this.type = config.type;
    this.sources = config.sources || [];
    this.circuit = config.circuit;
    this.circuitIndex = config.circuitIndex;
    this.out = 0;
  }

  resolve () {
    var a = this.sources[0].tag === 'gate' ? this.sources[0].out : this.circuit.input[this.sources[0]],
      b = this.sources[1].tag === 'gate' ? this.sources[1].out : this.circuit.input[this.sources[1]];

    switch (this.type) {
      case 'AND':
        this.out = (a && b) ? 1 : 0;
        break;
      case 'OR':
        this.out = (a || b) ? 1 : 0;
        break;
      case 'NOT':
        this.out = (!a) ? 1 : 0;
        break;
      case 'NAND':
        this.out = !(a && b) ? 1 : 0;
        break;
      case 'NOR':
        this.out = (!a && !b) ? 1 : 0;
        break;
      case 'XOR':
        this.out = ((a || b) && !(a && b)) ? 1 : 0;
        break;
      default:
        this.out = 0;
        break;
    }

    return this.out;
  }

  clone () {
    return {
      tag: 'gate',
      type: this.type,
      sources: [],
      circuit: {},
      circuitIndex: this.circuitIndex,
      out: 0
    };
  }
}

export default LogicGate;
