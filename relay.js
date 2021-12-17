// MAJOR PROJECT UI
// Daniel Messham
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


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
}

function menu(){
  for(let list; list<relayTable.length; list++){
    //for(let col; col<relayTable[list].length; col++){
      item = new Button(50*list,3,50,30,relayTable[list][2]+" "+relayTable[list][3],'green',40,70,200)
      item.display;
      if (item.isPointInButton){relayTable[list][3]!=relayTable[list][3]};
      fill('white')
      textSize(16)
      text(relayTable[list][2]+" "+relayTable[list][3], 4, 50*list)
  }
}
