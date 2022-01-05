// MAJOR PROJECT UI
// Daniel Messham
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let drawWidth;

function setup() {
  drawWidth = windowWidth*0.8;
  createCanvas(drawWidth, 300).parent("jscanvas");
}

function windowResized(){
  drawWidth = windowWidth*0.8;
  createCanvas(drawWidth, 300).parent("jscanvas");
}

function draw() {
  background(20);
  testdraw()
  drawMediaStat(media0, 7,25,drawWidth,media0.mediaAlbumArt, 115, media0.sourceIcon)
  mediaControl(media0, 15, 150, drawWidth, drawWidth/6, 15)
}

function testdraw() {
  noStroke()
  fill('gray').
  rect(0,0,width,4)
}

function drawMediaStat(media, x,y,wid, art, artWidth, sourceIcon){
  fill('white');
  rect(x,y-20,30,30)//source icon placeholder
  textSize(17)//source info
  text(media.sourceName + " - " + media.sourceType + ": " + media.mediaStateString, x+33, y);
  textSize(27)//song title
  text(media.mediaTitle, x+artWidth+7, y+33);
  textSize(17)//artist and album
  text(media.mediaArtistName + " - " + media.mediaAlbumName, x+artWidth+7, y+60);
  if(!media0.Live){
  strokeWeight(1);
  stroke("white");//progressbar bg
  fill('gray');
  rect(x+7+artWidth,y+80,wid-(x*2)-artWidth-3, 13);
  fill('green');//progressbar fill
  noStroke();
  rect(x+9+artWidth,y+83,(wid-(x*2)-4-artWidth)*(media.mediaProgress/100),7);
  fill(`red`)//album art placeholder
  rect(x, y+10, artWidth, artWidth)
  textSize(17)//playeed time
  fill('green');
  text("played " + media.mediaPlayedSec , x+artWidth+10, y+113);
  fill('gray');//time remaining
  text("left: " + media.mediaLengthSec, wid-80, y+113);
  }
}

function mediaControl(source, x, y, wid, size, space){
  fill(`cyan`)//restart
  rect(x, y+space, size, size)

  fill(`orange`)//back
  rect(x + (size+space), y+space, size, size)

  fill(`purple`)//play
  rect(x + 2*(size+space), y+space, size, size)

  fill(`orange`)//next
  rect(x + 3*(size+space), y+space, size, size)

  fill(`blue`)//options
  rect(x + 4*(size+space), y+space, size, size)
}