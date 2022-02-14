let size = 400;

let photoNum = 27;
let photos = [];
let avgColor = [];
let avgQuarterColor = [];
let img, imgReserve;

let finalW =20, finalH = 20;
let cellW = size/finalW, cellH = size/finalH;
let pixelCount = cellW * cellH;

function preload(){
  for( num = 1; num <= photoNum; num++){
    img = loadImage("photos/" + num + ".jpg");
    photos.push(img);
  }
  img = loadImage("image.jpg");
  imgReserve = loadImage("image.jpg");
}

function setup() {
  createCanvas(size, size);

  cellW = int(cellW);
  cellH = int(cellH);

  //resize photos to cell size and calculate avg color and average color for each quarter
  for(i = 0; i < photoNum; i++){
    photos[i].resize(cellW, cellH);

    let r = 0, g = 0, b = 0;
    let rQ = [0,0,0,0], gQ = [0,0,0,0], bQ = [0,0,0,0];
    for(let h = 0; h < photos[i].height; h++)
      for(let w = 0; w < photos[i].width; w++){
        r += photos[i].get(w,h)[0];
        g += photos[i].get(w,h)[1];
        b += photos[i].get(w,h)[2];
        
        let quarterIndex = int(w / (photos[i].width/2)) + int(h / (photos[i].height/2)) * 2;
        rQ[quarterIndex] += photos[i].get(w,h)[0];
        gQ[quarterIndex] += photos[i].get(w,h)[1];
        bQ[quarterIndex] += photos[i].get(w,h)[2];
      }
      avgColor.push([r/pixelCount, g/pixelCount, b/pixelCount]);

      for(let i=0; i<4 ;i++) rQ[i] /= pixelCount/4;
      for(let i=0; i<4 ;i++) gQ[i] /= pixelCount/4;
      for(let i=0; i<4 ;i++) bQ[i] /= pixelCount/4;

      avgQuarterColor.push([rQ, gQ, bQ]);
    }
    
  img.resize(finalW, finalH);
  img.loadPixels();
  imgReserve.resize(size,size);
  imgReserve.loadPixels();
  for(i = 0; i < img.height; i++)
    for(j = 0; j < img.width; j++)
     {
       let bestFit = getBestFitNaive(img.get(j,i)[0],img.get(j,i)[1],img.get(j,i)[2]);
       //let bestFit = getBestFitFancy(j,i);
       image(photos[bestFit], j * (cellW), i * (cellH));
     }
     
}


// get best fit using the distance between colors
function getBestFitNaive(r,g,b){
  let bestFit = 0;
  let bestDist = 1000000;
  for(let i = 0; i < photoNum; i++){
    let currentDist = dist(r, g, b, avgColor[i][0], avgColor[i][1],avgColor[i][2]);
    if(currentDist < bestDist)
      {
        bestDist = currentDist;
        bestFit = i;
      }
  }
  return bestFit;
}

// for each cell check the best fit by calculating the distance from each quarter of the cell and quarter of each photo
function getBestFitFancy(x,y){
  let rQ = [0,0,0,0], gQ = [0,0,0,0], bQ = [0,0,0,0];
  for(let i = y * cellH; i < (y+1)*cellH; i++)
    for(let j = x * cellW; j < (x+1)*cellW; j++)
    {
      let quarterIndex = int((i % cellH) / (cellH/2)) * 2 + int((j % cellW) / (cellW/2));
      rQ[quarterIndex] += imgReserve.get(j,i)[0];
      gQ[quarterIndex] += imgReserve.get(j,i)[1];
      bQ[quarterIndex] += imgReserve.get(j,i)[2];
    }

  for(let i=0; i<4 ;i++) rQ[i] /= pixelCount/4;
  for(let i=0; i<4 ;i++) gQ[i] /= pixelCount/4;
  for(let i=0; i<4 ;i++) bQ[i] /= pixelCount/4;

  let cellAvgQuarterColor = [rQ, gQ, bQ];
  let bestFit = 0;
  let bestDist = 1000000;
  for(let i = 0; i <photoNum; i++){
    let currentDist = dist(cellAvgQuarterColor[0][0],cellAvgQuarterColor[1][0],cellAvgQuarterColor[2][0], 
                          avgQuarterColor[i][0][0],avgQuarterColor[i][1][0],avgQuarterColor[i][2][0])+ 
                      dist(cellAvgQuarterColor[0][1],cellAvgQuarterColor[1][1],cellAvgQuarterColor[2][1], 
                           avgQuarterColor[i][0][1],avgQuarterColor[i][1][1],avgQuarterColor[i][2][1])+
                      dist(cellAvgQuarterColor[0][2],cellAvgQuarterColor[1][2],cellAvgQuarterColor[2][2], 
                           avgQuarterColor[i][0][2],avgQuarterColor[i][1][2],avgQuarterColor[i][2][2])+ 
                      dist(cellAvgQuarterColor[0][3],cellAvgQuarterColor[1][3],cellAvgQuarterColor[2][3], 
                           avgQuarterColor[i][0][3],avgQuarterColor[i][1][3],avgQuarterColor[i][2][3])
               
    if(currentDist/4 < bestDist){
      bestDist = currentDist/4;
      bestFit = i;
    }
  }
  return bestFit;
}