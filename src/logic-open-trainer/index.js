import _ from 'lodash';
import {logicTools} from '../logic-tools/';
import LogicCircuit from '../logic-circuit/';

class LogicOpenTrainer {
  constructor (config) {
    this.circuitContainerFactory = config.circuitContainerFactory;
    this.circuitContainers = [];
    this.circuitSize = config.circuitSize || 12;
    this.currentBestContainer = {};
    this.immigrantGenerator = config.immigrantGenerator;
    this.immigrantsPerGeneration = config.immigrantsPerGeneration;
    this.mutationRate = config.mutationRate || 0.01;
    this.population = config.population || 2;

    if (!this.immigrantGenerator) {
      this.immigrantGenerator = (circuitSize) => {
        return logicTools.seedCircuit(circuitSize);
      };
    }

    for (let i = 0; i < this.population; i++) {
      this.circuitContainers.push(this.circuitContainerFactory());
    }
  }

  Evaluate () {
    this.currentBestContainer = this.circuitContainers[0];

    for (let i = 1; i < this.circuitContainers; i++) {
      if (this.circuitContainers[i].circuit.fitness > this.currentBestContainer.circuit.fitness) {
        this.currentBestContainer = this.circuitContainers[i];
      }
    }
  }

  Mutate () {
    let mutateGenome = this.currentBestContainer.circuit.genome;
    this.circuitContainers = [];

    for (let i = 0; i < this.population - this.immigrantsPerGeneration; i++) {
      this.circuitContainers.push(this.circuitContainerFactory());
    }
  }
}
