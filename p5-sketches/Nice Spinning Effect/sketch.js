let dots;

function setup() {
  createCanvas(400, 400);
  background(0);
  stroke(255);
  //frameRate(10);
  let d21 =  new Dot(90, 50, 200, 100, -45);
  let d22 = new Dot(90, 50, 200, 100, 0, false);
  let d23 = new Dot(90, 50, 200, 100, 45);

  let d1 =  new Dot(90, 50, 200, 200, -45, false);
  let d2 = new Dot(90, 50, 200, 200, 0);
  let d3 = new Dot(90, 50, 200, 200, 45, false);

  let d11 =  new Dot(90, 50, 200, 210, -45);
  let d12 = new Dot(90, 50, 200, 210, 0, false);
  let d13 = new Dot(90, 50, 200, 210, 45);


  dots = [d1, d2, d3, d11,d12,d13, d21,d22,d23];
}

function draw() {
  background(0);

  for (d of dots) {
    let result = d.NextStep();
    strokeWeight(result[2]);
    point(result[0], result[1]);
  }
}
