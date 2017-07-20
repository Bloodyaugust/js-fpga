import chai from 'chai';
import LogicSolutionTrainer from './';

describe('#LogicSolutionTrainer', function () {
  let testTrainer;

  beforeEach(function () {
    testTrainer = new LogicSolutionTrainer({
      circuitSize: 4,
      immigrantsPerGeneration: 1,
      population: 15
    });
  });

  it('Can properly evolve for a simple solution', function (done) {
    testTrainer.callback = (winningCircuit) => {
      chai.expect(winningCircuit).to.not.equal(null);
      chai.expect(winningCircuit.gates[2].out).to.equal(0);
      chai.expect(winningCircuit.gates[3].out).to.equal(1);
      console.log(winningCircuit.genome);
      done();
    }
    testTrainer.evolve([1, 0], [0, 1]);
  });
});
