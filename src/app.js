import LogicSolutionTrainer from './logic-solution-trainer';

var testTrainer = new LogicSolutionTrainer({
  circuitSize: 96,
  immigrantsPerGeneration: 5,
  population: 15
});

testTrainer.evolve([0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0], [0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0])
