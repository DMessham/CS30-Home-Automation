// MAJOR PROJECT UI
// Daniel Messham
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let bat0 = {
  name:"RPi Battery",
  id:"battery0",
  type:"Li-ION",
  capacityMAH:0000,
  cells:1,
  percentKnown:true,
  percent:100,
  voltage:3.7,
  voltageChange:-0.0,
  charging:true,
  exists:true,
  timeToEmpty:0,
  timeToFull:0,
  progressbar:0,
}

let bat1 = {
  name:"Car Battery",
  id:"battery1",
  type:"Sealed Lead-Acid",
  capacityMAH:0000,
  cells:1,
  percentKnown:false,
  percent:00,
  voltage:12,
  voltageChange:-0.0,
  charging:true,
  exists:true,
  timeToEmpty:0,
  timeToFull:0,
  progressbar:0,
}

let bat2 = {
  name:"House Battery",
  id:"battery2",
  type:"Sealed Lead-Acid",
  capacityMAH:0000,
  cells:2,
  percentKnown:false,
  percent:00,
  voltage:24,
  voltageChange:-0.0,
  charging:true,
  exists:true,
  timeToEmpty:0,
  timeToFull:0,
  progressbar:0,
}

let acIn0 = {
  safeVoltageMin:110,
  curVoltage:120,
  safeVoltageMax:125,
  amperage:0,
  connected:true,
  phaseCount:2,
}

let dcIn0 = {
  safeVoltageMin:12,
  curVoltage:13,
  safeVoltageMax:15,
  amperage:0,
  connected:false,
  voltRangebar:50,

}
let acOut0 = {
  safeVoltage:110,
  curVoltage:120,
  safeVoltageMax:125,
  amperage:0,
  connected:true,
  phaseCount:2,
}

let dcOut0 = {
  safeVoltageMin:4.5,
  curVoltage:5.2,
  safeVoltageMax:5.6,
  amperage:0,
  connected:false,
  voltRangebar:50,

}

let fuel0 = {
  type:"Gasoline",
  name:"Main Fuel Tank",
  sensorID:"fuel0",
  percent:100,
  capacityLiter:68,
  usageLiter:0,
  flowRateLiterMin:0,
  temperature:10,
  usageRangeLkm:9999999,
  usageRangeMpg:0,
}

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
  drawBattStat(bat0, 10,25,drawWidth)
  drawBattStat(bat1, 10,75,drawWidth)
  drawPowerStat(acIn0, 10,125,drawWidth)
  drawPowerStat(acOut0, 10,175,drawWidth)
  drawFuelStat(fuel0, 10,225,drawWidth)
}

function testdraw() {
  noStroke()
  fill('gray').
  rect(0,0,width,4)
}

function drawBattStat(batt, x,y,wid){
  let isCharging = "Unknown Status"
  if (batt.charging){
    if(batt.percent>99){isCharging = '(Fully Charged)'}
    else{isCharging = 'Charged'}
  }
  else{isCharging = 'Left'}
  fill('white');
  textSize(17)
  text("Battery: " + batt.name + " (id:" + batt.id + "): " + batt.percent + "% " + isCharging + ", voltage: " + batt.voltage + "V, Type: " + batt.type+" ("+batt.cells+"cells, "+ batt.capacityMAH+"MaH)", x, y);
  strokeWeight(1);
  stroke("white");
  fill('gray');
  rect(x,y+13,wid-(x*2), 13);
  fill('green');
  noStroke();
  rect(x+1,y+16,(wid-(x*2)-1)*(bat0.percent/100),7);
}

function drawFuelStat(fuel, x,y,wid){
  fill('white');
  textSize(17)
  text("Fuel: " + fuel.name + " (Id:" + fuel.sensorID + "," + fuel.type  + "): " + fuel.percent + "%, "  + fuel.usageRangeLkm + "L/100km (Capacity:"+fuel.capacityLiter+"Liters, Flow"+ fuel.flowRateLiterMin+"Liter/min)", x, y);
  strokeWeight(1);
  stroke("white");
  fill('gray');
  rect(x,y+13,wid-(x*2), 13);
  fill('green');
  noStroke();
  rect(x+1,y+16,(wid-(x*2)-1)*(bat0.percent/100),7);
}

function drawPowerStat(Source, x,y,wid){
  let isConnected = "Unknown Status"
  if (Source.connected){
    if(Source.percent>99){isConnected = '(Fully Charged)'}
    else{isConnected = 'Conn'}
  }
  else{isCharging = 'DisConnected'}
  fill('white');
  textSize(17)
  text("Charger: " + Source.name + " (id:" + Source.id + "): " + Source.percent + "% " + isConnected + ", voltage: " + Source.voltage + "V, Type: " + Source.type+" ("+Source.cells+"cells, "+ Source.capacityMAH+"MaH)", x, y);
  strokeWeight(1);
  stroke("white");
  fill('gray');
  rect(x,y+13,wid-(x*2), 13);
  fill('green');
  noStroke();
  rect(x+1,y+16,(wid-(x*2)-1)*(bat0.percent/100),7);
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