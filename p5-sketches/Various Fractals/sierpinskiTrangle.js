let sierpinskiTriangle = p => {
    class tri {
        constructor(p1, p2, p3) {
            this.p1 = p1;
            this.p2 = p2;
            this.p3 = p3;
        }
    }

    let cSize = 400;
    let triangles = [new tri([cSize/2, 0], [0, cSize], [400, cSize])]
    let nextStepB;
    let currentStep = 0;

    p.setup = function () {
        let cnv = p.createCanvas(cSize, cSize);
        cnv.parent('sierpinskiTriangleCanvas')

        nextStepB = p.createButton("Next Step");
        nextStepB.parent('sierpinskiTriangleInput');
        nextStepB.mouseClicked(nextStep);

        p.fill(0, 0, 0);
        p.triangle(cSize/2, 0, 0, cSize, cSize, cSize);

        p.noStroke();
        p.fill(255, 255, 255);
    }

    function nextStep() {
        if (currentStep > 8)
            return;

        currentStep++;
        new_triangles = []
        for (i = 0; i < triangles.length; i++) {
            p1_p2 = [(triangles[i].p1[0] + triangles[i].p2[0]) / 2, (triangles[i].p1[1] + triangles[i].p2[1]) / 2]
            p2_p3 = [(triangles[i].p2[0] + triangles[i].p3[0]) / 2, (triangles[i].p2[1] + triangles[i].p3[1]) / 2]
            p3_p1 = [(triangles[i].p3[0] + triangles[i].p1[0]) / 2, (triangles[i].p3[1] + triangles[i].p1[1]) / 2]

            new_triangles.push(new tri(triangles[i].p1, p1_p2, p3_p1))
            new_triangles.push(new tri(p1_p2, triangles[i].p2, p2_p3))
            new_triangles.push(new tri(p3_p1, p2_p3, triangles[i].p3))

            p.triangle(p1_p2[0], p1_p2[1], p2_p3[0], p2_p3[1], p3_p1[0], p3_p1[1]);
        }
        triangles = new_triangles.slice()
    }
}

new p5(sierpinskiTriangle);