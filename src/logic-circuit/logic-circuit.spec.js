import chai from 'chai';
import LogicCircuit from './';

describe('#LogicCircuit', function () {
  let testCircuit = {};

  beforeEach(function () {
    testCircuit = new LogicCircuit('OFF.NULL.NULL-ON.NULL.NULL-OR.0.1');
  });

  it('Can properly parse genome', function () {
    chai.expect(testCircuit.gates.length).to.equal(3);
  });
  it('Can properly resolve input', function () {
    chai.expect(testCircuit.resolve([1, 1], 1)).to.eql([1]);
  });
  it('Sets the correct number and types of inputs on resolve', function () {
    testCircuit.resolve([1, 0], 1);

    chai.expect(testCircuit.gates[0].type).to.equal('ON');
    chai.expect(testCircuit.gates[1].type).to.equal('OFF');
  });
  it('Returns the correct number and sequence of outs on resolve', function () {
    let result = testCircuit.resolve([0, 0], 1);

    chai.expect(result[0]).to.equal(testCircuit.gates[0].out);
  });
});
