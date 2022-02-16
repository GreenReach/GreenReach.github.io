let path, angle, scalingFactor;
let axiom = plantAxiom; //PLAY HERE
let length = 300; // PLAY HERE
let originalLength = 300;// ALSO SET LENGTH HERE
let origin = [400, 800];

let pathState = [];
let colors = [[35, 79, 30], [50, 97, 45], [60, 176, 67]] // PLAY HERE
let alpha = 150; // PLAY HERE

let nextStepB, disperseB, changeAxiomB;
let currentAxiomName = "Plant";

function setup() {
  path = axiom["start"];
  angle = axiom["angle"];
  scalingFactor = axiom["scalingFactor"]

  nextStepB = createButton('Next Step');
  nextStepB.parent('input-holder')
  nextStepB.mousePressed(() => {
    CreateNewPath();
    DrawPath(false);
  })

  disperseB = createButton('Random Dispersion');
  disperseB.parent('input-holder')
  disperseB.mousePressed(() => { DrawPath(true); })

  changeAxiomB = createButton('Change Axiom (current ' + currentAxiomName + ')');
  changeAxiomB.parent('input-holder')
  changeAxiomB.mousePressed(ChangeAxiom)

  let cnv = createCanvas(800, 800);
  cnv.parent("canvas-holder")
  strokeWeight(1); // PLAY HERE
  DrawPath();
}

function ChangeAxiom() {
  if (currentAxiomName == "Plant") {
    axiom = cantorAxiom;
    currentAxiomName = "Cantor Set"
  } else if (currentAxiomName == "Cantor Set") {
    axiom = kochSnowflakeAxiom;
    currentAxiomName = "Kock Snowflake"
  } else if (currentAxiomName == "Kock Snowflake") {
    axiom = kochCurveAxiom;
    currentAxiomName = "Kock Curve"
  } else if (currentAxiomName == "Kock Curve") {
    axiom = sierpinskiTriangleAxiom;
    currentAxiomName = "Sierpinski's Triangle"
  } else if (currentAxiomName == "Sierpinski's Triangle") {
    axiom = bushyPlantAxiom;
    currentAxiomName = "Bushy Plant"
  } else if (currentAxiomName == "Bushy Plant") {
    axiom = FernAxiom;
    currentAxiomName = "Fern"
  } else if (currentAxiomName == "Fern") {
    axiom = plantAxiom;
    currentAxiomName = "Plant"
  }

  changeAxiomB.html('Change Axiom (current ' + currentAxiomName + ')')
  path = axiom["start"];
  angle = axiom["angle"];
  scalingFactor = axiom["scalingFactor"]
  pathState = [];
  length = originalLength
  DrawPath(false)

}

function keyPressed() {
  if (keyCode == 65) // A
  {
    CreateNewPath();
    DrawPath(false);
  }
  else if (keyCode == 83) // S ( use this especially for plantAxiom and plantRandomAxiom)
    DrawPath(true)
}

function CreateNewPath() {
  let newPath = "";
  for (i = 0; i < path.length; i++) {
    if (typeof (axiom[path[i]]) == "string")
      newPath += axiom[path[i]];
    else if (typeof (axiom[path[i]]) == "object") {
      let options = axiom[path[i]]
      let randNum = getRandomNumber(0, 100);
      let currentNum = options[0][0], index = 0;
      while (currentNum < randNum) {
        index++;
        currentNum += options[index][0];
      }
      newPath += options[index][1];
    }
  }
  path = newPath;
  length /= scalingFactor;
}

function DrawPath(applyRandomEffects) {
  background(255);
  let dir = createVector(0, length);
  let originalDir = createVector(0, length);

  let x = origin[0], y = origin[1];
  for (i = 0; i < path.length; i++) {
    let randomScale = getRandomNumber(0.9, 1.1);// PLAY HERE
    let randomAngle = getRandomNumber(15, 30);// PLAY HERE

    if (path[i] == "F" || path[i] == "G") {
      let color = colors[floor(getRandomNumber(0, colors.length))];
      color.push(alpha); //add the alpha
      stroke(color);
      if (applyRandomEffects) {
        line(x, y, x - (dir.x * randomScale), y - (dir.y * randomScale));
        x = x - (dir.x * randomScale);
        y = y - (dir.y * randomScale);
      }
      else {
        line(x, y, x - dir.x, y - dir.y);
        x = x - dir.x;
        y = y - dir.y;
      }
    }
    else if (path[i] == "+") {
      if (applyRandomEffects)
        dir.rotate(radians(randomAngle));
      else
        dir.rotate(radians(angle));
    }
    else if (path[i] == "-") {
      if (applyRandomEffects)
        dir.rotate(radians(-randomAngle));
      else
        dir.rotate(radians(-angle));
    }
    else if (path[i] == "[") {
      pathState.push([x, y, originalDir.angleBetween(dir)]);
    }
    else if (path[i] == "]") {
      let state = pathState.pop();
      x = state[0];
      y = state[1];
      dir.rotate(state[2] - originalDir.angleBetween(dir));
    }
  }
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}