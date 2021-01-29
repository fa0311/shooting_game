const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class key {
    constructor() {
        this.up = false;
        this.down = false;
        this.right = false;
        this.left = false;
    }
}
class xy {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}
class camera {
    constructor() {
        this.xy = new xy((config.mapsize.x - canvas.width) / 2, (config.mapsize.y - canvas.height) / 2);
    }
}
class box {
    constructor(x = 0, y = 0, view = function(ctx, x, y) {
        ctx.strokeRect(x, y, 1, 1);
    }) {
        this.xy = new xy(x, y);
        this.view = view;
    }
}

addEventListener("keydown", keydownfunc);
addEventListener("keyup", keyupfunc);

function keyupfunc(event) {
    if (event.keyCode == 87) {
        keydata.up = false;
    }
    if (event.keyCode == 65) {
        keydata.left = false;
    }
    if (event.keyCode == 83) {
        keydata.down = false;
    }
    if (event.keyCode == 68) {
        keydata.right = false;
    }
}

function keydownfunc(event) {
    if (event.keyCode == 87) {
        keydata.up = true;
    }
    if (event.keyCode == 65) {
        keydata.left = true;
    }
    if (event.keyCode == 83) {
        keydata.down = true;
    }
    if (event.keyCode == 68) {
        keydata.right = true;
    }
}


let keydata = new key();

let config = {
    "mapsize": new xy(1200, 800)
}

var cam = new camera();
var view = {
    "background": [],
    "player": []
};
for (var i = 0; i < 500; i++) {
    x = Math.floor(Math.random() * 100);
    y = Math.floor(Math.random() * 100);
    x = 20;
    y = 20;
    rand_box = new box(Math.floor(Math.random() * 1200), Math.floor(Math.random() * 800), function(ctx, x, y) {
        let view_x = this.xy.x - cam.xy.x;
        let view_y = this.xy.y - cam.xy.y;
        if (view_x + this.size.x < 0 || view_x > canvas.width || view_y + this.size.y < 0 || view_y > canvas.height)
            return;
        ctx.strokeRect(x, y, this.size.x, this.size.y);
    });
    rand_box.size = new xy(x, y)
    view.background.push(rand_box);
}

let player = new box(config.mapsize.x / 2 - 5, config.mapsize.y / 2 - 5, function(ctx, x, y) {
    let cy = this.xy.y;
    let cx = this.xy.x;
    if (new move().player_up() && new move().player_left()) {
        this.xy.y -= 7;
        this.xy.x -= 7;
    } else if (new move().player_left() && new move().player_down()) {
        this.xy.y += 7;
        this.xy.x -= 7;
    } else if (new move().player_down() && new move().player_right()) {
        this.xy.y += 7;
        this.xy.x += 7;
    } else if (new move().player_right() && new move().player_up()) {
        this.xy.y -= 7;
        this.xy.x += 7;
    } else if (new move().player_up()) {
        this.xy.y -= 10;
    } else if (new move().player_left()) {
        this.xy.x -= 10;
    } else if (new move().player_down()) {
        this.xy.y += 10;
    } else if (new move().player_right()) {
        this.xy.x += 10;
    }
    ctx.strokeRect(x - (cx - this.xy.x), y - (cy - this.xy.y), 10, 10);
});
view.player.push(player);

class move {
    constructor(player = view.player[0]) {
        this.player = player;
    }
    cam_left() {
        if (this.player.xy.x > config.mapsize.x - canvas.width / 2) return false;
        return cam.xy.x > 0 && keydata.left
    }
    cam_right() {
        if (this.player.xy.x < canvas.width / 2) return false;
        return cam.xy.x < config.mapsize.x - canvas.width && keydata.right
    }
    cam_up() {
        if (this.player.xy.y > config.mapsize.y - canvas.height / 2) return false;
        return cam.xy.y > 0 && keydata.up
    }
    cam_down() {
        if (this.player.xy.y < canvas.height / 2) return false;
        return cam.xy.y < config.mapsize.y - canvas.height && keydata.down
    }

    player_left() {
        return this.player.xy.x > 15 && keydata.left
    }
    player_right() {
        return this.player.xy.x < config.mapsize.x - 25 && keydata.right
    }
    player_up() {
        return this.player.xy.y > 15 && keydata.up
    }
    player_down() {
        return this.player.xy.y < config.mapsize.y - 25 && keydata.down
    }
}

setInterval(function() {

    if (new move().cam_up() && new move().cam_left()) {
        cam.xy.y -= 7;
        cam.xy.x -= 7;
    } else if (new move().cam_left() && new move().cam_down()) {
        cam.xy.y += 7;
        cam.xy.x -= 7;
    } else if (new move().cam_down() && new move().cam_right()) {
        cam.xy.y += 7;
        cam.xy.x += 7;
    } else if (new move().cam_right() && new move().cam_up()) {
        cam.xy.y -= 7;
        cam.xy.x += 7;
    } else if (new move().cam_up()) {
        cam.xy.y -= 10;
    } else if (new move().cam_left()) {
        cam.xy.x -= 10;
    } else if (new move().cam_down()) {
        cam.xy.y += 10;
    } else if (new move().cam_right()) {
        cam.xy.x += 10;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    entity = 0;
    for (let group_key in view) {
        view[group_key].forEach(function(data) {
            entity++;
            data.view(ctx, data.xy.x - cam.xy.x, data.xy.y - cam.xy.y);
        });
    };
}, 30);