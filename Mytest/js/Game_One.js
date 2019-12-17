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
	//需要加载的项
	showGameBack();
	//gameDivShow();
	//putMatTest();
	
	//加载地图+人物初始位置
	//putMat(getArray1(getLevels()),getArray2(getLevels()));
	
})

function getLevels(){
	var url=location.search;
	var levels = url.split("?")[1];
	if(levels!=null&&levels!=""){
		return levels;
	}else{
		return 1;
	}
	
}


function showGameBack(){
	var div1 = document.getElementById("div1");
	div1.style.width = allWidth + "px";
	div1.style.height = allHeight + "px";
	div1.style.backgroundImage = "url(images/Background.jpg)";
	div1.style.backgroundSize = "contain";
	
	var div2 = document.getElementById("div2");
	div2.style.width = "100px";
	div2.style.height = "50px";
	div2.style.color = "royalblue";
	div2.style.fontSize = "25px";
	div2.style.padding = "15px 10px";
	
	
}

//这个方法用来调试用，写完后把它注掉
function gameDivShow(){
	var gameDiv = document.getElementById("gameDiv");
	gameDiv.style.width = "418px";
	gameDiv.style.height = "198px";
	//gameDiv.style.border = "solid 1px red";
	gameDiv.style.margin = "auto";
	
	var all_width = 418;
	var one_width = 418/11;
	var all_height = 198;
	var oneHeight = 198/11;
	for (var i = 0; i < 11; i++) {
		for (var j = 0; j < 11; j++) {
			var newDiv = document.createElement("div");
			newDiv.style.width = one_width + "px";
			newDiv.style.height = oneHeight + "px";
			//---------------------当你需要调整方块位置时请把下面代码注释放开----------------------------
			newDiv.style.border = "solid 1px white";
			newDiv.style.position = "absolute";
			newDiv.style.top = ((i * oneHeight) + 60) +"px";//不得已而为之
			newDiv.style.left = ((j * one_width) + 75) + "px";//不得已而为之
			newDiv.setAttribute("index_X",j);
			newDiv.setAttribute("index_Y",i);
			gameDiv.appendChild(newDiv);
		}
	}
}


//新规则：相邻的横边以及竖边不允许放置方块


//这是一个测试放置方块的方法，放置位置为（10,10）
function putMatTest(){
	//var newImg = document.createAttribute("img");
	//newImg.setAttribute("src",);
	var img2 = document.getElementById("img2");
	img2.style.position = "absolute";
	img2.style.top = "50px";
	img2.style.left = (75 + 38 * 2) +"px";
	
	var img1 = document.getElementById("img1");
	img1.style.position = "absolute";
	img1.style.top = (60-36) + "px";
	img1.style.left = (75 - 38) + "px";
	
	
}

//放置方块和小人
function putMat(myArray,myUpArray){
	//执行去除图片操作
	var gameimg = document.getElementsByName("gameimg");
	if(gameimg!=null&&gameimg.length>0){
		$("[name='gameimg']").remove();
	}
	
	var div1 = document.getElementById("div1");
	//这个坐标用来记录站立坐标
	var manindex_A = 0;
	var manindex_B = 0;
	
	var cishu = 0;
	for(var a = 0; a < myArray.length; a ++){
		
		inArray = myArray[a];
		for(var b = 10; b >=0; b --){//对内层数组进行反向循环
			cishu ++;
			thisData = myArray[a][b];
			var picSrc = "";
			var picWidth = 0;
			var picHeight = 0;
			if(thisData == 1){
				picSrc = "GamePic/mat1.png";
				picWidth="76";
				picHeight="75";
			}else if(thisData == 2){
				picSrc = "GamePic/mat2.png";
				picWidth="76";
				picHeight="75";
			}else if(thisData == 3){
				picSrc = "GamePic/mat3.png";
				picWidth="76";
				picHeight="75";
			}else if(thisData == 4){
				picSrc = "GamePic/mat4.png";
				picWidth="112";
				picHeight="94";
			}else if(thisData == 5){
				picSrc = "GamePic/mat5.png";
				picWidth="112";
				picHeight="94";
			//往下开始排布角色位置
			}else if(thisData == 11){
				picSrc = "ManPic/man1.png";
				picWidth="76";
				picHeight="75";
			}else if(thisData == 12){
				picSrc = "ManPic/man2.png";
				picWidth="76";
				picHeight="75";
			}else if(thisData == 13){
				picSrc = "ManPic/man3.png";
				picWidth="76";
				picHeight="75";
			}else if(thisData == 14){
				picSrc = "ManPic/man4.png";
				picWidth="76";
				picHeight="75";
			}else if(thisData == 15){
				picSrc = "ManPic/man5.png";
				picWidth="76";
				picHeight="75";
			}else if(thisData == 16){
				picSrc = "ManPic/man6.png";
				picWidth="76";
				picHeight="75";
			}else if(thisData == 17){
				picSrc = "ManPic/man7.png";
				picWidth="76";
				picHeight="75";
			}else if(thisData == 18){
				picSrc = "ManPic/man8.png";
				picWidth="76";
				picHeight="75";
			}else if(thisData > 100){
				//在这里检测到站立角色，对齐坐标进行记录
				manindex_A = a;
				manindex_B = b;
				//执行循环第二数组前半部分的方法
				upLoadMat(myUpArray,a,b,1);
				thisData = myArray[a][b];
				if(thisData == 111){
					picSrc = "ManPic/man11.png";picWidth="76";picHeight="108";
				}else if(thisData == 112){
					picSrc = "ManPic/man21.png";picWidth="76";picHeight="108";
				}else if(thisData == 113){
					picSrc = "ManPic/man31.png";picWidth="76";picHeight="108";
				}else if(thisData == 114){
					picSrc = "ManPic/man41.png";picWidth="76";picHeight="108";
				}else if(thisData == 115){
					picSrc = "ManPic/man51.png";picWidth="76";picHeight="108";
				}else if(thisData == 116){
					picSrc = "ManPic/man61.png";picWidth="76";picHeight="108";
				}else if(thisData == 117){
					picSrc = "ManPic/man71.png";picWidth="76";picHeight="108";
				}else if(thisData == 118){
					picSrc = "ManPic/man81.png";picWidth="76";picHeight="108";
				}
			}else{
				continue;
			}
			//创建图片
			var newImg = document.createElement("img");
			newImg.setAttribute("name","gameimg");
			newImg.setAttribute("src",picSrc);
			newImg.setAttribute("width",picWidth);
			newImg.setAttribute("height",picHeight);
			newImg.style.position = "absolute";
			newImg.style.top = ((60-54) + (a * 18)) + "px";
			newImg.style.left = ((75 - 38) + (b * 38)) + "px";
			//当图片是4或者5时需要额外处理
			if(thisData == 4){
				newImg.style.top = ((60-72) + (a * 18)) + "px";
				newImg.style.left = ((75-76) + (b * 38)) + "px";
			}else if(thisData == 5){
				newImg.style.top = ((60-72) + (a * 18)) + "px";
				newImg.style.left = ((75-38) + (b * 38)) + "px";
			}else if(thisData > 100){//站姿人物位置处理完毕
				newImg.style.top = ((60-90) + (a * 18)) + "px";
				newImg.style.left = ((75-38) + (b * 38)) + "px";
			}
			div1.appendChild(newImg);
		}
	}
	upLoadMat(myUpArray,manindex_A,manindex_B,2);
	
	
	
}

function upLoadMat(myUpArray,twoA,twoB,times){
	var a_Began = 0;
	var a_End = 0;
	if(times == 1){
		a_Began = 0;
		a_End = twoA;
	}else if(times == 2){
		a_Began = twoA;
		a_End = myUpArray.length - 1;
	}
	
	//理论上说，第二层不允许放24和5 以外的方块
	for(var a = a_Began; a < a_End + 1; a ++){
		inArray = myUpArray[a];
		
		var b_Began = 10;
		if(times == 1){
			if(a == a_Began){
				b_Began = twoB;
			}else{
				b_Began = 10;
			}
		}
		for(var b = b_Began; b >=0; b --){//对内层数组进行反向循环
			if(a == twoA&&b == twoB&&times == 1){
				//已循环过，中断循环，执行第一层循环
				return;
			}
			thisData = myUpArray[a][b];
			var picSrc = "";
			var picWidth = 0;
			var picHeight = 0;
			if(thisData == 2){
				picSrc = "GamePic/mat6.png";
				picWidth="76";
				picHeight="75";
			}else if(thisData == 4){
				picSrc = "GamePic/mat7.png";
				picWidth="112";
				picHeight="94";
			}else if(thisData == 5){
				picSrc = "GamePic/mat8.png";
				picWidth="112";
				picHeight="94";
			}else{
				continue;
			}
			//创建图片
			var newImg = document.createElement("img");
			newImg.setAttribute("name","gameimg");
			newImg.setAttribute("src",picSrc);
			newImg.setAttribute("width",picWidth);
			newImg.setAttribute("height",picHeight);
			newImg.style.position = "absolute";
			newImg.style.top = ((60-90) + (a * 18)) + "px";
			newImg.style.left = ((75 - 38) + (b * 38)) + "px";
			//当图片是4或者5时需要额外处理
			if(thisData == 4){
				newImg.style.top = ((60-108) + (a * 18)) + "px";
				newImg.style.left = ((75-76) + (b * 38)) + "px";
			}else if(thisData == 5){
				newImg.style.top = ((60-108) + (a * 18)) + "px";
				newImg.style.left = ((75-38) + (b * 38)) + "px";
			}
			div1.appendChild(newImg);
		}
	}
}

function backPage(){
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















