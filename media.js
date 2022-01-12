// MAJOR PROJECT UI
// Daniel Messham
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let drawWidth;

let albumArt
let deviceIcon;
let artSize

let playingIcon
let pausedIcon
let backIcon
let nextIcon
let optionsIcon
let openIcon


function preload(){
  albumArt = loadImage('images/challenger.gif');//load albumArt Placeholder
  deviceIcon = loadImage('images/spr_bigbob_0.png');//load source Placeholder

  playingIcon = loadImage('js-assets/media/media-playback-pause.svg');//load control icons
  pausedIcon = loadImage('js-assets/media/media-playback-play.svg');
  backIcon = loadImage('js-assets/media/media-seek-backward.svg');
  nextIcon = loadImage('js-assets/media/media-seek-forward.svg');
  openIcon = loadImage('js-assets/media/folder.svg');
  stopIcon = loadImage('js-assets/media/media-playback-stop.svg');
  optionsIcon = loadImage('js-assets/common/emblem-system.svg');
}

function setup() {
  drawWidth = windowWidth*0.8;
  createCanvas(drawWidth, 300).parent("jscanvas");
  artSize = drawWidth/3.7
}

function windowResized(){
  drawWidth = windowWidth*0.8;
  createCanvas(drawWidth, 300).parent("jscanvas");
  artSize = drawWidth/3.7
}

function draw() {
  background(20);
  testdraw()
  drawMediaStat(media0, 7,25,drawWidth,albumArt, artSize, deviceIcon)
  mediaControl(media0, artSize, 125, drawWidth-artSize, (drawWidth-artSize)/6, 15)
}

function testdraw() {
  noStroke()
  fill('gray').
  rect(0,0,width,4)
}

function drawMediaStat(media, x,y,wid, art, artWidth, sourceIcon){
  fill('white');
  //rect(x,y-20,30,30)//source icon placeholder
  image(sourceIcon,x,y-20,30,30)
  textSize(17)//source info
  text(media.sourceName + " - " + media.sourceType + ": " + media.mediaStateString, x+33, y);
  textSize(27)//song title
  text(media.mediaTitle, x+artWidth+7, y+33);
  textSize(17)//artist and album
  text(media.mediaArtistName + " - " + media.mediaAlbumName, x+artWidth+7, y+60);
  fill(`red`)//album art placeholder
  rect(x, y+10, artWidth, artWidth)
  image(art,x, y+10, artWidth, artWidth)
  if(!media0.Live){
    strokeWeight(1);
    stroke("white");//progressbar bg
    fill('gray');
    rect(x+7+artWidth,y+70,wid-(x*2)-artWidth-3, 13);
    fill('green');//progressbar fill
    noStroke();
    rect(x+9+artWidth,y+73,(wid-(x*2)-4-artWidth)*(media.mediaProgress/100),7);
    textSize(17)//playeed time
    fill('green');
    text("played " + media.mediaPlayedSec , x+artWidth+10, y+103);
    fill('gray');//time remaining
    text("left: " + media.mediaLengthSec, wid-70, y+103);
  }
}

function mediaControl(source, x, y, wid, size, space){
  let playbackStateIcon = stopIcon
  if(source.mediaStateName = "play"){let playbackStateIcon = pausedIcon}
  else if(source.mediaStateName = 'paused'){let playbackStateIcon = playingIcon}

  mediaButton(optionsIcon,x,y,0,size,space,'cyan',"options")

  mediaButton(backIcon,x,y,1,size,space,'orange',"back")

  mediaButton(playbackStateIcon,x,y,2,size,space,'purple',source.mediaStateString)

  mediaButton(nextIcon,x,y,3,size,space,'orange',"pause")

  mediaButton(openIcon,x,y,4,size,space,'blue',"open")

  

  //ligic for 
}

