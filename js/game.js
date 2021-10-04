'use strict'


const BOARD_SIZE = 14;
const ALIENS_ROW_LENGTH = 9
const ALIENS_ROW_COUNT = 3
const HERO = '♆';
const ALIEN = '👽';
const LASER = '⤊';
const SKY = 'SKY';
const EARTH = 'EARTH';


var gLaserInterval;
var gBoard;
var gGame =
{
    isOn: false,
    aliensCount: 0
}


function init() {
    gGame.isOn = true;
    gGame.aliensCount = 0;
    gBoard = createBoard();
    console.table(gBoard);
    createHero(gBoard);
    createAliens(gBoard);
    renderBoard(gBoard);
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
    var strHTML = '<table border="1"><tbody>';
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

function checkVictory() {
    var aliensCount = countAliens(gBoard);
    console.log('Aliens left:', aliensCount);
    if (aliensCount === 0) {
        gGame.isOn = false;
        openModal();
        document.querySelector('.modal span').innerHTML = 'GG You Have Saved The Earth!😎'
    }
}

function countAliens(board) {
    var aliensCount = 0;
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j].gameObject === ALIEN) {
                aliensCount++;
            }

        }
    }
    return aliensCount;
}

function openModal() {
    document.querySelector('.modal').style.display = 'block';

}
function closeModal() {
    document.querySelector('.modal').style.display = 'none';
}

function restartGame() {
    init()
    closeModal();
}