//绘制小鱼圆圈特效 创建一个池子，需要了产生一个
//和大鱼差不多
var smallWaveObj=function () {
    this.x=[]
    this.y=[]
    this.r=[]
    this.alive = [];//状态
}
smallWaveObj.prototype.num = 5;//物体池，存放一个个圈圈
//初始化
smallWaveObj.prototype.init=function () {
    for(var i = 0; i < this.num; i++) {
        this.x[i] = 0;
        this.y[i] = 0;
        this.alive[i] = false;
        this.r[i]=0
    }
}
//画圈
smallWaveObj.prototype.draw = function() {
    ctx1.save();
    ctx1.lineWidth = 2;
    ctx1.shadowBlur = 10;
    ctx1.shadowColor = "rgba(123, 45, 145, 1)";
    for(var i = 0; i < this.num; i++) {
        //如果状态活着开始位绘制
        if(this.alive[i]) {
            //半径慢慢增长
            this.r[i] += deltaTime * 0.05;
            if(this.r[i] > 100) {
                this.alive[i] = false;   //当半径大于某个值时消失
                break//作用是为了防止alpha 出现错误的值，不break的话alpha会一直绘制出现负值
            }
            var alpha = 1 - this.r[i] / 100;  //透明度和半径反比
            //开始绘制
            ctx1.beginPath();
            ctx1.arc(this.x[i], this.y[i],this.r[i], 0, Math.PI*2);
            ctx1.closePath();
            ctx1.strokeStyle = "rgba(205, 91, 0," + alpha + ")";
            ctx1.stroke();

        }
    }
    ctx1.restore();
}
//大鱼和小鱼碰撞时 开始出生
smallWaveObj.prototype.born = function(x, y) {
    for(var i = 0; i < this.num; i++) {  
        if( !this.alive[i] ) {//闲置的
            this.alive[i]=true
            this.x[i]=x
            this.y[i]=y
            this.r[i]=10
            return;  //跳出循环，避免所有的都出生
        }
    }}















