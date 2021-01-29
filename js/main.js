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
    "mapsize": new xy(1200, 800),
}

config.player = {
    "speed": [1.41421356237 * 5, 1 * 5]
}

var cam = new camera();
var view = {
    "background": [],
    "player": [],
    "ball": []
};
/*
for (var i = 0; i < 500; i++) {
    x = Math.floor(Math.random() * 100);
    y = Math.floor(Math.random() * 100);
    x = 20;
    y = 20;
    rand_box = new box(Math.floor(Math.random() * 1200), Math.floor(Math.random() * 800), function(ctx, x, y, key) {
        let view_x = this.xy.x - cam.xy.x;
        let view_y = this.xy.y - cam.xy.y;
        if (view_x + this.size.x < 0 || view_x > canvas.width || view_y + this.size.y < 0 || view_y > canvas.height)
            return;
        ctx.strokeRect(x, y, this.size.x, this.size.y);
    });
    rand_box.size = new xy(x, y)
    view.background.push(rand_box);
}
*/


let player = new box(config.mapsize.x / 2 - 5, config.mapsize.y / 2 - 5, function(ctx, x, y, key) {
    let cy = this.xy.y;
    let cx = this.xy.x;
    if (new move().player_up() && new move().player_left()) {
        this.xy.y -= config.player.speed[1];
        this.xy.x -= config.player.speed[1];
    } else if (new move().player_left() && new move().player_down()) {
        this.xy.y += config.player.speed[1];
        this.xy.x -= config.player.speed[1];
    } else if (new move().player_down() && new move().player_right()) {
        this.xy.y += config.player.speed[1];
        this.xy.x += config.player.speed[1];
    } else if (new move().player_right() && new move().player_up()) {
        this.xy.y -= config.player.speed[1];
        this.xy.x += config.player.speed[1];
    } else if (new move().player_up()) {
        this.xy.y -= config.player.speed[0];
    } else if (new move().player_left()) {
        this.xy.x -= config.player.speed[0];
    } else if (new move().player_down()) {
        this.xy.y += config.player.speed[0];
    } else if (new move().player_right()) {
        this.xy.x += config.player.speed[0];
    }
    let player = this;
    view.ball.forEach(function(data, i) {
        if (player.xy.y > data.xy.y - 10 && player.xy.y < data.xy.y + 10 && player.xy.x > data.xy.x - 10 && player.xy.x < data.xy.x + 10 && player.collision) {
            player.collision = false;
            player.remaining--;
            if (player.remaining == -1) console.log("ゲームオーバー");
            player.hidden = true;
            for (var i = 0; i < 5; i++) {
                setTimeout(function() {
                    player.hidden = false;
                }, 400 * i + 200);
                setTimeout(function() {
                    player.hidden = true;
                }, 400 * i + 400);
            }
            setTimeout(function() {
                player.hidden = false;
                player.collision = true;
            }, 2000);
        }
    });
    if (this.hidden) return;
    ctx.strokeRect(x - (cx - this.xy.x), y - (cy - this.xy.y), 10, 10);
});
player.collision = true;
player.remaining = 5;
player.hidden = false;
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

function ball() {
    let r = Math.floor(Math.random() * 10);
    for (var i = 0; i < 36; i++) {
        let ball = new box(a, 100, function(ctx, x, y, key) {
            this.xy.y += Math.cos(this.angle * Math.PI / 180) * this.speed;
            this.xy.x += Math.sin(this.angle * Math.PI / 180) * this.speed;

            let cy = this.xy.y;
            let cx = this.xy.x;

            if (this.xy.y < 0 || this.xy.x < 0 || this.xy.y > config.mapsize.y || this.xy.x > config.mapsize.x) {
                view.ball.splice(key, 1);
                return;
            }

            let view_x = this.xy.x - cam.xy.x;
            let view_y = this.xy.y - cam.xy.y;
            if (view_x + this.size.x < 0 || view_x > canvas.width || view_y + this.size.y < 0 || view_y > canvas.height)
                return;
            ctx.strokeRect(x - (cx - this.xy.x), y - (cy - this.xy.y), this.size.x, this.size.y);
        });
        ball.size = new xy(10, 10);
        ball.speed = 5;
        ball.angle = i * 10 + r;
        view.ball.push(ball);
    }
}
let a = 400;
let flag = false;
setInterval(function() {
    ball();
    if (flag) {
        a = a + 100;
    } else {
        a = a - 100;
    }
    if (a >= 800) {
        flag = false;
    }
    if (a <= 400) {
        flag = true;
    }
}, 500);
let time;
setInterval(function() {

    document.getElementById("fps").textContent = 1000 / (new Date().getTime() - time);
    /*
        let ball = new box(Math.floor(Math.random() * 1200), 0, function(ctx, x, y, key) {

            let cy = this.xy.y;
            let cx = this.xy.x;
            this.xy.y += 3;
            if (this.xy.y < 0 || this.xy.x < 0 || this.xy.y > config.mapsize.y || this.xy.x > config.mapsize.x)
                delete view.ball.splice(key, 1);
            let view_x = this.xy.x - cam.xy.x;
            let view_y = this.xy.y - cam.xy.y;
            if (view_x + this.size.x < 0 || view_x > canvas.width || view_y + this.size.y < 0 || view_y > canvas.height)
                return;
            ctx.strokeRect(x - (cx - this.xy.x), y - (cy - this.xy.y), this.size.x, this.size.y);
        });
        ball.size = new xy(10, 10)
        view.ball.push(ball);
    */

    if (new move().cam_up() && new move().cam_left()) {
        cam.xy.y -= config.player.speed[1];
        cam.xy.x -= config.player.speed[1];
    } else if (new move().cam_left() && new move().cam_down()) {
        cam.xy.y += config.player.speed[1];
        cam.xy.x -= config.player.speed[1];
    } else if (new move().cam_down() && new move().cam_right()) {
        cam.xy.y += config.player.speed[1];
        cam.xy.x += config.player.speed[1];
    } else if (new move().cam_right() && new move().cam_up()) {
        cam.xy.y -= config.player.speed[1];
        cam.xy.x += config.player.speed[1];
    } else if (new move().cam_up()) {
        cam.xy.y -= config.player.speed[0];
    } else if (new move().cam_left()) {
        cam.xy.x -= config.player.speed[0];
    } else if (new move().cam_down()) {
        cam.xy.y += config.player.speed[0];
    } else if (new move().cam_right()) {
        cam.xy.x += config.player.speed[0];
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    entity = 0;
    for (let group_key in view) {
        view[group_key].forEach(function(data, i) {
            entity++;
            data.view(ctx, data.xy.x - cam.xy.x, data.xy.y - cam.xy.y, i);
        });
    };
    document.getElementById("entity").textContent = entity;
    document.getElementById("remaining").textContent = view.player[0].remaining;
    time = new Date().getTime();
}, 30);