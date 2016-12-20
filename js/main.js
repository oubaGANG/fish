var can1
var can2
var ctx1
var ctx2
var lastTime//上一帧执行的时间(gameLoop())
var deltaTime//两帧之间的时间间隔
var bgPic = new Image();   //背景图片
var canWidth;   //画布宽度
var canHeight;
var mx;
var	my;  //鼠标移动的位置
var ane;//海棠对象
var fruit;//果实对象
var mom;//大鱼对象
var baby;//小鱼对象
var data;//分值对象
var wave;//圆圈对象
var smallWave//小鱼圆圈对象
var dust//漂浮物对象
var dustPic = [];//漂浮物背景图片
var babyTail = []; //小鱼尾巴数组
var babyEye = [];  //小鱼眨眼数组
var babyBody = []; //小鱼身体数组
var momTail = []; //大鱼尾巴数组
var momEye = [];  //小鱼眨眼数组
var momBodyOra = [];  //大鱼橙色身体
var momBodyBlue = [];  //大鱼蓝色身体
window.onload=game
//主程序
function game() {
    //初始化
    init();

    lastTime = Date.now();
    deltaTime = 0;
    //游戏循环
    gameLoop()
}
//初始化
function init() {

    //can1在上面用来绘制 大鱼小鱼, 漂浮物,分数,效果圆圈
    can1 = document.getElementById("canvas1");
    ctx1 = can1.getContext("2d");
    //can2在下面用来绘制 背景,果实,海葵
    can2 = document.getElementById("canvas2");
    ctx2 = can2.getContext("2d");
    //画布宽高
    canWidth = can1.width;
    canHeight = can1.height;
    //加载背景图片
    bgPic.src="./images/background.jpg";
    //初始化鼠标开始的位置
    mx = canWidth * 0.5;
    my = canHeight * 0.5+100;
    //检测鼠标的移动
    can1.addEventListener('mousemove',onMouseMove, false);
    can1.addEventListener('mousedown',onMouseDown, false);
    //加载海棠
    ane = new aneObj();
    ane.init()
    //加载果实
    fruit = new fruitObj();
    fruit.init();
    //加载大鱼
    mom = new momObj();
    mom.init();
    //加载小鱼
    baby = new babyObj();
    baby.init();
    //加载分值
    data = new dataObj();
    //加载圆圈
    wave = new waveObj();
    wave.init()
    //加载小鱼圆圈
    smallWave = new smallWaveObj();
    smallWave.init()
    //加载漂浮物
    dust = new dustObj();
    for(var i = 0; i < 7; i++) {
        dustPic[i] = new Image();
        dustPic[i].src = "./images/dust" + i + ".png";
    }
    dust.init()

    //初始化小鱼尾巴数组
    for(var i = 0; i < 8; i++) {
        babyTail[i] = new Image();
        babyTail[i].src = "./images/babyTail" + i + ".png";
    }
    //初始化小鱼眨眼数组
    for(var i = 0; i < 2; i++) {
        babyEye[i] = new Image();
        babyEye[i].src = "./images/babyEye" + i + ".png";
    }
    // 初始化身体变白数组
    for(var k = 0; k < 20; k++) {
        babyBody[k] = new Image();
        babyBody[k].src = "./images/babyFade" + k + ".png";
    }
    //初始化大鱼尾巴数组
    for(var i = 0; i < 8; i++) {
        momTail[i] = new Image();
        momTail[i].src = "./images/bigTail" + i + ".png";
    }
    //初始化大鱼眨眼数组
    for(var i = 0; i < 2; i++) {
        momEye[i] = new Image();
        momEye[i].src = "./images/bigEye" + i + ".png";
    }
    //大鱼身体变化
    for(var mbody = 0; mbody < 8; mbody++) {
        momBodyOra[mbody] = new Image();
        momBodyBlue[mbody] = new Image();
        momBodyOra[mbody].src = "./images/bigSwim" + mbody + ".png";
        momBodyBlue[mbody].src = "./images/bigSwimBlue" + mbody + ".png";
    }
    //分值显示样式

    ctx1.textAlign = "center";
}

//游戏循环
function gameLoop() {

    //根据电脑性能智能选取循环时间
    window.requestAnimFrame(gameLoop);
    var now=Date.now()
    deltaTime=now-lastTime//时间差
    lastTime=now
    //防止切换时deltaTime太大而使得食物也太大
    if(deltaTime > 50) {
        deltaTime = 50;
    }
    //console.log(deltaTime)
   drawBackground()//背景
    ane.draw();//海葵
    fruitMonitor()//时刻检查果实的数量
    fruit.draw();//果实
    //把前面一帧的内容清空掉
   ctx1.clearRect(0, 0, canWidth, canHeight);
    mom.draw()//大鱼
    baby.draw()//小鱼
    momFruitsCollision();//大鱼和水果之间的碰撞检测
    momBabyCollision();//判断大鱼和小鱼距离
    data.draw()//数值
    wave.draw()//圆圈
    smallWave.draw()//小鱼圆圈
    dust.draw()//漂浮物
}
//画背景
function drawBackground() {
    ctx2.drawImage(bgPic,0,0,canWidth,canHeight)
}
//监听鼠标移动
function onMouseMove(e) {
    //游戏没结束才可以用鼠标控制,并且点击了游戏开始
  if(!data.gameOver&&data.gameStart){
      if(e.offSetX || e.layerX) {
          // 获取鼠标坐标offSetX火狐不支持所以用layerX
          mx = e.offSetX === undefined ? e.layerX : e.offSetX;
          my = e.offSetY === undefined ? e.layerY : e.offSetY;
      }
  }

}

//监听鼠标点击
function onMouseDown(e) {
    this.isDown=0;
    data.gameStart=true
}












