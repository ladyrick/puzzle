var d = [0, 1, 2, 3, 4, 5, 6, 7, 8, 0];
var stepcount = 0;
var d_direct = [[0], [2, 4], [1, 3, 5], [2, 6], [1, 5, 7], [2, 4, 6, 8], [3, 5, 9], [4, 8], [5, 7, 9], [6, 8]];
var d_posXY = [[0], [0, 0], [150, 0], [300, 0], [0, 150], [150, 150], [300, 150], [0, 300], [150, 300], [300, 300]];

function move(id) {
    var i;
    for (i = 1; i < 10; ++i) {
        if (d[i] == id)
            break;
    }
    var target_d;
    target_d = whereCanTo(i);
    if (target_d != 0) {
        d[i] = 0;
        d[target_d] = id;
        document.getElementById("d" + id).style.left = d_posXY[target_d][0] + "px";
        document.getElementById("d" + id).style.top = d_posXY[target_d][1] + "px";
        ++stepcount;
        document.getElementById("counter").innerText = stepcount;
    }
    var finish_flag = true;
    for (var k = 1; k < 9; ++k) {
        if (d[k] != k) {
            finish_flag = false;
            break;
        }
    }
    if (finish_flag == true) {
        document.getElementById("message").innerText = "您用了" + stepcount + "步完成了拼图。";
    }
}

function whereCanTo(cur_div) {
    var j;
    var move_flag = false;
    for (j = 0; j < d_direct[cur_div].length; ++j) {
        if (d[d_direct[cur_div][j]] == 0) {
            move_flag = true;
            break;
        }
    }
    if (move_flag == true) {
        return d_direct[cur_div][j];
    } else {
        return 0;
    }
}

function reset() {
    random_d();
    stepcount = 0;
    document.getElementById("counter").innerText = stepcount;
    document.getElementById("message").innerText = "";
}

function random_d() {
    var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    for (var i = 1; i <= 9; i++) {
        var id = parseInt(Math.random() * (10 - i));
        if (arr[id] != 0)
            setBlock(arr[id], i);
        d[i] = arr[id];
        arr.splice(id, 1);
    }
    if (nxs() % 2 === 1) {
        var p = 5, q = 6;
        if (d[q] === 0)
            q++;
        var temp = d[p];
        d[p] = d[q];
        d[q] = temp;
        setBlock(d[p], p);
        setBlock(d[q], q);
    }
}

function setBlock(id, to) {
    document.getElementById("d" + id).style.left = d_posXY[to][0] + "px";
    document.getElementById("d" + id).style.top = d_posXY[to][1] + "px";
}

function nxs() {
    var n = 0;
    for (var i = 1; i < 10; i++)
        if (d[i] != 0)
            for (var j = i + 1; j < 10; j++)
                if (d[j] != 0 && d[j] > d[i])
                    n++;
    return n;
}

window.onload = reset;

