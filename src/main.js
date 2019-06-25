import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';

var arrays = new Array(9);
for (var i = 0; i < 9; i++)
    arrays[i] = new Array(9);

for (var j = 0; j < 9; j++) {
  for (var k = 0; k < 9; k++) {
    arrays[j][k] = ["0"];
  }
}

var intx = 0;
var inty = 0;

function aSigh(x,y,z) {
  if (z.includes(x)) {
    intx = y;
  }
}

function bSigh(x,y,z) {
  if (z.includes(x)) {
    inty = y;
  }
}

function assignRow(squareId) {
  aSigh("a",0,squareId);
  aSigh("b",1,squareId);
  aSigh("c",2,squareId);
  aSigh("d",3,squareId);
  aSigh("e",4,squareId);
  aSigh("f",5,squareId);
  aSigh("g",6,squareId);
  aSigh("h",7,squareId);
  aSigh("i",8,squareId);
}

function assignCol(squareId) {
  bSigh("0",0,squareId);
  bSigh("1",1,squareId);
  bSigh("2",2,squareId);
  bSigh("3",3,squareId);
  bSigh("4",4,squareId);
  bSigh("5",5,squareId);
  bSigh("6",6,squareId);
  bSigh("7",7,squareId);
  bSigh("8",8,squareId);
}

function blockCheck(gridNum2,intx1,inty1,blockresult,minx,maxx,miny,maxy) {
  if (intx1 >= minx && intx1 <= maxx && inty1 >= miny && inty1 <= maxy) {
    return blockresult;
  } else {
    return gridNum2;
  }
}

function gridCheck(intX,intY,gridNum) {
  gridNum = blockCheck(gridNum,intX,intY,1,0,2,0,2);
  gridNum = blockCheck(gridNum,intX,intY,2,0,2,3,5);
  gridNum = blockCheck(gridNum,intX,intY,3,0,2,6,8);
  gridNum = blockCheck(gridNum,intX,intY,4,3,5,0,2);
  gridNum = blockCheck(gridNum,intX,intY,5,3,5,3,5);
  gridNum = blockCheck(gridNum,intX,intY,6,3,5,6,8);
  gridNum = blockCheck(gridNum,intX,intY,7,6,8,0,2);
  gridNum = blockCheck(gridNum,intX,intY,8,6,8,3,5);
  gridNum = blockCheck(gridNum,intX,intY,9,6,8,6,8);
  return gridNum;
}

function numCheckCol(intX,intY,playerInp,xflag){

  for (var i = 0; i <= 8; i++) {
    if (arrays[i][intY] === playerInp) {
      xflag++;
    }
  }
  return xflag;

}

function numCheckRow(intX,intY,playerInp,xflag){

  for (var i = 0; i <= 8; i++) {
    if (arrays[intX][i] === playerInp) {
      xflag++;
    }
  }
  return xflag;
}

function smallNumCheckCol(intX,intY,playerInp,xflag){
  var endX = intX + 2;
  var endY = intY + 2;
  for (var y = intX; y <= endX; y++) {
    for (var i = intY; i <= endY; i++) {
      if (arrays[y][i] === playerInp) {
        xflag++;
    }
  }
}
  return xflag;

}


function numCheckGrid(gridId,intX,intY,playerInp,xflag) {
  var gridStartx = 0;
  var gridStarty = 0;
  if(gridId === 1) {
    gridStartx = 0;
    gridStarty = 0;
  } else if(gridId === 2) {
    gridStartx = 0;
    gridStarty = 3;
  } else if(gridId === 3) {
    gridStartx = 0;
    gridStarty = 6;
  } else if(gridId === 4) {
    gridStartx = 3;
    gridStarty = 0;
  } else if(gridId === 5) {
    gridStartx = 3;
    gridStarty = 3;
  } else if(gridId === 6) {
    gridStartx = 3;
    gridStarty = 6;
  } else if(gridId === 7) {
    gridStartx = 6;
    gridStarty = 0;
  } else if(gridId === 8) {
    gridStartx = 6;
    gridStarty = 3;
  } else if(gridId === 9) {
    gridStartx = 6;
    gridStarty = 6;
  }
  return smallNumCheckCol(gridStartx,gridStarty,playerInp,xflag)
}


$(function(){

  $(".card").click(function() {
    var squareId = $(this).attr('id');
      assignRow(squareId);
      assignCol(squareId);
    var playerInput = parseInt(prompt("Enter number"));
    if (playerInput === 0) {
    } else {
    while (isNaN(playerInput) || playerInput < 1 || playerInput > 9) {
      playerInput = parseInt(prompt("Enter numbers 1-9 only"));
    }
  }
    var gridId = 0;
    gridId = gridCheck(intx,inty,gridId);

    var xflag = 0;
    xflag = numCheckCol(intx,inty,playerInput,xflag);
    xflag = numCheckRow(intx,inty,playerInput,xflag);
    xflag = numCheckGrid(gridId,intx,inty,playerInput,xflag);

    if (xflag === 0) {
      if (playerInput === 0) {
        arrays[intx][inty] = " ";
      } else {
      arrays[intx][inty] = playerInput;
    }
      document.getElementById(squareId).innerHTML = arrays[intx][inty];
    } else {
      alert("That number cannot be placed there");
    }







  });
});
