//Scale x to window, fraction input only
function percX(x) {
    return Math.floor(x * WIDTH);
}

//Scale y to window, fraction input only
function percY(y) {
    return Math.floor(y * HEIGHT);
}

grimBGLoaded = false;
let grimBG;
function drawGame() {
  if (!grimBGLoaded) {
        grimBG = new Image();
        grimBG.src = './assets/grim.png';
        grimBGLoaded = true;
    }
    if (grimBG.complete) {
        context.drawImage(grimBG, percX(0), percY(0));
    }
}
