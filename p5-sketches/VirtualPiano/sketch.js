let whiteNotes = [];
let blackNotes = [];
let strNotes = "ABCDEFG";
let strBlackNotes = "ABDEG"
let whiteKeyboardNotes = "`1234567890-=qwertyuiop[]\\asdfghjkl;'zxcvbnm,./";
let blackKeyboardNotes = "~!#$^&*)_QWETYIOP}|SDFHJL:\"XCBNM>?"

let whiteNoteWidth = 25;
let whiteNoteHeigth = 300;

let blackNoteWidth = 15;
let blackNoteHeigth = 150;

let whiteToBlackRightNotes = "ACDFG"
let whiteToBlackLeftNotes = "ABDEG"

function setup() {
  createCanvas(1200, 300);
  let noteSound, note, blackNoteSound, blackNote;
  for (let j = 1; j <= 7; j++) {
    for (let i = 0; i < strNotes.length; i++) {
      // Add white note
      noteSound = loadSound('sounds/' + strNotes[i] + j + ".mp3")
      note = new Note(noteSound, (((j - 1) * 7) + i) * whiteNoteWidth, 0, whiteNoteWidth, whiteNoteHeigth, 255, strNotes[i]);
      note.draw();
      whiteNotes.push(note);

      //Add black note
      if (strBlackNotes.indexOf(strNotes[i]) != -1) {
        blackNoteSound = loadSound('sounds/' + strNotes[i] + "b" + j + ".mp3")
        blackNote = new Note(blackNoteSound, (((j - 1) * 7) + i) * whiteNoteWidth - blackNoteWidth / 2, 0, blackNoteWidth, blackNoteHeigth, 0, strNotes[i]);
        blackNote.draw();
        blackNotes.push(blackNote);
      }
    }
  }
}

function mousePressed() {
  if(mouseX < 0 || mouseX > 1200 || mouseY < 0 || mouseY > 300)
    return;
    
  let whiteNoteIndex = int(mouseX / whiteNoteWidth);

  // check if lower part is pressed
  if (mouseY > blackNoteHeigth) {
    whiteNotes[whiteNoteIndex].play();
    return;
  }

  //check for right side press
  if ("CDFGA".indexOf(whiteNotes[whiteNoteIndex].noteName) != -1 && mouseX % whiteNoteWidth >= 18.5)
    blackNotes[int((whiteNoteIndex / 7)) * 5 + 1 + whiteToBlackRightNotes.indexOf(whiteNotes[whiteNoteIndex].noteName)].play()
  // check for left side press
  else if ("DEGAB".indexOf(whiteNotes[whiteNoteIndex].noteName) != -1 && mouseX % whiteNoteWidth <= 7.5)
    blackNotes[int((whiteNoteIndex / 7)) * 5 + whiteToBlackLeftNotes.indexOf(whiteNotes[whiteNoteIndex].noteName)].play()
  else
    whiteNotes[whiteNoteIndex].play();

}


function mouseReleased() {
  // Due to an extremely lucky draw implementation this is all
  // that's needed to redraw the black rect if it is pressed
  let noteIndex = int(mouseX / whiteNoteWidth);
  whiteNotes[noteIndex].release();
}


function keyPressed(e) {
  let index = whiteKeyboardNotes.indexOf(e.key);
  if (index != -1)
    whiteNotes[index].play();
  else {
    index = blackKeyboardNotes.indexOf(e.key);
    if (index != -1)
      blackNotes[index].play();
  }
}

function keyReleased(e) {
  let index = whiteKeyboardNotes.indexOf(e.key);
  if (index != -1)
    whiteNotes[index].release();
  else {
    index = blackKeyboardNotes.indexOf(e.key);
    if (index != -1)
      blackNotes[index].release();
  }
}
