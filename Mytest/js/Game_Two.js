//这个js主要用来做互动

var theMan;
var arrayIndex = 0;
var myArray1;
var myArray2;
$(function(){
	
	
	arrayIndex = getLevels();
	setMan();
	$("#mySpan").html(arrayIndex);
	myArray1 = getArray1(arrayIndex);
	myArray2 = getArray2(arrayIndex);
	gravity(myArray1,myArray2);
	setTimeout("bgm01()",100);
});
//设置角色属性
function setMan(){
	theMan = new Object();
	theMan.place_A = 0;
	theMan.place_B = 0;
	theMan.direc = 1;//1,2,3,4
	theMan.pose = 0;//0为坐姿，1为站姿
	theMan.condi = 0;//0不推箱子，1推箱子
	//获取坐标
	getPlace();
}


function bgm01(){
	var bgm1 = document.getElementById("myaudio1");
	bgm1.play();
}


//设置坐标属性和方向属性
function getPlace(){
	
	var thePlace = getManPlace(arrayIndex);
	var splits = thePlace.split("_");
	theMan.place_A = parseInt(splits[0]);
	theMan.place_B = parseInt(splits[1]);
	
	var manData = getMandirect(arrayIndex);
	if(manData == 14 || manData == 18 || manData == 114 || manData == 118){
		theMan.direc = 1;
	}else if(manData == 13 || manData == 17 || manData == 113 || manData == 117){
		theMan.direc = 2;
	}else if(manData == 11 || manData == 15 || manData == 111 || manData == 115){
		theMan.direc = 3;
	}else if(manData == 12 || manData == 16 || manData == 112 || manData == 116){
		theMan.direc = 4;
	}
}


function gravity(myArray1,myArray2){
	var gravityMark = 0;
	for (var a = 0; a < myArray2.length; a++) {
		for(var b = 0; b < myArray2[a].length; b++){
			if(myArray2[a][b] == 2){
				if(myArray1[a][b] == 3 && myArray1[a+1][b+1] != 4 && myArray1[a+1][b-1] != 5){
					
					myArray1[a][b] = 2;
					myArray2[a][b] = 0;
					gravityMark = 1;
				}
			}else if(myArray2[a][b] == 4){
				if(myArray1[a][b] == 3 && myArray1[a-1][b-1] == 3
				&& myArray1[a+1][b+1] != 4 && myArray1[a+1][b-1] != 5 && myArray1[a][b-2] != 5){
					myArray2[a][b] = 0;
					myArray1[a][b] = 4;
					gravityMark = 1;
				}
			}else if(myArray2[a][b] == 5){
				
				if(myArray1[a][b] == 3 && myArray1[a-1][b+1] == 3
				&& myArray1[a+1][b-1] != 5 && myArray1[a+1][b+1] != 4 && myArray1[a][b+2] != 4){
					myArray2[a][b] = 0;
					myArray1[a][b] = 5;
					gravityMark = 1;
				}
			}
		}
	}
	if(gravityMark == 1){
		//发生了重力互动
		if(myArray1[theMan.place_A][theMan.place_B]>=115 && myArray1[theMan.place_A][theMan.place_B] <= 118){
			myArray1[theMan.place_A][theMan.place_B] = myArray1[theMan.place_A][theMan.place_B] - 4;
			theMan.condi = 0;
		}
	}
	putMat(myArray1,myArray2);
	
	passLevel();
}

//设置角色站立坐下状态
function setPose(pose){
	for (var a = 0; a < myArray1.length; a++) {
		for(var b = 0; b < myArray1[a].length; b++){
			if(myArray1[a][b]>10){
				if(pose == 0&&myArray1[a][b]>100){
					if(theMan.condi == 1){
						myArray1[a][b] = myArray1[a][b] - 4;
						theMan.condi = 0;
					}
					myArray1[a][b] = myArray1[a][b] - 100;
					
				}
				if(pose == 1&&myArray1[a][b]<100){
					//坐姿变站姿，需要判断头顶有没有东西，有的话不可以站起来
					if(myArray2[a][b] !=0 || myArray2[a+1][b-1] == 5 || myArray2[a+1][b+1] == 4 ){
						return;
					}
					if(theMan.condi == 1){
						myArray1[a][b] = myArray1[a][b] - 4;
						theMan.condi = 0;
					}
					myArray1[a][b] = myArray1[a][b] + 100;
				}
			}
		}
	}
	theMan.pose = pose;
	//重新生成地图
	putMat(myArray1,myArray2);
}

function setcondi(){
	for (var a = 0; a < myArray1.length; a++) {
		for(var b = 0; b < myArray1[a].length; b++){
			if(myArray1[a][b] > 10 && myArray1[a][b] < 100){
				if(myArray1[a][b] >= 15){
					myArray1[a][b] = myArray1[a][b] - 4;
					theMan.condi = 0;
				}else{
					//在这里要判断 前面一格有没有可以推的东西
					if(theMan.direc == 1){
						if(myArray1[a-1][b-1] == 2 || myArray1[a-1][b-1] == 4 || myArray1[a-1][b-1] == 5 || myArray1[a][b-2] == 5){
							myArray1[a][b] = myArray1[a][b] + 4;
							theMan.condi = 1;
						}
					}else if(theMan.direc == 2){
						if(myArray1[a-1][b+1] == 2 || myArray1[a-1][b+1] == 4 || myArray1[a-1][b+1] == 5 || myArray1[a][b+2] == 4){
							myArray1[a][b] = myArray1[a][b] + 4;
							theMan.condi = 1;
						}
					}else if(theMan.direc == 3){
						if(myArray1[a+1][b-1] == 2 || myArray1[a+1][b-1] == 4 || myArray1[a+1][b-1] == 5 || myArray1[a+2][b] == 4 || myArray1[a+2][b-2] == 5){
							myArray1[a][b] = myArray1[a][b] + 4;
							theMan.condi = 1;
						}
					}else if(theMan.direc == 4){
						if(myArray1[a+1][b+1] == 2 || myArray1[a+1][b+1] == 4 || myArray1[a+1][b+1] == 5 || myArray1[a+2][b+2] == 4 || myArray1[a+2][b] == 5){
							myArray1[a][b] = myArray1[a][b] + 4;
							theMan.condi = 1;
						}
					}
				}
			}
			if(myArray1[a][b] > 100){
				if(myArray1[a][b] >= 115){
					myArray1[a][b] = myArray1[a][b] - 4;
					theMan.condi = 0;
				}else{
					//在这里要判断 前面一格有没有可以推的东西
					if(theMan.direc == 1){
						if(myArray2[a-1][b-1] == 2 || myArray2[a-1][b-1] == 4 || myArray2[a-1][b-1] == 5 || myArray2[a][b-2] == 5){
							myArray1[a][b] = myArray1[a][b] + 4;
							theMan.condi = 1;
						}
					}else if(theMan.direc == 2){
						if(myArray2[a-1][b+1] == 2 || myArray2[a-1][b+1] == 4 || myArray2[a-1][b+1] == 5 || myArray2[a][b+2] == 4){
							myArray1[a][b] = myArray1[a][b] + 4;
							theMan.condi = 1;
						}
					}else if(theMan.direc == 3){
						if(myArray2[a+1][b-1] == 2 || myArray2[a+1][b-1] == 4 || myArray2[a+1][b-1] == 5 || myArray2[a+2][b] == 4 || myArray2[a+2][b-2] == 5){
							myArray1[a][b] = myArray1[a][b] + 4;
							theMan.condi = 1;
						}
					}else if(theMan.direc == 4){
						if(myArray2[a+1][b+1] == 2 || myArray2[a+1][b+1] == 4 || myArray2[a+1][b+1] == 5 || myArray2[a+2][b+2] == 4 || myArray2[a+2][b] == 5){
							myArray1[a][b] = myArray1[a][b] + 4;
							theMan.condi = 1;
						}
					}
				}
			}
		}
	}
	//重新生成地图
	putMat(myArray1,myArray2);
}

//过关检测
function passLevel(){
	var manA = theMan.place_A;
	var manB = theMan.place_B;
	if(theMan.pose == 0){
		if(myArray1[manA-1][manB-1] != 3 || myArray1[manA][manB-2] == 5){
			if(myArray1[manA-1][manB+1] != 3 || myArray1[manA][manB+2] == 4){
				if(myArray1[manA+1][manB-1] != 3 || myArray1[manA+2][manB] == 4 || myArray1[manA+2][manB-2] == 5){
					if(myArray1[manA+1][manB+1] != 3 || myArray1[manA+2][manB+2] == 4 || myArray1[manA+2][manB] == 5){
						if(myArray2[manA][manB]!=0 || myArray2[manA+1][manB+1] == 4 || myArray2[manA+1][manB-1] == 5 ){
							//过关条件达成
							alert("过关了！");
							nextLevel();
						}
					}
				}
			}
		}
	}
}

function resetLevel(){
	location.reload();//刷新页面
}

function nextLevel(){
	//跳转下一关
	window.location.href = "Game.html?"+(parseInt(arrayIndex)+1);
}


//角色互动(包括移动和推箱子)
function move(directMark){
	var bgm1 = document.getElementById("myaudio2");
	bgm1.load();
	bgm1.play();
	
	var manA = theMan.place_A;
	var manB = theMan.place_B;
	if(theMan.pose == 0){
		//坐着的时候
		if(theMan.condi == 0){
			//不推箱子
			if(directMark == 1){
				//转向
				myArray1[manA][manB] = 14;
				theMan.direc = 1;
				//判断下一个位置是否有障碍物(把4和5也考虑到啊混蛋)
				if(myArray1[manA-1][manB-1] == 3 && myArray1[manA][manB-2] != 5){
					myArray1[manA][manB] = 3;
					myArray1[manA-1][manB-1] = 14;
					theMan.place_A = manA - 1;
					theMan.place_B = manB - 1;
				}
			}else if(directMark == 2){
				//转向
				myArray1[manA][manB] = 13;
				theMan.direc = 2;
				//判断下一个位置是否有障碍物
				if(myArray1[manA-1][manB+1] == 3 && myArray1[manA][manB+2] != 4){
					myArray1[manA][manB] = 3;
					myArray1[manA-1][manB+1] = 13;
					theMan.place_A = manA - 1;
					theMan.place_B = manB + 1;
				}
			}else if(directMark == 3){
				//转向
				myArray1[manA][manB] = 11;
				theMan.direc = 3;
				//判断下一个位置是否有障碍物
				if(myArray1[manA+1][manB-1] == 3 && myArray1[manA+2][manB] != 4 && myArray1[manA+2][manB-2] != 5){
					myArray1[manA][manB] = 3;
					myArray1[manA+1][manB-1] = 11;
					theMan.place_A = manA + 1;
					theMan.place_B = manB - 1;
				}
			}else if(directMark == 4){
				//转向
				myArray1[manA][manB] = 12;
				theMan.direc = 4;
				//判断下一个位置是否有障碍物
				if(myArray1[manA+1][manB+1] == 3 && myArray1[manA+2][manB+2] != 4 && myArray1[manA+2][manB] != 5){
					myArray1[manA][manB] = 3;
					myArray1[manA+1][manB+1] = 12;
					theMan.place_A = manA + 1;
					theMan.place_B = manB + 1;
				}
			}
		}else if(theMan.condi == 1){
			//推箱子
			if(theMan.direc == 1){
				if(directMark == 1){
					//判断前面箱子是啥样的
					var moveResult = 0;
					if(myArray1[manA - 1][manB - 1] == 2){
						moveResult = moveTwo(manA - 1,manB - 1,1,1);
					}else if(myArray1[manA - 1][manB - 1] == 4){
						moveResult = moveFour(manA - 1,manB - 1,1,1);
					}else if(myArray1[manA - 1][manB - 1] == 5){
						moveResult = moveFive(manA - 1,manB - 1,1,1);
					}else if(myArray1[manA][manB - 2] == 5){
						moveResult = moveFive(manA,manB - 2,1,1);
					}
					if(moveResult == 1){
						myArray1[theMan.place_A][theMan.place_B] = 3;
						myArray1[theMan.place_A - 1][theMan.place_B - 1] = 18;
						theMan.place_A = theMan.place_A - 1;
						theMan.place_B = theMan.place_B - 1;
					}
					
				}else if(directMark == 2){
					//判断人物能否移动
					if(myArray1[manA - 1][manB + 1] != 3 || myArray1[manA][manB + 2] == 4){
						return;
					}
					var moveResult = 0;
					if(myArray1[manA - 1][manB - 1] == 2){
						moveResult = moveTwo(manA - 1,manB - 1,2,1);
					}else if(myArray1[manA - 1][manB - 1] == 4){
						moveResult = moveFour(manA - 1,manB - 1,2,1);
					}else if(myArray1[manA - 1][manB - 1] == 5){
						moveResult = moveFive(manA - 1,manB - 1,2,1);
					}else if(myArray1[manA][manB - 2] == 5){
						moveResult = moveFive(manA,manB - 2,2,1);
					}
					if(moveResult == 1){
						myArray1[theMan.place_A][theMan.place_B] = 3;
						myArray1[theMan.place_A - 1][theMan.place_B + 1] = 18;
						theMan.place_A = theMan.place_A - 1;
						theMan.place_B = theMan.place_B + 1;
					}
				}else if(directMark == 3){
					//判断人物能否移动
					if(myArray1[manA + 1][manB - 1] != 3 || myArray1[manA + 2][manB] == 4 || myArray1[manA + 2][manB - 2] == 5){
						return;
					}
					var moveResult = 0;
					if(myArray1[manA - 1][manB - 1] == 2){
						moveResult = moveTwo(manA - 1,manB - 1,3,1);
					}else if(myArray1[manA - 1][manB - 1] == 4){
						moveResult = moveFour(manA - 1,manB - 1,3,1);
					}else if(myArray1[manA - 1][manB - 1] == 5){
						moveResult = moveFive(manA - 1,manB - 1,3,1);
					}else if(myArray1[manA][manB - 2] == 5){
						moveResult = moveFive(manA,manB - 2,3,1);
					}
					if(moveResult == 1){
						myArray1[theMan.place_A][theMan.place_B] = 3;
						myArray1[theMan.place_A + 1][theMan.place_B - 1] = 18;
						theMan.place_A = theMan.place_A + 1;
						theMan.place_B = theMan.place_B - 1;
					}
				}else if(directMark == 4){
					//判断人物能否移动
					if(myArray1[manA + 1][manB + 1] != 3 || myArray1[manA + 2][manB] == 5 || myArray1[manA + 2][manB + 2] == 4){
						return;
					}
					var moveResult = 0;
					if(myArray1[manA - 1][manB - 1] == 2){
						moveResult = moveTwo(manA - 1,manB - 1,4,1);
					}else if(myArray1[manA - 1][manB - 1] == 4){
						moveResult = moveFour(manA - 1,manB - 1,4,1);
					}else if(myArray1[manA - 1][manB - 1] == 5){
						moveResult = moveFive(manA - 1,manB - 1,4,1);
					}else if(myArray1[manA][manB - 2] == 5){
						moveResult = moveFive(manA,manB - 2,4,1);
					}
					if(moveResult == 1){
						if(myArray1[theMan.place_A][theMan.place_B] > 10){
							myArray1[theMan.place_A][theMan.place_B] = 3;
						}
						myArray1[theMan.place_A + 1][theMan.place_B + 1] = 18;
						theMan.place_A = theMan.place_A + 1;
						theMan.place_B = theMan.place_B + 1;
					}
				}
			}else if(theMan.direc == 2){
				if(directMark == 1){
					if(myArray1[manA - 1][manB - 1] != 3 || myArray1[manA][manB - 2] == 5){
						return;
					}
					var moveResult = 0;
					if(myArray1[manA - 1][manB + 1] == 2){
						moveResult = moveTwo(manA - 1,manB + 1,1,1);
					}else if(myArray1[manA - 1][manB + 1] == 4){
						moveResult = moveFour(manA - 1,manB + 1,1,1);
					}else if(myArray1[manA - 1][manB + 1] == 5){
						moveResult = moveFive(manA - 1,manB + 1,1,1);
					}else if(myArray1[manA][manB + 2] == 4){
						moveResult = moveFour(manA,manB + 2,1,1);
					}
					if(moveResult == 1){
						myArray1[theMan.place_A][theMan.place_B] = 3;
						myArray1[theMan.place_A - 1][theMan.place_B - 1] = 17;
						theMan.place_A = theMan.place_A - 1;
						theMan.place_B = theMan.place_B - 1;
					}
				}else if(directMark == 2){
					var moveResult = 0;
					if(myArray1[manA - 1][manB + 1] == 2){
						moveResult = moveTwo(manA - 1,manB + 1,2,1);
					}else if(myArray1[manA - 1][manB + 1] == 4){
						moveResult = moveFour(manA - 1,manB + 1,2,1);
					}else if(myArray1[manA - 1][manB + 1] == 5){
						moveResult = moveFive(manA - 1,manB + 1,2,1);
					}else if(myArray1[manA][manB + 2] == 4){
						moveResult = moveFour(manA,manB + 2,2,1);
					}
					if(moveResult == 1){
						myArray1[theMan.place_A][theMan.place_B] = 3;
						myArray1[theMan.place_A - 1][theMan.place_B + 1] = 17;
						theMan.place_A = theMan.place_A - 1;
						theMan.place_B = theMan.place_B + 1;
					}
				}else if(directMark == 3){
					if(myArray1[manA + 1][manB - 1] != 3 || myArray1[manA + 2][manB] == 4 || myArray1[manA + 2][manB - 2] == 5){
						return;
					}
					var moveResult = 0;
					if(myArray1[manA - 1][manB + 1] == 2){
						moveResult = moveTwo(manA - 1,manB + 1,3,1);
					}else if(myArray1[manA - 1][manB + 1] == 4){
						moveResult = moveFour(manA - 1,manB + 1,3,1);
					}else if(myArray1[manA - 1][manB + 1] == 5){
						moveResult = moveFive(manA - 1,manB + 1,3,1);
					}else if(myArray1[manA][manB + 2] == 4){
						moveResult = moveFour(manA,manB + 2,3,1);
					}
					if(moveResult == 1){
						if(myArray1[theMan.place_A][theMan.place_B] > 10){
							myArray1[theMan.place_A][theMan.place_B] = 3;
						}
						myArray1[theMan.place_A + 1][theMan.place_B - 1] = 17;
						theMan.place_A = theMan.place_A + 1;
						theMan.place_B = theMan.place_B - 1;
					}
				}else if(directMark == 4){
					if(myArray1[manA + 1][manB + 1] != 3 || myArray1[manA + 2][manB] == 5 || myArray1[manA + 2][manB + 2] == 4){
						return;
					}
					var moveResult = 0;
					if(myArray1[manA - 1][manB + 1] == 2){
						moveResult = moveTwo(manA - 1,manB + 1,4,1);
					}else if(myArray1[manA - 1][manB + 1] == 4){
						moveResult = moveFour(manA - 1,manB + 1,4,1);
					}else if(myArray1[manA - 1][manB + 1] == 5){
						moveResult = moveFive(manA - 1,manB + 1,4,1);
					}else if(myArray1[manA][manB + 2] == 4){
						moveResult = moveFour(manA,manB + 2,4,1);
					}
					if(moveResult == 1){
						myArray1[theMan.place_A][theMan.place_B] = 3;
						myArray1[theMan.place_A + 1][theMan.place_B + 1] = 17;
						theMan.place_A = theMan.place_A + 1;
						theMan.place_B = theMan.place_B + 1;
					}
				}
			}else if(theMan.direc == 3){
				if(directMark == 1){
					if(myArray1[manA - 1][manB - 1] != 3 || myArray1[manA][manB - 2] == 5 ){
						return;
					}
					var moveResult = 0;
					if(myArray1[manA + 1][manB - 1] == 2){
						moveResult = moveTwo(manA + 1,manB - 1,1,1);
					}else if(myArray1[manA + 1][manB - 1] == 4){
						moveResult = moveFour(manA + 1,manB - 1,1,1);
					}else if(myArray1[manA + 1][manB - 1] == 5){
						moveResult = moveFive(manA + 1,manB - 1,1,1);
					}else if(myArray1[manA + 2][manB] == 4){
						moveResult = moveFour(manA + 2,manB,1,1);
					}else if(myArray1[manA + 2][manB - 2] == 5){
						moveResult = moveFive(manA + 2,manB - 2,1,1);
					}
					if(moveResult == 1){
						myArray1[theMan.place_A][theMan.place_B] = 3;
						myArray1[theMan.place_A - 1][theMan.place_B - 1] = 15;
						theMan.place_A = theMan.place_A - 1;
						theMan.place_B = theMan.place_B - 1;
					}
				}else if(directMark == 2){
					if(myArray1[manA - 1][manB + 1] != 3 || myArray1[manA][manB + 2] == 4 ){
						return;
					}
					var moveResult = 0;
					if(myArray1[manA + 1][manB - 1] == 2){
						moveResult = moveTwo(manA + 1,manB - 1,2,1);
					}else if(myArray1[manA + 1][manB - 1] == 4){
						moveResult = moveFour(manA + 1,manB - 1,2,1);
					}else if(myArray1[manA + 1][manB - 1] == 5){
						moveResult = moveFive(manA + 1,manB - 1,2,1);
					}else if(myArray1[manA + 2][manB] == 4){
						moveResult = moveFour(manA + 2,manB,2,1);
					}else if(myArray1[manA + 2][manB - 2] == 5){
						moveResult = moveFive(manA + 2,manB - 2,2,1);
					}
					if(moveResult == 1){
						if(myArray1[theMan.place_A][theMan.place_B] > 10){
							myArray1[theMan.place_A][theMan.place_B] = 3;
						}
						myArray1[theMan.place_A - 1][theMan.place_B + 1] = 15;
						theMan.place_A = theMan.place_A - 1;
						theMan.place_B = theMan.place_B + 1;
					}
				}else if(directMark == 3){
					var moveResult = 0;
					if(myArray1[manA + 1][manB - 1] == 2){
						moveResult = moveTwo(manA + 1,manB - 1,3,1);
					}else if(myArray1[manA + 1][manB - 1] == 4){
						moveResult = moveFour(manA + 1,manB - 1,3,1);
					}else if(myArray1[manA + 1][manB - 1] == 5){
						moveResult = moveFive(manA + 1,manB - 1,3,1);
					}else if(myArray1[manA + 2][manB] == 4){
						moveResult = moveFour(manA + 2,manB,3,1);
					}else if(myArray1[manA + 2][manB - 2] == 5){
						moveResult = moveFive(manA + 2,manB - 2,3,1);
					}
					if(moveResult == 1){
						myArray1[theMan.place_A][theMan.place_B] = 3;
						myArray1[theMan.place_A + 1][theMan.place_B - 1] = 15;
						theMan.place_A = theMan.place_A + 1;
						theMan.place_B = theMan.place_B - 1;
					}
				}else if(directMark == 4){
					var moveResult = 0;
					if(myArray1[manA + 1][manB + 1] != 3 || myArray1[manA + 2][manB] == 4 || myArray1[manA + 2][manB + 2] == 5){
						return;
					}
					if(myArray1[manA + 1][manB - 1] == 2){
						moveResult = moveTwo(manA + 1,manB - 1,4,1);
					}else if(myArray1[manA + 1][manB - 1] == 4){
						moveResult = moveFour(manA + 1,manB - 1,4,1);
					}else if(myArray1[manA + 1][manB - 1] == 5){
						moveResult = moveFive(manA + 1,manB - 1,4,1);
					}else if(myArray1[manA + 2][manB] == 4){
						moveResult = moveFour(manA + 2,manB,4,1);
					}else if(myArray1[manA + 2][manB - 2] == 5){
						moveResult = moveFive(manA + 2,manB - 2,4,1);
					}
					if(moveResult == 1){
						myArray1[theMan.place_A][theMan.place_B] = 3;
						myArray1[theMan.place_A + 1][theMan.place_B + 1] = 15;
						theMan.place_A = theMan.place_A + 1;
						theMan.place_B = theMan.place_B + 1;
					}
				}
			}else if(theMan.direc == 4){
				if(directMark == 1){
					if(myArray1[manA - 1][manB - 1] != 3 || myArray1[manA][manB - 2] == 5){
						return;
					}
					var moveResult = 0;
					if(myArray1[manA + 1][manB + 1] == 2){
						moveResult = moveTwo(manA + 1,manB + 1,1,1);
					}else if(myArray1[manA + 1][manB + 1] == 4){
						moveResult = moveFour(manA + 1,manB + 1,1,1);
					}else if(myArray1[manA + 1][manB + 1] == 5){
						moveResult = moveFive(manA + 1,manB + 1,1,1);
					}else if(myArray1[manA + 2][manB + 2] == 4){
						moveResult = moveFour(manA + 2,manB + 2,1,1);
					}else if(myArray1[manA + 2][manB] == 5){
						moveResult = moveFive(manA + 2,manB,1,1);
					}
					if(moveResult == 1){
						if(myArray1[theMan.place_A][theMan.place_B] > 10){
							myArray1[theMan.place_A][theMan.place_B] = 3;
						}
						myArray1[theMan.place_A - 1][theMan.place_B - 1] = 16;
						theMan.place_A = theMan.place_A - 1;
						theMan.place_B = theMan.place_B - 1;
					}
				}else if(directMark == 2){
					if(myArray1[manA - 1][manB + 1] != 3 || myArray1[manA][manB + 2] == 4){
						return;
					}
					var moveResult = 0;
					if(myArray1[manA + 1][manB + 1] == 2){
						moveResult = moveTwo(manA + 1,manB + 1,2,1);
					}else if(myArray1[manA + 1][manB + 1] == 4){
						moveResult = moveFour(manA + 1,manB + 1,2,1);
					}else if(myArray1[manA + 1][manB + 1] == 5){
						moveResult = moveFive(manA + 1,manB + 1,2,1);
					}else if(myArray1[manA + 2][manB + 2] == 4){
						moveResult = moveFour(manA + 2,manB + 2,2,1);
					}else if(myArray1[manA + 2][manB] == 5){
						moveResult = moveFive(manA + 2,manB,2,1);
					}
					if(moveResult == 1){
						myArray1[theMan.place_A][theMan.place_B] = 3;
						myArray1[theMan.place_A - 1][theMan.place_B + 1] = 16;
						theMan.place_A = theMan.place_A - 1;
						theMan.place_B = theMan.place_B + 1;
					}
				}else if(directMark == 3){
					if(myArray1[manA + 1][manB - 1] != 3 || myArray1[manA + 2][manB] == 4 || myArray1[manA + 2][manB - 2] == 5){
						return;
					}
					var moveResult = 0;
					if(myArray1[manA + 1][manB + 1] == 2){
						moveResult = moveTwo(manA + 1,manB + 1,3,1);
					}else if(myArray1[manA + 1][manB + 1] == 4){
						moveResult = moveFour(manA + 1,manB + 1,3,1);
					}else if(myArray1[manA + 1][manB + 1] == 5){
						moveResult = moveFive(manA + 1,manB + 1,3,1);
					}else if(myArray1[manA + 2][manB + 2] == 4){
						moveResult = moveFour(manA + 2,manB + 2,3,1);
					}else if(myArray1[manA + 2][manB] == 5){
						moveResult = moveFive(manA + 2,manB,3,1);
					}
					if(moveResult == 1){
						myArray1[theMan.place_A][theMan.place_B] = 3;
						myArray1[theMan.place_A + 1][theMan.place_B - 1] = 16;
						theMan.place_A = theMan.place_A + 1;
						theMan.place_B = theMan.place_B - 1;
					}
				}else if(directMark == 4){
					var moveResult = 0;
					if(myArray1[manA + 1][manB + 1] == 2){
						moveResult = moveTwo(manA + 1,manB + 1,4,1);
					}else if(myArray1[manA + 1][manB + 1] == 4){
						moveResult = moveFour(manA + 1,manB + 1,4,1);
					}else if(myArray1[manA + 1][manB + 1] == 5){
						moveResult = moveFive(manA + 1,manB + 1,4,1);
					}else if(myArray1[manA + 2][manB + 2] == 4){
						moveResult = moveFour(manA + 2,manB + 2,4,1);
					}else if(myArray1[manA + 2][manB] == 5){
						moveResult = moveFive(manA + 2,manB,4,1);
					}
					if(moveResult == 1){
						myArray1[theMan.place_A][theMan.place_B] = 3;
						myArray1[theMan.place_A + 1][theMan.place_B + 1] = 16;
						theMan.place_A = theMan.place_A + 1;
						theMan.place_B = theMan.place_B + 1;
					}
				}
			}
		}
		
	}else if(theMan.pose == 1){
		if(theMan.condi == 0){
			//不推箱子
			if(directMark == 1){
				//转向
				myArray1[manA][manB] = 114;
				theMan.direc = 1;
				//判断下一个位置是否有障碍物(把4和5也考虑到啊混蛋)
				if(myArray1[manA-1][manB-1] == 3 && myArray1[manA][manB-2] != 5
				&&myArray2[manA-1][manB-1] == 0 && myArray2[manA][manB-2] != 5){
					myArray1[manA][manB] = 3;
					myArray1[manA-1][manB-1] = 114;
					theMan.place_A = manA - 1;
					theMan.place_B = manB - 1;
				}
			}else if(directMark == 2){
				//转向
				myArray1[manA][manB] = 113;
				theMan.direc = 2;
				//判断下一个位置是否有障碍物
				if(myArray1[manA-1][manB+1] == 3 && myArray1[manA][manB+2] != 4
				&&myArray2[manA-1][manB+1] == 0 && myArray2[manA][manB+2] != 4){
					myArray1[manA][manB] = 3;
					myArray1[manA-1][manB+1] = 113;
					theMan.place_A = manA - 1;
					theMan.place_B = manB + 1;
				}
			}else if(directMark == 3){
				//转向
				myArray1[manA][manB] = 111;
				theMan.direc = 3;
				//判断下一个位置是否有障碍物
				if(myArray1[manA+1][manB-1] == 3 && myArray1[manA+2][manB] != 4 && myArray1[manA+2][manB-2] != 5
				&&myArray2[manA+1][manB-1] == 0 && myArray2[manA+2][manB] != 4 && myArray2[manA+2][manB-2] != 5){
					myArray1[manA][manB] = 3;
					myArray1[manA+1][manB-1] = 111;
					theMan.place_A = manA + 1;
					theMan.place_B = manB - 1;
				}
			}else if(directMark == 4){
				//转向
				myArray1[manA][manB] = 112;
				theMan.direc = 4;
				//判断下一个位置是否有障碍物
				if(myArray1[manA+1][manB+1] == 3 && myArray1[manA+2][manB+2] != 4 && myArray1[manA+2][manB] != 5
				&&myArray2[manA+1][manB+1] == 0 && myArray2[manA+2][manB+2] != 4 && myArray2[manA+2][manB] != 5){
					myArray1[manA][manB] = 3;
					myArray1[manA+1][manB+1] = 112;
					theMan.place_A = manA + 1;
					theMan.place_B = manB + 1;
				}
			}
		}else if(theMan.condi == 1){
			if(theMan.direc == 1){
				if(directMark == 1){
					if(myArray1[manA-1][manB-1] != 3 || myArray1[manA][manB-2] == 5){
						return;
					}
					var moveResult = 0;
					if(myArray2[manA-1][manB-1] == 2){
						moveResult = moveTwo(manA-1,manB-1,directMark,2);
					}else if(myArray2[manA-1][manB-1] == 4){
						moveResult = moveFour(manA-1,manB-1,directMark,2);
					}else if(myArray2[manA-1][manB-1] == 5){
						moveResult = moveFive(manA-1,manB-1,directMark,2);
					}else if(myArray2[manA][manB-2] == 5){
						moveResult = moveFive(manA,manB-2,directMark,2);
					}
					if(moveResult == 1){
						myArray1[manA-1][manB-1] = 118;
						myArray1[manA][manB] = 3;
						theMan.place_A = theMan.place_A - 1;
						theMan.place_B = theMan.place_B - 1;
					}
				}else if(directMark == 2){
					if(myArray1[manA-1][manB+1] != 3 || myArray1[manA][manB+2] == 4
					|| myArray2[manA-1][manB+1] != 0 || myArray2[manA][manB+2] == 4){
						return;
					}
					var moveResult = 0;
					if(myArray2[manA-1][manB-1] == 2){
						moveResult = moveTwo(manA-1,manB-1,directMark,2);
					}else if(myArray2[manA-1][manB-1] == 4){
						moveResult = moveFour(manA-1,manB-1,directMark,2);
					}else if(myArray2[manA-1][manB-1] == 5){
						moveResult = moveFive(manA-1,manB-1,directMark,2);
					}else if(myArray2[manA][manB-2] == 5){
						moveResult = moveFive(manA,manB-2,directMark,2);
					}
					if(moveResult == 1){
						myArray1[manA-1][manB+1] = 118;
						myArray1[manA][manB] = 3;
						theMan.place_A = theMan.place_A - 1;
						theMan.place_B = theMan.place_B + 1;
					}
				}else if(directMark == 3){
					if(myArray1[manA+1][manB-1] != 3 || myArray1[manA+2][manB] == 4 || myArray1[manA+2][manB-2] == 5 
					|| myArray2[manA+1][manB-1] != 0 || myArray2[manA+2][manB] == 4 || myArray2[manA+2][manB-2] == 5){
						return;
					}
					var moveResult = 0;
					if(myArray2[manA-1][manB-1] == 2){
						moveResult = moveTwo(manA-1,manB-1,directMark,2);
					}else if(myArray2[manA-1][manB-1] == 4){
						moveResult = moveFour(manA-1,manB-1,directMark,2);
					}else if(myArray2[manA-1][manB-1] == 5){
						moveResult = moveFive(manA-1,manB-1,directMark,2);
					}else if(myArray2[manA][manB-2] == 5){
						moveResult = moveFive(manA,manB-2,directMark,2);
					}
					if(moveResult == 1){
						myArray1[manA+1][manB-1] = 118;
						myArray1[manA][manB] = 3;
						theMan.place_A = theMan.place_A + 1;
						theMan.place_B = theMan.place_B - 1;
					}
				}else if(directMark == 4){
					if(myArray1[manA+1][manB+1] != 3 || myArray1[manA+2][manB+2] == 4 || myArray1[manA+2][manB] == 5 
					|| myArray2[manA+1][manB+1] != 0 || myArray2[manA+2][manB+2] == 4 || myArray2[manA+2][manB] == 5){
						return;
					}
					var moveResult = 0;
					if(myArray2[manA-1][manB-1] == 2){
						moveResult = moveTwo(manA-1,manB-1,directMark,2);
					}else if(myArray2[manA-1][manB-1] == 4){
						moveResult = moveFour(manA-1,manB-1,directMark,2);
					}else if(myArray2[manA-1][manB-1] == 5){
						moveResult = moveFive(manA-1,manB-1,directMark,2);
					}else if(myArray2[manA][manB-2] == 5){
						moveResult = moveFive(manA,manB-2,directMark,2);
					}
					if(moveResult == 1){
						myArray1[manA+1][manB+1] = 118;
						myArray1[manA][manB] = 3;
						theMan.place_A = theMan.place_A + 1;
						theMan.place_B = theMan.place_B + 1;
					}
				}
			}else if(theMan.direc == 2){
				if(directMark == 1){
					if(myArray1[manA-1][manB-1]!=3 || myArray1[manA][manB-2]==5 
					|| myArray2[manA-1][manB-1]!=0 || myArray2[manA][manB-2]==5){
						return;
					}
					var moveResult = 0;
					if(myArray2[manA-1][manB+1] == 2){
						moveResult = moveTwo(manA-1,manB+1,directMark,2);
					}else if(myArray2[manA-1][manB+1] == 4){
						moveResult = moveFour(manA-1,manB+1,directMark,2);
					}else if(myArray2[manA-1][manB+1] == 5){
						moveResult = moveFive(manA-1,manB+1,directMark,2);
					}else if(myArray2[manA][manB+2] == 4){
						moveResult = moveFour(manA,manB+2,directMark,2);
					}
					if(moveResult == 1){
						myArray1[manA-1][manB-1] = 117;
						myArray1[manA][manB] = 3;
						theMan.place_A = theMan.place_A - 1;
						theMan.place_B = theMan.place_B - 1;
					}
				}else if(directMark == 2){
					if(myArray1[manA-1][manB+1]!=3 || myArray1[manA][manB+2]==4){
						return;
					}
					var moveResult = 0;
					if(myArray2[manA-1][manB+1] == 2){
						moveResult = moveTwo(manA-1,manB+1,directMark,2);
					}else if(myArray2[manA-1][manB+1] == 4){
						moveResult = moveFour(manA-1,manB+1,directMark,2);
					}else if(myArray2[manA-1][manB+1] == 5){
						moveResult = moveFive(manA-1,manB+1,directMark,2);
					}else if(myArray2[manA][manB+2] == 4){
						moveResult = moveFour(manA,manB+2,directMark,2);
					}
					if(moveResult == 1){
						myArray1[manA-1][manB+1] = 117;
						myArray1[manA][manB] = 3;
						theMan.place_A = theMan.place_A - 1;
						theMan.place_B = theMan.place_B + 1;
					}
				}else if(directMark == 3){
					
					if(myArray1[manA+1][manB-1]!=3 || myArray1[manA+2][manB]==4 || myArray1[manA+2][manB-2]==5
					|| myArray2[manA+1][manB-1]!=0 || myArray2[manA+2][manB]==4 || myArray2[manA+2][manB-2]==5){
						return;
					}
					var moveResult = 0;
					if(myArray2[manA-1][manB+1] == 2){
						moveResult = moveTwo(manA-1,manB+1,directMark,2);
					}else if(myArray2[manA-1][manB+1] == 4){
						moveResult = moveFour(manA-1,manB+1,directMark,2);
					}else if(myArray2[manA-1][manB+1] == 5){
						moveResult = moveFive(manA-1,manB+1,directMark,2);
					}else if(myArray2[manA][manB+2] == 4){
						moveResult = moveFour(manA,manB+2,directMark,2);
					}
					if(moveResult == 1){
						myArray1[manA+1][manB-1] = 117;
						myArray1[manA][manB] = 3;
						theMan.place_A = theMan.place_A + 1;
						theMan.place_B = theMan.place_B - 1;
					}
				}else if(directMark == 4){
					if(myArray1[manA+1][manB+1]!=3 || myArray1[manA+2][manB+2]==4 || myArray1[manA+2][manB]==5
					|| myArray2[manA+1][manB+1]!=0 || myArray2[manA+2][manB+2]==4 || myArray2[manA+2][manB]==5){
						return;
					}
					var moveResult = 0;
					if(myArray2[manA-1][manB+1] == 2){
						moveResult = moveTwo(manA-1,manB+1,directMark,2);
					}else if(myArray2[manA-1][manB+1] == 4){
						moveResult = moveFour(manA-1,manB+1,directMark,2);
					}else if(myArray2[manA-1][manB+1] == 5){
						moveResult = moveFive(manA-1,manB+1,directMark,2);
					}else if(myArray2[manA][manB+2] == 4){
						moveResult = moveFour(manA,manB+2,directMark,2);
					}
					if(moveResult == 1){
						myArray1[manA+1][manB+1] = 117;
						myArray1[manA][manB] = 3;
						theMan.place_A = theMan.place_A + 1;
						theMan.place_B = theMan.place_B + 1;
					}
				}
			}else if(theMan.direc == 3){
				if(directMark == 1){
					if(myArray1[manA-1][manB-1]!=3 || myArray1[manA][manB-2]==5
					|| myArray2[manA-1][manB-1]!=0 || myArray2[manA][manB-2]==5){
						return;
					}
					var moveResult = 0;
					if(myArray2[manA+1][manB-1] == 2){
						moveResult = moveTwo(manA+1,manB-1,directMark,2);
					}else if(myArray2[manA+1][manB-1] == 4){
						moveResult = moveFour(manA+1,manB-1,directMark,2);
					}else if(myArray2[manA+1][manB-1] == 5){
						moveResult = moveFive(manA+1,manB-1,directMark,2);
					}else if(myArray2[manA+2][manB] == 4){
						moveResult = moveFour(manA+2,manB,directMark,2);
					}else if(myArray2[manA+2][manB-2] == 5){
						moveResult = moveFive(manA+2,manB-2,directMark,2);
					}
					if(moveResult == 1){
						myArray1[manA-1][manB-1] = 115;
						myArray1[manA][manB] = 3;
						theMan.place_A = theMan.place_A - 1;
						theMan.place_B = theMan.place_B - 1;
					}
				}else if(directMark == 2){
					if(myArray1[manA-1][manB+1]!=3 || myArray1[manA][manB+2]==4
					|| myArray2[manA-1][manB+1]!=0 || myArray2[manA][manB+2]==4){
						return;
					}
					var moveResult = 0;
					if(myArray2[manA+1][manB-1] == 2){
						moveResult = moveTwo(manA+1,manB-1,directMark,2);
					}else if(myArray2[manA+1][manB-1] == 4){
						moveResult = moveFour(manA+1,manB-1,directMark,2);
					}else if(myArray2[manA+1][manB-1] == 5){
						moveResult = moveFive(manA+1,manB-1,directMark,2);
					}else if(myArray2[manA+2][manB] == 4){
						moveResult = moveFour(manA+2,manB,directMark,2);
					}else if(myArray2[manA+2][manB-2] == 5){
						moveResult = moveFive(manA+2,manB-2,directMark,2);
					}
					if(moveResult == 1){
						myArray1[manA-1][manB+1] = 115;
						myArray1[manA][manB] = 3;
						theMan.place_A = theMan.place_A - 1;
						theMan.place_B = theMan.place_B + 1;
					}
				}else if(directMark == 3){
					if(myArray1[manA+1][manB-1]!=3 || myArray1[manA+2][manB]==4 || myArray1[manA+2][manB-2]==5){
						return;
					}
					var moveResult = 0;
					if(myArray2[manA+1][manB-1] == 2){
						moveResult = moveTwo(manA+1,manB-1,directMark,2);
					}else if(myArray2[manA+1][manB-1] == 4){
						moveResult = moveFour(manA+1,manB-1,directMark,2);
					}else if(myArray2[manA+1][manB-1] == 5){
						moveResult = moveFive(manA+1,manB-1,directMark,2);
					}else if(myArray2[manA+2][manB] == 4){
						moveResult = moveFour(manA+2,manB,directMark,2);
					}else if(myArray2[manA+2][manB-2] == 5){
						moveResult = moveFive(manA+2,manB-2,directMark,2);
					}
					if(moveResult == 1){
						myArray1[manA+1][manB-1] = 115;
						myArray1[manA][manB] = 3;
						theMan.place_A = theMan.place_A + 1;
						theMan.place_B = theMan.place_B - 1;
					}
				}else if(directMark == 4){
					if(myArray1[manA+1][manB+1]!=3 || myArray1[manA+2][manB+2]==4 || myArray1[manA+2][manB]==5
					|| myArray2[manA+1][manB+1]!=0 || myArray2[manA+2][manB+2]==4 || myArray2[manA+2][manB]==5){
						return;
					}
					var moveResult = 0;
					if(myArray2[manA+1][manB-1] == 2){
						moveResult = moveTwo(manA+1,manB-1,directMark,2);
					}else if(myArray2[manA+1][manB-1] == 4){
						moveResult = moveFour(manA+1,manB-1,directMark,2);
					}else if(myArray2[manA+1][manB-1] == 5){
						moveResult = moveFive(manA+1,manB-1,directMark,2);
					}else if(myArray2[manA+2][manB] == 4){
						moveResult = moveFour(manA+2,manB,directMark,2);
					}else if(myArray2[manA+2][manB-2] == 5){
						moveResult = moveFive(manA+2,manB-2,directMark,2);
					}
					if(moveResult == 1){
						myArray1[manA+1][manB+1] = 115;
						myArray1[manA][manB] = 3;
						theMan.place_A = theMan.place_A + 1;
						theMan.place_B = theMan.place_B + 1;
					}
				}
			}else if(theMan.direc == 4){
				if(directMark == 1){
					if(myArray1[manA-1][manB-1]!=3 || myArray1[manA][manB-2]==5
					|| myArray2[manA-1][manB-1]!=0 || myArray2[manA][manB-2]==5){
						return;
					}
					var moveResult = 0;
					if(myArray2[manA+1][manB+1] == 2){
						moveResult = moveTwo(manA+1,manB+1,directMark,2);
					}else if(myArray2[manA+1][manB+1] == 4){
						moveResult = moveFour(manA+1,manB+1,directMark,2);
					}else if(myArray2[manA+1][manB+1] == 5){
						moveResult = moveFive(manA+1,manB+1,directMark,2);
					}else if(myArray2[manA+2][manB+2] == 4){
						moveResult = moveFour(manA+2,manB+2,directMark,2);
					}else if(myArray2[manA+2][manB] == 5){
						moveResult = moveFive(manA+2,manB,directMark,2);
					}
					if(moveResult == 1){
						myArray1[manA-1][manB-1] = 116;
						myArray1[manA][manB] = 3;
						theMan.place_A = theMan.place_A - 1;
						theMan.place_B = theMan.place_B - 1;
					}
				}else if(directMark == 2){
					if(myArray1[manA-1][manB+1]!=3 || myArray1[manA][manB+2]==4
					|| myArray2[manA-1][manB+1]!=0 || myArray2[manA][manB+2]==4){
						return;
					}
					var moveResult = 0;
					if(myArray2[manA+1][manB+1] == 2){
						moveResult = moveTwo(manA+1,manB+1,directMark,2);
					}else if(myArray2[manA+1][manB+1] == 4){
						moveResult = moveFour(manA+1,manB+1,directMark,2);
					}else if(myArray2[manA+1][manB+1] == 5){
						moveResult = moveFive(manA+1,manB+1,directMark,2);
					}else if(myArray2[manA+2][manB+2] == 4){
						moveResult = moveFour(manA+2,manB+2,directMark,2);
					}else if(myArray2[manA+2][manB] == 5){
						moveResult = moveFive(manA+2,manB,directMark,2);
					}
					if(moveResult == 1){
						myArray1[manA-1][manB+1] = 116;
						myArray1[manA][manB] = 3;
						theMan.place_A = theMan.place_A - 1;
						theMan.place_B = theMan.place_B + 1;
					}
				}else if(directMark == 3){
					if(myArray1[manA+1][manB-1]!=3 || myArray1[manA+2][manB]==4 || myArray1[manA+2][manB-2]==5
					|| myArray2[manA+1][manB-1]!=0 || myArray2[manA+2][manB]==4 || myArray2[manA+2][manB-2]==5){
						return;
					}
					var moveResult = 0;
					if(myArray2[manA+1][manB+1] == 2){
						moveResult = moveTwo(manA+1,manB+1,directMark,2);
					}else if(myArray2[manA+1][manB+1] == 4){
						moveResult = moveFour(manA+1,manB+1,directMark,2);
					}else if(myArray2[manA+1][manB+1] == 5){
						moveResult = moveFive(manA+1,manB+1,directMark,2);
					}else if(myArray2[manA+2][manB+2] == 4){
						moveResult = moveFour(manA+2,manB+2,directMark,2);
					}else if(myArray2[manA+2][manB] == 5){
						moveResult = moveFive(manA+2,manB,directMark,2);
					}
					if(moveResult == 1){
						myArray1[manA+1][manB-1] = 116;
						myArray1[manA][manB] = 3;
						theMan.place_A = theMan.place_A + 1;
						theMan.place_B = theMan.place_B - 1;
					}
				}else if(directMark == 4){
					if(myArray1[manA+1][manB+1]!=3 || myArray1[manA+2][manB+2]==4 || myArray1[manA+2][manB]==5){
						return;
					}
					var moveResult = 0;
					if(myArray2[manA+1][manB+1] == 2){
						moveResult = moveTwo(manA+1,manB+1,directMark,2);
					}else if(myArray2[manA+1][manB+1] == 4){
						moveResult = moveFour(manA+1,manB+1,directMark,2);
					}else if(myArray2[manA+1][manB+1] == 5){
						moveResult = moveFive(manA+1,manB+1,directMark,2);
					}else if(myArray2[manA+2][manB+2] == 4){
						moveResult = moveFour(manA+2,manB+2,directMark,2);
					}else if(myArray2[manA+2][manB] == 5){
						moveResult = moveFive(manA+2,manB,directMark,2);
					}
					if(moveResult == 1){
						myArray1[manA+1][manB+1] = 116;
						myArray1[manA][manB] = 3;
						theMan.place_A = theMan.place_A + 1;
						theMan.place_B = theMan.place_B + 1;
					}
				}
			}
		}
	}
	
	
	//
	putMat(myArray1,myArray2);
	//间隔时间
	setTimeout(function(){ gravity(myArray1,myArray2);},300);
}





//坐标A,坐标B,方向（1，2,3,4）,stairs 1,2
function moveTwo(boxA,boxB,line,stairs){
	if(line == 1){
		if(stairs == 1){
			if(myArray1[boxA - 1][boxB - 1] == 3 || myArray1[boxA - 1][boxB - 1] > 10){
				if(myArray1[boxA][boxB - 2] != 5){
					myArray1[boxA - 1][boxB - 1] = 2;
					myArray1[boxA][boxB] = 3;
					return 1;//移动成功
				}
			}
		}else if(stairs == 2){
			if(myArray1[boxA - 1][boxB - 1] != 0 && myArray2[boxA - 1][boxB - 1] == 0){
				if(myArray2[boxA][boxB - 2] != 5){
					myArray2[boxA - 1][boxB - 1] = 2;
					myArray2[boxA][boxB] = 0;
					return 1;//移动成功
				}
			}
		}
	}else if(line == 2){
		if(stairs == 1){
			if(myArray1[boxA - 1][boxB + 1] == 3 || myArray1[boxA - 1][boxB + 1] > 10){
				if(myArray1[boxA][boxB + 2] != 4){
					myArray1[boxA - 1][boxB + 1] = 2;
					myArray1[boxA][boxB] = 3;
					return 1;//移动成功
				}
			}
		}else if(stairs == 2){
			if(myArray1[boxA - 1][boxB + 1] != 0 && myArray2[boxA - 1][boxB + 1] == 0){
				if(myArray2[boxA][boxB + 2] != 4){
					myArray2[boxA - 1][boxB + 1] = 2;
					myArray2[boxA][boxB] = 0;
					return 1;//移动成功
				}
			}
		}
	}else if(line == 3){
		if(stairs == 1){
			if(myArray1[boxA + 1][boxB - 1] == 3 || myArray1[boxA + 1][boxB - 1] > 10){
				if(myArray1[boxA + 2][boxB] != 4 && myArray1[boxA + 2][boxB - 2] != 5){
					myArray1[boxA + 1][boxB - 1] = 2;
					myArray1[boxA][boxB] = 3;
					return 1;//移动成功
				}
			}
		}else if(stairs == 2){
			if(myArray1[boxA + 1][boxB - 1] != 0 && myArray2[boxA + 1][boxB - 1] == 0){
				if(myArray2[boxA + 2][boxB] != 4 && myArray2[boxA + 2][boxB - 2] != 5){
					myArray2[boxA + 1][boxB - 1] = 2;
					myArray2[boxA][boxB] = 0;
					return 1;//移动成功
				}
			}
		}
	}else if(line == 4){
		if(stairs == 1){
			if(myArray1[boxA + 1][boxB + 1] == 3 || myArray1[boxA + 1][boxB + 1] > 10){
				if(myArray1[boxA + 2][boxB] != 5 && myArray1[boxA + 2][boxB + 2] != 4){
					myArray1[boxA + 1][boxB + 1] = 2;
					myArray1[boxA][boxB] = 3;
					return 1;//移动成功
				}
			}
		}else if(stairs == 2){
			if(myArray1[boxA + 1][boxB + 1] != 0 && myArray2[boxA + 1][boxB + 1] == 0){
				if(myArray2[boxA + 2][boxB] != 5 && myArray2[boxA + 2][boxB + 2] != 4){
					myArray2[boxA + 1][boxB + 1] = 2;
					myArray2[boxA][boxB] = 0;
					return 1;//移动成功
				}
			}
		}
	}
	return 0;//移动失败
}

function moveFour(boxA,boxB,line,stairs){
	if(line == 1){
		if(stairs == 1){
			if(myArray1[boxA - 2][boxB - 2] == 3 || myArray1[boxA - 2][boxB - 2] > 10){
				myArray1[boxA - 1][boxB - 1] = 4;
				myArray1[boxA][boxB] = 3;
				return 1;
			}
		}else if(stairs == 2){
			if(myArray1[boxA - 2][boxB - 2] != 0 && myArray2[boxA - 2][boxB - 2] == 0){
				myArray2[boxA - 1][boxB - 1] = 4;
				myArray2[boxA][boxB] = 0;
				return 1;
			}
		}
	}else if(line == 2){
		if(stairs == 1){
			if((myArray1[boxA - 1][boxB + 1] == 3 || myArray1[boxA - 1][boxB + 1] > 10) 
			&& (myArray1[boxA - 2][boxB] == 3 || myArray1[boxA - 2][boxB] > 10)){
				myArray1[boxA - 1][boxB + 1] = 4;
				myArray1[boxA][boxB] = 3;
				return 1;
			}
		}else if(stairs == 2){
			if((myArray1[boxA - 1][boxB + 1] != 0 && myArray2[boxA - 1][boxB + 1] == 0) 
			&& (myArray1[boxA - 2][boxB] != 0 && myArray2[boxA - 2][boxB] == 0)){
				myArray2[boxA - 1][boxB + 1] = 4;
				myArray2[boxA][boxB] = 0;
				return 1;
			}
		}
	}else if(line == 3){
		if(stairs == 1){
			if((myArray1[boxA + 1][boxB - 1] == 3 || myArray1[boxA + 1][boxB - 1] > 10) 
			&& (myArray1[boxA][boxB - 2] == 3 || myArray1[boxA][boxB - 2] > 10)){
				myArray1[boxA + 1][boxB - 1] = 4;
				myArray1[boxA][boxB] = 3;
				return 1;
			}
		}else if(stairs == 2){
			if((myArray1[boxA + 1][boxB - 1] != 0 && myArray2[boxA + 1][boxB - 1] == 0) 
			&& (myArray1[boxA][boxB - 2] != 0 && myArray2[boxA][boxB - 2] == 0)){
				myArray2[boxA + 1][boxB - 1] = 4;
				myArray2[boxA][boxB] = 0;
				return 1;
			}
		}
	}else if(line == 4){
		if(stairs == 1){
			if(myArray1[boxA + 1][boxB + 1] == 3 || myArray1[boxA + 1][boxB + 1] > 10){
				myArray1[boxA + 1][boxB + 1] = 4;
				myArray1[boxA][boxB] = 3;
				return 1;
			}
		}else if(stairs == 2){
			if(myArray1[boxA + 1][boxB + 1] != 0 && myArray2[boxA + 1][boxB + 1] == 0){
				myArray2[boxA + 1][boxB + 1] = 4;
				myArray2[boxA][boxB] = 0;
				return 1;
			}
		}
	}
	
	return 0;
}

function moveFive(boxA,boxB,line,stairs){
	if(line == 1){
		if(stairs == 1){
			if((myArray1[boxA - 1][boxB - 1] == 3 || myArray1[boxA - 1][boxB - 1] > 10)
			 &&(myArray1[boxA - 2][boxB] == 3 || myArray1[boxA - 2][boxB] > 10)){
				myArray1[boxA - 1][boxB - 1] = 5;
				myArray1[boxA][boxB] = 3;
				return 1;
			}
		}else if(stairs == 2){
			if(myArray1[boxA - 1][boxB - 1] != 0 && myArray2[boxA - 1][boxB - 1] == 0 
			&&myArray1[boxA - 2][boxB] !=0 && myArray2[boxA - 2][boxB] == 0){
				myArray2[boxA - 1][boxB - 1] = 5;
				myArray2[boxA][boxB] = 0;
				return 1;
			}
		}
	}else if(line == 2){
		if(stairs == 1){
			if(myArray1[boxA - 2][boxB + 2] == 3 || myArray1[boxA - 2][boxB + 2] > 10){
				myArray1[boxA - 1][boxB + 1] = 5;
				myArray1[boxA][boxB] = 3;
				return 1;
			}
		}else if(stairs == 2){
			if(myArray1[boxA - 2][boxB + 2] != 0 && myArray2[boxA - 2][boxB + 2] == 0){
				myArray2[boxA - 1][boxB + 1] = 5;
				myArray2[boxA][boxB] = 0;
				return 1;
			}
		}
	}else if(line == 3){
		if(stairs == 1){
			if(myArray1[boxA + 1][boxB - 1] == 3 || myArray1[boxA + 1][boxB - 1] > 10){
				myArray1[boxA + 1][boxB - 1] = 5;
				myArray1[boxA][boxB] = 3;
				return 1;
			}
		}else if(stairs == 2){
			if(myArray1[boxA + 1][boxB - 1] != 0 && myArray2[boxA + 1][boxB - 1] == 0){
				myArray2[boxA + 1][boxB - 1] = 5;
				myArray2[boxA][boxB] = 0;
				return 1;
			}
		}
	}else if(line == 4){
		if(stairs == 1){
			if((myArray1[boxA + 1][boxB + 1] == 3 || myArray1[boxA + 1][boxB + 1] > 10)
			&&(myArray1[boxA][boxB + 2] == 3 || myArray1[boxA][boxB + 2] > 10)){
				myArray1[boxA + 1][boxB + 1] = 5;
				myArray1[boxA][boxB] = 3;
				return 1;
			}
		}else if(stairs == 2){
			if(myArray1[boxA + 1][boxB + 1] != 0 && myArray2[boxA + 1][boxB + 1] == 0
			&&myArray1[boxA][boxB + 2] != 0&& myArray2[boxA][boxB + 2] == 0){
				myArray2[boxA + 1][boxB + 1] = 5;
				myArray2[boxA][boxB] = 0;
				return 1;
			}
		}
	}
	
	return 0;
}