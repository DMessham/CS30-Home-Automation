// MAJOR PROJECT UI
// Daniel Messham
// Date
//

function setup() {
	//createCanvas(innerWidth-350, 300).parent("jscanvas");
	createCanvas(drawWidth, 280).parent("jscanvas");
}
  
function windowResized(){
	//createCanvas(outerWidth*0.8, 300).parent("jscanvas");
}
  
function draw() {
	background(20);
	testdraw()
	SettingsList(3,30,width-5,25,30,0)
}
  
function testdraw() {
	fill('gray').
	rect(100,100,100,100)
	text("placehoder,",0,0)
}
  
function SettingsList(x,y,itemWidth,itemHeight,ySpacing,page){
	for(let list=0; list<visualSettingsList.length; list++){
	  	let txt = visualSettingsList[list][1]+" , "+visualSettingsList[list][2]+" , "+visualSettingsList[list][3]
		ListEntry(x,y,itemWidth,itemHeight,visualSettingsList,list,list,3)
	}
}