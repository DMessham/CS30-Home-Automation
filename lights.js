// MAJOR PROJECT UI
// Daniel Messham
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


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
  drawStat(light0, 7,25,drawWidth)
}

function testdraw() {
  noStroke()
  fill('gray').
  rect(0,0,width,4)
}

function drawStat(light, x,y,wid){
  strokeWeight(1);
  stroke("white");//brighnessbar bg
  fill('gray');
  rect(x+39,y+8,wid-(x*2)-43, 9);
  fill('green');//brightnessbar fill
  noStroke();
  rect(x+41,y+9,((wid-(x*2)-44)*(light.lightBright)),7);
  circle(((wid-(x*2)-44)*(light.lightBright)), y+15, 16)

  stroke('blue')
  if(light.on)(fill("yellow"))
  else(fill('gray'));

  rect(x,y-13,32,32)//stat icon&button placeholder
  fill('white')

  textSize(16)//info
  stroke('gray')
  text(light.lightName + ": on: " + light.lightOn + " (set to " + light.lightBright*100 + "% brightness)", x+38, y);

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
