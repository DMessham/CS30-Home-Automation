// MAJOR PROJECT UI
// Daniel Messham
// Date
//

// function setup() {
// 	//createCanvas(innerWidth-350, 300).parent("jscanvas");
// 	createCanvas(drawWidth, 280).parent("jscanvas");
// }
  
// function windowResized(){
// 	resizeCanvas(canvasDiv.offsetWidth, 300).parent("jscanvas");
// }
  
function draw() {
	background(20);
	labelDraw("Settings")
	for(let list=0; list<visualSettingsList.length; list++){
		ListEntry(3,35,width-5,25,visualSettingsList,list,list,3)
	}
}