let kockSnowflake = p => {
    let cSize = 400;
    let points = [];
    let lineDist = cSize - 100;

    let nextStepB;

    p.setup = function () {
        let cnv = p.createCanvas(cSize, cSize);
        cnv.parent('kochSnowflakeCanvas')
        p.background(255);
        p.stroke(0, 0, 255);

        nextStepB = p.createButton("Next Step");
        nextStepB.parent('kochSnowflakeInput');
        nextStepB.mouseClicked(nextStep);

        p.line(cSize / 2, 100, 100, cSize - 100);
        p.line(100, cSize - 100, cSize - 100, cSize - 100);
        p.line(cSize - 100, cSize - 100, cSize / 2, 100);

        points.push([cSize / 2, 100]);
        points.push([100, cSize - 100]);
        points.push([cSize - 100, cSize - 100]);

    }

    // function keyPressed() {
    //     if (keyCode === 32) {
    //         nextStep();
    //     }
    // }

    function nextStep() {
        let newPoints = [points[0]];

        lineDist = lineDist / 3;
        if (lineDist < 0.1)
            return

        for (var i = 1; i < points.length; i++) {
            let a = points[i - 1];
            let b = points[i];
            newPoints = computePoints(a, b, newPoints)
        }
        newPoints = computePoints(points[points.length - 1], points[0], newPoints);

        p.background(255);
        for (i = 1; i < newPoints.length; i++) {
            let a = newPoints[i - 1];
            let b = newPoints[i];
            p.line(a[0], a[1], b[0], b[1]);
        }
        points = newPoints.slice();
    }

    function computePoints(a, b, newPoints) {
        let d = [b[0] - a[0], b[1] - a[1]];

        let x = [a[0] + d[0] / 3, a[1] + d[1] / 3];
        let z = [a[0] + d[0] * 2 / 3, a[1] + d[1] * 2 / 3];

        let yVec = p.createVector(x[1] - z[1], z[0] - x[0])
        yVec.normalize().mult(lineDist);
        let y = [(x[0] + z[0]) / 2 + yVec.x, (x[1] + z[1]) / 2 + yVec.y];

        newPoints.push(x);
        newPoints.push(y);
        newPoints.push(z);
        newPoints.push(b);

        return newPoints;
    }
}

new p5(kockSnowflake)