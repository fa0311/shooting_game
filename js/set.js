const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.font = "15px 'ＭＳ ゴシック'";

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

let cam = new camera();
let view = {
    "grid": [],
    "barrage": [],
    "own_barrage": [],
    "player": [],
    "boss": [],
    "data": [],
};

new boss().main().add();
new player().main().add();
new data().boss_hp().add();

/*メインループ開始 */
setTimeout(
    function() {
        new view_canvas
    }, config.view.interval);