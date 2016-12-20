//绘制圆圈特效 创建一个池子，需要了产生一个
var waveObj = function() {
    this.x = [];
    this.y = [];
    this.alive = [];//状态
    this.r = [];  //半径
}
waveObj.prototype.num = 10;    //物体池，存放一个个圈圈
//初始化
waveObj.prototype.init = function() {
    for(var i = 0; i < this.num; i++) {
        this.x[i] = 0;
        this.y[i] = 0;
        this.alive[i] = false;
        this.r[i]=0
    }
};
//画圈
waveObj.prototype.draw = function() {
    ctx1.save();
    ctx1.lineWidth = 2;
    ctx1.shadowBlur = 10;
    ctx1.shadowColor='#fff'
    for(var i = 0; i < this.num; i++) {
        //如果状态活着开始位绘制
        if(this.alive[i]) {
            //半径慢慢增长
            this.r[i] += deltaTime * 0.05;
            if(this.r[i] > 80) {
                this.alive[i] = false;   //当半径大于某个值时消失
                break//作用是为了防止alpha 出现错误的值，不break的话alpha会一直绘制出现负值
            }
            var alpha = 1 - this.r[i] / 80;  //透明度和半径反比
            //开始绘制
            ctx1.beginPath();
            ctx1.arc(this.x[i], this.y[i],this.r[i], 0, Math.PI*2);
            ctx1.closePath();
            ctx1.strokeStyle = "rgba(255,255,255," + alpha + ")";
            ctx1.stroke();
        }
    }
    ctx1.restore();
}
//大鱼和果实碰撞时 开始出生
waveObj.prototype.born = function(x, y) {
    for(var i = 0; i < this.num; i++) {
        if( !this.alive[i] ) {//闲置的
            this.alive[i]=true
            this.r[i] = 10;
            this.x[i] = x;    //来自大鱼和果实碰撞时的坐标值
            this.y[i] = y;
            return;  //跳出循环，避免所有的都出生
        }
    }
}











