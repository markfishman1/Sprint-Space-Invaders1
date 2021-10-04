'use strict'
const ALIEN_SPEED = 500;
var gIntervalAliens;
var gAliensTopRowIdx = 2;
var gAliensBottomRowIdx = 5;
var gIsAlienFreeze = true;

var gMoveRightInterval;
var gMoveLeftInterval;

function createAliens(board) {
    for (var i = gAliensTopRowIdx; i < gAliensBottomRowIdx; i++) {
        for (var j = 3; j < BOARD_SIZE - 2; j++) {
            board[i][j].gameObject = ALIEN;
        }
    }
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
    for (var i = board.length; i > 0; i--) {
        for (var j = board[0].length; j > 0; j--) {
            var currCell = board[i][j];
            if (currCell.gameObject === ALIEN) {
                return { i, j };
            }
        }
    }

}
function shiftBoardRight(board) {

    var firstAlienPos = checkFirstAlienPos(gBoard);
    var iForLoop = firstAlienPos.i + ALIENS_ROW_COUNT;
    var jForLoop = firstAlienPos.j + ALIENS_ROW_LENGTH;

    for (var i = firstAlienPos.i; i < iForLoop; i++) {
        for (var j = firstAlienPos.j; j < jForLoop; j++) {
            var currCell = board[i][j];
            if (currCell.gameObject === ALIEN) {
                j++;
                updateCell({ i, j }, ALIEN);
            }
            if (j === gBoard.length - 1) {
                clearInterval(gMoveRightInterval);
                shiftBoardDown(gBoard);
                gMoveRightInterval = null;
            }
        }
        updateCell({ i: i, j: firstAlienPos.j }, '');
    }
    console.log(gMoveRightInterval);

}

function shiftBoardLeft(board) {
    var firstAlienPos = checkFirstAlienPosFromRight(gBoard);
    console.log(firstAlienPos);
    var iForLoop = firstAlienPos.i + ALIENS_ROW_COUNT;
    var jForLoop = firstAlienPos.j + ALIENS_ROW_LENGTH;


}

function shiftBoardDown(board) {
    var firstAlienPos = checkFirstAlienPos(gBoard);

    var iForLoop = firstAlienPos.i + ALIENS_ROW_COUNT;
    var jForLoop = firstAlienPos.j + ALIENS_ROW_LENGTH;

    for (var i = firstAlienPos.i; i < iForLoop; i++) {
        i++
        for (var j = firstAlienPos.j; j < jForLoop; j++) {
            console.log('hi');
            updateCell({ i, j }, ALIEN);
            updateCell({ i: firstAlienPos.i, j }, '');
        }
    }
    gMoveLeftInterval = setInterval(shiftBoardLeft, 1000, gBoard);
}

function moveAliens() {
    gMoveRightInterval = setInterval(shiftBoardRight, 1000, gBoard)
}