var allWidth = document.documentElement.clientWidth;
var allHeight = document.documentElement.clientHeight;


mui.init(
			
);
mui.plusReady(
	function(){
		plus.screen.lockOrientation("landscape-primary")
	}
	
);


$(function(){
	showMain();
})


function showMain(){
	var div1 = document.getElementById("div1");
	div1.style.width = allWidth + "px";
	div1.style.height = allHeight + "px";
	div1.style.backgroundImage = "url(images/MainPage.jpg)";
	div1.style.backgroundSize = "contain";
	
	
	var div2 = document.getElementById("div2");
	div2.style.width = "160px";
	div2.style.height = "100px";
	div2.style.textalign = "Center"
	div2.style.color = "yellow";
	div2.style.fontSize = "20px";
	div2.style.margin = "auto";
	div2.style.lineHeight = ((allHeight * 3)/2) + "px";
}

function nextPage(){
	window.location.href = "SecPage.html";
}


mui.back = function() {
    var btn = ["确定", "取消"];
    mui.confirm('是否退出？', '提示', btn, function(e) {
        if(e.index == 0) {
            mui.currentWebview.close();
        }
    });
}