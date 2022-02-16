const classicSketch = p => {

  let winSize = 500;
  let w = winSize, h = winSize;
  let fractalColors = 1000;

  let completionTime = 0;
  p.setup = function () {
    p.colorMode(p.HSB);
    let cnv = p.createCanvas(w, h);
    cnv.parent('canvas-holder')
    DrawClassic()
  }

  function DrawClassic() {
    CreateJuliaImage(fractalColors);
  }

  function CreateJuliaImage(maxIter) {
    for (let i = 0; i < w; i++)
      for (let j = 0; j < h; j++)
        ComputePixelValue(i, j, maxIter);
    completionTime = p.millis();
  }

  function ComputePixelValue(xInit, yInit, maxIter) {
    let R = 2;
    let cx = -0.4, cy = 0.6;
    let x = p.map(xInit, 0, w, -R, R);
    let y = p.map(yInit, 0, h, -R, R);

    let iteration = 0;
    while (x * x + y * y < R * R && iteration < maxIter) {
      let xtemp = x * x - y * y;
      y = 2 * x * y + cy;
      x = xtemp + cx;

      iteration++;
    }

    let hue = p.int(255 * iteration / maxIter);
    let sat = 255;
    let bright = 255;
    if (iteration == maxIter)
      bright = 0;

    p.stroke(hue, sat, bright);
    p.point(xInit, yInit);
  }

  p.getCompletionTime = function () {
    return completionTime;
  }
}

let classic = new p5(classicSketch)


const shaderSketch = p => {

  let winSize = 500;
  let w = winSize, h = winSize;
  let fractalColors = 100;
  let theShader;
  let shaderTexture;

  let completionTime = 0;

  p.preload = function () {
    theShader = p.loadShader('shader.vert', 'shader.frag');
  }

  p.setup = function () {
    let cnv = p.createCanvas(w, h, p.WEBGL);
    cnv.parent('canvas-holder')

    shaderTexture = p.createGraphics(w, h, p.WEBGL);
    DrawWithShaders();
  }

  function DrawWithShaders() {
    CreateShaderedJulia()
    CreateShaderedJulia()
  }

  function CreateShaderedJulia() {
    theShader.setUniform('u_time', p.millis() / 1000.0);
    theShader.setUniform('u_resolution', [w, h]);
    theShader.setUniform('u_mouse', [p.mouseX, p.map(p.mouseY, 0, p.height, p.height, 0)]);
    theShader.setUniform('u_maxIter', fractalColors);

    shaderTexture.shader(theShader);

    shaderTexture.rect(0, 0, w, h);
    p.rect(-w / 2, -h / 2, w, h);
    p.texture(shaderTexture);
    completionTime = p.millis()
  }

  p.getCompletionTime = function () {
    return completionTime;
  }
}

let shadered = new p5(shaderSketch)
setInterval(getCompletionTime, 1);

function getCompletionTime() {
  let shaderTime = shadered.getCompletionTime();
  let classicTime = classic.getCompletionTime();

  if (shaderTime != 0 && classicTime != 0) {
    document.getElementById('completion-time').innerHTML = "Render Time with shaders: " + parseInt(shaderTime) + " milliseconds" + 
      "<br> Render Time without shaders: " + parseInt(classicTime) + " milliseconds";
    
      clearInterval(getCompletionTime);
  }
}