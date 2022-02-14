let WIDTH = 1000, HEIGHT = 1000;
let squareSize = 10;
let w = WIDTH/squareSize, h = HEIGHT/squareSize;
let antX = w/2, antY = h/2, antO = 3;
let world, step =0;
//orientation - 0 up, 1 -right, 2-down, 3-left

function setup() {
  createCanvas(WIDTH, HEIGHT);
  
  world = new Array(h);
  for(i = 0; i < h; i++) 
    world[i] = new Array(w).fill(0);
  

  fill(color(255,255,255));
  for(i = 0; i < h; i++){
    for(j = 0; j < w; j++){
        square(j*squareSize, i*squareSize, squareSize);
    }
  }
  
  fill(color(200,0,0));
  square(antX*squareSize, antY*squareSize, squareSize);
  
}

function draw() {
  if(world[antY][antX] == 0){
    antO++;
    world[antY][antX] = 1;
    fill(color(0,0,200));
  }
  else{
    antO--;
    world[antY][antX] = 0;
    fill(color(255,255,255));
  }
  
  square(antX*squareSize, antY*squareSize, squareSize);
  
  moveAnt();
  
  fill(color(200,0,0));
  square(antX*squareSize, antY*squareSize, squareSize);
  
  step++;
  // if(step%100 ==0)
  // print(step);
}


function moveAnt(){
  if(antO == 4) antO = 0;
  else if(antO == -1) antO = 3;
  
  if(antO == 0) {antY--;}
  else if(antO == 1){antX++;}
  else if(antO == 2){antY++;}  
  else if(antO == 3){antX--;}
}