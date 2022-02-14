cantorAxiom = {
    "start":"F",
    "angle":0,
    "scalingFactor": 1,
    "F":"FGF",
    "G":"GGG"
}

kochSnowflakeAxiom = {
    "start":"F++F++F",
    "angle":60,
    "scalingFactor": 3,
    "F":"F-F++F-F",
    "-":"-",
    "+":"+"
}

kochCurveAxiom = {
    "start":"+F",
    "angle":90,
    "scalingFactor":2,
    "F":"F+F-F-F+F",
    "-":"-",
    "+":"+"
}

sierpinskiTriangleAxiom = {
    "start":"F",
    "angle":60,
    "scalingFactor":3,
    "F":"G+F+G",
    "G":"F-G-F",
    "-":"-",
    "+":"+"
}

plantAxiom = {
    "start":"YYY",
    "angle":30,
    "scalingFactor":2.2,
    "F":"F",
    "X":"X[-FFF][+FFF]FX",
    "Y":"YFX[+Y][-Y]",
    "-":"-",
    "+":"+",
    "[":"[",
    "]":"]"
}

plantRandomAxiom = {
    "start":"F",
    "angle":30,
    "scalingFactor":1.75,
    "F":[[33, "F[+F]F[-F]F"], [33, "F[+F]F"], [34, "F[-F]F"]],
    "-":"-",
    "+":"+",
    "[":"[",
    "]":"]"
}

bushyPlantAxiom = {
    "start":"F",
    "angle":22,
    "scalingFactor":1.90,
    "F":"FF-[-F+F+F]+[+F-F-F]",
    "-":"-",
    "+":"+",
    "[":"[",
    "]":"]"
}

anotherBushyPlantAxiom = {
    "start":"F",
    "angle":20,
    "scalingFactor":1.90,
    "F":"F[+F]F[-F][F]",
    "-":"-",
    "+":"+",
    "[":"[",
    "]":"]"
}

FernAxiom = {
    "start":"X",
    "angle":25.7,
    "scalingFactor":2,
    "F":"FF",
    "X":"F[+X][-X]FX",
    "-":"-",
    "+":"+",
    "[":"[",
    "]":"]"
}