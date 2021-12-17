// MAJOR PROJECT UI
// Daniel Messham
// Date
//
// Extra for Experts:
// based off the media page, will be a way to allow editing of certain settings without a text editor and physical access

let media0 = {
	network:false,
	sourceName:"[NO INPUT]",
	sourceID:"none",
	sourceType:"test",
	mediaType:"audio",
	mediaCodec:"none",
	mediaStateName:0,
	mediaStateString:"Stopped",
	mediaTitle:"[TEST_SONG_TITLE]",
	mediaArtistName:"[TEST_SONG_ARTIST]",
	mediaAlbumName:"[TEST_SONG_NAME]",
	mediaPlayedSec:60,
	mediaIsLive:false,
	mediaLengthSec:200,
	mediaProgress:30,
  }
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
	drawMediaStat(media0, 10,25,drawWidth)
  }
  
  function testdraw() {
	noStroke()
	fill('gray').
	rect(0,0,width,4)
  }
  
  function drawMediaStat(media, x,y,wid){
	fill('white');
	textSize(17)
	text(media.sourceName + " - " + media.sourceType + ": " + media.mediaStateString + " (" + media.mediaPlayedSec + "/" + media.mediaLengthSec + " Seconds )", x, y);
	text(media.mediaArtistName + " - " + media.mediaTitle, x, y+20);
	if(!media0.Live){
	strokeWeight(1);
	stroke("white");
	fill('gray');
	rect(x,y+33,wid-(x*2), 13);
	fill('green');
	noStroke();
	rect(x+1,y+36,(wid-(x*2)-1)*(media.mediaProgress/100),7);
	}
  }