function circle(sp, x = view.boss[0].xy.x, y = view.boss[0].xy.y) {
    let r = Math.floor(Math.random() * 10);
    for (let i = 0; i < 36; i++)
        new barrage(x, y, sp, 10, 10).shoot(i * 10 + r).add();
}

function effect_small_circle(x = view.boss[0].xy.x, y = view.boss[0].xy.y) {
    let r = Math.floor(Math.random() * 10);
    for (let i = 0; i < 36; i++)
        new barrage(x, y, 4, 4, 4).effect(i * 10 + r, 20).add_effect();
}

function effect_circle(x = view.boss[0].xy.x, y = view.boss[0].xy.y) {
    let r = Math.floor(Math.random() * 10);
    for (let i = 0; i < 36; i++)
        new barrage(x, y, 4, 4, 4).effect(i * 10 + r, 40).add_effect();
}



function shoot(sp) {
    let angle = Math.atan2(view.player[0].xy.x - view.boss[0].xy.x, view.player[0].xy.y - view.boss[0].xy.y) * 60 * 0.957;
    new barrage(view.boss[0].xy.x, view.boss[0].xy.y, sp, 10, 10).shoot(angle).add();
}

function shoot_wave(sp) {
    for (let i = 0; i < 9; i++) {
        let angle = Math.atan2(view.player[0].xy.x - view.boss[0].xy.x, view.player[0].xy.y - view.boss[0].xy.y) * 60 * 0.957 - 12 + i * 3;
        new barrage(view.boss[0].xy.x, view.boss[0].xy.y, sp, 10, 10).shoot(angle).add();
    }
}

function easy_shoot_wave(sp) {
    for (let i = 0; i < 5; i++) {
        let angle = Math.atan2(view.player[0].xy.x - view.boss[0].xy.x, view.player[0].xy.y - view.boss[0].xy.y) * 60 * 0.957 - 6 + i * 3;
        new barrage(view.boss[0].xy.x, view.boss[0].xy.y, sp, 10, 10).shoot(angle).add();
    }
}

function circle_wave(sp) {
    for (let i = 0; i < 36; i++)
        new barrage(view.boss[0].xy.x, view.boss[0].xy.y, 4, 10, 10).shoot(i * 10).event_wall(
            function(that, ctx, x, y, key) {
                view.barrage.splice(key, 1);
                for (let i = 0; i < 9; i++) {
                    let angle = Math.atan2(view.player[0].xy.x - that.xy.x, view.player[0].xy.y - that.xy.y) * 60 * 0.957 - 12 + i * 3;
                    new barrage(that.xy.x, that.xy.y, sp, 10, 10).shoot(angle).add();
                }
                return true;
            }).add();
}



function shoot_circle(sp1, sp2) {
    let angle = Math.atan2(view.player[0].xy.x - view.boss[0].xy.x, view.player[0].xy.y - view.boss[0].xy.y) * 60 * 0.957;
    new barrage(view.boss[0].xy.x, view.boss[0].xy.y, sp1, 10, 10).shoot(angle).event_xy(function(that, ctx, x, y, key) {
        view.barrage.splice(key, 1);
        for (let i = 0; i < 36; i++)
            new barrage(that.xy.x, that.xy.y, sp2, 10, 10).shoot(i * 10).add();
        return true;
    }, view.player[0].xy.x, view.player[0].xy.y).add();
}


function shoot_center_circle(sp1, sp2) {
    new barrage(view.boss[0].xy.x, view.boss[0].xy.y, sp1, 10, 10).shoot(0).event_xy(function(that, ctx, x, y, key) {
        view.barrage.splice(key, 1);
        for (let i = 0; i < 36; i++)
            new barrage(that.xy.x, that.xy.y, sp2, 10, 10).shoot(i * 10).add();
        return true;
    }, config.mapsize.x / 2, config.mapsize.y / 2).add();
}

function easy_shoot_center_circle(sp1, sp2) {
    new barrage(view.boss[0].xy.x, view.boss[0].xy.y, sp1, 10, 10).shoot(0).event_xy(function(that, ctx, x, y, key) {
        view.barrage.splice(key, 1);
        for (let i = 0; i < 15; i++)
            new barrage(that.xy.x, that.xy.y, sp2, 10, 10).shoot(i * 24).add();
        return true;
    }, config.mapsize.x / 2, config.mapsize.y / 2).add();
}


function shoot_center_circle_circle() {
    new barrage(view.boss[0].xy.x, view.boss[0].xy.y, 2, 10, 10).shoot(0).event_xy(function(that, ctx, x, y, key) {
        view.barrage.splice(key, 1);
        for (let i = 0; i < 36; i++)
            new barrage(that.xy.x, that.xy.y, 2, 10, 10).shoot(i * 10).event_wall(function(that, ctx, x, y, key) {
                view.barrage.splice(key, 1);
                for (let i = 0; i < 36; i++)
                    new barrage(that.xy.x, that.xy.y, 0.8, 10, 10).shoot(i * 10).add();
                return true;
            }).add();
        return true;
    }, config.mapsize.x / 2, config.mapsize.y / 2).add();
}

function zone_limits(x = 300, y = 500) {
    new barrage(config.mapsize.x / 2, config.mapsize.y, 2, config.mapsize.x - x * 2, 10).shoot(180).event_xy(function(that, ctx, x, y, key) {
        view.barrage.splice(key, 1);
        return true;
    }, config.mapsize.x / 2, y).event_stage(function(that, ctx, x, y, key) {
        view.barrage.splice(key, 1);
        return true;
    }, stage + 1).add();
    new barrage(x / 2, config.mapsize.y, 2, x, 10).shoot(180).event_stage(function(that, ctx, x, y, key) {
        view.barrage.splice(key, 1);
        return true;
    }, stage + 1).add();
    new barrage(config.mapsize.x - x / 2, config.mapsize.y, 2, x, 10).shoot(180).event_stage(function(that, ctx, x, y, key) {
        view.barrage.splice(key, 1);
        return true;
    }, stage + 1).add();
}