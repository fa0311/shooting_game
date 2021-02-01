let loop;
let stage = 0;

function loopset() {
    loop = new box(0, 0, function(ctx, x, y, key) {
        this.frame++;
        if (this.frame % 90 > 0) return;
        new item().damage().add()
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

function reset(flag = false) {
    if (flag) {
        view = {
            "grid": [],
            "barrage": [],
            "own_barrage": [],
            "item": [],
            "player": [],
            "boss": [],
            "data": [],
            "action": [],
            "loop": []
        };
        new data().text().add();
        new data().debug().add();
        new data().boss_hp().add();
    } else {
        view = {
            "grid": view.grid,
            "barrage": [],
            "own_barrage": [],
            "item": [],
            "player": [],
            "boss": [],
            "data": view.data,
            "action": [],
            "loop": []
        };
    }
    new boss().main().add();
    new player().main().add();
    cam = new camera();
    loopset()
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
                if (this.frame % 40 > 0) return;
                easy_shoot_wave()
            });
            action.frame = 0;
            action.move = [true, 400];
            view.action.push(action);
        },
        function() {
            let action;
            view.boss[0].hp = {
                "residue": 500,
                "max": 500
            };
            action = new box(0, 0, function(ctx, x, y, key) {
                this.frame++;
                if (this.frame % 20 > 0) return;
                circle(this.move[1], 100);
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
                "residue": 500,
                "max": 500
            };
            action = new box(0, 0, function(ctx, x, y, key) {
                this.frame++;
                if (this.frame % 100 > 0) return;
                shoot_circle()
            });
            action.frame = 0;
            view.action.push(action);
        },


    ]
    /*初期化 */
reset(true);
/*メインループ開始 */
setTimeout(
    function() {
        new view_canvas
    }, config.view.interval);