'use strict'
var ALIEN_SPEED = 1000;
var gIntervalAliens;
var gAliensTopRowIdx = 1;
var gAliensBottomRowIdx = 4;
var gIsAlienFreeze = true;

var gMoveRightInterval;
var gMoveLeftInterval;
var gMoveAliens;
var gGraveYard = [];

function createAliens(board) {
    for (var i = gAliensTopRowIdx; i < gAliensBottomRowIdx; i++) {
        for (var j = 3; j < BOARD_SIZE - 2; j++) {
            board[i][j].gameObject = ALIEN;
        }
    }
}

function handleAlienHit(pos) {
    gGame.aliensCount++;
    gScore += 10;
    if (gGame.aliensCount === TOTAL_ALIENS) {
        endGame('win')
    }
    updateCell({ i: pos.i - 1, j: pos.j }, DEAD);
    gGraveYard.push({ i: pos.i - 1, j: pos.j })
    document.querySelector('h2 span').innerHTML = gScore;

}

function checkFirstAlienPos(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            if (currCell.gameObject === ALIEN) {
                return { i, j };
            }
        }
    }
}

function checkFirstAlienPosFromRight(board) {

    var length = board.length - 1;

    for (var i = 0; i < board.length; i++) {
        for (var j = length; j > 0; j--) {
            var currCell = board[i][j];
            if (currCell.gameObject === ALIEN) {
                return { i, j };
            }
        }
    }
}

function shiftBoardRight(board) {
    if (gGame.isOn) {

        var firstAlienPos = checkFirstAlienPos(board);
        var iForLoop = firstAlienPos.i + ALIENS_ROW_COUNT;
        var jForLoop = firstAlienPos.j + ALIENS_ROW_LENGTH;

        for (var i = firstAlienPos.i; i < iForLoop; i++) {
            for (var j = firstAlienPos.j; j < jForLoop; j++) {
                updateCell({ i, j: j + 1 }, ALIEN);

                if (j === board.length - 2 && i === iForLoop - 1) {
                    clearInterval(gMoveRightInterval);
                    setTimeout(shiftBoardDown, ALIEN_SPEED, board);
                    setTimeout(function () { gMoveLeftInterval = setInterval(shiftBoardLeft, ALIEN_SPEED, board) }, ALIEN_SPEED);
                }
            }
            updateCell({ i: i, j: firstAlienPos.j }, '');
        }

        renderDeadAliensRight(gGraveYard);
    }

}

function renderDeadAliensRight(arr) {
    for (var i = 0; i < arr.length; i++) {
        var currCell = arr[i];
        currCell.j = currCell.j + 1;
        updateCell({ i: currCell.i, j: currCell.j }, DEAD);
    }
}


function shiftBoardLeft(board) {
    if (gGame.isOn) {
        var firstAlienPos = checkFirstAlienPosFromRight(board);
        // console.log(firstAlienPos);
        var iForLoop = firstAlienPos.i + ALIENS_ROW_COUNT;
        var jForLoop = firstAlienPos.j - ALIENS_ROW_LENGTH;

        for (var i = firstAlienPos.i; i < iForLoop; i++) {
            for (var j = firstAlienPos.j; j > jForLoop; j--) {
                updateCell({ i, j: j - 1 }, ALIEN);

                if (j <= 1 && i === iForLoop - 1) {
                    clearInterval(gMoveLeftInterval);
                    setTimeout(shiftBoardDown, ALIEN_SPEED, board);
                    setTimeout(moveAliens, ALIEN_SPEED);
                }
            }
            updateCell({ i: i, j: firstAlienPos.j }, '');
        }
        renderDeadAliensLeft(gGraveYard);
    }

}

function renderDeadAliensLeft(arr) {
    for (var i = 0; i < arr.length; i++) {
        var currCell = arr[i];
        currCell.j = currCell.j - 1;
        updateCell({ i: currCell.i, j: currCell.j }, DEAD);
    }
}

function shiftBoardDown(board) {
    if (gGame.isOn) {
        var firstAlienPos = checkFirstAlienPos(board);
        console.log(firstAlienPos);

        var iForLoop = firstAlienPos.i + ALIENS_ROW_COUNT;
        //מקור הבאג שהחייזרים קופצים בלשבים נמוכים למטה כמה שורות
        //JFORLOOP חייב להיות דינמי
        var jForLoop = firstAlienPos.j + ALIENS_ROW_LENGTH;

        for (var i = firstAlienPos.i; i < iForLoop; i++) {
            for (var j = firstAlienPos.j; j < jForLoop; j++) {
                updateCell({ i: i + 1, j }, ALIEN);
                updateCell({ i: firstAlienPos.i, j }, '');
                console.log(i);
                if (i === gBoard.length - 3) {
                    endGame('lose');
                }
            }
        }
        renderDeadAliensDown(gGraveYard);
    }
}

function renderDeadAliensDown(arr) {
    for (var i = 0; i < arr.length; i++) {
        var currCell = arr[i];
        currCell.i = currCell.i + 1;
        updateCell({ i: currCell.i, j: currCell.j }, DEAD);
    }
}


function moveAliens() {
    // gIsAlienFreeze = true;
    if (!gIsAlienFreeze) {
        gMoveRightInterval = setInterval(shiftBoardRight, ALIEN_SPEED, gBoard);
    }
}

function setIntervalLimited(callback, interval, x) {

    for (var i = 0; i < x; i++) {
        setTimeout(callback, i * interval);
        console.log('First ');
    }
    // setTimeout(shiftBoardDown, 2000, gBoard);

}