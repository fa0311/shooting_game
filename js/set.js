const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


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
    "background": [],
    "barrage": [],
    "player": [],
    "boss": [],
};

new boss().main_boss().add();
new player().main_player().add();

/*メインループ開始 */
setTimeout(new view_canvas, config.view.interval);