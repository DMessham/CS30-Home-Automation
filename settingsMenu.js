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
  
function ListEntry(x,y,itemWidth,itemHeight,listTable,itemID,visualPos,spacing){
	textAlign(LEFT)
	let type = (listTable[itemID][1])
	if(type=="toggle"){
		let txt = listTable[itemID][0]
		if(listTable[itemID][2]==true){accent="green"}//set button accent color according to state
    	else{accent="darkCyan"}
		drawButton(x,y*visualPos+spacing,itemWidth, itemHeight, txt, accent, 230);
	  	if(mouseArea(x,y*visualPos+spacing,itemWidth, itemHeight)&&mouseIsPressed){//see if the mouse is in the area of a button and if it is being pressed
			if(millis()-timeBase>=timeDelay){
				if(listTable[itemID][3]==false){listTable[itemID][2]=true}//set relay state to true if it is false
		 		else(listTable[itemID][4]=false)//set it to false if it is anything else
		  		timeBase = millis()//reset the delay for a button press
		  		console.log(txt + "(Toggle):" +listTable[itemID][2])
			}
		}
	}
	if(type=="number"){
		let txt = listTable[itemID][0] +":"+listTable[itemID][2]
		//the display for the label and icon
		drawButton(x,y*visualPos+spacing, itemWidth-2*(itemHeight+spacing), itemHeight, txt, "cyan", 230);
		//plus button
		drawButton(x+itemWidth-(itemHeight),y*visualPos+spacing,itemHeight, itemHeight, "+", "green", 230);
		if(mouseArea(x+itemWidth-(itemHeight),y*visualPos+spacing,itemHeight, itemHeight)&&mouseIsPressed){//see if the mouse is in the area of a button and if it is being pressed
			if(millis()-timeBase>=timeDelay){
				if(listTable[itemID][2]<listTable[itemID][4]){listTable[itemID][2]++}//set relay state to true if it is false
		  		timeBase = millis()//reset the delay for a button press
		  		console.log(txt + "(num+):" +visualSettingsList[itemID][2])
			}
		}
		//minus
		drawButton(x+(itemWidth-spacing-2*itemHeight),y*visualPos+spacing,itemHeight, itemHeight, "-", "red", 230);
		if(mouseArea(x+(itemWidth-spacing-2*itemHeight),y*visualPos+spacing,itemHeight, itemHeight)&&mouseIsPressed){//see if the mouse is in the area of a button and if it is being pressed
			if(millis()-timeBase>=timeDelay){
				if(listTable[itemID][2]>listTable[itemID][3]){listTable[itemID][2]--}//set relay state to true if it is false
		  		timeBase = millis()//reset the delay for a button press
		  		console.log(txt + "(num-):" +visualSettingsList[itemID][2])
			}
		}
	}
	else if(type=="numSlider"){
		let txt = listTable[itemID][0] +":"+listTable[itemID][2]
		//the display for the label and icon
		drawButton(x,y*visualPos+spacing, itemWidth-2*(itemHeight+spacing), itemHeight, txt, "cyan", 230);
	}
	else if(type=="textEntry"){
		let txt = listTable[itemID][0] +":"+listTable[itemID][2]
		drawButton(x,y*visualPos+spacing, itemWidth, itemHeight, txt, "cyan", 230);
		if(mouseArea(x,y*visualPos+spacing, itemWidth, itemHeight)&&mouseIsPressed){//see if the mouse is in the area of a button and if it is being pressed
			if(millis()-timeBase>=timeDelay){
				if(listTable[itemID][2]<listTable[itemID][4]){listTable[itemID][2]++}//set relay state to true if it is false
		  		timeBase = millis()//reset the delay for a button press
		  		console.log(txt + "(textentry):" +visualSettingsList[itemID][2])
			}
		}
	}
	else if(type=="dropdownMenu"){
		let txt = listTable[itemID][0] +":"+listTable[itemID][2]
		//the display for the label
		drawButton(x,y*visualPos+spacing, itemWidth-1*(itemHeight+spacing), itemHeight, txt, "cyan", 230);
		if(mouseArea(x,y*visualPos+spacing, itemWidth-1*(itemHeight+spacing), itemHeight)&&mouseIsPressed){//see if the mouse is in the area of a button and if it is being pressed
			if(millis()-timeBase>=timeDelay){
				if(listTable[itemID][2]<listTable[itemID][4]){listTable[itemID][2]++}//set relay state to true if it is false
		  		timeBase = millis()//reset the delay for a button press
		  		console.log(txt + "(dropdownmenu-label):" +visualSettingsList[itemID][2])
			}
		}
		//plus button
		drawButton(x+itemWidth-(itemHeight),y*visualPos+spacing,itemHeight, itemHeight, "V", "green", 230);
		if(mouseArea(x+itemWidth-(itemHeight),y*visualPos+spacing,itemHeight, itemHeight)&&mouseIsPressed){//see if the mouse is in the area of a button and if it is being pressed
			if(millis()-timeBase>=timeDelay){
				if(listTable[itemID][2]<listTable[itemID][4]){listTable[itemID][2]++}//set relay state to true if it is false
		  		timeBase = millis()//reset the delay for a button press
		  		console.log(txt + "(dropdownmenu-arrow):" +visualSettingsList[itemID][2])
			}
		}
	}
	else if(type=="progress"){
		let accent="green"
		//bg
		fill(60)
      	strokeWeight(2)
      	stroke(accent);
		rect(x,y*visualPos+spacing, itemWidth-0*(itemHeight+spacing), itemHeight,5)
		//fill
		stroke("darkCyan");
		fill(accent)
		rect(x,y*visualPos+spacing, (itemWidth-0*(itemHeight+spacing))*(listTable[itemID][2]/100), itemHeight,5)
		//text
		noStroke();
		fill('white')
		textSize(17)
		text(listTable[itemID][0],x+5,(y*visualPos+spacing)+5,width-5,itemHeight-5)
		textAlign(RIGHT)
		text(listTable[itemID][2]+"%",x+itemWidth-35,y*visualPos+2.5*spacing,itemHeight+10, itemHeight-5)
		textAlign(LEFT)
	}
	else if(type=="loading"){
		let accent="green"
		//bg
		fill(60)
      	strokeWeight(2)
      	stroke(accent);
		rect(x,y*visualPos+spacing, itemWidth, itemHeight,5)
		//fill
		stroke("darkCyan");
		fill(accent)
		rect(x+(itemWidth)*(animationLoopPercent(3))-(itemHeight*spacing),y*visualPos+spacing, (itemHeight*(1.25*spacing)), itemHeight,5)
		//text
		noStroke();
		fill('white')
		textSize(17)
		text(listTable[itemID][0],x+5,(y*visualPos+spacing)+5,width-5,itemHeight-5)
	}
	else{
		let txt = listTable[itemID][0] +":"+listTable[itemID][2]
		fill(70)
      	strokeWeight(2)
      	stroke(accent);

		rect(x,y*visualPos+spacing, itemWidth-0*(itemHeight+spacing), itemHeight,5)
		noStroke();
		fill('white')
		textSize(17)
		text(txt,x+5,(y*visualPos+spacing)+5,width-5,itemHeight-5)
	}
}