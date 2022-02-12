class Wall {

    constructor(startX, startY, finX, finY) {
        this.start = createVector(startX, startY);
        this.fin = createVector(finX, finY);
        this.color = [0,0,0];
    }

    setRandColor(){
        this.color = [int(random(0, 255)), int(random(0, 255)),int(random(0, 255))]
    }

    draw() {
        line(this.start.x, this.start.y, this.fin.x, this.fin.y);
    }
}