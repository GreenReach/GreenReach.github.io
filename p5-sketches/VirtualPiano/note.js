class Note {
    constructor(sound, posX, posY, width, height, noteColor, noteName) {
        this.sound = sound;
        this.x = posX;
        this.y = posY;
        this.width = width;
        this.height = height;
        this.noteColor = noteColor
        this.noteName = noteName
    }

    draw() {
        fill(this.noteColor)
        strokeWeight(2)
        rect(this.x, this.y, this.width, this.height)
        this.drawBlackKeyOverCheck();
    }

    drawBlackKeyOverCheck() {
        if (this.noteColor == 255) {
            fill(0)

            //check back key
            if ("DEGAB".indexOf(this.noteName) != -1)
                rect(this.x - blackNoteWidth / 2, this.y, blackNoteWidth, blackNoteHeigth)

            //check front key
            if ("CDFGA".indexOf(this.noteName) != -1)
                rect(this.x + whiteNoteWidth - blackNoteWidth / 2, this.y, blackNoteWidth, blackNoteHeigth)
        }
    }

    play() {
        this.sound.stop();
        this.sound.play();
        this.sound.stop(4);

        fill(125);
        rect(this.x, this.y, this.width, this.height)
        this.drawBlackKeyOverCheck();
    }

    release() {
        this.draw();
    }
}