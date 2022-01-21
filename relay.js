// MAJOR PROJECT UI
// Daniel Messham
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

function draw() {
  background(20);
  labelDraw("Relays")
  relayMenu()
}


function relayMenu(){
  for(let list=0; list<relayTable.length; list++){
    let txt = relayTable[list][1]+" , "+relayTable[list][2]+" , "+relayTable[list][3]
    let accent= "gray"
    if(relayTable[list][3]==true){accent="green"}//set button accent color according to state
    else{accent="darkCyan"}
    drawButton(5,33*list+38,width-10, 25, txt, accent, 230);
    if(mouseArea(5,33*list+38,width-10, 25)&&mouseIsPressed){//see if the mouse is in the area of a button and if it is being pressed
      if(millis()-timeBase>=timeDelay){
        if(relayTable[list][3]==false){relayTable[list][3]=true}//set relay state to true if it is false
        else(relayTable[list][3]=false)//set it to false if it is anything else
        timeBase = millis()//reset the delay for a button press
        console.log(list + "" +relayTable[list][3])
      }
    }
  }
}
