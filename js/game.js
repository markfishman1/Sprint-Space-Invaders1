'use strict'


const BOARD_SIZE = 14;
const ALIENS_ROW_LENGTH = 9;
const ALIENS_ROW_COUNT = 3;
const TOTAL_ALIENS = ALIENS_ROW_COUNT * ALIENS_ROW_LENGTH;
const HERO = '🤖';
const ALIEN = '👽';
const SKY = 'SKY';
const EARTH = 'EARTH';
const SPACECANDY = '🍪';
const DEAD = '';
const EMPTY = '';
var LASER = '⤊';

var gIsLightingShoot;
var gLightingShots;
var gScore;
var gSpaceCandyInterval;
var gLaserInterval;
var gBoard;
var gGame =
{
    isOn: false,
    aliensCount: 0
}


function init() {
    gLightingShots = 3;
    gScore = 0;
    gBoard = createBoard();
    createHero(gBoard);
    createAliens(gBoard);
    renderBoard(gBoard);
    document.querySelector('h2 span').innerText = gScore;
    gSpaceCandyInterval = setInterval(addSpaceCandy, 8000);
    startGame();
}

function startGame() {
    gGame.isOn = true;
    gIsAlienFreeze = false;
    moveAliens();

}

function createBoard() {
    var board = []
    for (var i = 0; i < BOARD_SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < BOARD_SIZE; j++) {
            if (i !== BOARD_SIZE - 1) {
                board[i][j] = createCell();
            } else board[i][j] = {
                type: EARTH,
                gameObject: ''
            }

        }
    }
    return board
}

function renderBoard(board) {
    var strHTML = '<table><tbody>';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            var className = 'cell cell' + i + '-' + j;
            if (cell.type === SKY) className += ' sky';
            if (cell.type === EARTH) className += ' earth';
            strHTML += '<td class="' + className + '"> ' + cell.gameObject + ' </td>'
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector('.board-container');
    elContainer.innerHTML = strHTML;
}

function updateCell(pos, gameObject = null) {
    gBoard[pos.i][pos.j].gameObject = gameObject;
    var elCell = getElCell(pos);
    elCell.innerHTML = gameObject;
}

function endGame(winOrLose) {
    clearIntervals();
    gGame.isOn = false;
    var endGameAnouncment = (winOrLose === 'win') ? 'GG You Have Saved The Earth!😎' : 'Alien Have Invaded Planet Earth,Youve Lost 😫';
    openModal();
    document.querySelector('.modal span').innerHTML = endGameAnouncment;
}


function openModal() {
    document.querySelector('.modal').style.display = 'block';

}
function closeModal() {
    document.querySelector('.modal').style.display = 'none';
}

function restartGame() {
    clearIntervals();
    init();
    closeModal();
}
function pauseGame() {
    if (gGame.isOn) {
        gGame.isOn = false
        document.querySelector('.pause-button').innerText = 'Start';
    } else {
        gGame.isOn = true;
        document.querySelector('.pause-button').innerText = 'Pause';
    }

}

function addSpaceCandy() {
    var emptyCells = getFirstRowEmptyCells(gBoard);
    var emptyCell = emptyCells[getRandomInt(0, emptyCells.length - 1)];
    updateCell(emptyCell, SPACECANDY);
    setTimeout(function () { updateCell(emptyCell, '') }, 5000);
}

function getFirstRowEmptyCells(board) {
    var emptyCells = []
    for (var j = 0; j < gBoard[0].length; j++) {
        if (!board[0][j].gameObject) emptyCells.push({ i: 0, j });
    }
    return emptyCells;
}

function clearIntervals() {
    clearInterval(gSpaceCandyInterval);
    clearInterval(gMoveLeftInterval)
    clearInterval(gMoveRightInterval)
}