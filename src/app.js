import Constants from './constants';
import LogicSolutionTrainer from './logic-solution-trainer';

let currentLeadingCircuit;
let gateSprites = {};
let height = global.innerHeight;
let pixi = global.PIXI;
let Sprite = pixi.Sprite;
let textures;
let width = global.innerWidth;

let pixiApp = new pixi.Application({width: width, height: height});
pixi.loader
  .add("img/atlas.json")
  .load(() => {
    textures = pixi.loader.resources['img/atlas.json'].textures;

    for (let y = 0; y < height / 32; y++) {
      for (let x = 0; x < width / 32; x++) {
        let sprite = new Sprite(textures['and.png']);
        sprite.x = x * 32;
        sprite.y = y * 32;

        pixiApp.stage.addChild(sprite);
        gateSprites[sprite.x + '-' + sprite.y] = sprite;
      }
    }

    pixiApp.ticker.add(() => {
      let _index = 0;

      if (currentLeadingCircuit) {
        for (let y = 0; y < height / 32; y++) {
          for (let x = 0; x < width / 32; x++) {
            let _currentX = x * 32;
            let _currentY = y * 32;

            _index++;

            if (_index < currentLeadingCircuit.gates.length) {
              gateSprites[_currentX+ '-' + _currentY].visible = true;
              gateSprites[_currentX+ '-' + _currentY].texture = textures[currentLeadingCircuit.gates[_index].type.toLowerCase() + '.png'];
            } else {
              gateSprites[_currentX+ '-' + _currentY].visible = false;
            }
          }
        }
      }
    });
  });

var testTrainer = new LogicSolutionTrainer({
  onEvaluated: (circuits) => {
    currentLeadingCircuit = circuits[0];
  },
  onFinished: (circuit) => {
    console.log(circuit);
  },
  circuitSize: 96,
  immigrantsPerGeneration: 5,
  population: 15
});

global.document.body.appendChild(pixiApp.view);

testTrainer.evolve([0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0], [0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0]);
