let HEIGHT = 400, WIDTH = 400;
let cellSize = 10, h = HEIGHT/cellSize, w = WIDTH/cellSize;
let world, newWorld;
let paused = true;

function setup() {
  createCanvas(HEIGHT, WIDTH);
  frameRate(5);
  
  world = new Array(h+2);
  newWorld = new Array(h+2);
  for(i=0;i<w;i++){
    world[i] = new Array(w+2).fill(0);
    newWorld[i] = new Array(w+2).fill(0);
  }
  
  drawWorld();
}

function draw() {
  if(!paused){
    advanceWorld();
    drawWorld();
  }
}

function keyTyped(){
  if(key == 'p')
    paused = !paused;
}

function mouseClicked(){
  let x = Math.floor(mouseX/cellSize+1);
  let y = Math.floor(mouseY/cellSize+1);
  world[y][x] = 1;
  
  if(paused)
    drawWorld();
}

function drawWorld(){
  for(i=1;i<h-1;i++)
    for(j=1;j<w-1;j++){
      if(world[i][j])
        fill(color(0,0,0));
      else
        fill(color(255,255,255));
      
      square((j-1)*cellSize, (i-1)*cellSize, cellSize);
    }
}

function advanceWorld(){
  let liveNeighbours;
  
  for(i=1;i<h-1;i++){
    for(j=1;j<w-1;j++){
      liveNeightbours = 0;
      
      if(world[i][j-1])   liveNeightbours++;
      if(world[i][j+1])   liveNeightbours++;
      if(world[i-1][j])   liveNeightbours++;
      if(world[i-1][j-1]) liveNeightbours++;
      if(world[i-1][j+1]) liveNeightbours++;
      if(world[i+1][j])   liveNeightbours++;
      if(world[i+1][j-1]) liveNeightbours++;
      if(world[i+1][j+1]) liveNeightbours++;
      
      if(world[i][j] == 1)
        if(liveNeightbours == 2 || liveNeightbours == 3)
          newWorld[i][j] = 1;
        else
          newWorld[i][j] = 0;
      else
        if(liveNeightbours == 3)
          newWorld[i][j] = 1;  
    }
  }
  
  for(i=1;i<h-1;i++)
  world[i] = newWorld[i].slice();
}