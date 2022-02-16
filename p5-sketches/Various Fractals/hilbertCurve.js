const hilbertCurveSketch = p => {
    let path = "";
    let stepNumber = 0;

    let nextStepB;

    p.setup= function() {
        let cnv = p.createCanvas(400, 400);
        cnv.parent('hilbertCurveCanvas');

        nextStepB = p.createButton("Next Step");
        nextStepB.parent('hilbertCurveInput');
        nextStepB.mouseClicked(nextStep);

        path = "A"
    }

    function nextStep() {
        if (stepNumber >= 8)
            return
        ProcessNewPath();
        DrawPath();
    }

    // function keyPressed() {
    //     if (stepNumber >= 8)
    //         return
    //     ProcessNewPath();
    //     DrawPath();
    // }

    function ProcessNewPath() {
        stepNumber++

        let newPath = "";
        for (i = 0; i < path.length; i++) {
            if (path[i] == "F" || path[i] == "L" || path[i] == "R")
                newPath += path[i];
            else if (path[i] == "A")
                newPath += "LBFRAFARFBL";
            else if (path[i] == "B")
                newPath += "RAFLBFBLFAR";
        }

        path = newPath;
    }

    function DrawPath() {
        p.background(255);
        let x = 0, y = 399, length = 10;
        let dir = p.createVector(length, 0);
        for (i = 0; i < path.length; i++) {
            if (path[i] == "F") {
                p.line(x, y, x + dir.x, y + dir.y);
                x = x + dir.x;
                y = y + dir.y;
            }
            else if (path[i] == "L")
                dir.rotate(p.radians(-90));
            else if (path[i] == "R")
                dir.rotate(p.radians(90));
        }
    }
}

new p5(hilbertCurveSketch)