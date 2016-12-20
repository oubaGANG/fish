//用来计算分值
var dataObj=function(){
    this.fruitNum=0;//果实的数量
    this.double=1//吃到黄色果实值为1 蓝色2
    this.score = 0;	//分值
    this.gameStart = false;   //游戏开始状态判断
    this.gameOver = false;   //游戏结束状态判断
    this.alpha = 0;
    this.isDown=1  //
}
//增加分数 大鱼把果实喂给小鱼，发生
dataObj.prototype.addScore = function() {
    this.score += this.fruitNum * 10 * this.double;
    //重置
    this.fruitNum = 0;
    this.double = 1;
}
//把分值等显示出来
dataObj.prototype.draw=function (x,y) {
    //画布宽高
    var w = can1.width;
    var h = can1.height;
    ctx1.save();
    ctx1.fillStyle = "#fff";
    ctx1.font = "30px Verdana";
   // ctx1.textAlign='center'
    ctx1.shadowColor = "white";
    ctx1.shadowBlur = 10;
    //ctx1.fillText("果实数量" + this.fruitNum, w * 0.5, h - 50);
   // ctx1.fillText("double" + this.double, w * 0.5, h - 70);
    ctx1.fillText("获得分值：" + this.score, w * 0.5, h - 50);
    //画布提示游戏开始
    if(!this.gameStart) {
            this.alpha = 1*this.isDown;
        ctx1.fillStyle = "rgba(255,255,255," + this.alpha + ")";
        ctx1.fillText("点击屏幕开始", w * 0.5, h * 0.5);
    }

    //画布提示游戏结束
    if(this.gameOver) {
        this.alpha += deltaTime * 0.0003;
        if(this.alpha > 1) {
            this.alpha = 1;
        }
        ctx1.fillStyle = "rgba(255,255,255," + this.alpha + ")";
        ctx1.fillText("Game Over", w * 0.5, h * 0.5);
    }
    ctx1.restore();
}








