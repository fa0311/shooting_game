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
    main() {
        this.box = new box(config.mapsize.x / 2, config.mapsize.y / 2, function(ctx, x, y, key) {
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
            if (this.hidden) return;

            this.frame++;
            if (this.frame % 3 == 1) {
                this.chara_img++;
                if (this.chara_img == 9)
                    this.chara_img = 0;
            }
            if (cx < this.xy.x) {
                ctx.save();
                ctx.scale(-1, 1);
                ctx.translate(-canvas.width, 0);
                ctx.drawImage(this.chara.left[this.chara_img], canvas.width - (x - (cx - this.xy.x) + 16), y - (cy - this.xy.y) - 16);
                if (config.debug) {
                    ctx.strokeRect(canvas.width - (x - (cx - this.xy.x) + 16), y - (cy - this.xy.y), 1, 1);
                    ctx.strokeRect(canvas.width - (x - (cx - this.xy.x) + 16), y - (cy - this.xy.y) - 16, 1, 1);
                    ctx.strokeRect(canvas.width - (x - (cx - this.xy.x) - 16), y - (cy - this.xy.y) + 16, 1, 1);
                    ctx.strokeRect(canvas.width - (x - (cx - this.xy.x) - 16), y - (cy - this.xy.y) - 16, 1, 1);
                    ctx.strokeRect(canvas.width - (x - (cx - this.xy.x) + 16), y - (cy - this.xy.y) + 16, 1, 1);
                }
                ctx.restore();
            } else if (cx > this.xy.x) {
                ctx.drawImage(this.chara.left[this.chara_img], x - (cx - this.xy.x) - 16, y - (cy - this.xy.y) - 16);
                if (config.debug) {
                    ctx.strokeRect(x - (cx - this.xy.x), y - (cy - this.xy.y), 1, 1);
                    ctx.strokeRect(x - (cx - this.xy.x) - 16, y - (cy - this.xy.y) - 16, 1, 1);
                    ctx.strokeRect(x - (cx - this.xy.x) + 16, y - (cy - this.xy.y) + 16, 1, 1);
                    ctx.strokeRect(x - (cx - this.xy.x) + 16, y - (cy - this.xy.y) - 16, 1, 1);
                    ctx.strokeRect(x - (cx - this.xy.x) - 16, y - (cy - this.xy.y) + 16, 1, 1);
                }
            } else {
                ctx.drawImage(this.chara.default[this.chara_img], x - (cx - this.xy.x) - 16, y - (cy - this.xy.y) - 16);
                if (config.debug) {
                    ctx.strokeRect(x - (cx - this.xy.x), y - (cy - this.xy.y), 1, 1);
                    ctx.strokeRect(x - (cx - this.xy.x) - 16, y - (cy - this.xy.y) - 16, 1, 1);
                    ctx.strokeRect(x - (cx - this.xy.x) + 16, y - (cy - this.xy.y) + 16, 1, 1);
                    ctx.strokeRect(x - (cx - this.xy.x) + 16, y - (cy - this.xy.y) - 16, 1, 1);
                    ctx.strokeRect(x - (cx - this.xy.x) - 16, y - (cy - this.xy.y) + 16, 1, 1);
                }
            }
        })
        this.box.collision = true;
        this.box.residue = 5;
        this.box.hidden = false;
        this.box.chara = {
            "default": [],
            "left": []
        };
        this.box.frame = 0;
        this.box.attack = {
            "damage": 1,
            "speed": 3
        };
        this.box.chara_img = 0;
        this.box.chara = img.player;
        return this;
    }
    add() {
        view.player.push(this.box);
    }
}

class boss {

    main() {
        this.boss = new box(600, 100, function(ctx, x, y, key) {
            ctx.drawImage(this.chara.default[0], x - 50, y - 50, 100, 100);
        });
        this.boss.chara = {};

        this.boss.chara = img.boss;
        this.boss.hp = {
            "residue": 0,
            "max": 0
        }
        return this;
    }
    add() {
        view.boss.push(this.boss);
    }
}

class own_barrage {
    constructor() {}
    box() {
        this.box = new box(view.player[0].xy.x, view.player[0].xy.y, function(ctx, x, y, key) {
            /*移動 */
            this.xy.y -= 10;
            /*壁接触 */
            if (this.xy.y < 0 || this.xy.x < 0 || this.xy.y > config.mapsize.y || this.xy.x > config.mapsize.x) {
                view.own_barrage.splice(key, 1);
                return;
            }
            /*敵接触 */
            if (view.boss[0].xy.y < this.xy.y + 10 && view.boss[0].xy.x < this.xy.x + 50 && view.boss[0].xy.y > this.xy.y - 10 && view.boss[0].xy.x > this.xy.x - 50) {
                view.own_barrage.splice(key, 1);
                view.boss[0].hp.residue -= view.player[0].attack.damage;
                return;
            }
            /*カメラとの相対座標を計算 */
            let view_x = this.xy.x - cam.xy.x;
            let view_y = this.xy.y - cam.xy.y;
            /*カメラに表示されてないなら */
            if (view_x + this.config.size.x < 0 || view_x > canvas.width || view_y + this.config.size.y < 0 || view_y > canvas.height)
                return;
            /*描画 */
            ctx.strokeRect(x - 2, y - 10, this.config.size.x, this.config.size.y);

        })
        this.box.config = {
            "size": new xy(4, 4)
        };
        return this;
    }
    add() {
        view.own_barrage.push(this.box);
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
        this.box = new box(this.xy.x, this.xy.y, function(ctx, x, y, key) {
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

                    /*プレイヤー接触 */
            let x_size = this.config.size.x / 2;
            let y_size = this.config.size.y / 2;
            if (view.player[0].xy.y > this.xy.y - y_size && view.player[0].xy.y < this.xy.y + y_size && view.player[0].xy.x > this.xy.x - x_size && view.player[0].xy.x < this.xy.x + x_size && view.player[0].collision) {
                view.player[0].collision = false;
                view.player[0].residue--;
                if (view.player[0].residue == -1) console.log("ゲームオーバー");

                let action = new box(0, 0, function(ctx, x, y, key) {
                    this.frame++;
                    if (this.frame % 6 != 1) return;
                    view.player[0].hidden = !view.player[0].hidden;
                    if (this.frame < 55) return;
                    view.player[0].collision = true;
                    view.action.splice(key, 1);
                });
                action.frame = 0;
                view.action.push(action);
            }

            /*カメラとの相対座標を計算 */
            let view_x = this.xy.x - cam.xy.x;
            let view_y = this.xy.y - cam.xy.y;
            /*カメラに表示されてないなら */
            if (view_x + this.config.size.x < 0 || view_x > canvas.width || view_y + this.config.size.y < 0 || view_y > canvas.height)
                return;
            /*描画 */
            ctx.strokeRect(x + cx - this.config.size.x / 2, y + cy - this.config.size.x / 2, this.config.size.x, this.config.size.y);
        });
        this.box.config = this.config;
        this.box.xy = this.xy;
        this.box.angle = angle;
        this.box.frame = 0;
        this.box.event = {
            "wall": {
                "run": true,
                "fn": function(that, ctx, x, y, key) {
                    view.barrage.splice(key, 1);
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
        this.box.event.wall = {
            "run": true,
            "fn": fn
        }
        return this;
    }

    event_xy(fn, x, y) {
        this.box.event.xy = {
            "run": true,
            "xy": new xy(x, y),
            "fn": fn
        }
        return this;
    }

    add() {
        view.barrage.push(this.box);
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
        return this.player.xy.x > 10 && keydata.left
    }
    player_right() {
        return this.player.xy.x < config.mapsize.x - 10 && keydata.right
    }
    player_up() {
        return this.player.xy.y > 10 && keydata.up
    }
    player_down() {
        return this.player.xy.y < config.mapsize.y - 10 && keydata.down
    }
}
class view_canvas {
    constructor() {
        this.view();
    }

    view() {
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
                that.task++;
                data.view(ctx, data.xy.x - cam.xy.x, data.xy.y - cam.xy.y, i);
            });
        };

        /*ループ */
        setTimeout(function() {
            that.view();
        }, config.view.interval);
    };
}

class grid {

    box_x(x) {
        this.box = new box(x, 0, function(ctx, x, y, key) {
            ctx.strokeRect(x, y, 0.5, config.mapsize.y);
        })
        return this;
    }
    box_y(y) {
        this.box = new box(0, y, function(ctx, x, y, key) {
            ctx.strokeRect(x, y, config.mapsize.x, 0.5);
        })
        return this;
    }
    add() {
        view.grid.push(this.box);
    }
}

class data {
    boss_hp() {
        this.box = new box(0, 0, function(ctx, x, y, key) {
            let size = canvas.width / 7;
            ctx.save();

            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fillRect(size, 17, size * 5, 10);

            ctx.strokeStyle = "rgb(0, 0, 0)";
            ctx.strokeRect(size, 17, size * 5, 10);

            let grad = ctx.createLinearGradient(0, 17, 0, 27);
            grad.addColorStop(0, "rgb(170, 0, 0)");
            grad.addColorStop(0.5, "rgb(255, 0, 0)");
            grad.addColorStop(1, "rgb(255, 150, 150)");
            ctx.fillStyle = grad;
            ctx.fillRect(size, 17, size * 5 * view.boss[0].hp.residue / view.boss[0].hp.max, 10);

            ctx.fillStyle = "rgb(0, 0, 0)";

            ctx.fillText("BOSS:" + view.boss[0].hp.residue, size + 10, 15);
            ctx.restore();
        })
        return this;
    }
    text() {
        this.box = new box(0, 0, function(ctx, x, y, key) {
            ctx.fillText("残機:" + view.player[0].residue, 0, canvas.height - 50);
            ctx.fillText("攻撃力:" + view.player[0].attack.damage, 0, canvas.height - 35);
            ctx.fillText("ステージ:" + this.stage, 0, canvas.height - 20);
            ctx.fillText("タイム:" + this.time.general_purpose(), 0, canvas.height - 5);
        })
        this.box.stage = 0;
        this.box.time = new time();
        return this;
    }
    debug() {
        this.box = new box(0, 0, function(ctx, x, y, key) {
            this.frame++;
            if (config.debug) {
                let task = 0;
                for (let group_key in view) {
                    task += view[group_key].length;
                }
                ctx.fillText("task:" + task, 0, 15);
                ctx.fillText("FPS:" + Math.floor((1000 / (new Date().getTime() - this.time)) * 1000) / 1000, 0, 30);
                ctx.fillText("フレーム数:" + this.frame, 0, 45);
                this.time = new Date().getTime();
                task = 0;
            }
        })
        this.box.frame = 0;
        return this;
    }
    add() {
        view.data.push(this.box);
    }
}
class time {
    constructor() {
        this.start = performance.now();
    }
    get() {
        return performance.now() - this.start;
    }
    general_purpose(time = this.get()) {
        let h = Math.floor(time / 1000 / 60 / 60);
        let min = Math.floor(time / 1000 / 60) - Math.floor(time / 1000 / 60 / 60) * 60;
        let sec = Math.floor(time / 1000) - Math.floor(time / 1000 / 60) * 60;
        let ms = Math.floor(time) - Math.floor(time / 1000) * 1000;
        return h + ":" + min + ":" + sec + ":" + ms;
    }
}
class item {
    constructor(sx = 10, sy = 10) {
        this.config = {
            "size": new xy(sx, sy)
        };
        this.x = Math.floor(Math.random() * config.mapsize.x);
        this.y = Math.floor(Math.random() * config.mapsize.y);
    }
    damage() {
        this.box = new box(this.x, this.y, function(ctx, x, y, key) {
            this.frame++;

            let x_size = this.config.size.x / 2 + 5;
            let y_size = this.config.size.y / 2 + 5;
            if (view.player[0].xy.y > this.xy.y - y_size && view.player[0].xy.y < this.xy.y + y_size && view.player[0].xy.x > this.xy.x - x_size && view.player[0].xy.x < this.xy.x + x_size) {
                view.player[0].attack.damage++;
                let text = new box(0, 0, function(ctx, x, y, key) {
                    this.frame++;
                    if (this.frame > 60)
                        view.item.splice(key, 1);
                    ctx.save();
                    ctx.strokeStyle = "rgb(100, 100, 255)";
                    let easing = 10;
                    if (this.frame <= 30)
                        easing = (this.frame - 30) * (this.frame - 30) * -0.02 + 10;
                    ctx.fillText("攻撃力up", view.player[0].xy.x - cam.xy.x + 15, view.player[0].xy.y - cam.xy.y - easing);
                    ctx.restore();
                });
                text.frame = 0;
                view.item.push(text);
                view.item.splice(key, 1);
                return;
            }

            if (this.frame > 600) {
                if (this.frame % 6 == 0)
                    this.hidden = !this.hidden;

                if (this.frame > 659)
                    view.item.splice(key, 1);
            }

            if (this.hidden)
                return;
            ctx.save();
            ctx.strokeStyle = "rgb(100, 100, 255)";
            ctx.strokeRect(x - 5, y - 5, this.config.size.x, this.config.size.y);
            ctx.restore();

        });
        this.box.config = this.config;
        this.box.frame = 0;
        this.box.hidden = false;
        this.box.collision = true;
        return this;
    }

    add() {
        view.item.push(this.box);
    }
}

function grid_view() {

    for (let i = 0; i <= config.mapsize.x; i += 100)
        new grid().box_x(i).add();

    for (let i = 0; i <= config.mapsize.y; i += 100)
        new grid().box_y(i).add();

    view.grid.push(new box(0, 0, function(ctx, x, y, key) {
        ctx.save();
        ctx.strokeStyle = "rgb(255, 0, 0)";
        ctx.strokeRect(canvas.width / 2, 0, 0.5, canvas.height);
        ctx.strokeStyle = "rgb(0, 0, 255)";
        ctx.strokeRect(0, canvas.height / 2, canvas.width, 0.5);
        ctx.restore();
    }));
}