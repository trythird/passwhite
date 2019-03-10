// board 表示12个黑块，值为0不是黑块，值为1是黑块
var board = new Array();
var timerun = 0.000;
$(function () {
    init();
});

function init() {
    for(var i=0;i<4;i++) {
        board[i]= new Array();
        for (var j= 0;j< 3;j++) {
            // 白块布局
            var grid=$("#grid-"+i+"-"+j);
            grid.css("top", getPosTop(i, j));
            grid.css("left", getPosLeft(i, j));
// 黑块布局
            $("#grid-container").append($("<div class='block' id='block-" + i + "-" + j + "'></div>"))
            var block = $("#block-" + i + "-" + j);
            block.css("top", getPosTop(i, j));
            block.css("left", getPosLeft(i, j));
            // 将12个黑块的值默认为0
board[i][j]= 0 ;
        }
    }
    for(i=0;i<4;i++){
        // 当前随机的黑块位置与上一行同一列的情况
// 生成随机的列
        var randy = parseInt(Math.floor(Math.random()*3));
        if(i>0 && board[i-1][randy]==1  ){
             randy = parseInt(Math.floor(Math.random()*3));
        }
        // 获取随机生成的黑块的位置
        var block = $("#block-"+i+"-"+randy);
        block.css("background-color","#000");
        board[i][randy]= 1;
    }
$("#block-3-0").text("按J开始");
    $("#block-3-1").text("按K开始");
    $("#block-3-2").text("按L开始");

}


function getPosTop(i,j) {
    return i*107;
}
function getPosLeft(i,j) {
    return j*107;
}