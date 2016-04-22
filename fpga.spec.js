var chai = require('chai');
var fpga = require('./js/fpga');

describe('#LogicGate', function () {
  var testGate = {},
    source = [];

  beforeEach(function () {
    source = [
      {
        out: 0,
        tag: 'gate'
      },
      {
        out: 1,
        tag: 'gate'
      }
    ];

    testGate = new fpga.LogicGate({
      type: 'AND',
      sources: source
    });
  });

  it('AND Gate', function () {
    chai.expect(testGate.resolve()).to.equal(0);
  });
  it('OR Gate', function () {
    testGate.type = 'OR';
    chai.expect(testGate.resolve()).to.equal(1);
  });
  it('NOT Gate', function () {
    testGate.type = 'NOT';
    chai.expect(testGate.resolve()).to.equal(1);
  });
  it('NAND Gate', function () {
    testGate.type = 'NAND';
    chai.expect(testGate.resolve()).to.equal(1);
  });
  it('NOR Gate', function () {
    testGate.type = 'NOR';
    chai.expect(testGate.resolve()).to.equal(0);
  });
  it('XOR Gate', function () {
    testGate.type = 'XOR';
    chai.expect(testGate.resolve()).to.equal(1);
  });
});
