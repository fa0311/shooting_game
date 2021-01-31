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
    }
}

let cam = new camera();
let view = {
    "background": [],
    "player": [],
    "ball": []
};

new player().main_player().add();

/*メインループ開始 */
setTimeout(new view_canvas, config.view.interval);