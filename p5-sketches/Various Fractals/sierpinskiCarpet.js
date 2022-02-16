let sierpinskiCarpet = p => {
  let cSize = 400
  let squares = []

  let nextStepB;

  p.setup = function () {
    let cnv = p.createCanvas(cSize, cSize);
    cnv.parent('sierpinskiCarpetCanvas')
    p.background(255);
    p.fill(0)

    nextStepB = p.createButton("Next Step");
    nextStepB.parent('sierpinskiCarpetInput');
    nextStepB.mouseClicked(nextStep);

    // each square is represented by its top left point and its length 
    squares.push([0, 0, cSize]);

    nextStep()
  }

  // function keyPressed() {
  //   if (keyCode === 32) {
  //     nextStep()
  //   }
  // }

  function nextStep() {
    newSquares = []
    for (var s of squares) {
      x = s[0] + s[2] / 3;
      y = s[1] + s[2] / 3;
      p.square(x, y, s[2] / 3);

      if (s[2] >= 3) {
        newSize = s[2] / 3;
        newSquares.push([s[0], s[1], newSize]);
        newSquares.push([s[0] + newSize, s[1], newSize]);
        newSquares.push([s[0] + 2 * newSize, s[1], newSize]);
        newSquares.push([s[0], s[1] + newSize, newSize]);
        newSquares.push([s[0] + 2 * newSize, s[1] + newSize, newSize]);
        newSquares.push([s[0], s[1] + 2 * newSize, newSize]);
        newSquares.push([s[0] + newSize, s[1] + 2 * newSize, newSize]);
        newSquares.push([s[0] + 2 * newSize, s[1] + 2 * newSize, newSize]);
      }
    }
    squares = newSquares.slice();
  }
}

new p5(sierpinskiCarpet)