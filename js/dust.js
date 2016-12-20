
//漂浮物
var dustObj=function () {
    this.x=[]
    this.y = [];
    this.amp = [];  //漂浮物振幅
    this.Num = [];   //序号，哪一张图片
    this.alpha = 0;   //角度
}
dustObj.prototype.num = 30;   //数量
//初始化
dustObj.prototype.init=function () {
    for(var i = 0; i < this.num; i++) {
        this.x[i]= Math.random() * canWidth;
        this.y[i]= Math.random() * canHeight;
        this.amp[i]=20 + Math.random() * 15;
        this.Num[i]=Math.floor(Math.random() * 7);
    }
}
dustObj.prototype.draw = function() {
    this.alpha += deltaTime * 0.002;//this.alpha随着时间不断的增加(x轴)
    var l = Math.sin(this.alpha);//y轴正弦函数，控制摆动[-1, 1];
    for(var i = 0; i < this.num; i++) {
        var num = this.Num[i];
        ctx1.drawImage(dustPic[num], this.x[i] + this.amp[i] * l, this.y[i]);
    }
}










