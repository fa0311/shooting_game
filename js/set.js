let view;
let cam;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.font = "15px 'ＭＳ ゴシック'";
ctx.save();

addEventListener("keydown", keydownfunc);
addEventListener("keyup", keyupfunc);

let keydata = new key();

let config = {
    "mapsize": new xy(1200, 800),
    "view": {
        "interval": 30
    },
    "player": {
        "speed": [1.41421356237 * 3, 1 * 3]
    },
    "debug": false
}
let img = {
    "boss": {
        "default": [],
    },
    "player": {
        "default": [],
        "left": [],
    },
};
img.boss.default[0] = new Image();
img.boss.default[0].src = "./img/boss.png";
for (let i = 0; i < 9; i++) {
    img.player.default[i] = new Image();
    img.player.default[i].src = "./img/player_1/angel" + (i + 1) + ".png";
}
for (let i = 0; i < 9; i++) {
    img.player.left[i] = new Image();
    img.player.left[i].src = "./img/player_1/angel_left" + (i + 1) + ".png";
}