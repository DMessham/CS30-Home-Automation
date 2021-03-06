// MAJOR PROJECT UI
// Daniel Messham
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let light0 = {
  relayId:0,
  name:'porch light',
  on:false,
  bright:0.35,
}
let light1 = {
  relayId:1,
  name:'cabin light',
  on:false,
  bright:0.35,
}

 let lights2 =[ [light0.name,light0.bright,light0.on],
                [light1.name,light1.bright,light1.on]
]

let lights= {
  light0:[light0.name,light0.bright,light0.on],
  light1:[light0.name,light0.bright,light0.on],
}
let lightList = [
  ["toggleSlide",lights.light0[0],lights.light0[1],lights.light0[2],0,100],
  ["toggleSlide",lights.light1[0],lights.light1[1],lights.light1[2],0,100],
]

let outsideInfo = {
  temp:-10,
  wind:5,
  tempUnit:"c",
  windUnit:"MS",
}

let climate0 = {
  active:false,
  zones:0,
  tempUnit:"C",
  name:"Camper",
  setTemp:22,
  curTemp:15,
  canHeat:true,
  canCool:true,
  canHeatpump:true,//for running a/c units in "reverse" as heat pumps for lower power heating
  coolingType:"electric",
  heatingType:"natGas",
  coolRange:[15,45],
  heatRange:[-45,20],
  heatPumpRange:[-10,20],
  totalRange:[-45,],
  mode:"heat"
}
let climate1 = {
  active:false,
  zones:1,
  tempUnit:"C",
  name:"Driver",
  setTemp:27,
  curTemp:15,
  canHeat0:true,
  canCool:true,
  canHeatpump:false,//for running a/c units in "reverse" as heat pumps for lower power heating
  coolingType:"autoAC",
  heatingType:"autoHeat",
  coolRange:[15,43],
  heatRange:[-45,20],
  startEngineRelay:2,
  engineRunning:false,
  mode:"heat"
}
let climate2 = {
  active:false,
  zones:1,
  tempUnit:"C",
  name:"Passenger",
  setTemp:29,
  curTemp:15,
  canHeat:true,
  canCool:true,
  canHeatpump:false,//for running a/c units in "reverse" as heat pumps for lower power heating
  coolingType:"autoAC",
  heatingType:"autoHeat",
  coolRange:[15,43],
  heatRange:[-45,20],
  startEngineRelay:2,
  engineRunning:false,
  mode:"heat"
}
  
let climateZones = [  [climate0.name,climate0.setTemp,climate0.active],
                      [climate1.name,climate1.setTemp,climate1.active],
                      [climate2.name,climate2.setTemp,climate2.active]
]
  
let climates = [//janky workaround
  ["progress", "Outside Temperature: "+(outsideInfo.temp),outsideInfo.temp],
  ["toggleSlide",climateZones[0][0],climate0.setTemp,climate0.active,0,100],
  ["toggleSlide",climateZones[1][0],climate1.setTemp,climate1.active,0,100],
  ["toggleSlide",climateZones[2][0],climate2.setTemp,climate2.active,0,100],
]

function draw() {
  background(backgroundColor);
  labelDraw("Lights & Climate Control (buttons do not change values,lights broken)")
  //drawLightStatFallback(light0, 7,50,drawWidth);
  //drawLightStatFallback(light1, 7,90,drawWidth)
  for(let list=0; list<lights2.length+climates.length; list++){
    drawControls(3,35,width-5,25,lights2,list,0,3)
    altProgress(3+58,35,width-5-2*(59),25,(outsideInfo.temp+50),"Outside: "+(outsideInfo.temp)+""+outsideInfo.tempUnit,lightList.length,3,100)
    //drawTemp(3,35,width-5,lights2.length+2,3)
    climate0.setTemp = toggleSlide(3,35,width-5,25,climate0.name,climate0.setTemp,climate0.active,lightList.length+2,3,)//placeholder until i figure what the hell is going on
    climate1.setTemp = toggleSlide(3,35,width-5,25,climate1.name,climate1.setTemp,climate1.active,lightList.length+3,3)
    climate2.setTemp = toggleSlide(3,35,width-5,25,climate2.name,climate2.setTemp,climate2.active,lightList.length+4,3)
	}

}

function drawControls(x,y,itemWidth,itemHeight,listTable,itemID,visualPosOffset,spacing){
  for(let list=0; list<listTable.length+visualPosOffset; list++){
    let ret=toggleSlide(x,y,itemWidth,itemHeight,lights2[list][0],lights2[list][1],lights2[list][2],list+visualPosOffset,spacing)
    lights2[list][1]=ret
	}
}

function drawTemp(x,y,itemWidth,offsetBase,spacing){
  toggleSlide2(x,y,itemWidth,climate0.setTemp,climate0.active,climate0.name,offsetBase,spacing)//placeholder until i figure what the hell is going on
  toggleSlide2(x,y,itemWidth,climate1.setTemp,climate1.active,climate1.name,offsetBase+1,spacing)
  toggleSlide2(x,y,itemWidth,climate2.setTemp,climate2.active,climate2.name,offsetBase+2,spacing)
}
function drawLightStatFallback(light, x,y,wid){
  strokeWeight(1);
  stroke("white");//brighnessbar bg
  fill('gray');
  rect(x+39,y+8,wid-(x*2)-43, 9,5);
  circle(round(x+((wid-(x*2))*(light.lightBright))+27,2),y+12,18);//slider bg
  fill('green');//brightnessbar fill
  noStroke();
  rect(x+41,y+9,round((wid-(x*2))*(light.lightBright)-7,2),7,5);
  circle(round(x+((wid-(x*2))*(light.lightBright))+27,2),y+12,16);//slider grabber

  stroke('blue')
  if(light.lightOn)(fill("yellow"))
  else(fill('gray'));

  rect(x,y-13,32,32,5)//stat icon&button placeholder
  fill('white')

  textSize(16)//info
  stroke('gray')
  text(light.lightName + ": on: " + light.lightOn + " (set to " + round(light.lightBright*100,3) + "% brightness)", x+38, y);//text

  if(mouseArea(x,y-13,32,32)){//toggle state
    if(millis()-timeBase>=timeDelay && mouseIsPressed){
       if(light.lightOn==false){light.lightOn=true}//set relay state to true if it is false
       else(light.lightOn=false)//set it to false if it is anything else
       timeBase = millis()//reset the delay for a button press
       console.log(light.lightName + "," +light.lightOn+","+light.lightBright)
     }
  }
  if(mouseArea(x+38,y+3,wid-(x*2)-43,20)){//slider control
    if(millis()-timeBase>=timeDelay && mouseIsPressed){
       //light.lightBright = round((((x)*2)+mouseX)/drawWidth,4)//calc new brightness value based off mouse pos
       light.lightBright = round((mouseX/(wid-(x*2)))-0.040,3)
       timeBase = millis()//reset the delay for a button press
       console.log(light.lightName + "," +light.lightOn+","+light.lightBright)
     }
  }

  // drawButton(3,30*list+25,width-30, 25, txt, accent, 230);
  //   if(clickArea(3,30*list+25,width-30, 25)&&mouseIsPressed){//see if the mouse is in the area of a button and if it is being pressed
  //     if(millis()-timeBase>=700){
  //       if(relayTable[list][3]==false){relayTable[list][3]=true}//set relay state to true if it is false
  //       else(relayTable[list][3]=false)//set it to false if it is anything else
  //       timeBase = millis()//reset the delay for a button press
  //       console.log(list + "" +relayTable[list][3])
  //     }
  //   }
}
