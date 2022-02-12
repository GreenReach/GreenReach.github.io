class Ray {

    constructor(originX, originY, dirX = 0, dirY = 0) {
        this.origin = createVector(originX, originY);
        this.dir = createVector(dirX, dirY);
        this.dir.normalize();
    }

    lookAt(x, y, isWorldCoords = true) {
        if(isWorldCoords)
            this.dir = createVector(x - this.origin.x, y - this.origin.y);
        else
            this.dir = createVector(x, y);
        this.dir.normalize();
    }

    draw() {
        //line(this.origin.x, this.origin.y, this.dir.x * 10 + this.origin.y, this.dir.y * 10 + this.origin.x);
    }

    setOrigin(x,y){
        this.origin.x = x;
        this.origin.y = y;
    }

    cast(walls) {
        let point = null;
        let pointDist = 100000;
        let color = null;
        
        let x1 = this.origin.x;
        let y1 = this.origin.y;
        let x2 = this.dir.x + this.origin.x;
        let y2 = this.dir.y + this.origin.y;
        let x3, x4, y3, y4;

        for (let wall of walls) {
            x3 = wall.start.x;
            y3 = wall.start.y;
            x4 = wall.fin.x;
            y4 = wall.fin.y;

            let den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
            if (den == 0)
                continue;
            let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
            let u = -((x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1)) / den;
            if (u > 0 && u < 1 && t > 0) {
                let intersection = createVector(x1 + t * (x2 - x1), y1 + t * (y2 - y1));
                if (this.origin.dist(intersection) < pointDist) {
                    point = intersection;
                    pointDist = this.origin.dist(point);
                    color = wall.color;
                }

            }
        }
        return [point, color];
    }
}