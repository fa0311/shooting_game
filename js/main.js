let loop;
let stage = 0;

function loopset() {
    loop = new box(0, 0, function(ctx, x, y, key) {
        this.frame++;
        if (this.frame % 120 == 0)
            new item().damage().add()
        if (this.frame % 1000 == 0)
            new item().heart().add()
    });
    loop.frame = 0;
    view.loop.push(loop);
    loop = new box(0, 0, function(ctx, x, y, key) {
        if (view.boss[0].hp.residue <= 0)
            reset();

    });
    view.loop.push(loop);
    loop = new box(0, 0, function(ctx, x, y, key) {
        this.frame++;
        if (this.frame % view.player[0].attack.speed == 0)
            new own_barrage().box().add();
    });
    loop.frame = 0;
    view.loop.push(loop);
}

function reset(mode = false) {
    if (mode == true) {
        /*初回 */
        view = {
            "grid": [],
            "barrage": [],
            "own_barrage": [],
            "item": [],
            "player": [],
            "boss": [],
            "data": [],
            "action": [],
            "loop": [],
            "effect": [],
        };
        new data().text().add();
        new data().debug().add();
        new data().boss_hp().add();
        new boss().main().add();
        new player().main().add();
        cam = new camera();
        loopset()
    } else if (mode == false) {
        /*次のステージ */
        view.player[0].data_save = {
            "attack": {
                "damage": view.player[0].attack.damage,
                "speed": 3
            },
            "residue": view.player[0].residue
        };
        effect_small_circle(view.boss[0].xy.x, view.boss[0].xy.y);
        view.boss = [];
        view.action = [];
        new boss().main().add();
        view.player[0].hidden = false;
        view.player[0].collision = true;
    } else if (mode == "die") {
        /*死 */
        let damage = view.player[0].data_save.attack.damage;
        let residue = view.player[0].data_save.residue;
        let time = view.data[0].time.start;
        let frame = view.data[1].frame
        view = {
            "grid": [],
            "barrage": [],
            "own_barrage": [],
            "item": [],
            "player": [],
            "boss": [],
            "data": [],
            "action": [],
            "loop": [],
            "effect": [],
        };

        new data().text().add();
        new data().debug().add();
        new data().boss_hp().add();

        new boss().main().add();
        new player().main().add();

        view.player[0].attack.damage = damage;
        view.player[0].residue = residue;
        view.player[0].data_save = {
            "attack": {
                "damage": damage,
                "speed": 3
            },
            "residue": residue
        };
        view.data[0].time.start = time;
        view.data[1].frame = frame;
        cam = new camera();
        loopset()
    }
    /*
    effect_small_circle(view.boss[0].xy.x, view.boss[0].xy.y);
    view = {
        "grid": view.grid,
        "barrage": [],
        "own_barrage": [],
        "item": [],
        "player": [],
        "boss": [],
        "data": view.data,
        "action": [],
        "loop": [],
        "effect": view.effect,
    };
    new boss().main().add();
    new player().main().add();
    cam = new camera();
    loopset()
*/
    stage_list[stage]();
    stage++;
}
let stage_list = [
        function() {
            let action;
            view.boss[0].hp = {
                "residue": 500,
                "max": 500
            };
            action = new box(0, 0, function(ctx, x, y, key) {
                this.frame++;
                if (this.frame % 60 > 0) return;
                easy_shoot_wave(2)
            });
            action.frame = 0;
            view.action.push(action);
        },
        function() {
            let action;
            view.boss[0].hp = {
                "residue": 1000,
                "max": 1000
            };
            action = new box(0, 0, function(ctx, x, y, key) {
                this.frame++;
                if (this.frame % 100 > 0) return;
                shoot_circle(2, 2)
            });
            action.frame = 0;
            view.action.push(action);
        },
        function() {
            let action;
            view.boss[0].hp = {
                "residue": 2000,
                "max": 2000
            };
            action = new box(0, 0, function(ctx, x, y, key) {
                this.frame++;
                if (this.frame % 100 > 0) return;
                shoot_wave(2);
                shoot_wave(3);
            });
            action.frame = 0;
            view.action.push(action);
        },
        function() {
            let action;
            view.boss[0].hp = {
                "residue": 3000,
                "max": 3000
            };
            action = new box(0, 0, function(ctx, x, y, key) {
                this.frame++;
                if (this.frame % 10 > 0) return;
                zone_limits();
                if (this.frame % 40 > 0) return;
                shoot_wave(3);
            });
            action.frame = 0;
            view.action.push(action);
        },
        function() {
            let action;
            view.boss[0].hp = {
                "residue": 4000,
                "max": 4000
            };
            action = new box(0, 0, function(ctx, x, y, key) {
                this.frame++;
                if (this.frame % 60 > 0) return;
                shoot_wave(1);
                shoot_wave(2);
                shoot_wave(3);
            });
            action.frame = 0;
            view.action.push(action);
        },
        function() {
            let action;
            view.boss[0].hp = {
                "residue": 5000,
                "max": 5000
            };
            action = new box(0, 0, function(ctx, x, y, key) {
                this.frame++;
                if (this.frame % 4 > 0) return;
                if (this.frame % 250 > 184) return;
                for (let i = 0; i < 36; i++)
                    new barrage(view.boss[0].xy.x, view.boss[0].xy.y, 4, 10, 10).shoot(i * 10 + this.frame / 4 + action.r).add();
            });
            action.frame = 0;
            action.r = Math.floor(Math.random() * 10);
            view.action.push(action);
        },
        function() {
            let action;
            view.boss[0].hp = {
                "residue": 6000,
                "max": 6000
            };
            action = new box(0, 0, function(ctx, x, y, key) {
                this.frame++;
                if (this.frame % 20 > 0) return;
                circle(3, this.move[1], 100);
                if (this.move[0])
                    this.move[1] = this.move[1] + 100;
                if (!this.move[0])
                    this.move[1] = this.move[1] - 100;
                if (this.move[1] >= 800)
                    this.move[0] = false;
                if (this.move[1] <= 400)
                    this.move[0] = true;
            });
            action.frame = 0;
            action.move = [true, 400];
            view.action.push(action);
        },
        function() {
            let action;
            view.boss[0].hp = {
                "residue": 7000,
                "max": 7000
            };
            action = new box(0, 0, function(ctx, x, y, key) {
                this.frame++;
                if (this.frame % 50 > 0) return;
                for (let i = 0; i < 36; i++)
                    new barrage(view.boss[0].xy.x, view.boss[0].xy.y, 2, 10, 10).shoot(i * 10 + this.frame / 50).event_view(function(that) {
                        that.angle += 0.3;
                        if (that.frame > 1200)
                            return true;
                    }).event_wall(function() {}).add();
            });
            action.frame = 0;
            view.action.push(action);
        },
        function() {
            let action;
            view.boss[0].hp = {
                "residue": 8000,
                "max": 8000
            };
            action = new box(0, 0, function(ctx, x, y, key) {
                this.frame++;
                if (this.frame % 100 > 0) return;
                shoot_center_circle(3, 2);
                shoot_circle(2, 3);
            });
            action.frame = 0;
            view.action.push(action);
        },
        function() {
            let action;
            view.boss[0].hp = {
                "residue": 9000,
                "max": 9000
            };
            action = new box(0, 0, function(ctx, x, y, key) {
                this.frame++;
                if (this.frame % 60 > 0) return;
                shoot_wave(1);
                shoot_wave(2);
                shoot_center_circle(3, 2);
            });
            action.frame = 0;
            view.action.push(action);
        },
        function() {
            let action;
            view.boss[0].hp = {
                "residue": 10000,
                "max": 10000
            };
            action = new box(0, 0, function(ctx, x, y, key) {
                this.frame++;
                if (this.frame % 100 > 0) return;
                circle(2);
                shoot_circle(1.5, 0.5);
                shoot_circle(1.5, 1);
                shoot_circle(1.5, 1.5);
            });
            action.frame = 0;
            view.action.push(action);
        },
        function() {
            let action;
            view.boss[0].hp = {
                "residue": 20000,
                "max": 20000
            };
            action = new box(0, 0, function(ctx, x, y, key) {
                this.frame++;
                if (this.frame % 50 == 0)
                    shoot(1.5);

                if (this.frame % 800 == 300)
                    shoot_center_circle_circle();

            });
            action.frame = 0;
            view.action.push(action);
        },
        function() {
            view.boss[0].hp = {
                "residue": 100000,
                "max": 100000
            };
            action = new box(0, 0, function(ctx, x, y, key) {
                ctx.fillText("クリア", canvas.width / 2 - 25, canvas.height / 2 + 30);
            });
            view.action.push(action);

            let data = [view.player[0].residue, view.player[0].attack.damage, stage, view.data[0].time, view.data[0].time.get(), view.data[1].frame];
            view.data[0] = new box(0, 0, function(ctx, x, y, key) {
                ctx.fillText("残機:" + this.data[0], 0, canvas.height - 65);
                ctx.fillText("攻撃力:" + this.data[1], 0, canvas.height - 50);
                ctx.fillText("ステージ:" + this.data[2], 0, canvas.height - 35);
                ctx.fillText("タイム:" + this.data[3].general_purpose(this.data[4]), 0, canvas.height - 20);
                ctx.fillText("フレーム数:" + this.data[5], 0, canvas.height - 5);
            });
            view.data[0].data = data;
        },
        function() {
            view.boss[0].hp = {
                "residue": 1145141919810,
                "max": 1145141919810
            };
        }
    ]
    /*初期化 */
reset(true);
/*メインループ開始 */
setTimeout(
    function() {
        new view_canvas();
    }, config.view.interval);