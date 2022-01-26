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

let playlist=[
  [],
  [],
  [],
  [],
]
let playlistPos=0

let currentSong

let input = document.createElement('input');
input.type = 'file';

let media0 = {
  sourceName:"[SOURCE_NAME]",
  sourceID:"SOURCE",
  sourceType:"[SOURCE_TYPE]",
  sourceIcon:"none",
  mediaType:"audio",
  mediaCodec:"none",
  mediaState:"pause",
  mediaStateString:"Stopped",
  mediaTitle:"[TEST_SONG_TITLE]",
  mediaArtistName:"[TEST_SONG_ARTIST]",
  mediaAlbumName:"[TEST_ALBUM_NAME]",
  mediaAlbumArt:"null",
  mediaPlayedSec:60,
  mediaIsLive:false,
  mediaLengthSec:200,
  mediaProgress:30,
}



function preload(){
  albumArt = loadImage('images/challenger.gif');//load albumArt Placeholder
  deviceIcon = loadImage('images/spr_bigbob_0.png');//load source Placeholder

  playingIcon = loadImage('js-assets/media/media-playback-pause.svg');//load control icons
  pausedIcon = loadImage('js-assets/media/media-playback-play.svg');
  backIcon = loadImage('js-assets/media/media-seek-backward.svg');
  nextIcon = loadImage('js-assets/media/media-seek-forward.svg');
  openIcon = loadImage('js-assets/media/folder.svg');
  stopIcon = loadImage('js-assets/media/media-playback-stop.svg');
  listIcon = loadImage('js-assets/media/format-justify-left.svg');
}


function draw() {
  drawWidth = width*0.8;
  artSize = 300
  background(backgroundColor);
  labelDraw("Media Player (Non Functional)")
  mediaLogic(media0)
  drawMediaStat(media0, 7,60,drawWidth,albumArt, artSize, deviceIcon)
  mediaControlBG(media0, artSize+5, 170, drawWidth-artSize, (drawWidth-artSize)/6, 15)
  //mediaControl(media0, artSize+5, 170, drawWidth-artSize, (drawWidth-artSize)/6, 15)
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

  mediaButton(listIcon,x,y,0,size,space,'cyan',"Playlists")

  mediaButton(backIcon,x,y,1,size,space,'orange',"Back")

  mediaButton(playbackStateIcon,x,y,2,size,space,'purple',source.mediaStateString)

  mediaButton(nextIcon,x,y,3,size,space,'orange',"Next")

  mediaButton(openIcon,x,y,4,size,space,'blue',"Open")

  
}

function mouseClicked() {
   mediaControl(media0, artSize+5, 170, drawWidth-artSize, (drawWidth-artSize)/6, 15)
}

function mediaControl(source,x,y,wid,size,space){
  
  
  
  //logic for buttons
  if((millis()-timeBase>=200)){
    
    if(mouseArea(x+(1)*space,y,size,y+space)){//opt
      console.log("Playlist clicked")
      mediaList(source)
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
  window.AudioContext = window.AudioContext || window.webkitAudioContext;


}

function mediaList(source){}

function mediaBack(source){
  alert("Playlists are not currently supported")
}

function mediaPlayPause(source){
  if(source.mediaState == 'pause'){
    source.mediaState = 'play';
  }
  else if(source.mediaState == 'play'){
    source.mediaState = 'pause';
  }

}

function mediaNext(source){
  alert("Playlists are not currently supported")
}
function mediaOpen(source){
  //openfile(prompt("\nAn internal error occured, fallingback to user text input.\n(MAY CAUSE ERRORS,NO SANITY CHECKS AVAILABLE)\nEnter new value for Media: \nDefaults to current value."))
  //let input = document.getElementById('file-input').click();
  //let file2 = input 
  //alert(file2)
  input.click();

        
    


}

input.onchange = e => { 
  let file2 = e.target.files[0]; 
  let reader = new FileReader();
  reader.readAsArrayBuffer(file2);
  // here we tell the reader what to do when it's done reading...
  reader.onload = readerEvent => {
      let c0ntent=readerEvent.target.result; // this is the content!
  }
  loadMime(fileInput.files[0], function(mime) {

    //print the output to the console
    console.log(mime);
    currentSong = content
});
}
      


    //when selecting a file on the input
    input.onchange = function() {
      
    };
/**
 * Load the mime type based on the signature of the first bytes of the file
 * @param  {File}   file        A instance of File
 * @param  {Function} callback  Callback with the result
 * @author Victor www.vitim.us
 * @date   2017-03-23
 */
 function loadMime(file, callback) {
    
  //List of known mimes
  let mimes = [
    {
        mime: 'audio/mpeg',
        pattern: [0x49, 0x44, 0x33],
        mask: [0xFF, 0xFF, 0xFF],
    },
    {
        mime: 'audio/wave',
        pattern: [0x52, 0x49, 0x46, 0x46, 0x00, 0x00, 0x00, 0x00, 0x57, 0x41, 0x56, 0x45],
        mask: [0xFF, 0xFF, 0xFF, 0xFF, 0x00, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0xFF],
    }
      // you can expand this list @see https://mimesniff.spec.whatwg.org/#matching-an-image-type-pattern
  ];

  function check(bytes, mime) {
      for (var i = 0, l = mime.mask.length; i < l; ++i) {
          if ((bytes[i] & mime.mask[i]) - mime.pattern[i] !== 0) {
            console.log("Invalid MIME")
              return false;
              
          }
      }
      return true;
  }

  var blob = file.slice(0, 4); //read the first 4 bytes of the file

  var reader = new FileReader();
  reader.onloadend = function(e) {
      if (e.target.readyState === FileReader.DONE) {
          var bytes = new Uint8Array(e.target.result);

          for (var i=0, l = mimes.length; i<l; ++i) {
              if (check(bytes, mimes[i])) return callback("Mime: " + mimes[i].mime + " <br> Browser:" + file.type);
          }

          return callback("Mime: unknown <br> Browser:" + file.type);
      }
  };
  reader.readAsArrayBuffer(blob);
}