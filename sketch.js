
function createP5Canvas(x, y, fragShader, choice = 0){
  return function(p5){
    let theShader;

    p5.preload = function(){
      theShader = p5.loadShader('shader.vert',fragShader);
    }

    p5.setup = function() {
      let canvas = p5.createCanvas(400, 400, p5.WEBGL);
      canvas.position(x,y);
    }

    p5.draw = function() {
      theShader.setUniform('u_time', p5.millis() / 1000.0);
      theShader.setUniform('u_resolution', [p5.width, p5.height]);
      theShader.setUniform('u_mouse', [p5.mouseX, p5.map(p5.mouseY, 0 , p5.height, p5.height, 0)]);
      theShader.setUniform('u_choice', choice);

      p5.shader(theShader);
      p5.rect(0,0,p5.width,p5.height);
    }
  }
}


function main(){
  let cWidth = 0;
  let cHeight = 10;
  for(i = 1; i < 6; i++){
    var canvas = createP5Canvas(cWidth, cHeight, 'Course2\\shader01-shaping-func.frag', i );
    new p5(canvas);

    cWidth += 450;
  }

  cHeight += 450;
  cWidth = 0;
  for(i = 1; i < 6; i++){
    var canvas = createP5Canvas(cWidth, cHeight, 'Course2\\shader04-Colors-HSB_Playground.frag', i );
    new p5(canvas);

    cWidth += 450;
  }

  cHeight += 450;
  cWidth = 0;
  var canvas = createP5Canvas(cWidth, cHeight, 'Course2\\shader05-Shapes-Square.frag', i );
  new p5(canvas);

  cWidth += 450;
  var canvas = createP5Canvas(cWidth, cHeight, 'Course2\\shader06-Shapes-PietMondrian_Tableau.frag', i );
  new p5(canvas);
}

main();