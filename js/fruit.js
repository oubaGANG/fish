/*果实*/
var fruitObj=function () {
    this.alive=[]//存储所有果实的池子
    this.orange = new Image();
    this.blue = new Image();//蓝色果实
    this.x = [];//果实出生时的x坐标
    this.y = [];
    this.aneNO = [];//用来实时监控漂浮海棠头部的坐标
    this.l = []; //果实的(大小)
    this.spd = [];//果实的速度
    this.fruitType = [];    //果实类型
}
fruitObj.prototype.num=30//池子中果实的数量
//初始化
fruitObj.prototype.init=function () {
    for(var i = 0; i < this.num; i++) {
        this.alive[i]=false//true代表生存着（还在画布上） false还没出生
        this.x[i] = 0;
        this.y[i] = 0;
        this.aneNO[i] = 0;  //哪一个海葵
        this.spd[i]=Math.random() * 0.02 + 0.005;//[0.005,0.015)
        this.fruitType[i] = "";
    }
    this.orange.src = './images/fruit.png';
    this.blue.src = './images/blue.png';
}
//画果实
fruitObj.prototype.draw=function () {
    for(var i = 0; i < this.num; i++) {
        //只有果实的状态是可显示的，才画果实
        if(this.alive[i]){
            var pic;
            if(this.fruitType[i] == "blue") {   //判断蓝色还是黄色果实
                pic = this.blue;
            }else {
                pic = this.orange;
            }
            //果实开始生长，到达15的长度开始上浮
            if(this.l[i]<=15){
                var NO = this.aneNO[i];
                this.x[i] = ane.headx[NO];
                this.y[i] = ane.heady[NO];
                this.l[i]+=this.spd[i]*deltaTime
                ctx2.drawImage(pic,this.x[i]-this.l[i] / 2, this.y[i]-this.l[i] / 2, this.l[i], this.l[i])
            }else{
                this.y[i]-=this.spd[i]*8*deltaTime
                ctx2.drawImage(pic,this.x[i]-this.l[i] / 2, this.y[i]-this.l[i] / 2, this.l[i], this.l[i])
            }
            //ctx2.drawImage(pic,this.x[i]-this.l[i] / 2, this.y[i]-this.l[i] / 2, this.l[i], this.l[i])
            //如果果实的y小于10（快出屏幕了）
            if(this.y[i]<10){
                this.alive[i]=false
            }
        }
    }
}
//果实出生
fruitObj.prototype.born = function(i) {
    //出生在哪一个海棠上
    // var aneID=Math.floor(Math.random()*ane.num)
    // this.x[i]=ane.headx[aneID]//果实出生的x坐标，是那个海葵的x坐标
    // this.y[i]=ane.heady[aneID]
    this.aneNO[i] = Math.floor(Math.random() * ane.num);
    this.l[i]=0//果实大小
    this.alive[i] = true;
    var fruRand = Math.random();   //随机果实类型
    if(fruRand < 0.2) {
        this.fruitType[i] = "blue";
    }else {
        this.fruitType[i] = "orange";
    }
}
//检查果实存在的数量
function fruitMonitor() {
    var num = 0;//记录存活的果实数量
    for (var i = 0; i < fruit.num; i++) {
        if (fruit.alive[i]) {
            num++;
        }
    }
    if ( num < 15) {
        //小于15产生果实
        sendFruit();
        return;
    }
}
//产生果实 每次只产生一个
function sendFruit() {
    for (var i = 0; i < fruit.num; i++) {
        if(!fruit.alive[i] ) {
            fruit.born(i);
            return;
        }
    }
}
//果实被吃了
fruitObj.prototype.dead=function (i) {
    fruit.alive[i]=false
}
























