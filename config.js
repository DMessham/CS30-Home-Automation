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
  
  class Button {
	constructor(x,y,buttonWidth, buttonHeight, text, accent, norm, hover, txtcolor) {
	  this.x = x;
	  this.y = y;
	  this.width = buttonWidth;
	  this.height = buttonHeight;
	  this.normColor = norm
	  this.accentColor = accent
	  this.hoverColor = hover
	  this.text = text
	  this.textColor = txtcolor
	}
	display(){
	  if(this.isPointInButton(mouseX,mouseY)){
		if(mouseIsPressed){
		  fill(this.accentColor);
		}
		else{fill(this.hoverColor);}
	  }
	  else{fill(this.normColor);}
	  stroke(this.accentColor)
	  strokeWeight(3)
	  rect(this.x,this.y,this.width,this.height)
	  noStroke;
	  textSize(this.height/4)
	  fill(this.textColor)
	  text(this.text,this.x+50,this.y+50,this.width-50,this.height-50)
	}
	isPointInButton(x,y){
	  return( x>this.x && x<this.x+this.width && y>this.y && y<this.y+this.height)
	}
  }
  
  class progress { //idk how well this will work yet
	constructor(x,y,objWidth, objHeight, progress, fill, bg, text, txtcolor) {
	  this.x = x;
	  this.y = y;
	  this.width = objWidth;
	  this.height = objHeight;
	  this.bgColor = bg
	  this.edgeColor = 160
	  this.fillColor = fill
	  this.progress = progress
	  this.label = text
	  this.textColor = txtcolor
  
	}
	display(){
	  fill(this.bgColor);
	  stroke(this.edgeColor)
	  strokeWeight(3)
	  rect(this.x,this.y,this.width,this.height)
	  fill(this.fillColor)
	  rect(this.x,this.y,this.width*(0.01*progress),this.height)
	  noStroke;
	  textSize(this.height/4)
	  fill(this.textColor)
	  text(this.label,this.x+50,this.y+50,this.width-50,this.height-50)
	}
	update(progress){
	  this.progress = progress;
	  
	}
  }
  
  class toggle { // still wip
	constructor(x,y,buttonWidth, buttonHeight, text, accent, norm, hover, txtcolor) {
	  this.x = x;
	  this.y = y;
	  this.width = buttonWidth;
	  this.height = buttonHeight;
	  this.normColor = norm
	  this.accentColor = accent
	  this.hoverColor = hover
	  this.text = text
	  this.textColor = txtcolor
	  this.state = false;
	  this.onColor = 'green';
	  this.offColor = 'red'
	}
	display(){
  
	  if(this.isPointInButton(mouseX,mouseY)){
		if(mouseIsPressed){
		  fill(this.accentColor);
		}
		else{fill(this.hoverColor);}
	  }
	  else{fill(this.normColor);}
	  stroke(this.accentColor)
	  strokeWeight(3)
	  rect(this.x,this.y,this.width,this.height)
	  noStroke;
	  textSize(this.height/4)
	  fill(this.textColor)
	  text(this.text,this.x+50,this.y+50,this.width-50,this.height-50)
	}
	isPointInButton(x,y){
	  return(x>this.x && x<this.x+this.width && y>this.y && y<this.y+this.height)
	}
  }