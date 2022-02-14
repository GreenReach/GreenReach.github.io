class Dot {
    constructor(a, b, originX, originY, startX = -a, isInFront = true) {
        this.origin = createVector(originX, originY);
        this.a = a;
        this.b = b;
        this.pos = startX;
        this.isInFront = isInFront;

        this.speed = 1;
        this.size = 10;

        if(isInFront)
        this.currentSpeed = this.speed;
        else
        this.currentSpeed = -this.speed;

    }


    NextStep() {
        let x = this.pos;
        let y = sqrt(this.b ** 2 * (this.a ** 2 - x * x)) / this.a;
        if (!this.isInFront)
            y = -y;


        //let dist = createVector(x + this.origin.x,y + this.origin.y).dist(this.origin);
        //let skewFactor = this.a/this.b;
        //let speedFactor = map(dist, this.b,this.a, 1, skewFactor);
        //print(this.currentSpeed /dist);
        this.pos += this.currentSpeed;

        if (this.pos >= this.a) {
            this.isInFront = false;
            this.currentSpeed = -this.speed;
        }
        else if (this.pos <= -this.a) {
            this.isInFront = true;
            this.currentSpeed = this.speed;
        }

        let currentSize, scalingFactor;
        if (this.isInFront) {
            scalingFactor = map(abs(x), 0, this.a, 1, 4);
        }
        else {
            scalingFactor = map(abs(x), 0, this.a, 8, 4);
        }
        currentSize = this.size / scalingFactor
        return [x + this.origin.x, y + this.origin.y, currentSize];
    }


}