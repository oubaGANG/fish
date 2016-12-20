/*大鱼妈妈*/
this.momObj=function () {
    this.x = 0;
    this.y = 0;
    this.angle = 0;  //大鱼移动角度变化
    //this.bigEye = new Image();//眼睛
    this.bigBody = new Image();//身体
    //this.bigTail = new Image();//尾巴
    //鱼尾巴
    this.momTailTimer = 0;//尾巴摇摆的帧数1次50ms
    this.momTailCount = 0;//当前指针
    //鱼眼睛
    this.momEyeTimer = 0;
    this.momEyeCount = 0;
    this.momEyeInterval = 1000;//时间间隔，闭眼200ms睁眼随机
    //鱼身体
    this.momBodyCount = 0;
}
//初始化
momObj.prototype.init=function () {
    //初始时出现在屏幕中央往下100
    this.x=canWidth/2
    this.y=canHeight/2+100
    this.angle = 0;
   // this.bigEye.src='./images/bigEye0.png'
    this.bigBody.src='./images/bigSwim0.png'
    //this.bigTail.src='./images/bigTail0.png'
}
//画大鱼
momObj.prototype.draw=function () {
    //获取当前鼠标坐标x并复制给大鱼的x
    //lerpDistance是commonFunctions.js封装的，返回距离目标的程度
    ////aim:目标值， cur:当前值， radio:百分比 越大效果越慢

    this.x = lerpDistance(mx, this.x, 0.95);
    this.y = lerpDistance(my, this.y, 0.95);
    //用来计算角度的
    var deltaY = my - this.y;
    var deltaX = mx - this.x;
    //大鱼运动时转动角度
    var beta = Math.atan2(deltaY, deltaX) + Math.PI;
    //lerpAngle是commonFunctions.js封装的，返回距离目标的角度
    this.angle = lerpAngle(beta, this.angle, 0.7);
    ctx1.save()
    //大鱼摇尾巴
    this.momTailTimer+=deltaTime;
    if(this.momTailTimer>50){
        this.momTailCount=(this.momTailCount+1)%8
        this.momTailTimer %= 50;
    }
    //眼睛眨眼
    this.momEyeTimer += deltaTime;
    //当动画时间大于时间间隔时变化
    if(this.momEyeTimer>this.momEyeInterval){
        this.momEyeCount = (this.momEyeCount + 1) % 2;
        this.momEyeTimer%=this.momEyeInterval//保证babyEyeTimer不会超过babyEyeInterval

        if(this.momEyeCount === 0){//睁眼时间 间隔随机
            this.momEyeInterval=Math.random() * 1500 +1000

        }else{//闭眼时间固定200ms
            this.momEyeInterval = 200;
        }
    }

        ctx1.translate(this.x,this.y)//使大鱼跟着鼠标移动
        ctx1.rotate(this.angle)//使大鱼跟着鼠标旋转
        var momTailCount=this.momTailCount//尾巴当前的帧数
       var momEyeCount = this.momEyeCount;//眼睛当前的帧数
    //尾巴摇摆
         ctx1.drawImage(momTail[momTailCount],-momTail[momTailCount].width/2+30,-momTail[momTailCount].height/2)
       //大鱼身体变化 在碰撞js检测并改变数量
    var momBodyCount = this.momBodyCount;
         if(data.double==1){
             //橙色
             ctx1.drawImage(momBodyOra[momBodyCount], -momBodyOra[momBodyCount].width * 0.5, -momBodyOra[momBodyCount].height * 0.5);
         }else {
             //蓝色
             ctx1.drawImage(momBodyBlue[momBodyCount], -momBodyBlue[momBodyCount].width * 0.5, -momBodyBlue[momBodyCount].height * 0.5);
         }

    //眼睛眨动
    ctx1.drawImage(momEye[momEyeCount],-momEye[momEyeCount].width/2,-momEye[momEyeCount].height/2)


      ctx1.restore()
}








