//-----Common function --------
var curRange=null;

function DropBox(ElementID,commandName,initialVal,ValList){
	
	//create drop box button
	var DropBtn = document.getElementById(ElementID);
	DropBtn.classList.add("DropButton");
	DropBtn.setAttribute("value",initialVal);
	this.Button = DropBtn;
	
	
	//create drop list   
	var DropList =  document.createElement("ul");
	DropList.classList.add("DropList");
	
	DropList.style.setProperty("width",DropBtn.offsetWidth);
	DropList.style.setProperty("display","none");
	DropList.style.setProperty("left",DropBtn.offsetLeft);
	DropList.style.setProperty("top",DropBtn.offsetTop);
	
	if(DropBtn==DropBtn.parentNode.lastChild){
		DropBtn.parentNode.appendChild(DropList);
	}else{
		DropBtn.parentNode.insertBefore(DropList, DropBtn.nextElementSibling );
	}
	this.List = DropList;
	
	
	//show list 
	
	var show = function(isShow){
		if(isShow){
			DropList.style.setProperty("display","block");
		}else{
			DropList.style.setProperty("display","none");
		}
	}
	
	
	//add event for button  
	DropBtn.addEventListener("mouseover",function(){
		this.classList.add("HighLightOn");
	}); 
	
	DropBtn.addEventListener("mouseout",function(){
		this.classList.remove("HighLightOn");
	}); 
	
	
	DropBtn.addEventListener("click",function(){
		show(true);
	});
	
	DropBtn.addEventListener("focus",function(){
		console.log("focus : " + this.getAttribute("value"));
		
		if(curRange!=null){ 
			window.getSelection().removeAllRanges();
			window.getSelection().addRange(curRange);
		}
	});
	
	
	
	//create drop list item
	
	for(i=0; i < ValList.length;i++){
		var LiRow = document.createElement("li");
		LiRow.innerHTML = ValList[i].name;
		LiRow.setAttribute("value",ValList[i].value);
		LiRow.setAttribute("tabindex","0");
		DropList.appendChild(LiRow);
		
		LiRow.addEventListener("click",function(){
			console.log(ElementID + " " + DropBtn.innerHTML + " >> " + this.innerHTML); 
				
			if(curRange!=null){ 
				window.getSelection().removeAllRanges(); 
				window.getSelection().addRange(curRange); 
				console.log(document.execCommand(commandName,false,this.getAttribute("value")));
			}
			
			DropBtn.setAttribute("value",this.innerHTML);
			show(false);
			
		});
			
		LiRow.addEventListener("focus", function(){
			if(curRange!=null){ 
				window.getSelection().removeAllRanges(); 
				window.getSelection().addRange(curRange);  
			}
		});
		
		LiRow.addEventListener("mouseover",function(){
			this.classList.add("HighLightOn");
		});
		
		LiRow.addEventListener("mouseout",function(){
			this.classList.remove("HighLightOn");
		});
	}
	
	
	document.addEventListener("click",function(){
		show(false);
	},true);
	
}

function FuncButton(ParentID, ButtonName, CommandName){ 

	var Parent = document.getElementById(ParentID); 
	Parent.classList.add("FuncButtonBar");
	
	this.Val = false;
	
	var Button = document.createElement("input");
	Button.setAttribute("type","button");
	Button.setAttribute("value",ButtonName);
	Button.classList.add(CommandName);
	Parent.appendChild(Button);
	
	this.Btn = Button;
	_this = this;
	
	this.Btn.addEventListener("click",function(){
		if(curRange!=null){ 
			console.log(curRange);
			console.log(curRange.startOffset);
			console.log(curRange.endOffset);
			
			if(_this.Val){
				var exeRes = document.execCommand(CommandName,false,1); 
				
			}else{
				var exeRes = document.execCommand(CommandName,false,0);
			}
			console.log(CommandName + " " + exeRes);
		}
	});
	
	
	this.Btn.addEventListener("mouseover",function(){
		this.classList.add("on");
	});
	
	this.Btn.addEventListener("mouseout",function(){
		this.classList.remove("on");
	});
	
}



function ColorSelector(ParentID, CommandName, initial, ColorVal){ 

	var Parent = document.getElementById(ParentID);
	
	//Button
	var ColorButton = document.createElement("div");
	ColorButton.classList.add("ColorPane");
	ColorButton.style.setProperty("width","100%");
	ColorButton.style.setProperty("height","100%");
	ColorButton.setAttribute("tabindex","0");
	Parent.appendChild(ColorButton);
	
	this.Btn = ColorButton;
	
	var CurColor = document.createElement("li");
	CurColor.classList.add("FontColorIcon");
	CurColor.style.setProperty("background-color",initial.value);
	CurColor.setAttribute("name",initial.name); 
	ColorButton.appendChild(CurColor);
	
	var li = document.createElement("li");
	li.classList.add("FontColorName");
	li.innerHTML = "A";
	ColorButton.appendChild(li);
	
	
	//drop list
	var NUM_PER_ROW = 5;
	var ColorList = document.createElement("div");
	ColorList.classList.add("ColorPane");
	ColorList.classList.add("ColorChooser");
	ColorList.style.setProperty("display","none");
	ColorList.style.setProperty("Width",NUM_PER_ROW * 26);
	
	ColorList.style.setProperty("top", (Parent.offsetTop + Parent.offsetHeight + 3 ));
	Parent.appendChild(ColorList);
	
	var ul = null; 
	
	for(i=0;i<ColorVal.length;i++){
		if(i%NUM_PER_ROW==0){
			ul = document.createElement("ul");
			ColorList.appendChild(ul);
		}
		var li = document.createElement("li");
		
		li.setAttribute("name",ColorVal[i].name);
		li.setAttribute("value",ColorVal[i].value);
		li.style.setProperty("background-color",ColorVal[i].value);
		li.setAttribute("tabindex","0");
		ul.appendChild(li);
		
		
		li.addEventListener("mouseover",function(){
			this.classList.add("on");
		});
		
		li.addEventListener("mouseout",function(){
			this.classList.remove("on");
		});
		
		li.addEventListener("focus",function(){
			if(curRange!=null){
				window.getSelection().removeAllRanges();
				window.getSelection().addRange(curRange); 
			}
		});
		
		li.addEventListener("click",function(){
			
			console.log(CurColor.getAttribute("name") + "  >>  " + this.getAttribute("name"));
			
			CurColor.style.setProperty("background-color",this.getAttribute("value"));
			CurColor.setAttribute("name",this.getAttribute("name"));
			CurColor.setAttribute("value",this.getAttribute("value"));
			
			ColorList.style.setProperty("display","none");
				
			if(curRange!=null){
				console.log(document.execCommand(CommandName,false,this.getAttribute("value"))); 
			}
			
		});
	}
	
	ColorButton.addEventListener("click",function(){
		ColorList.style.setProperty("display","block");
	},false);
	
	
	ColorButton.addEventListener("focus",function(){
		if(curRange!=null){
			window.getSelection().removeAllRanges();
			window.getSelection().addRange(curRange);
		}
	});
	
	
	ColorButton.addEventListener("mouseover",function(){
		this.classList.add("HighLightOn");
	}); 
	
	ColorButton.addEventListener("mouseout",function(){
		this.classList.remove("HighLightOn");
	}); 
	
	
	document.addEventListener("click",function(){
		ColorList.style.setProperty("display","none");
	},true);
}



function RichEditor(ElementID){
	var Editor =document.getElementById(ElementID); 
	
	Editor.setAttribute("contentEditable",true); 
	Editor.setAttribute("designMode","on"); 
	
	Editor.oninput = function(){
		
	}
	
	Editor.onmouseout = function(){
		console.log("mouse out...." + ElementID);
		if(window.getSelection().rangeCount>0){
			console.log(window.getSelection().getRangeAt(0));
			curRange = window.getSelection().getRangeAt(0);
		} 
	}
	
	Editor.onblur = function(){
		console.log("on blur...." + ElementID);
	}
	
	document.addEventListener("keypress",function(e){
		if(Editor == document.activeElement){ 
			if(window.event.keyCode==13){
				console.log("keypress: " + window.event.keyCode); 
				console.log(window.getSelection().getRangeAt(0));
			}
		};
	},false);
	
	document.addEventListener("keyup",function(e){
		
		if(Editor == document.activeElement){			
			if(window.event.keyCode==13){
				console.log("keyup: " + window.event.keyCode);  
				
				var tmpHTML = Editor.innerHTML;
				var reg = new RegExp("<div>","g")
				
				tmpHTML = tmpHTML.replace(reg,"<p>");
				
				var reg = new RegExp("</div>","g");
				tmpHTML = tmpHTML.replace(reg,"</p>");
				
				
				var reg = new RegExp("<br>","g");
				//tmpHTML = tmpHTML.replace(reg,"");
				
				//Editor.innerHTML = tmpHTML;
				
				var rg = window.getSelection().getRangeAt(0);
				rg.setStart(rg.startContainer,rg.commonAncestorContainer.length);
				rg.setEnd(rg.endContainer,rg.commonAncestorContainer.length);
				
				//console.log(window.getSelection().getRangeAt(0));
			}
		}
	})
}