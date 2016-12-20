/*
绘制海棠*/
var aneObj=function () {
    //海葵摆动，利用二次贝塞尔曲线，起始点，控制点，结束点 简单地说就是头部的x坐标在变化
    //开始点：moveTo(20,20)
    //：quadraticCurveTo(20,100,200,20)控制点(20,100)结束点(200,20)

    //需要在结束点用正弦函数控制，形成摆动
    this.rootx=[]//海棠的根坐标x坐标
   // this.len=[]//海棠的高度
    this.headx = [];   //摇摆结束点x坐标，即海葵头部
    this.heady = [];  //结束点y坐标，
    this.alpha = 0;  //正弦角度，用于控制headx的摆动
    this.amp = [];   //控制振幅，控制摆动幅度
}
aneObj.prototype.num=52//海棠个数
//海棠初始化
aneObj.prototype.init=function () {
    //初始化每个海棠出现的位置和高度
    for(var i = 0; i < this.num; i++) {
        this.rootx[i]=i * 15 + Math.random() * 20;//[0,20)
        this.headx[i]=this.rootx[i];
        // this.len[i] = 170 + Math.random() * 40;
        this.heady[i] =canHeight - 260 + Math.random() * 60;//产生参差不齐的效果
        this.amp[i] = Math.random() * 50 + 30;  //摆动幅度
    }

}
//开始绘制海棠
aneObj.prototype.draw=function () {
    this.alpha += deltaTime * 0.002;   //this.alpha随着时间不断的改变(x轴)
    var l = Math.sin(this.alpha);  //y轴正弦函数，控制头部的摆动[-1, 1];
    ctx2.save();
    ctx2.globalAlpha = 0.6;
    ctx2.strokeStyle = "#3b154e";
    ctx2.lineWidth = 15;
    ctx2.lineCap = "round";

    for(var i = 0; i < this.num; i++) {
        ctx2.beginPath()
        ctx2.moveTo(this.rootx[i], canHeight)//起始点
        this.headx[i] = this.rootx[i] + l * this.amp[i] * 0.5;  //当前海葵头部的具体位置
        //控制点(rootx,canHeight - 150)结束点(this.headx[i],this.heady[i])
        ctx2.quadraticCurveTo(this.rootx[i], canHeight - 150, this.headx[i], this.heady[i])
        ctx2.stroke();
    }
    ctx2.restore();//save(), restore()画笔只在这两者之间起作用,成为一个独立的
}












