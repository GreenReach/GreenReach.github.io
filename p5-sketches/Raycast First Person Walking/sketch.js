let rays = [];
let walls;
let fov = 45;
let screenW = 500, lineWidth = 1, renderDist = 300;
let playerPos, speed = 4, turningSpeed = 3;
let angIncrement;
let currentAngle;

let fovSlider;
let distModeB, distMode = 1; // 1 normal, -1 fisheye

let newWallStart, isFirstSelection = true;

function setup() {
  createCanvas(400 + screenW * lineWidth, 500);
  frameRate(30);
  strokeCap(SQUARE);
  noSmooth();

  newWallStart = createVector(0, 0);
  playerPos = createVector(150, 50);
  currentAngle = createVector(1, 0)
  angIncrement = fov / screenW;

  fovSlider = createSlider(1, 360, fov, 1);

  distModeB = createButton("Render Mode")
  distModeB.mousePressed(SwitchDistMode);

  let b1 = new Wall(0, 0, 0, 400);
  let b2 = new Wall(0, 400, 400, 400);
  let b3 = new Wall(400, 400, 400, 0);
  let b4 = new Wall(400, 0, 0, 0);

  let wall1 = new Wall(100, 10, 390, 10);
  let wall2 = new Wall(390, 10, 390, 100);
  let wall3 = new Wall(390, 100, 100, 100);

  let wall4 = new Wall(100, 10, 10, 75);
  let wall5 = new Wall(10, 75, 10, 390);

  let wall6 = new Wall(100, 100, 200, 325);
  walls = [b1, b2, b3, b4, wall1, wall2, wall3, wall4, wall5, wall6];

  for (let i = 0; i < screenW; i++) {
    let ray = new Ray(200, 200, 0, 1);
    rays.push(ray);
  }
}

function draw() {
  background(255);

  fov = fovSlider.value();
  angIncrement = fov / screenW;

  PlayerMovement();
  circle(playerPos.x, playerPos.y, 10);

  for (let wall of walls) {
    wall.draw();
  }

  if (isFirstSelection == false) {
    line(newWallStart.x, newWallStart.y, mouseX, mouseY);
  }

  //RENDERER
  let ray = new Ray(playerPos.x, playerPos.y, currentAngle.x, currentAngle.y);
  let pp = ray.cast(walls);

  let angle = -fov / 2;
  for (let i = 0; i < rays.length; i++) {
    rays[i].setOrigin(playerPos.x, playerPos.y);

    //rays[i].lookAt(mouseX, mouseY); // to control by mouse uncomment this and do PlayerMovement(false)
    rays[i].lookAt(currentAngle.x, currentAngle.y, false);

    let part = (screenW / 2 - i) * 1 / screenW;
    rays[i].dir.rotate(radians(angle));
    angle += angIncrement;

    rays[i].draw();

    let result = rays[i].cast(walls);
    let p = result[0], color = result[1];
    if (p) {
      strokeWeight(0.5);
      line(rays[i].origin.x, rays[i].origin.y, p.x, p.y, color);
      strokeWeight(1);
    }

    DrawLine(p, rays[i].dir, i, color)
  }
}

function PlayerMovement(playerRelative = true) {

  if (playerRelative) {
    if (keyIsDown(68)) currentAngle.rotate(radians(turningSpeed));
    else if (keyIsDown(65)) currentAngle.rotate(radians(-turningSpeed));

    if (keyIsDown(87)) playerPos.add(currentAngle.x * speed, currentAngle.y * speed)
    else if (keyIsDown(83)) playerPos.sub(currentAngle.x * speed, currentAngle.y * speed)
  }
  else {
    if (keyIsDown(68)) playerPos.x += speed;
    else if (keyIsDown(65)) playerPos.x -= speed;

    if (keyIsDown(83)) playerPos.y += speed;
    else if (keyIsDown(87)) playerPos.y -= speed;
  }
}

function DrawLine(point, rayDir, lineIndex, color) {
  strokeWeight(5);
  stroke(255);

  line(400 + lineIndex * lineWidth, 0, 400 + lineIndex * lineWidth, 400)
  if (point != null) {

    let dist;
    if (distMode == -1)
      dist = playerPos.dist(point); // fisheye mode
    else
      dist = playerPos.dist(point) * cos(rayDir.angleBetween(currentAngle))


    let colorGradient = map(min(dist, renderDist), 10, renderDist, 0, 255);
    color = color.map(x => x + colorGradient);

    let wallLength;
    if (distMode == 1)
      wallLength = (height / 2) * fov / dist;
    else if (distMode == -1)
      wallLength = map(min(dist, renderDist), 10, renderDist, height / 2, 0);// => this is the wrong way of doing it and it took me 3 hours to figure out
    wallLength -= wallLength % lineWidth;

    stroke(color);
    line(400 + lineIndex * lineWidth, height / 2 - wallLength, 400 + lineIndex * lineWidth, height / 2 + wallLength)
  }

  strokeWeight(1);
  stroke(0);
}


function SwitchDistMode() {
  distMode = -distMode;
}

function mouseClicked() {
  if (isFirstSelection) {
    newWallStart.x = mouseX;
    newWallStart.y = mouseY;
    isFirstSelection = false;
  }
  else {
    let wall = new Wall(newWallStart.x, newWallStart.y, mouseX, mouseY);
    wall.setRandColor();
    walls.push(wall);
    isFirstSelection = true;
  }
}