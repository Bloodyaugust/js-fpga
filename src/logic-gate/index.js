class LogicGate {

  constructor (config) {
    this.circuitIndex = config.circuitIndex;
    this.out = 0;
    this.sources = [];
    this.type = config.type;
  }

  resolve () {
    var a = this.sources[0] ? this.sources[0].out : 0,
      b = this.sources[1] ? this.sources[1].out : 0;

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
      case 'ON':
        this.out = 1;
        break;
      case 'OFF':
        this.out = 0;
        break;
    }

    return this.out;
  }

  clone () {
    return {
      type: this.type,
      sources: [(this.sources[0] ? this.sources[0].circuitIndex : null), (this.sources[1] ? this.sources[1].circuitIndex : null)],
      out: 0
    };
  }

  getGenome () {
    return this.type + '.' + (this.sources[0] ? this.sources[0].circuitIndex : 'null') + '.' + (this.sources[1] ? this.sources[1].circuitIndex : 'null');
  }
}

export default LogicGate;
