// MAJOR PROJECT UI
// Daniel Messham
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

function setup() {
  createCanvas(innerWidth-350, 300).parent("jscanvas");
}

function windowResized(){
  createCanvas(innerWidth-350, 300).parent("jscanvas");
}

function draw() {
  background(20);
  //testdraw()
  menu()
}

function testdraw() {
  fill('gray').
  rect(100,100,100,100)
  text("placehoder,",0,0)
}

function menu(){
  for(let list=0; list<relayTable.length; list++){
    //for(let col; col<relayTable[list].length; col++){
      item = new Toggle(3,30*list+25,width-30, 25, relayTable[list][2]+" "+relayTable[list][3], relayTable[list][3], "green", 80, 140);
      item.display;
      if(item.buttonClicked){
        relayTable[list][3]!=relayTable[list][3]};
      fill('white')
      textSize(16)
      text(relayTable[list][1]+" , "+relayTable[list][2]+" , "+relayTable[list][3], 4, 30*list+30)
  }
}