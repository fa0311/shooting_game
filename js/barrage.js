function circle() {
    let move = [false, 400];
    let r = Math.floor(Math.random() * 10);
    setInterval(function() {
        for (var i = 0; i < 36; i++)
            new barrage(move[1], 100, 4, 10, 10).shoot(i * 10 + r).add();
        if (move[0])
            move[1] = move[1] + 100;
        else
            move[1] = move[1] - 100;
        if (move[1] >= 800)
            move[0] = false;
        if (move[1] <= 400)
            move[0] = true;
    }, 1000);
}

function shoot() {
    setInterval(function() {
        let angle = Math.atan2(view.player[0].xy.x - 600, view.player[0].xy.y - 100) * 60 * 0.957;
        new barrage(600, 100, 3, 10, 10).shoot(angle).add();
    }, 500);
}

function shoot_wave() {
    setInterval(function() {
        for (var i = 0; i < 9; i++) {
            let angle = Math.atan2(view.player[0].xy.x - 600, view.player[0].xy.y - 100) * 60 * 0.957 - 12 + i * 3;
            new barrage(600, 100, 3, 10, 10).shoot(angle).add();
        }
    }, 2000);

}

function circle_wave() {
    for (var i = 0; i < 36; i++)
        new barrage(600, 100, 4, 10, 10).shoot(i * 10).event_wall(
            function(that, ctx, x, y, key) {
                view.ball.splice(key, 1);
                for (var i = 0; i < 9; i++) {
                    let angle = Math.atan2(view.player[0].xy.x - that.xy.x, view.player[0].xy.y - that.xy.y) * 60 * 0.957 - 12 + i * 3;
                    new barrage(that.xy.x, that.xy.y, 3, 10, 10).shoot(angle).add();
                }
                return true;
            }).add();
}

function shoot_center_circle() {
    let angle = Math.atan2(view.player[0].xy.x - 600, view.player[0].xy.y - 100) * 60 * 0.957;
    new barrage(600, 100, 3, 10, 10).shoot(angle).event_xy(function(that, ctx, x, y, key) {
        view.ball.splice(key, 1);
        for (var i = 0; i < 36; i++)
            new barrage(that.xy.x, that.xy.y, 4, 10, 10).shoot(i * 10).add();
        return true;
    }, view.player[0].xy.x, view.player[0].xy.y).add();
}

function shoot_center_circle_circle() {
    new barrage(600, 100, 3, 10, 10).shoot(0).event_xy(function(that, ctx, x, y, key) {
        view.ball.splice(key, 1);
        for (var i = 0; i < 36; i++)
            new barrage(that.xy.x, that.xy.y, 4, 10, 10).shoot(i * 10).event_wall(function(that, ctx, x, y, key) {
                view.ball.splice(key, 1);
                for (var i = 0; i < 36; i++)
                    new barrage(that.xy.x, that.xy.y, 1, 10, 10).shoot(i * 10).add();
                return true;
            }).add();
        return true;
    }, config.mapsize.x / 2, config.mapsize.y / 2).add();
}

function shoot_center_circle_10() {
    let r = Math.floor(Math.random() * 10);
    let timer_i = 0;
    let timer_id = setInterval((function() {
        timer_i++;
        if (timer_i == 10)
            clearInterval(timer_id);
        new barrage(600, 100, 3, 10, 10).shoot(0).event_xy(function(that, ctx, x, y, key) {
            view.ball.splice(key, 1);
            for (var i = 0; i < 36; i++)
                new barrage(that.xy.x, that.xy.y, 4, 10, 10).shoot(i * 10 + r).add();
            return true;
        }, config.mapsize.x / 2, config.mapsize.y / 2).add();
    }), 99);
}