// MAJOR PROJECT UI
// Daniel Messham
// Date
//
// Common ui elements and settings (Hopefully)

//settigs related to appearance
let appearance = {
  background:"Black",
  text:"Black",
}; 

//settings related to io and hardware control (for whatever i use to allow for html+js to control RPi GPIO stuf)
let hardware = {
  attachedDevices:[ ['id','name','state',['capibilities'],'type' ],
  [] ],
  hardwareName:'Raspberry Pi3',
  hardwareType:['pi','arm',],
};

//settings related to security (mostly read only, many will only be editable w/ physical access for security reasons) or that could break remote access
let secure = {
	DeviceName:"[DEVICE_NAME]",
	WifiNetwork:['ssid','type','password']//find a way to not store password in hardcoded plaintext 

}

let visualSettings = {}

let visualSettingsList = [//Used for the gui settings page, follows format of [name,type(0toggle,1number,2int,3text,4dropdown)value,locked,Options(offstate/onstate,min/max,variables)]
  ["testToggle","toggle",false,,false,true],
  ["testNum","number",3,0,100],
  ["testInt","numSlider",3.5,0,100],
  ["testText","textEntry","",],
  ["testDropdown","dropdownMenu",[["option1Var","option1Text"],["option1Var","option1Text"]],],
  ["testProgress","progress",3.5,0,100],
  ["testLoading","loading",3.5,0,100],
  ["testToggle+Slider","toggleSlide",3.5,false,0,100],

]

let timeBase = 0//timer used for pacing user input
let timeDelay = 700//min time between inputs

//drawWidth = windowWidth*0.8;
let drawWidth = 768;//canvas width

function animationLoopPercent(time){
  return( (millis()%(time*1000))/(time*1000) )
}

//let drawWidth;

//function setup() {
  //drawWidth = windowWidth*0.8;
  //createCanvas(drawWidth, 300).parent("jscanvas");
//}

//function windowResized(){
  //drawWidth = windowWidth*0.8;
  //createCanvas(drawWidth, 300).parent("jscanvas");
//}

//placeholder for gpio&sensor reference values
class Gpio {
  constructor(name, type, id) {
    this.name = name;
    this.type = type;
    this.id = id;
  }
  getName(){
    return this.name
  }

  getType(){
    return this.type
  }
}

class piface2 extends Gpio {
  constructor(name){
    super(name, 'test');
  }

  getName(){
    return "this is a: " + super.getName();
  }
}

//common controls
function drawButton(x,y,buttonWidth, buttonHeight, txt, accent, txtColor){
  if(mouseArea(x,y,buttonWidth,buttonHeight)){
    stroke(accent)
    if(mouseIsPressed){
      fill(accent);
      stroke(txtColor)
      strokeWeight(2.5)
      //return true;
    }
    else{
      fill(70)
      strokeWeight(2)
      stroke(accent);
    }
  }
  else{fill(40)
    stroke(accent)
    strokeWeight(1.5);}
  
  
  rect(x,y,buttonWidth,buttonHeight,5)
  noStroke();
  textSize(buttonHeight/4)
  fill(txtColor)
  textSize(17)
  text(txt,x+5,y+5,width-5,buttonHeight-5)
  return false;
}
function mouseArea(x,y,awidth,aheight){
 return(mouseX>x && mouseX<x+awidth && mouseY>y && mouseY<y+aheight)
}

function mediaButton(icon,x,y,offset,size,space,bgColor,control){
  fill(bgColor)//
  drawButton(x + offset*size+(offset+1)*space, y+space,size, size, control, bgColor, 70)
  image(icon,x + offset*size+(offset+1)*space, y+space, size, size)
  return(mouseArea(x + offset*size+(offset+1)*space, y+space,size, size))
}
function mediaOpt(source){}

function mediaBack(source){}

function mediaPlayPause(source){
  if(source.mediaState == 'pause'){
    source.mediaState = 'play';
  }
  else if(source.mediaState == 'play'){
    source.mediaState = 'pause';
  }

}

function mediaNext(source){}
function mediaOpen(source){}

function progress(x,y,width,height,value,fillCol='green',bgCol='gray',txt='',borCol=bgCol,borThk=1){
  strokeWeight(1);
    //stroke(borCol);//progressbar bg
    fill(bgCol);
    rect(x,y,width, height,5);
    fill(fillCol);//progressbar fill
    noStroke();
    rect(x+borThk,y+borThk,(width-(borThk)*2)*(value/100),height-(borThk*2),5);
    fill(bgCol)
    textSize(12)
    text(txt,x+(width-(borThk)*2)*(value/100),y)
}

class Toggle {
  constructor(x,y,buttonWidth, buttonHeight, text, state, accent, norm, txtcolor) {
    this.x = x;
    this.y = y;
    this.width = buttonWidth;
    this.height = buttonHeight;
    this.state = state
    this.normColor = norm
    this.accentColor = accent
    this.text = text
    this.textColor = txtcolor
  }
  display(){
    if(this.isPointInButton(mouseX,mouseY)){
      if(mouseIsPressed){
        fill(this.accentColor+5);
      }
      else{fill(this.accentColor+15);}
    }
    else{
      if(this.state=true){
        if(mouseIsPressed){
          fill(this.accentColor);
        }
        else{fill(this.accentColor+15);}
      }
    }
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
  buttonClicked(){
    this.state!=this.state
    return(this.isPointInButton(mouseX,mouseY)&&mouseIsPressed)
  }
}


// todo: sliders, radio buttons(ui element), tabs(might just use multiple html pages), always present status bar type thing, more consistant framework, RPI GPIO interaction via .SH or .py files

//data storage&retreval placeholder values
//--battery/power
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
//relays
let relayTable = [//id, pin, name, active
  [0,"GPIO5","relay 1",false],
  [1,"GPIO6","relay 2",false],
  [2,"GPIO13","relay 3",false],
  [3,"GPIO19","relay 4",false],
  [4,"GPIO26","relay 5",false],
  [5,"GPIO16","relay 6",false],
  [6,"GPIO20","relay 7",false],
  [7,"GPIO21","relay 8",false]
]

//gpio pins
let gpioPins = [//pin,name,type,active/state
              [0,"gpio0","output",false],
              [1,"gpio1","output",false],
              [2,"gpio2","output",false]]
//lights
let light0 = {
  lightRelayId:0,
  lightName:'porch light',
  lightOn:false,
  lightBrightControl:true,
  lightBright:0.35,
}
let light1 = {
  lightRelayId:1,
  lightName:'cabin light',
  lightOn:false,
  lightBrightControl:true,
  lightBright:0.35,
}

//media
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



//

//console commands

function help(){
  console.log("HELP - DMessham's automation system");
  console.log("--- external device control ---");
  console.log("relaySet(number,state) | changes state of a relay");
  console.log("relayGet(number) | returns state of selected relay");
  console.log("gpioSet(number,state) | changes state of a gpio pin");
  console.log("gpioGet(number) | returns state of selected gpio pin");
  console.log("analogSet(id,state,value) | changes value of an analog device/dac/adc");
  console.log("analogGet(id) | returns of of selected analog device/dac/adc");
  console.log("dataSet(id,type,state) | changes value of a digital vdevice");
  console.log("dataGet(id,protocall) | returns of of selected analog device");
  console.log("--- sensor ---");
  console.log("batteryStatus(id) | returns(charge, chargeState, usage, capacity,voltage)");
  console.log("--- internal control ---");
  console.log("shutdown(time) | shutsdown device after specified amount of time");
  console.log("reboot(time) | reboots device after specified amount of time");
}

//device control

function relaySet(number,state){
  relayTable[number][3]=state;
  let name= relayTable[number][2]
  let location = name= relayTable[number][1]
  console.log("Setting status of relay with id of '"+ number +"' that is Named '"+ name +"' with state '"+state+"' and location '"+location+"'");
}

function relayGet(number){
  console.log("not yet tested");
  let state=relayTable[number][3]
  let name=relayTable[number][2]
  let location = name= relayTable[number][1]
  console.log("Getting status of relay with id of '"+ number +"' that is Named '"+ name +"' with state '"+state+"' and location '"+location+"'")
  return(number,name,state,location)
}


function gpioSet(number,state){
  console.log("not yet implemented");
}

function gpioGet(number){
  console.log("not yet implemented");
}


function analogSet(id,state){
  console.log("not yet implemented");
}

function analogGet(id){
  console.log("not yet implemented");
  let on=false
  let value=255
  return(on,state,brightness)
}

function dataSet(id,type,state){
  console.log("not yet implemented");
}

function dataGet(id,type){
  console.log("not yet implemented");
}

function batteryStatus(id){
  console.log("not yet implemented");
  let charge = 100
  let chargeState = "Charging"
  let usage=-10
  let capacity = 12300
  let voltage = 3.6
  return(charge, chargeState, usage, capacity, voltage)
}

// control commands

function reboot(time){
  console.log("not yet implemented, please manually reboot");
}

function shutdown(time){
  console.log("not yet implemented, please manually shutdown");
}
