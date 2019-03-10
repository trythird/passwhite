var score = 0;
var c = score;
var guanshu = 0;

    var time_save = [];
    var guanshu_save = [];
    time_save = JSON.parse(localStorage.getItem("time_save"));
    guanshu_save = JSON.parse(localStorage.getItem("guanshu_save"));

//获取键盘事件
$(document).keydown(function(event){
    //keydown事件的形参,通过event.keyCode获取对应的键盘值
    switch (event.keyCode){
        case 74://J
            if(board[3][0] == 1 && score == 0){
                //第一次敲击键盘正确的话
                //初始化计时器
                timeRun();
                //将游戏开始的提示内容去掉
                clearText();
                //黑块整体向下移动
                moveDown();
            }else if(board[3][0] == 1 && score>0 && c ==score){//如何判断敲击是正确的
                //说明敲击是正确的
                //黑块整体向下移动
                moveDown();
            }else{
                if(c == score) {
                    //说明敲击是错误的,而且判断是否已经弹出gameover
                    isgameover();
                }
            }
            break;
        case 75://K
            if(board[3][1] == 1 && score == 0){
                //第一次敲击键盘正确的话
                //初始化计时器
                timeRun();
                //将游戏开始的提示内容去掉
                clearText();
                //黑块整体向下移动
                moveDown();
            }else if(board[3][1] == 1 && score>0 && c == score ){//如何判断敲击是正确的
                //说明敲击是正确的
                //黑块整体向下移动
                moveDown();
            }else{
                if(c == score) {
                    //说明敲击是错误的,而且判断是否已经弹出gameover
                    isgameover();
                }
            }
            break;
        case 76://L
            if(board[3][2] == 1 && score==0){
                //第一次敲击键盘正确的话
                //初始化计时器
                timeRun();
                //将游戏开始的提示内容去掉
                clearText();
                //黑块整体向下移动
                moveDown();
            }else if(board[3][2] == 1 && score>0 && c == score){//如何判断敲击是正确的
                //说明敲击是正确的
                //黑块整体向下移动
                moveDown();
            }else{
                if(c == score) {
                    //说明敲击是错误的,而且判断是否已经弹出gameover
                    isgameover();
                }
            }
            break;
    }
});
function clearText() {
    $("#block-3-0").text("");
    $("#block-3-1").text("");
    $("#block-3-2").text("");
}
function timeRun(){
    timerun += 0.001;
    $("span").text(timerun.toString().substr(0,5));
    //setTimeout(指定调用的函数,毫秒数)和clearTimeout()
    t = setTimeout("timeRun()",1);
}
function moveDown() {
    //遍历12个黑块，倒序遍历
    for(var i=3;i>=0;i--) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] ==1) {
                if (i == 3) {
                    //将当前黑块改变成白块
                    $("#block-" + i + "-" + j).css("background-color", "#fff");
                    board[i][j] = 0;
                }
                else {
                    var l = i+1;
                    //将当前黑块改变成白块
                    $("#block-" + i + "-" + j).css("background-color", "#fff");
                    board[i][j] = 0;
                    //将当前黑块的下一行同一列的颜色改变成黑色
                    $("#block-" + (l) + "-" + j).css("background-color", "#000");
                    board[l][j] = 1;

                }
            }
        }
    }
    var randy = parseInt(Math.floor(Math.random() * 3));
    var block = $("#block-0-"+randy);
    block.css("background-color","#000");
    board[0][randy] = 1;
    score += 1;
    c += 1;
}
//用于游戏结束部分
function isgameover() {
    //停止游戏的计时器
    clearTimeout(t);
    //游戏结束的提示
    $("body").append("<div id='gameover' class='gameover'><span>本次用时:" + timerun.toString().substr(0, 5) + "秒</span>" +
        "<div id='guanshu'>本次通关数：" + score + "</div>" +
        "<a href='javascript:restartgame();'" + "id='restartgamebutton'>Restart </a></div>");
    var gameover = $("#gameover");
    gameover.css("width", "300px");
    gameover.css("height", "80px");
    gameover.css("background-color", "rgba(0,0,0,0,5)");
    c += 1;
    localStorage.time_save = JSON.stringify(time_save.push(timerun.toString().substr(0, 5)));
    localStorage.guanshu_save = JSON.stringify(guanshu_save.push(score));
    paiming();
}
    function paiming() {
        if (time_save.length >= 300) {
           for(var a=time_save.length;a>5;a--){
               time_save.pop();
           }
        }
        for (var i = guanshu_save.length; i >= 0; i--) {
            for (var j = guanshu_save.length; j > 0 + i; j--) {
                if (guanshu_save[j] > guanshu_save[j - 1]) {
                    // 相邻元素两两对比
                    var temp = guanshu_save[j];        // 元素交换
                    guanshu_save[j] = guanshu_save[j - 1];
                    guanshu_save[j - 1] = temp;
                    var temp2 = time_save[j];
                    time_save[j] = time_save[j - 1];
                    time_save[j - 1] = temp2;
                }
                else if (guanshu_save[j] == guanshu_save[j - 1]) {
                    if (time_save[j] < time_save[j - 1]) {
                        var temp3 = guanshu_save[j];        // 元素交换
                        guanshu_save[j] = guanshu_save[j - 1];
                        guanshu_save[j - 1] = temp3;
                        var temp4 = time_save[j];
                        time_save[j] = time_save[j - 1];
                        time_save[j - 1] = temp4;
                    }
                }
            }
            localStorage.time_save = JSON.stringify(time_save);
            localStorage.guanshu_save = JSON.stringify(guanshu_save);
            switch (time_save.length) {
                case 1: {
                    $(".first").text('通关数:' + guanshu_save[0] +"   "+ '用时:' + time_save[0]);
                    break;
                }
                case 2: {
                    $(".first").text('通关数:' + guanshu_save[0] +"   "+ '用时:' + time_save[0]);
                    $(".second").text('通关数:' + guanshu_save[1]+"   "+ '用时:' + time_save[1]);
                }
                case 3: {
                    $(".first").text('通关数:' + guanshu_save[0] +"   "+ '用时:' + time_save[0]);
                    $(".second").text('通关数:' + guanshu_save[1]+"   "+  '用时:' + time_save[1]);
                    $(".third").text('通关数:' + guanshu_save[2]+"   "+ '用时:' + time_save[2]);
                }
                case 4: {
                    $(".first").text('通关数:' + guanshu_save[0] +"   "+  '用时:' + time_save[0]);
                    $(".second").text('通关数:' + guanshu_save[1]+"   "+  '用时:' + time_save[1]);
                    $(".third").text('通关数:' + guanshu_save[2] +"   "+  '用时:' + time_save[2]);
                    $(".fourth").text('通关数:' + guanshu_save[3]+"   "+ '用时:' + time_save[3]);
                }
                case 5: {
                    $(".first").text('通关数:' + guanshu_save[0]+"   "+ '用时:' + time_save[0]);
                    $(".second").text('通关数:' + guanshu_save[1]+"   "+  '用时:' + time_save[1]);
                    $(".third").text('通关数:' + guanshu_save[2] +"   "+ '用时:' + time_save[2]);
                    $(".fourth").text('通关数:' + guanshu_save[3]+"   "+ '用时:' + time_save[3]);
                    $(".fifth").text('通关数:' + guanshu_save[4]+"   "+ '用时:' + time_save[4]);
                }
            }
        }
    }
//重新开始新的游戏
function restartgame(){
    //去掉游戏结束提示的内容
    $("#gameover").remove();
    //将游戏的计时器重新归0
    $("#time_box").html("<span>0.000</span>"+"秒");
    //将上一次游戏的黑块部分清除
    $(".block").remove();
    //将统计游戏键盘敲击次数归0
    score = 0;
    //重新初始化游戏
    init();
}