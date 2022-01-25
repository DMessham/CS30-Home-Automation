// MAJOR PROJECT UI
// Daniel Messham
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"




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


function draw() {
  drawWidth = width*0.8;
  artSize = 300
  background(backgroundColor);
  labelDraw("Media Player (Non Functional)")
  mediaLogic(media0)
  drawMediaStat(media0, 7,60,drawWidth,albumArt, artSize, deviceIcon)
  mediaControlBG(media0, artSize+5, 170, drawWidth-artSize, (drawWidth-artSize)/6, 15)
  mediaControl(media0, artSize+5, 170, drawWidth-artSize, (drawWidth-artSize)/6, 15)
}



function drawMediaStat(media, x, y, wid, art, artWidth, sourceIcon){
  stroke("green")
  strokeWeight(2)
  fill('white');
  rect(x,y-20,30,30,5)//source icon placeholder
  image(sourceIcon,x,y-20,30,30)
  noStroke()
  textSize(17)//source info
  text(media.sourceName + " - " + media.sourceType + ": " + media.mediaStateString, x+40, y);
  textSize(27)//song title
  text(media.mediaTitle, x+artWidth+10, y+45);
  textSize(17)//artist and album
  text(media.mediaArtistName + " - " + media.mediaAlbumName, x+artWidth+10, y+70);
  fill(65)//album art placeholder
  stroke("green")
  rect(x, y+20, artWidth, artWidth,7)
  image(art,x, y+20, artWidth, artWidth)
  if(!media0.Live){
    strokeWeight(1);
    progress(x+13+artWidth,y+85,wid-(x*2)-artWidth-3,13,media.mediaProgress,'green','gray','test','gray',2)
    textSize(17)//playeed time
    fill('green');
    text("played " + media.mediaPlayedSec , x+artWidth+12, y+115);
    fill('gray');//time remaining
    text("left: " + media.mediaLengthSec, wid-60, y+115);
  }
  
}

function mediaControlBG(source, x, y, wid, size, space){
  let playbackStateIcon = stopIcon
  if(source.mediaState == 'play'){
    playbackStateIcon = playingIcon
    source.mediaStateString="Playing"
  }
  else if(source.mediaState == 'pause'){
    playbackStateIcon = pausedIcon
    source.mediaStateString="Paused"
  }
  else if(source.mediaState == 'error'){
    source.mediaStateString="ERROR"
  }
  else if(source.mediaState == 'stop'){
    source.mediaStateString="Stopped"
  }

  mediaButton(optionsIcon,x,y,0,size,space,'cyan',"options")

  mediaButton(backIcon,x,y,1,size,space,'orange',"back")

  mediaButton(playbackStateIcon,x,y,2,size,space,'purple',source.mediaStateString)

  mediaButton(nextIcon,x,y,3,size,space,'orange',"next")

  mediaButton(openIcon,x,y,4,size,space,'blue',"open")

  
}

function mediaControl(source,x,y,wid,size,space){
  //logic for buttons
  if(mouseIsPressed&&(millis()-timeBase>=200)){
    
    if(mouseArea(x+(1)*space,y,size,y+space)){//opt
      console.log("opt clicked")
      mediaOpt(source)
    }

    else if(mouseArea(x+1*size+(2)*space,y,size,y+space)){//back
      console.log("back clicked")
      mediaBack(source)
    }

    else if(mouseArea(x+2*size+(3)*space,y,size,y+space)){//pause
      console.log("play/pause clicked - "+source.mediaState)
      mediaPlayPause(source)
      
    }

    else if(mouseArea(x+3*size+(4)*space,y,size,y+space)){//next
      console.log("next clicked")
      mediaNext(source)
    }

    else if(mouseArea(x+4*size+(5)*space,y,size,y+space)){//open
      console.log("open clicked")
      mediaOpen(source)
    }
    timeBase = millis()//reset the delay for a button press
  }
}
function mediaLogic(source){
  
}