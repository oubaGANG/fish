//碰撞检测

// 判断大鱼和果实的碰撞距离
function momFruitsCollision() {
    if(!data.gameOver){//游戏没结束才能检测碰撞
        for(var i = 0; i < fruit.num; i++) {
            if(fruit.alive[i]){//如果果实存在
                //calLength2是commonFunctions.js封装的
                //返回两个物体直线的距离的平方
                var len=calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y)
                if(len<400){
                    //因为len返回的是平方，小于400就是大鱼和果实之间距离小于20px，距离较近可以被吃了
                    fruit.dead(i)
                    data.fruitNum++//果实数量增加
                    mom.momBodyCount++;//大鱼身体值增加
                    if(mom.momBodyCount > 7) {
                        mom.momBodyCount = 7;
                    }
                    if(fruit.fruitType[i]=='blue'){
                        //吃到蓝色果实
                        data.double=2
                    }
                    wave.born(fruit.x[i],fruit.y[i])
                }
            }
        }
    }
}

// 判断大鱼和小鱼距离（喂果实）
function momBabyCollision() {
    //如果大鱼有食物（data.fruitNum>0）才可以喂小鱼
    if(data.fruitNum>0&&!data.gameOver){
        var len=calLength2(mom.x,mom.y,baby.x,baby.y)
        if(len<900){
            //小鱼身体变化重置为初始（满血状态）
            baby.babyBodyCount=0
            mom.momBodyCount = 0;  //碰撞后大鱼身体恢复
            //增加分数
            //data.reset()
            data.addScore();
            smallWave.born(baby.x,baby.y)
        }
    }

}





