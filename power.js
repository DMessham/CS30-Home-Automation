// MAJOR PROJECT UI
// Daniel Messham
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let bat0 = {
  percent:100,
  voltage:3.7,
  voltageChange:-0.0,
  charging:true,
  exists:true,
  timeToEmpty:99999999999,
  timeToFull:0,
  progressbar:0,
}

let acIn0 = {
  voltage:120,
  amperage:0,
  connected:true,
}

let dcIn0 = {
  voltage:12,
  amperage:0,
  connected:false,
  voltRangebar:0,

}

let carBat0 = {
  percent:100,
  voltage:12.5,
  maxVolt:15,
  minVoltage:11.5,
  voltageChange:-0.0,
  charging:true,
  exists:true,
  voltRangebar:0,
}
let carFueltank0 = {
  percent:100,
  capacityLiter:68,
  usageLiter:0,
  temperature:10,
  usageRangeLkm:9999999,
  usageRangeMpg:0,
}

function setup() {
  createCanvas(innerWidth*0.7, 300).parent("jscanvas");
}

function windowResized(){
  createCanvas(windowWidth*0.8, 300).parent("jscanvas");
}

function draw() {
  background(20);
  testdraw()
  
}

function testdraw() {
  fill('gray').
  rect(100,100,100,100)
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