/**
*1:方块
*2:玻璃方块
*3:地砖
*4:长玻璃方块,5
* 
* 1坐姿人物：11-18
* 2站姿人物：111-118（只允许出现一次）
* 
*/


//地图下层
function getArray1(theLevel){
	if(!theLevel){
		theLevel = 1;
	}
	var myArray1 = [
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,3,0,0,0,0,0],
		[0,0,0,0,3,0,3,0,0,0,0],
		[0,0,0,3,0,1,0,1,0,0,0],
		[0,0,2,0,3,0,11,0,3,0,0],
		[0,3,0,3,0,3,0,3,0,0,0],
		[0,0,3,0,3,0,3,0,0,0,0],
		[0,0,0,3,0,3,0,0,0,0,0],
		[0,0,0,0,3,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0]
	];
	var myArray2 = [
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,1,0,0],
		[0,0,0,0,0,0,0,1,0,0,0],
		[0,0,0,0,0,0,3,0,0,0,0],
		[0,0,0,0,0,3,0,2,0,0,0],
		[0,0,0,0,3,0,3,0,11,0,0],
		[0,0,0,3,0,3,0,3,0,0,0],
		[0,0,1,0,0,0,3,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0]
	];
	var myArray3 = [
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,1,0,0,0,0],
		[0,0,0,0,0,1,0,1,0,0,0],
		[0,0,0,0,3,0,1,0,1,0,0],
		[0,0,0,3,0,3,0,3,0,3,0],
		[0,0,1,0,11,0,3,0,3,0,0],
		[0,1,0,2,0,3,0,0,0,0,0],
		[0,0,0,0,3,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0]
	];
	var myArray4 = [
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,2,0,0,0,2,0,0,0],
		[0,0,2,0,2,0,2,0,2,0,0],
		[0,2,0,3,0,2,0,3,0,2,0],
		[2,0,3,0,3,0,3,0,3,0,2],
		[0,2,0,3,0,11,0,3,0,2,0],
		[0,0,2,0,3,0,3,0,2,0,0],
		[0,0,0,2,0,3,0,2,0,0,0],
		[0,0,0,0,2,0,2,0,0,0,0],
		[0,0,0,0,0,2,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0]
	];
	if(theLevel == 1){
		return myArray1;
	}else if(theLevel == 2){
		return myArray2;
	}else if(theLevel == 3){
		return myArray3;
	}else if(theLevel == 4){
		return myArray4;
	}
}

//地图上层
function getArray2(theLevel){
	if(!theLevel){
		theLevel = 1;
	}
	var myUpArray1 = [
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,4,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
	];
	var myUpArray2 = [
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,5,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0]
	];
	var myUpArray3 = [
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,2,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,5,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0]
	];
	var myUpArray4 = [
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0]
	];
	
	if(theLevel == 1){
		return myUpArray1;
	}else if(theLevel == 2){
		return myUpArray2;
	}else if(theLevel == 3){
		return myUpArray3;
	}else if(theLevel == 4){
		return myUpArray4;
	}
}

function getManPlace(theLevel){
	var myArray1 = getArray1(theLevel);
	for (var a = 0; a < myArray1.length; a++) {
		var inArray = myArray1[a];
		for (var b = 0; b < inArray.length; b++) {
			if(inArray[b]>10){
				return a + "_" + b;
			}
		}
	}
}

function getMandirect(theLevel){
	var myArray1 = getArray1(theLevel);
	for (var a = 0; a < myArray1.length; a++) {
		var inArray = myArray1[a];
		for (var b = 0; b < inArray.length; b++) {
			if(inArray[b]>10){
				return myArray1[a][b];
			}
		}
	}
}