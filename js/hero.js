'use strict'
var LASER_SPEED = 80;
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
    if (gGame.isOn) {
        var nextLocation = getNextLocation(ev);
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

}
function shooting() {
    if (gIsLightingShoot) {
        LASER_SPEED = 40;
        LASER = '⚡';
    } else {
        LASER_SPEED = 80;
        LASER = '⤊';
    }
    gHero.isShoot = true;
    gLaser.pos.i = gHero.pos.i - 1;
    gLaser.pos.j = gHero.pos.j;
    //Update fisrt laser position
    gBoard[gLaser.pos.i][gLaser.pos.i].gameObject = LASER;
    updateCell(gLaser.pos, LASER);
    //Starts Laser Interval
    gLaserInterval = setInterval(blinkLaser, LASER_SPEED, gLaser.pos);

}
function shoot(ev) {
    switch (ev.key) {
        case ' ':
            if (!gHero.isShoot) shooting();
            break;
        case 'n':
            if (gHero.isShoot) blowThemUp();
            break;
        case 'x': if (!gHero.isShoot) laserShoot();

    }
}

function laserShoot() {
    gLightingShots--;
    var str = '';
    for (var i = 0; i < gLightingShots; i++) {
        str += '⚡';
    }
    document.querySelector('.lighting-shots span').innerHTML = str;
    if (gLightingShots > 0) {
        gIsLightingShoot = true;
    }
    if (!gHero.isShoot && gIsLightingShoot) shooting();
    if (gLightingShots === 0) {
        gIsLightingShoot = false;
        console.log('no laser left');
        return;
    }
}

function blowThemUp() {
    blowUpNegs(gLaser.pos.i, gLaser.pos.j, gBoard);
}

function blinkLaser(pos) {
    gHero.isShoot = true;

    if (pos.i === 0) {
        updateCell(pos, '');
        clearShootAndInterval();
        return;
    }

    var nextCell = gBoard[pos.i - 1][pos.j];
    if (nextCell.gameObject === ALIEN) {
        updateCell(pos, '');
        clearShootAndInterval();
        handleAlienHit(pos);
        console.log(gBoard);
        return;
    }

    if (nextCell.gameObject === SPACECANDY) {
        console.log('hi');
        gScore += 50;
        document.querySelector('h2 span').innerHTML = gScore;
        ALIEN_SPEED = Infinity;
        setTimeout(function () { ALIEN_SPEED = 500 }, 3000);
    }
    //Update Last cell
    updateCell(pos, '');
    //Update Nen cell
    pos.i--;
    updateCell(pos, LASER);

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
