
//拖拽滑屏
/*
*
* init:{
*   el: //(必填) --- 被拖拽的父级
*   offBar：gundongtiao()
* }
*
*
* */
function mScroll(init){
    if(!init.el){
        return;
    }
    var wrap = init.el;
    var inner = init.el.children[0];
    var scrollBar = document.createElement("div");
    scrollBar.id = 'scrollBar';
    var startPoint = 0;
    var startEl = 0;
    var lastY = 0;
    var lastDis = 0;
    var lastTime = 0;
    var lastTimeDis = 0;
    var maxTranslate = wrap.clientHeight - inner.offsetHeight;
    if(!init.offBar){ //滚动条
        var scale = wrap.clientHeight/inner.offsetHeight;
        inner.style.minHeight = "100%";
        scrollBar.style.cssText = "width:6px;background:rgba(0,0,0,.5);position:absolute;right:0;top:0;border-radius:3px;opacity:0;transition:.3s opacity;";
        wrap.appendChild(scrollBar);
    }
    css(inner,"translateZ",0.01); //3D加速
    inner.addEventListener('touchstart', function(e) {
        maxTranslate = wrap.clientHeight - inner.offsetHeight;
        if(!init.offBar){
            if(maxTranslate >= 0) {
                scrollBar.style.display = "none";
            } else {
                scrollBar.style.display = "block";
            }
            scale = wrap.clientHeight/inner.offsetHeight;
            scrollBar.style.height = wrap.clientHeight * scale + "px";
        }
        clearInterval(inner.timer);
        startPoint = e.changedTouches[0].pageY;
        startEl = css(inner,"translateY");
        lastY = startEl;
        lastTime = new Date().getTime();
        lastTimeDis = lastDis = 0;
        (init.offBar)||(scrollBar.style.opacity = 1);
        init.start && init.start.call(this,e);
    });
    inner.addEventListener('touchmove', function(e) {
        var nowTime = new Date().getTime();
        var nowPoint = e.changedTouches[0].pageY;
        var dis = nowPoint - startPoint;
        var translateY = startEl + dis;
        css(inner,"translateY",translateY);
        (init.offBar)||css(scrollBar,"translateY",-translateY*scale);
        lastDis = translateY - lastY;
        lastY = translateY;
        lastTimeDis = nowTime - lastTime;
        lastTime = nowTime;

        init.move && init.move.call(this,e);
    });
    inner.addEventListener('touchend', function(e) {
        var type = "easeOut";
        var speed = Math.round(lastDis / lastTimeDis*10);
        speed = lastTimeDis <= 0?0 :speed;
        var target = Math.round(speed*30 + css(inner,"translateY"));
        if(target > 0){
            target = 0;
            type = "backOut";
        } else if(target < maxTranslate){
            target = maxTranslate;
            type = "backOut";
        }
        MTween({ //回弹
            el:inner,
            target: {translateY:target},
            time: Math.round(Math.abs(target - css(inner,"translateY"))*1.8),
            type: type,
            callBack: function(){
                (init.offBar) || (scrollBar.style.opacity = 0);
                init.over && init.over.call(this,e);
            },
            callIn: function(){
                var translateY = css(inner,"translateY");
                init.offBar||css(scrollBar,"translateY",-translateY*scale);
                init.move && init.move.call(this,e);
            }
        });

        init.end && init.end.call(this,e);
    });
}


//两点间的距离
function getDis(point1,point2){
    var x = point2.x - point1.x;
    var y = point2.y - point1.y;
    return Math.sqrt(x*x + y*y);
}
//角度差
function getDeg(point1,point2){
    var x = point2.x - point1.x;
    var y = point2.y - point1.y;
    return Math.atan2(y,x)*180/Math.PI;
}
//多只操作
/*
 init:{
        el:element//元素, (必填)
        start:fn//gesturestart要做的操作,
        change:fn//gesturechange要做的操作,
        end:fn//gestureend要做的操作
    }
*/
function setGesture(init){
    var el = init.el;
    var isGestrue = false;
    var startPoint = [];
    if(!el){
        return;
    }
    el.addEventListener('touchstart', function(e) {
        if(e.touches.length >= 2){
            isGestrue = true;
            startPoint[0] = {x:e.touches[0].pageX,y:e.touches[0].pageY};
            startPoint[1] = {x:e.touches[1].pageX,y:e.touches[1].pageY};
            init.start&&init.start.call(el,e);
        }
    });
    el.addEventListener('touchmove', function(e) {
        if(isGestrue&&e.touches.length >= 2){
            var nowPoint = [];
            nowPoint[0] = {x:e.touches[0].pageX,y:e.touches[0].pageY};
            nowPoint[1] = {x:e.touches[1].pageX,y:e.touches[1].pageY};
            var startDis = getDis(startPoint[0],startPoint[1]);
            var nowDis = getDis(nowPoint[0],nowPoint[1]);
            e.scale = nowDis/startDis;

            var startDeg = getDeg(startPoint[0],startPoint[1]);
            var nowDeg = getDeg(nowPoint[0],nowPoint[1]);
            e.rotation = nowDeg - startDeg;
            init.change&&init.change.call(el,e);
        }
    });
    el.addEventListener('touchend', function(e) {
        if(isGestrue){
            if(e.touches.length < 2 || e.targetTouches.length < 1){
                isGestrue = false;
                init.end&&init.end.call(el,e);
            }
        }
    });
}
