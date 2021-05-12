let pageR, pageL;
let canvas;
let isFlipping = false;
let currentAngle = 0;

function setup(){
    canvas = createCanvas(600,300, WEBGL);
    background(0);
    noStroke();
    angleMode(DEGREES); 

    pageL = createGraphics(200,200)
    pageL.textSize(20);
    pageL.background(255);
    pageL.textAlign(CENTER, CENTER);
    pageL.text("Pagina stanga",0, 100, 200);


    
    pageR = createGraphics(200,200)
    pageR.textSize(20);
    pageR.background(255);
    pageR.textAlign(CENTER, CENTER);
    pageR.text("Pagina Dreapta",0, 100, 200);
}

function FlipPage(){
    if( !isFlipping)
        return;

    translate(-100,0);
    rotateY(currentAngle);
    translate(100,0);

    currentAngle -= 1;

    if(currentAngle == -180)
    {    
        isFlipping = false;
        currentAngle = 0;
    }
}


function draw(){
    background(0)


    texture(pageL);
    translate(-100,0);
    plane(200);

    texture(pageR)
    translate(201, 0)
    FlipPage();

    plane(200);

}

function mouseClicked() {
    if(!isFlipping)
        isFlipping = true
}