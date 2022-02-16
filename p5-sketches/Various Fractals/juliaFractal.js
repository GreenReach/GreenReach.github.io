const juliaFractal = p => {

    let winSize = 400;
    let w = winSize, h = winSize;
    let fractalColors = 1;

    let nextStepB;

    p.setup = function () {
        p.colorMode(p.HSB);
        let cnv = p.createCanvas(w, h);
        cnv.parent('juliaCanvas');

        nextStepB = p.createButton("Next Step");
        nextStepB.parent('juliaInput');
        nextStepB.mouseClicked(nextStep);

        p.strokeWeight(1);
        p.background(255);
        CreateJuliaImage(fractalColors);
    }


    function nextStep() {
        fractalColors++;
        CreateJuliaImage(fractalColors);
    }

    // function keyPressed() {
    //     fractalColors++;
    //     CreateJuliaImage(fractalColors);
    // }

    function CreateJuliaImage(maxIter) {
        for (let i = 0; i < w; i++)
            for (let j = 0; j < h; j++)
                ComputePixelValue(i, j, maxIter);
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
}

new p5(juliaFractal)