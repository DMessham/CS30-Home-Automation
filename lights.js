// MAJOR PROJECT UI
// Daniel Messham
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(drawWidth, 300).parent("jscanvas");
}

function windowResized(){
  //drawWidth = windowWidth*0.8;
  createCanvas(drawWidth, 300).parent("jscanvas");
}

function draw() {
  background(20);
  testdraw()
  drawStat(light0, 7,25,drawWidth);
  drawStat(light1, 7,65,drawWidth)
}

function testdraw() {
  noStroke()
  fill('gray').
  rect(0,0,width,4,5)
}

function drawStat(light, x,y,wid){
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
