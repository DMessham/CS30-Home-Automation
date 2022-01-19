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
  rect(x,y+13,wid-(x*2), 13,5);
  fill('green');
  noStroke();
  rect(x+1,y+16,(wid-(x*2)-1)*(bat0.percent/100),7,5);
}

function drawFuelStat(fuel, x,y,wid){
  fill('white');
  textSize(17)
  text("Fuel: " + fuel.name + " (Id:" + fuel.sensorID + "," + fuel.type  + "): " + fuel.percent + "%, "  + fuel.usageRangeLkm + "L/100km (Capacity:"+fuel.capacityLiter+"Liters, Flow"+ fuel.flowRateLiterMin+"Liter/min)", x, y);
  strokeWeight(1);
  stroke("white");
  fill('gray');
  rect(x,y+13,wid-(x*2), 13,5);
  fill('green');
  noStroke();
  rect(x+1,y+16,(wid-(x*2)-1)*(bat0.percent/100),7,5);
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
  rect(x,y+13,wid-(x*2), 13,4,5);
  fill('green');
  noStroke();
  rect(x+1,y+16,(wid-(x*2)-1)*(bat0.percent/100),7,5);
}