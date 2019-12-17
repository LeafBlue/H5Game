var allWidth = document.documentElement.clientWidth;
var allHeight = document.documentElement.clientHeight;

mui.init(
			//刚进来会执行的方法
	

			
);
mui.plusReady(
	function(){
		plus.screen.lockOrientation("landscape-primary");
	}
	
);


$(function(){
	showSec();
	//showLevel();
	showQuit();
})


function showSec(){
	var div1 = document.getElementById("div1");
	div1.style.width = allWidth + "px";
	div1.style.height = allHeight + "px";
	div1.style.backgroundImage = "url(images/SelectPage.jpg)";
	div1.style.backgroundSize = "contain";
}

function showLevel(){
	var table1 = document.getElementById("table1");
	table1.style.width = (allWidth - 300) + "px";
	table1.style.height = "200px";
	table1.style.margin = "auto";
	
	var trList = table1.getElementsByTagName("tr");
	for (var i = 0; i < trList.length; i++) {
		var trOne = trList[i];
		trOne.style.textAlign = "center";
	}
	
	var btnList = table1.getElementsByTagName("input");
	for (var i = 0; i < btnList.length; i++) {
		var btnOne = btnList[i];
		btnOne.style.width = "100px;"
		btnOne.style.height = "100px;"
		btnOne.style.color = "hotpink";
		btnOne.style.fontWeight = "bold";
		btnOne.style.textAlign = "center";
	}
}


function showQuit(){
	var table2 = document.getElementById("table2");
	table2.style.width = (allWidth - 200) + "px";
	table2.style.height = "100px";
	table2.style.margin = "auto";
	
	var trList = table2.getElementsByTagName("tr");
	for (var i = 0; i < trList.length; i++) {
		var trOne = trList[i];
		trOne.style.textAlign = "center";
	}
	
	var btnList = table2.getElementsByTagName("input");
	for (var i = 0; i < btnList.length; i++) {
		var btnOne = btnList[i];
		btnOne.style.width = "100px;"
		btnOne.style.height = "100px;"
		btnOne.style.color = "red";
		btnOne.style.fontWeight = "bold";
		btnOne.style.textAlign = "center";
	}
}

function getLevel(thisLevel){
	var theColor = thisLevel.style.backgroundColor;
	if(theColor == "yellow"){
		thisLevel.style.backgroundColor = "white";
	}else{
		//把其他的全变成白色
		var table1 = document.getElementById("table1");
		var btnList = table1.getElementsByTagName("input");
		for (var i = 0; i < btnList.length; i++) {
			var btnOne = btnList[i];
			btnOne.style.backgroundColor = "white";
		}
		
		thisLevel.style.backgroundColor = "yellow";
	}
}


function GotoLevel(){
	window.location.href = "Game.html?1";
}


function QuitGame(){
	var btn = ["确定", "取消"];
	mui.confirm('是否退出？', '提示', btn, function(e) {
		if(e.index == 0) {
			mui.currentWebview.close();
		}
	});
}



mui.back = function() {
    var btn = ["确定", "取消"];
    mui.confirm('是否退出？', '提示', btn, function(e) {
        if(e.index == 0) {
            mui.currentWebview.close();
        }
    });
}