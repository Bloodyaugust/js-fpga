import _ from 'lodash';
import {logicTools} from '../logic-tools/';
import LogicCircuit from '../logic-circuit/';

class LogicSolutionTrainer {
  constructor (config) {
    this.callback = config.callback;
    this.circuitSize = config.circuitSize || 12;
    this.immigrantGenerator = config.immigrantGenerator;
    this.immigrantsPerGeneration = config.immigrantsPerGeneration;
    this.mutationRate = config.mutationRate || 0.01;
    this.population = config.population || 2;

    if (!this.immigrantGenerator) {
      this.immigrantGenerator = (circuitSize) => {
        return logicTools.seedCircuit(circuitSize);
      };
    }

    if (!this.callback) {
      this.callback = (winningCircuit) => {
        console.log(winningCircuit.genome);
      }
    }
  }

  _evaluate () {
    let me = this;

    this.circuits = _.sortBy(this.circuits, [(c) => {
      c.fitness = logicTools.averageBinaryFitness(c.resolve(me.dataset, me.solution.length), me.solution);
      return c.fitness;
    }]);

    if (this.circuits[0].fitness === 0) {
      this.callback(this.circuits[0]);
    } else {
      console.log('Highest fitness: ' + this.circuits[0].fitness);

      for (let i = 0; i < this.circuits.length; i++) {
        if (i >= this.circuits.length - this.immigrantsPerGeneration) {
          this.circuits[i] = this.immigrantGenerator(this.circuitSize);
        } else {
          this.circuits[i] = new LogicCircuit(logicTools.mutateGenome(this.circuits[i].genome));
        }
      }

      setTimeout(() => {
        this._evaluate();
      }, 1);
    }
  }

  evolve (dataset, solution) {
    this.circuits = [];
    this.dataset = dataset;
    this.solution = solution;

    for (let i = 0; i < this.population; i++) {
      this.circuits[i] = this.immigrantGenerator(this.circuitSize);
    }

    this._evaluate(this.circuits, dataset, solution);
  }
}

export default LogicSolutionTrainer;
