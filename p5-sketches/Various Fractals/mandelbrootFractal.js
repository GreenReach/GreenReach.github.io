const mandelbrootFractal = p => {

    let winSize = 400;
    let w = winSize, h = winSize;
    let fractalColors = 2;

    let nextStepB;

    p.setup = function () {
        p.colorMode(p.HSB);
        let cnv = p.createCanvas(w, h);
        cnv.parent('mandelbrootCanvas');
        p.strokeWeight(1);
        p.background(255);

        nextStepB = p.createButton("Next Step");
        nextStepB.parent('mandelbrootInput');
        nextStepB.mouseClicked(nextStep);

        CreateMandelbrootImage(fractalColors);
    }

    function nextStep() {
        fractalColors++;
        CreateMandelbrootImage(fractalColors);
    }

    // function keyPressed() {
    //     fractalColors++;
    //     CreateMandelbrootImage(fractalColors);
    // }

    function CreateMandelbrootImage(maxIter) {
        for (let i = 0; i < w; i++)
            for (let j = 0; j < h; j++)
                ComputePixelValue(i, j, maxIter);
    }

    function ComputePixelValue(xInit, yInit, maxIter) {
        let x0 = p.map(xInit, 0, w, -2, 2);
        let y0 = p.map(yInit, 0, h, -2, 2);
        let x = 0;
        let y = 0;

        let iteration = 0;
        while (x * x + y * y < 4 && iteration < maxIter) {
            let xtemp = x * x - y * y + x0;
            y = 2 * x * y + y0;
            x = xtemp;
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

new p5(mandelbrootFractal)