/*小鱼宝宝*/
this.babyObj=function () {
    this.x = 0;
    this.y = 0;
    this.angle = 0;  //小鱼移动角度变化
    //this.babyEye = new Image();//眼睛
   // this.babyBody = new Image();//身体
    //this.babyTail = new Image();//尾巴
    //鱼尾巴
    this.babyTailTimer = 0;//尾巴摇摆的帧数1次50ms
    this.babyTailCount = 0;//当前指针
    //鱼眼睛
    this.babyEyeTimer = 0;
    this.babyEyeCount = 0;
    this.babyEyeInterval = 1000;//时间间隔，闭眼200ms睁眼随机
    //鱼身体
    this.babyBodyTimer = 0;
    this.babyBodyCount = 0;
}
//初始化
babyObj.prototype.init=function () {
    //初始时出现在小鱼后面
    this.x=canWidth/2-50
    this.y=canHeight/2+150
   this.angle = 0;
    //this.babyEye.src='./images/babyEye0.png'
   // this.babyBody.src='./images/babyFade0.png'
   // this.babyBody.src='./images/babyTail0.png'
}
//画小鱼
babyObj.prototype.draw=function () {
    //小鱼跟着大鱼动
    //lerpDistance是commonFunctions.js封装的，返回距离目标的程度
    ////aim:目标值， cur:当前值， radio:百分比 越大效果越慢
    this.x = lerpDistance(mom.x+50, this.x, 0.95);
    this.y = lerpDistance(mom.y+50, this.y, 0.95);
   //用来计算角度的
    var deltaY = mom.y - this.y;
    var deltaX = mom.x - this.x;
    //小鱼运动时转动角度
    var beta = Math.atan2(deltaY, deltaX) + Math.PI;
    //lerpAngle是commonFunctions.js封装的，返回距离目标的角度
    this.angle = lerpAngle(beta, this.angle, 0.6);


    ctx1.save()
    //尾巴摇摆
    this.babyTailTimer += deltaTime;
    if(this.babyTailTimer > 50){//开始摇摆
        // babyTail计数
        this.babyTailCount = (this.babyTailCount + 1) % 8;   //让它一直在0-8之间
        this.babyTailTimer %= 50;
    }
    //眼睛眨眼
    this.babyEyeTimer += deltaTime;
    //当动画时间大于时间间隔时变化
    if(this.babyEyeTimer>this.babyEyeInterval){
        this.babyEyeCount = (this.babyEyeCount + 1) % 2;
        this.babyEyeTimer%=this.babyEyeInterval//保证babyEyeTimer不会超过babyEyeInterval

        if(this.babyEyeCount === 0){//睁眼时间 间隔随机
            this.babyEyeInterval=Math.random() * 1500 +1000

        }else{//闭眼时间固定200ms
            this.babyEyeInterval = 200;
        }
    }
//身体变白
    if(data.gameStart){//只有点击游戏开始小鱼身体才能慢慢变白
        this.babyBodyTimer += deltaTime;
    }
    if(this.babyBodyTimer > 150) {
        //鱼身体变白在这里不可逆
        this.babyBodyCount = this.babyBodyCount + 1;
        //身体变白的时间
        this.babyBodyTimer %= 150;
        if(this.babyBodyCount > 19) {
            this.babyBodyCount = 19;
            //gameover
            data.gameOver=true
        }
    }
       ctx1.translate(this.x,this.y)//使小鱼跟着大鱼移动
       ctx1.rotate(this.angle)//使小鱼跟着大鱼旋转
    //画小鱼
    var babyTailCount = this.babyTailCount;//尾巴当前的帧数
    var babyEyeCount = this.babyEyeCount;//眼睛当前的帧数
    var babyBodyCount = this.babyBodyCount;//身体变白当前的帧数
//尾巴摆动
         ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width/2+23,-babyTail[babyTailCount].height/2)
    //身体变白
    ctx1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width/2,-babyBody[babyBodyCount].height/2)
    //眼睛眨动
        ctx1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width/2,-babyEye[babyEyeCount].height/2)

     //后绘制的在先绘制的前面
      ctx1.restore()
}








