const canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d', { alpha: false });

WIDTH = window.innerWidth;
HEIGHT = window.innerHeight;
canvas.width = WIDTH;
canvas.height = HEIGHT;

var zero = document.timeline.currentTime;
const fps = 60;
const duration = 1000 / fps;
function gameLoop() {
    timestamp = document.timeline.currentTime;
    const frame = (timestamp - zero) / duration;

    if (frame > 1) {
        zero = timestamp;
        genFrame();
    }

    requestAnimationFrame(gameLoop);

}

borderX = 0;
borderY = 0;
function genFrame() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawGame();
    
    //testBounce();
}

function soundReady(readySound) {
    return readySound.readyState == 4;
}

function playSound(soundPlay) {
    if (soundReady(soundPlay)) {
        clone = soundPlay.cloneNode();
        clone.play();
    }

}

let iTestBounce;
let jTestBounce;
var rewindx = false;
var rewindy = false;
const speed = 1;
const scaleTestImage = 60;
let testImage;
let testSound;
testBounceLoaded = false;
function testBounce() {
    if (!testBounceLoaded) {
        testImage = new Image();
        testImage.src = 'app/assets/dvd-logo-png-7.png';
        testSound = new Audio("app/assets/sonic-spring.mp3");
        testBounceLoaded = true;
        iTestBounce = percX(0);
        jTestBounce = percY(0);
    }
    if (testImage.complete && soundReady(testSound)) {
        testImageScaledWidth = Math.floor(scaleTestImage);
        testImageScaledHeight = Math.floor(testImage.height / testImage.width * scaleTestImage);
        context.drawImage(testImage, iTestBounce, jTestBounce, testImageScaledWidth, testImageScaledHeight);
        if (rewindx) {
            iTestBounce -= speed;
        } else {
            iTestBounce += speed;
        }
        if (rewindy) {
            jTestBounce -= speed;
        } else {
            jTestBounce += speed;
        }

        if (iTestBounce > (percX(1) - testImageScaledWidth) && !rewindx) {
            rewindx = true;
            playSound(testSound);
        }
        if (iTestBounce < percX(0) && rewindx) {
            rewindx = false;
            playSound(testSound);
        }
        if (jTestBounce > (percY(1) - testImageScaledHeight) && !rewindy) {
            rewindy = true;
            playSound(testSound);
        }
        if (jTestBounce < percY(0) && rewindy) {
            rewindy = false;
            playSound(testSound);
        }
    }
}

gameLoop();
