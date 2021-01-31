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


class player {
    constructor() {

    }
    main_player() {
        this.player = new box(config.mapsize.x / 2 - 5, config.mapsize.y / 2 - 5, function(ctx, x, y, key) {
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

            this.frame++;
            if (this.frame % 3 == 1) {
                this.chara_img++;
                if (this.chara_img == 9)
                    this.chara_img = 0;
            }
            ctx.drawImage(this.chara.default[this.chara_img], x - (cx - this.xy.x) - 7.5, y - (cy - this.xy.y) - 7.5, 25, 25);
        })
        this.player.collision = true;
        this.player.remaining = 5;
        this.player.hidden = false;
        this.player.chara = {
            "default": [],
            "left": []
        };
        this.player.frame = 0;
        this.player.chara_img = 0;
        for (let i = 0; i < 9; i++) {
            this.player.chara["default"][i] = new Image();
            this.player.chara["default"][i].src = "./img/player_1/angel" + (i + 1) + ".png";
        }
        for (let i = 0; i < 9; i++) {
            this.player.chara["left"][i] = new Image();
            this.player.chara["left"][i].src = "./img/player_1/angel_left" + (i + 1) + ".png";
        }
        return this;
    }
    add() {
        view.player.push(this.player);
    }
}


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

class barrage {
    constructor(x, y, sp, sx = 10, sy = 10) {
        this.config = {
            "size": new xy(sx, sy),
            "speed": sp
        };
        this.xy = new xy(x, y);

    }
    shoot(angle = 0) {
        this.ball = new box(this.xy.x, this.xy.y, function(ctx, x, y, key) {
            /*移動した距離 */
            let cy = Math.cos(this.angle * Math.PI / 180) * this.config.speed;
            let cx = Math.sin(this.angle * Math.PI / 180) * this.config.speed;
            /*移動 */
            this.xy.y += cy;
            this.xy.x += cx;
            /*移動 */
            this.frame++;
            /*壁接触イベント */
            if (this.event.wall.run && this.frame > 10)
                if (this.xy.y < 0 || this.xy.x < 0 || this.xy.y > config.mapsize.y || this.xy.x > config.mapsize.x)
                    if (this.event.wall.fn(this, ctx, x, y, key))
                        return;

                    /*座標接触イベント */
            if (this.event.xy.run)
                if (this.event.xy.xy.y < this.xy.y + 10 && this.event.xy.xy.x < this.xy.x + 10 && this.event.xy.xy.y > this.xy.y - 10 && this.event.xy.xy.x > this.xy.x - 10)
                    if (this.event.xy.fn(this, ctx, x, y, key))
                        return;

                    /*カメラとの相対座標を計算 */
            let view_x = this.xy.x - cam.xy.x;
            let view_y = this.xy.y - cam.xy.y;
            /*カメラに表示されてないなら */
            if (view_x + this.config.size.x < 0 || view_x > canvas.width || view_y + this.config.size.y < 0 || view_y > canvas.height)
                return;
            /*描画 */
            ctx.strokeRect(x + cx, y + cy, this.config.size.x, this.config.size.y);
        });
        this.ball.config = this.config;
        this.ball.xy = this.xy;
        this.ball.angle = angle;
        this.ball.frame = 0;
        this.ball.event = {
            "wall": {
                "run": true,
                "fn": function(that, ctx, x, y, key) {
                    view.ball.splice(key, 1);
                    return true;
                }
            },
            "xy": {
                "run": false,
            }
        }
        return this;
    }

    event_wall(fn) {
        this.ball.event.wall = {
            "run": true,
            "fn": fn
        }
        return this;
    }

    event_xy(fn, x, y) {
        this.ball.event.xy = {
            "run": true,
            "xy": new xy(x, y),
            "fn": fn
        }
        return this;
    }

    add() {
        view.ball.push(this.ball);
    }
}


class view_canvas {
    constructor() {
        this.time;
        this.view();
    }

    view() {
        /*デバック情報リセット */
        this.entity = 0;
        document.getElementById("fps").textContent = 1000 / (new Date().getTime() - this.time);
        /*カメラ移動 */
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
        /*すべてを消す */
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        /*表示 */
        let that = this;
        for (let group_key in view) {
            view[group_key].forEach(function(data, i) {
                that.entity++;
                data.view(ctx, data.xy.x - cam.xy.x, data.xy.y - cam.xy.y, i);
            });
        };
        /*デバック情報表示 */
        document.getElementById("entity").textContent = this.entity;
        document.getElementById("remaining").textContent = view.player[0].remaining;
        this.time = new Date().getTime();
        /*ループ */
        setTimeout(function() {
            that.view();
        }, config.view.interval);
    };
}