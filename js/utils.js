'use strict'

function getRandomIntInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function createCell(gameObject = '') {
    return {
        type: SKY,
        gameObject: gameObject
    }
}
function getElCell(pos) {
    return document.querySelector(`.cell${pos.i}-${pos.j}`);
}
