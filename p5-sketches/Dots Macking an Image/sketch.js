let MIN_DIAMETER = 7;

let img;
let dim;
let dots = [];
let layersColors = [];


function preload(){
  img = loadImage('snowy_image.jpg');
}

function setup() {
  noStroke();
  
  dim = min(img.width, img.height);
  let cnv = createCanvas(dim, dim);
  cnv.parent("canvas-holder")
  img.resize(dim,dim);
  //image(img,0,0);
  
  img.loadPixels();
  computeColors();
  
  let d = new Dot(dim/2,dim/2,dim, 0,0,0);
  dots.push(d);
}

function computeColors(){
  let layersNumber = 1;
  let newDim = dim;
  while (newDim >= MIN_DIAMETER){
    newDim /= 2;
    layersNumber ++;
  }
  
  for(let i = 0; i<layersNumber;i++){
    let dotDiameter = int(dim/Math.pow(2,i));
    let dotsLineCount = dim/dotDiameter;

    let layerColors = []
    for(let j = 0; j<dotsLineCount;j++){
      
      let lineColors = []
      for(let k = 0; k<dotsLineCount;k++){
        let dotColor = computeAveregeColor(k*dotDiameter, j*dotDiameter, dotDiameter);
        lineColors.push(dotColor);
      }
      layerColors.push(lineColors);
    }
    
    layersColors.push(layerColors);
  }
}

function computeAveregeColor(x,y,diameter){
  let r = 0, g = 0, b = 0, counter = 0;
  for(let i = y; i<y+diameter; i++){
    for(let j = x; j<x+diameter; j++){
      
      let imgCoords = i*dim*4 + j*4;

      r += img.pixels[imgCoords];
      g += img.pixels[imgCoords + 1];
      b += img.pixels[imgCoords + 2];
      counter ++;
    }
  }
  
  let dotColor = color(int(r/counter), int(g/counter), int(b/counter));
  return dotColor;
  
}

//TODO: implement a quad tree to search in
function draw() {
  for(let i=0;i<dots.length;i++){
    if (dots[i].diameter > MIN_DIAMETER)
    if(dots[i].checkHover(mouseX,mouseY))
      {
        let newDots = dots[i].expand();
        dots.splice(i,1);
        dots = dots.concat(newDots);
      }
  }
}