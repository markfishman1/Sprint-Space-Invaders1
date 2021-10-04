'use strict'
const LASER_SPEED = 80;
var gHero = {
    pos: { i: 12, j: 5 },
    isShoot: false
};

var gLaser = {
    pos: { i: 12, j: 5 }
};



function createHero(gBoard) {
    gBoard[gHero.pos.i][gHero.pos.j].gameObject = HERO;
}

function moveHero(ev) {

    var nextLocation = getNextLocation(ev);
    console.log(nextLocation);
    if (nextLocation.j > BOARD_SIZE - 1 || nextLocation.j < 0) return

    //Make last position empty
    gBoard[gHero.pos.i][gHero.pos.j].gameObject = '';
    updateCell(gHero.pos, '');
    //Update new position:
    //Model
    gHero.pos.j = nextLocation.j
    //Dom
    updateCell(gHero.pos, HERO);

}

function shoot(ev) {
    if (ev.code === 'Space' && !gHero.isShoot) {
        gHero.isShoot = true;
        gLaser.pos.i = gHero.pos.i - 1;
        gLaser.pos.j = gHero.pos.j;

        //Update fisrt laser position
        gBoard[gLaser.pos.i][gLaser.pos.i].gameObject = LASER;
        updateCell(gLaser.pos, LASER);
        //Starts Laser Interval
        gLaserInterval = setInterval(blinkLaser, LASER_SPEED, gLaser.pos);
    }
}

function blinkLaser(pos) {
    if (gLaser.pos.i < 1) {
        console.log('Out Of Border');
        clearShootAndInterval();
    }
    //Clear last position
    gBoard[gLaser.pos.i][gLaser.pos.i].gameObject = '';
    updateCell(pos, '');

    //Update new position
    gLaser.pos.i--;
    gBoard[gLaser.pos.i][gLaser.pos.i].gameObject = LASER;
    updateCell(pos, LASER);

    var nextCell = gBoard[gLaser.pos.i - 1][pos.j];
    var currCell = gBoard[gLaser.pos.i][pos.j]

    if (nextCell.gameObject === ALIEN) {
        console.log('alien');

        nextCell.gameObject = '';
        updateCell(pos, '');

        gLaser.pos.i--;
        currCell.gameObject = '';
        updateCell(pos, '');
        clearShootAndInterval();


        gGame.aliensCount++;
        document.querySelector('h2 span').innerHTML = gGame.aliensCount * 10;
        console.log(gGame.aliensCount);

    }
    checkVictory();

}

function clearShootAndInterval() {
    clearInterval(gLaserInterval);
    gHero.isShoot = false;
}

function getNextLocation(eventKeyboard) {

    var nextLocation = {
        j: gHero.pos.j,
    }
    switch (eventKeyboard.code) {

        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
    }
    return nextLocation;
}
