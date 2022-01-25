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

let visualSettings = {
  testToggle:false,
  testNum:3,
  testInt:3.0,
  testText:"Hello world!",
  testDropdown:[["hello0",0],["hello1",1],["hello2",2]],
  testSlider:50,
  testProgress:50,
  testLoading:"ayylmao",
  testToggleSlider:[20,false],
}

let visualSettingsList = [//Used for the gui settings page, follows format of [name,type(0toggle,1number,2int,3text,4dropdown)value,locked,Options(offstate/onstate,min/max,variables)]
  ["toggle","testToggle",visualSettings.testToggle],
  ["number","testNum",visualSettings.testNum,0,100],
  ["numSlider","testInt",visualSettings.testInt,0,100],
  ["textEntry","testText",visualSettings.testText,],
  ["dropdownMenu","testDropdown",visualSettings.testDropdown,],
  ["slider","testSlider",visualSettings.testSlider,0,100],
  ["progress","testProgress",visualSettings.testProgress,0,100],
  ["loading","testLoading"],
  ["toggleSlide","testToggle+Slider",visualSettings.testToggleSlider[0],visualSettings.testToggleSlider[1],0,100],

]

let relayList = []
let timeBase = 0//timer used for pacing user input
let timeDelay = 700//min time between inputs

let render
let canvasDiv

function setup(){
canvasDiv = document.getElementById('jscanvas');
let width = canvasDiv.offsetWidth;
let height = canvasDiv.offsetHeight;
let render = createCanvas(width-5, 320).parent("jscanvas");
render.style('margin', '-15px');
}

function windowResized() {
  let width = canvasDiv.offsetWidth;
  let height = canvasDiv.offsetHeight;
  resizeCanvas(width-5, 320);
}

function labelDraw(name) {
  fill('gray')
  rect(0,29,width,2)
  fill('lightgray')
  textSize(25)
  textStyle(ITALIC)
  text(name,10,3, width-7, 32)
  textStyle(NORMAL)
}

//drawWidth = windowWidth*0.8;
let drawWidth = 768;//canvas width

function animationLoopPercent(time){
  return( (millis())%time/time)
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

function altProgress(x,y,itemWidth,itemHeight,value,txt,visualPosOffset,spacing,maxVal=100){
  let col="green"
  let visualPos = 1 + visualPosOffset
let accent="green"
		//bg
		fill(60)
      	strokeWeight(1)
      	stroke("gray");
		rect(x,y+((itemHeight+2*spacing)*visualPos+spacing), itemWidth-0*(itemHeight+spacing), itemHeight,5)
		//fill
		stroke("light"+col);
		fill(col)
		rect(x,y+((itemHeight+2*spacing)*visualPos+spacing), (itemWidth-0*(itemHeight+spacing))*(value/maxVal), itemHeight,5)
		//text
		noStroke();
		fill('white')
		textSize(17)
		text(txt,x+5,(y+((itemHeight+2*spacing)*visualPos+spacing))+5,width-5,itemHeight-5)
		textAlign(RIGHT)
		text(value+"%",x+itemWidth-35,(y+((itemHeight+2*spacing)*visualPos+spacing))+5,itemHeight+10, itemHeight-5)
		textAlign(LEFT)
}

function listEntry(x,y,itemWidth,itemHeight,listTable,itemID,visualPosOffset,spacing, type= listTable[itemID][0],txt="Something has gone wrong!"){//the last one is to allow for "forced itemtypes"
	textAlign(LEFT)
  let accent="green"
  let visualPos = itemID + visualPosOffset
  //console.log("passed list init, figuring out what itemtype this entry is")
	if(type=="toggle"){
    //console.log("draw toggleswitch")
		txt = listTable[itemID][1]
		if(listTable[itemID][2]==true){accent="green"}//set button accent color according to state
    	else{accent="darkCyan"}
		drawButton(x,y+itemHeight*(visualPos+spacing),itemWidth, itemHeight, txt, accent, 230);
	  	if(mouseArea(x,y+((itemHeight+2*spacing)*visualPos+spacing),itemWidth, itemHeight)&&mouseIsPressed){//see if the mouse is in the area of a button and if it is being pressed
			if(millis()-timeBase>=timeDelay){
				if(listTable[itemID][2]==false){listTable[itemID][2]=true}//set relay state to true if it is false
		 		else(listTable[itemID][2]=false)//set it to false if it is anything else
		  		timeBase = millis()//reset the delay for a button press
		  		console.log(txt + "(Toggle):" +listTable[itemID][2])
			}
		}
	}
	if(type=="number"){
    //console.log("draw number select")
		txt = listTable[itemID][1] +":"+listTable[itemID][2]
		//the display for the label and icon
		drawButton(x,y+((itemHeight+2*spacing)*visualPos+spacing), itemWidth-2*(itemHeight+spacing), itemHeight, txt, "cyan", 230);
		//plus button
		drawButton(x+itemWidth-(itemHeight),y+((itemHeight+2*spacing)*visualPos+spacing),itemHeight, itemHeight, "+", "green", 230);
		if(mouseArea(x+itemWidth-(itemHeight),y+((itemHeight+2*spacing)*visualPos+spacing),itemHeight, itemHeight)&&mouseIsPressed){//see if the mouse is in the area of a button and if it is being pressed
			if(millis()-timeBase>=550){
				if(listTable[itemID][2]<listTable[itemID][4]){listTable[itemID][2]++}//set relay state to true if it is false
		  		timeBase = millis()//reset the delay for a button press
		  		console.log(txt + "(num+):" +listTable[itemID][2])
			}
		}
		//minus
		drawButton(x+(itemWidth-spacing-2*itemHeight),y+((itemHeight+2*spacing)*visualPos+spacing),itemHeight, itemHeight, "-", "red", 230);
		if(mouseArea(x+(itemWidth-spacing-2*itemHeight),y+((itemHeight+2*spacing)*visualPos+spacing),itemHeight, itemHeight)&&mouseIsPressed){//see if the mouse is in the area of a button and if it is being pressed
			if(millis()-timeBase>=550){
				if(listTable[itemID][2]>listTable[itemID][3]){listTable[itemID][2]--}//set relay state to true if it is false
		  		timeBase = millis()//reset the delay for a button press
		  		console.log(txt + "(num-):" +listTable[itemID][2])
			}
		}
	}
	else if(type=="numSlider"){
    //console.log("draw int slider")
		let accent="green"
    txt = listTable[itemID][2]
		//bg
		fill(60)
      	strokeWeight(2)
      	stroke(accent);
		rect(x,y+((itemHeight+2*spacing)*visualPos+spacing), itemWidth-0*(itemHeight+spacing), itemHeight,5)
		//fill
		stroke("darkCyan");
		fill(accent)
		rect(x,y+((itemHeight+2*spacing)*visualPos+spacing), (itemWidth-0*(itemHeight+spacing))*(listTable[itemID][2]/100), itemHeight,5)
		//text
		noStroke();
		fill('white')
		textSize(17)
		text(listTable[itemID][1],x+5,(y+((itemHeight+2*spacing)*visualPos+spacing))+5,width-5,itemHeight-5)
		textAlign(RIGHT)
		text(txt,x+itemWidth-35,y+((itemHeight+2*spacing)*visualPos+spacing)*visualPos+2.5*spacing,itemHeight+10, itemHeight-5)
		textAlign(LEFT)

		if(mouseArea(x,y+((itemHeight+2*spacing)*visualPos+spacing),itemWidth, itemHeight)&&mouseIsPressed){
			let newval = round((mouseX-x)/itemWidth*100,1)
			listTable[itemID][2] = newval
			console.log(listTable[itemID][0]+" is now set to "+listTable[itemID][2])
		}
	}
	else if(type=="textEntry"){
    //console.log("draw text entry")
		let txt = listTable[itemID][1] +":"+listTable[itemID][2]
		drawButton(x,y+((itemHeight+2*spacing)*visualPos+spacing), itemWidth, itemHeight, txt, "cyan", 230);
		if(mouseArea(x,y+((itemHeight+2*spacing)*visualPos+spacing), itemWidth, itemHeight)&&mouseIsPressed){//see if the mouse is in the area of a button and if it is being pressed
			if(millis()-timeBase>=timeDelay){
				if(listTable[itemID][2]<listTable[itemID][4]){listTable[itemID][2]++}//set relay state to true if it is false
		  		timeBase = millis()//reset the delay for a button press
		  		console.log(txt + "(textentry):" +vlistTable[itemID][2])
			}
		}
	}
	else if(type=="dropdownMenu"){
    //console.log("draw dropdown")
		let txt = listTable[itemID][1] +":"+listTable[itemID][2]
		//the display for the label
		drawButton(x,y+((itemHeight+2*spacing)*visualPos+spacing), itemWidth-1*(itemHeight+spacing), itemHeight, txt, "cyan", 230);
		if(mouseArea(x,y+((itemHeight+2*spacing)*visualPos+spacing), itemWidth-1*(itemHeight+spacing), itemHeight)&&mouseIsPressed){//see if the mouse is in the area of a button and if it is being pressed
			if(millis()-timeBase>=timeDelay){
				if(listTable[itemID][2]<listTable[itemID][4]){listTable[itemID][2]++}//set relay state to true if it is false
		  		timeBase = millis()//reset the delay for a button press
		  		console.log(txt + "(dropdownmenu-label):" +listTable[itemID][2])
			}
		}
		//plus button
		drawButton(x+itemWidth-(itemHeight),y+((itemHeight+2*spacing)*visualPos+spacing),itemHeight, itemHeight, "V", "green", 230);
		if(mouseArea(x+itemWidth-(itemHeight),y+((itemHeight+2*spacing)*visualPos+spacing),itemHeight, itemHeight)&&mouseIsPressed){//see if the mouse is in the area of a button and if it is being pressed
			if(millis()-timeBase>=timeDelay){
				if(listTable[itemID][2]<listTable[itemID][4]){listTable[itemID][2]++}//set relay state to true if it is false
		  		timeBase = millis()//reset the delay for a button press
		  		console.log(txt + "(dropdownmenu-arrow):" +listTable[itemID][2])
			}
		}
	}
	else if(type=="slider"||type=="volume"){
    //console.log("draw float slider")
    txt = listTable[itemID][2]+"%"
		let accent="green"
		//bg
		fill(60)
      	strokeWeight(2)
      	stroke(accent);
		rect(x,y+((itemHeight+2*spacing)*visualPos+spacing), itemWidth-0*(itemHeight+spacing), itemHeight,5)
		//fill
		stroke(accent);
		fill(accent)
		rect(x,y+((itemHeight+2*spacing)*visualPos+spacing), (itemWidth-0*(itemHeight+spacing))*(listTable[itemID][2]/100), itemHeight,5)
		//text
		noStroke();
		fill('white')
		textSize(17)
		text(listTable[itemID][1],x+5,(y+((itemHeight+2*spacing)*visualPos+spacing))+5,width-5,itemHeight-5)
		textAlign(RIGHT)
		text(txt,x+itemWidth-35,(y+((itemHeight+2*spacing)*visualPos+spacing))+5,itemHeight+10, itemHeight-5)
		textAlign(LEFT)

		if(mouseArea(x,y+((itemHeight+2*spacing)*visualPos+spacing),itemWidth, itemHeight)&&mouseIsPressed){
			let newval = round((mouseX-x)/itemWidth*100,1)
			listTable[itemID][2] = newval
			console.log(listTable[itemID][1]+" is now set to "+listTable[itemID][2])
		}
	}
	else if(type=="progress"){
    //console.log("draw progress")
    txt = listTable[itemID][2]+"%"
		let accent="green"
		//bg
		fill(60)
      	strokeWeight(1)
      	stroke("gray");
		rect(x,y+((itemHeight+2*spacing)*visualPos+spacing), itemWidth-0*(itemHeight+spacing), itemHeight,5)
		//fill
		stroke("light"+accent);
		fill(accent)
		rect(x,y+((itemHeight+2*spacing)*visualPos+spacing), (itemWidth-0*(itemHeight+spacing))*(listTable[itemID][2]/100), itemHeight,5)
		//text
		noStroke();
		fill('white')
		textSize(17)
		text(listTable[itemID][1],x+5,(y+((itemHeight+2*spacing)*visualPos+spacing))+5,width-5,itemHeight-5)
		textAlign(RIGHT)
		text(txt,x+itemWidth-35,(y+((itemHeight+2*spacing)*visualPos+spacing))+5,itemHeight+10, itemHeight-5)
		textAlign(LEFT)
	}
	else if(type=="loading"){
    //console.log("draw animated indeterminate progress")
		let accent="green"
    let paddleWidth=(itemHeight*4)
		//bg
		fill(60)
    strokeWeight(1)
    stroke("gray");
		rect(x,y+((itemHeight+2*spacing)*visualPos+spacing), itemWidth, itemHeight,5)
		//fill
		stroke("light"+accent);
		fill(accent)
		rect((x+itemWidth-paddleWidth)*animationLoopPercent(3500),y+((itemHeight+2*spacing)*visualPos+spacing), paddleWidth, itemHeight,5)
    //rect(x,y+((itemHeight+2*spacing)*visualPos+spacing), (itemWidth*animationLoopPercent(2500)), itemHeight,5)
		//text
		noStroke();
		fill('white')
		textSize(17)
		textAlign(CENTER)
		text(listTable[itemID][1],x+5,(y+((itemHeight+2*spacing)*visualPos+spacing))+5,width-5,itemHeight-5)
		textAlign(LEFT)
	}
	else if(type=="toggleSlide"||type=="light"){
    //console.log("draw toggle and slider combo")
		toggleSlide(x,y,itemWidth,itemHeight,listTable,itemID,visualPosOffset,spacing)
	}
	else{
    console.warn("unable to determine type of list item, using fallback")
		let txt = listTable[itemID][1] +":"+listTable[itemID][2]
		fill(70)
      	strokeWeight(2)
      	stroke(accent);

		rect(x,y+((itemHeight+2*spacing)*visualPos+spacing), itemWidth-0*(itemHeight+spacing), itemHeight,5)
		noStroke();
		fill('white')
		textSize(17)
		text(txt,x+5,(y+((itemHeight+2*spacing)*visualPos+spacing))+5,width-5,itemHeight-5)
	}
}

function toggleSlide(x,y,itemWidth,itemHeight,listTable,itemID,visualPosOffset,spacing){
  let accent="green"
  let visualPos = itemID + visualPosOffset
  let txt = listTable[itemID][2]
  let txt2 = listTable[itemID][1]+":"+listTable[itemID][3]
  //bg
  fill(60)
      strokeWeight(2)
      stroke(accent);
  rect(x+2*(spacing+itemHeight),y+((itemHeight+2*spacing)*visualPos+spacing),itemWidth-2*(itemHeight+spacing), itemHeight,5)
  //fill
  stroke("darkCyan");
  fill(accent)
  rect(x+2*(spacing+itemHeight),y+((itemHeight+2*spacing)*visualPos+spacing),(listTable[itemID][2]/100)*(itemWidth-2*(itemHeight+spacing)), itemHeight,5)
  //text
  noStroke();
  fill('white')
  textSize(17)
  text(txt,x+5,(y+((itemHeight+2*spacing)*visualPos+spacing))+5,width-5,itemHeight-5)
		textAlign(RIGHT)
		text(txt2,x+itemWidth-35,(y+((itemHeight+2*spacing)*visualPos+spacing))+5,itemHeight+10, itemHeight-5)
		textAlign(LEFT)

  //textAlign(CENTER)
  //text(txt,x+5,(y+((itemHeight+2*spacing))*visualPos+spacing)+5,itemWidth-2*(itemHeight+spacing),itemHeight-5)
  //textAlign(LEFT)

  if(listTable[itemID][2]==true){accent="green"}//set button accent color according to state
    else{accent="darkCyan"}
  drawButton(x,y+((itemHeight+2*spacing)*visualPos+spacing),2*itemHeight, itemHeight, listTable[itemID][3], "green", 230);
  if(mouseArea(x,y+((itemHeight+2*spacing)*visualPos+spacing),2*itemHeight, itemHeight)&&mouseIsPressed){//see if the mouse is in the area of a button and if it is being pressed
    if(millis()-timeBase>=timeDelay){
      if(listTable[itemID][3]==false){
        listTable[itemID][3]=true
        timeBase = millis()//reset the delay for a button press
        console.log(listTable[itemID][1] + "(toggle+slide-toggle):" +listTable[itemID][3])}//set relay state to true if it is false
      else(listTable[itemID][3]=false)//set it to false if it is anything else
        timeBase = millis()//reset the delay for a button press
        console.log(listTable[itemID][1] + "(toggle+slide-toggle):" +listTable[itemID][3])
    }
  }
  if(mouseArea(x+(spacing+itemHeight),y+((itemHeight+2*spacing)*visualPos+spacing),itemWidth-((2*itemHeight)+spacing), itemHeight)&&mouseIsPressed){
    listTable[itemID][2] = round((mouseX-(x+(spacing+itemHeight)))/(itemWidth-((2*itemHeight)+spacing))*100,1)//set variable to new value
    console.log(listTable[itemID][1]+" is now set to "+listTable[itemID][2])
    return round((mouseX-(x+(spacing+itemHeight)))/(itemWidth-((2*itemHeight)+spacing))*100,1)
  }
}

function toggleSlide2(x,y,itemWidth,itemHeight,sliderVal,toggleVal,title,visualPosOffset,spacing){
  let accent="green"
  let visualPos = visualPosOffset
  let txt = sliderVal
  let txt2 = title+":"+toggleVal
  //bg
  fill(60)
      strokeWeight(2)
      stroke(accent);
  rect(x+2*(spacing+itemHeight),y+((itemHeight+2*spacing)*visualPos+spacing),itemWidth-2*(itemHeight+spacing), itemHeight,5)
  //fill
  stroke("darkCyan");
  fill(accent)
  rect(x+2*(spacing+itemHeight),y+((itemHeight+2*spacing)*visualPos+spacing),(sliderVal/100)*(itemWidth-2*(itemHeight+spacing)), itemHeight,5)
  //text
  noStroke();
  fill('white')
  textSize(17)
  text(txt,x+5,(y+((itemHeight+2*spacing)*visualPos+spacing))+5,width-5,itemHeight-5)
		textAlign(RIGHT)
		text(txt2,x+itemWidth-35,(y+((itemHeight+2*spacing)*visualPos+spacing))+5,itemHeight+10, itemHeight-5)
		textAlign(LEFT)

  //textAlign(CENTER)
  //text(txt,x+5,(y+((itemHeight+2*spacing))*visualPos+spacing)+5,itemWidth-2*(itemHeight+spacing),itemHeight-5)
  //textAlign(LEFT)

  if(toggleVal==true){accent="green"}//set button accent color according to state
    else{accent="darkCyan"}
  drawButton(x,y+((itemHeight+2*spacing)*visualPos+spacing),2*itemHeight, itemHeight, toggleVal+" ", "green", 230);
  if(mouseArea(x,y+((itemHeight+2*spacing)*visualPos+spacing),2*itemHeight, itemHeight)&&mouseIsPressed){//see if the mouse is in the area of a button and if it is being pressed
    if(millis()-timeBase>=timeDelay){
      if(toggleVal==false){
        toggleVal=true
        timeBase = millis()//reset the delay for a button press
        console.log(title + "(toggle+slide-toggle):" +toggleVal)}//set relay state to true if it is false
      else(toggleVal=false)//set it to false if it is anything else
        timeBase = millis()//reset the delay for a button press
        console.log(title + "(toggle+slide-toggle):" +toggleVal)
    }
  }
  if(mouseArea(x+(spacing+itemHeight),y+((itemHeight+2*spacing)*visualPos+spacing),itemWidth-((2*itemHeight)+spacing), itemHeight)&&mouseIsPressed){
    sliderVal = round((mouseX-(x+(spacing+itemHeight)))/(itemWidth-((2*itemHeight)+spacing))*100,1)//set variable to new value
    console.log(title+" is now set to "+sliderVal)
    return round((mouseX-(x+(spacing+itemHeight)))/(itemWidth-((2*itemHeight)+spacing))*100,1)
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
