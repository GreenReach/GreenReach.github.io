let winSize =400;
let w = winSize, h = winSize;
let fractalColors = 100;
let theShader;
let shaderTexture;

function preload(){
  theShader = loadShader('shader.vert','shader.frag');
}

function setup() {
  //colorMode(HSB);
  createCanvas(w, h, WEBGL);
  //strokeWeight(1);
  //background(255);
  shaderTexture = createGraphics(400, 400, WEBGL);
  //CreateJuliaImage(fractalColors);
}

function draw(){
  theShader.setUniform('u_time', millis() / 1000.0);
  theShader.setUniform('u_resolution', [400, 400]);
  theShader.setUniform('u_mouse', [mouseX, map(mouseY, 0 , height, height, 0)]);

  shaderTexture.shader(theShader);

  shaderTexture.rect(0,0,400,400);
  rect(-200,-200, 400,400);
  texture(shaderTexture);
}

function CreateJuliaImage(maxIter){
    for(let i = 0; i< w; i++)
      for(let j = 0; j < h; j++)
        ComputePixelValue(i,j, maxIter);
}

function ComputePixelValue(xInit, yInit, maxIter)
{
  let R = 2;
  let cx = -0.4, cy = 0.6;
  let x = map(xInit, 0 ,w, -R, R);
  let y = map(yInit, 0 ,h, -R, R);
  
  let iteration = 0;
  while(x*x + y*y < R*R && iteration < maxIter)
  {
    let xtemp = x*x - y*y;
    y = 2*x*y + cy;
    x = xtemp + cx;
    
    iteration++;
  }
  
  let hue = int(255 * iteration / maxIter);
  let sat = 255;
  let bright =255;
  if(iteration == maxIter)
    bright = 0;
  
  stroke(hue,sat,bright);
  point(xInit,yInit);
  
}
