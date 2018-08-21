# waphtml-learn
viewport 视口(可视区窗口)
	默认不设置viewport一般可视区宽度在移动端是980
	width 可视区的宽度 (number||device-width)
	user-scalable 是否允许用户缩放 (yes||no) iOS10无效 (我们放在事件章节解决)
	initial-scale 初始缩放比例
	minimum-scale 最小缩放比例
	maximum-scale 最大缩放比例

基本设置
    <meta name="viewport" content="width=device-width,user-scalable=no">
    //x5内核 禁止横屏显示
    <meta name="x5-orientation" content="portrait" />
    //x5内核 全屏显示
    <meta name="x5-fullscreen" content="true" />
    //uc 禁止横屏显示
    <meta name="screen-orientation" content="portrait">
    //uc 全屏显示
    <meta name="full-screen" content="yes">
    //禁止 识别 电话号码 邮箱
    <meta name="format-detection" content="telephone=no, email=no" />

css 设置
    清除 点击时的 高亮 状态
    a, input,
    button{
    	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    清除在ios 下按钮圆角
    input,
    button {
    	-webkit-appearance: none;
    	border-radius: 0;
    }

    字体设置
    body {
    	font-family: Helvetica;
    }

    body * {
        禁止用户字体缩放
    	-webkit-text-size-adjust: 100%;
    	选中
    	-webkit-user-select: none;
    }

    Font Boosting  在一段文字我们没有给他设置高度的时候，在webkit内核下，文字的大小被浏览器放大了
    	解决办法:
    		1.设置高度
    		2.设置最大高度 max-height


适配
    //根据屏幕大小 和 目标值 设置视口 缩放比列
    (function(){
    	var w = window.screen.width;
    	var targetW = 320;
    	var scale = w/targetW; //当前尺寸/目标尺寸
    	var meta = document.createElement("meta");
    	meta.name = "viewport";
    	meta.content = "user-scalable=no,initial-scale="+scale+",minimum-scale="+scale+",maximum-scale="+scale+""



    	document.head.appendChild(meta);
    })();
    </script>

   rem
        利用 less 来写样式 计算 rem
        <script>
            (function(){
                var html = document.documentElement;
                var hWidth = html.getBoundingClientRect().width;
                html.style.fontSize = hWidth/15 + "px";
                //设计图750/15 = 50   ---- 1rem = 50px;
            })()
        </script>

弹性盒模型
    新版弹性盒模型
        display: flex;

        主轴方向
            水平
            flex-direction: row
            垂直
            flex-direction: column

        元素排列方向排列
            水平方向
            flex-direction: row-reverse
            垂直方向
            flex-direction: column-reverse

        主轴上的富裕空间管理
            元素在主轴开始位置 ，富裕空间在主轴的结束位置
            justify-content: flex-start;

            元素在主轴结束位置，富裕空间在主轴开始位置
            justify-content: flex-end;

            元素在主轴中间,富裕空间在主轴两侧
            justify-content: center;

            富裕空间平均分配在每两个元素之间
            justify-content: space-between;

            富裕空间平均分配在每个元素两侧
            justify-content: space-around;

            每个元素之间的距离一样
            justify-content: space-evenly

        侧轴方向的富裕空间管理
            /*元素在侧轴开始位置，富裕空间在侧轴结束位置*/
            /*align-items: flex-start;*/

            /*元素在侧轴结束位置，富裕空间在侧轴开始位置*/
            /*align-items: flex-end;*/

            /*元素在侧轴中间位置，富裕空间在侧轴两侧*/
            /*align-items: center;*/

            /*根据侧轴方向上文字的基线对齐*/
            /*align-items: baseline;*/

        元素弹性空间
            flex-grow: 1
        元素具体位置--数值越小越靠前
            order

    旧版弹性和模型
        display: -webkit-box;

        主轴方向
            水平
            -webkit-box-orient: horizontal
            垂直
            -webkit-box-orient: vertical

        元素方向
            主轴-反向
            -webkit-box-direction: reverse
            -webkit-box-direction: normal

        主轴上的富裕空间管理
            /*元素在主轴的开始位置,富裕空间在主轴的结束位置*/
            /*-webkit-box-pack: start;*/

            /*元素在主轴结束位置，富裕空间在主轴开始位置*/
            /*-webkit-box-pack: end;*/

            /*元素在主轴中间,富裕空间在主轴两侧*/
            /*-webkit-box-pack: center;*/

            /*富裕空间平均分配在每两个元素之间*/
            /*-webkit-box-pack: justify;*/

        侧轴方向的富裕空间管理
            /*元素在侧轴开始位置，富裕空间在侧轴结束位置*/
            /*-webkit-box-align: start;*/

            /*元素在侧轴结束位置，富裕空间在侧轴开始位置*/
            /*-webkit-box-align: end;*/

            /*元素在侧轴中间位置，富裕空间在侧轴两侧*/
            /*-webkit-box-align: center;*/

        元素弹性空间
             -webkit-box-flex:1;

        元素具体位置---数值越小越靠前
              -webkit-box-ordinal-group


响应式

    媒体查询

    样式引入
    <link rel="stylesheet" href="01.css" media="all and (min-width:400px)"/>
    <link rel="stylesheet" href="02.css" media="all and (min-width:600px)"/>
    <link rel="stylesheet" href="03.css" media="all and (min-width:800px)"/>
    <link rel="stylesheet" href="04.css" media="all and (min-width:1000px)"/>
    <style>
         @import url(01.css) (min-width:400px);
         @import url(02.css) (min-width:600px);
         @import url(03.css) (min-width:800px);
         @import url(04.css) (min-width:1000px);
    </style>
    -----------bootstrap----------------------


移动端事件
    移动端的三大事件：
        手指按下：
    		ontouchstart
    	手指移动：
    		ontouchmove
    	手指抬起
    		ontouchend

    	注意：
    		在移动端开发的时候，浏览器的模拟器时好时坏，一般不用on的方式绑定事件函数，要用事件绑定的方式(addEventListener)。

    pc上的事件比移动端的事件略慢，大概是在300ms左右

    移动端的点透：
    	当上层元素发生点击的时候，下层元素也有点击（焦点）特性，
    	在300ms之后，如果上层元素消失或者隐藏，目标点就会“漂移”到
    	下层元素身上，就会触发点击行为。

    	解决：
    		1.下层不要使用有点击（焦点）特性的元素。
    		2.阻止pc事件。
    		    优点
    		        1.IOS10下设置meta禁止用户缩放是不可行的。（使用阻止pc事件就可以在IOS10下禁止用户缩放）

                    2.解决IOS10下溢出隐藏的问题。

                    3.禁止系统默认的滚动条、阻止橡皮筋效果

                    4.禁止长按选中文字、选中图片、系统默认菜单

                    5.解决点透问题

                    6.也阻止了焦点元素的焦点行为(要正常使用：ev.stopPropagation()阻止冒泡)


    移动端的事件对象

       当用户在浏览器下触发了某个行为，事件对象会记录用户操作时一些细节信息。

         touches
            当前位于*屏幕*上的所有手指的一个列表
         targetTouches
            位于当前DOM元素上的手指的一个列表
         changedTouches
            涉及当前事件的手指的一个列表


transform---变换
    rotate 旋转  deg
    skew 斜切
    		skewX
    	    skewY
    scale 缩放 (原始大小的多少倍)(x,y)
    		scaleX
    		scaleY

    变换基点
    transform-origin: center center;
    		关键字
    		百分比
    		距离单位(px,em,rem...)
    先写后执行
    box.style.transform = "scale(0.5) rotate(30deg)";


    矩阵
        角度转弧度 = deg*Math.PI/180

        transform: matrix(a,b,c,d,e,f);
                   matrix(1, 0, 0, 1, 0, 0) 默认值
            位移
                x = e + x;
                y = f + y;

            缩放：
                x轴:
            		a = a*x;
            		c = c*x;
            		e = e*x;

            	y轴:
            		b = b*x;
            		d = d*x;
            		f = f*x;

            斜切：
            	x斜切：(deg)
            		c = Math.tan(30/180*Math.PI);
            	y斜切：(deg)
                	b = Math.tan(30/180*Math.PI);

            旋转：
            	a = Math.cos(deg/180*Math.PI);
            	b = Math.sin(deg/180*Math.PI);
            	c = -Math.sin(deg/180*Math.PI);
            	d = Math.cos(deg/180*Math.PI);
    3D
        给父级元素添加 景深
        perspective

        transform-style 元素在做3d变换时，是否保留子元素的3d变换
        		flat 不保留
        		preserve-3d 保留子元素3D变换


陀螺仪操作
    devicemotion  windown 事件
    重力加速度
    e.accelerationIncludingGravity
    x,y,z
        ios Android  z 值是相反的


    列子：摇一摇

检测手机横竖屏切换
    window.addEventListener('orientationchange', function(e)
    {
    	alert(window.orientation);
    });
    window.orientation
        横屏 90 -90
        竖屏 0 - 180

检测手机角度切换
     window.addEventListener('deviceorientation', function(e)
     {
           var x = Math.round(e.beta);
           var y = Math.round(e.gamma);
           var z = Math.round(e.alpha);
           document.innerHTML = "x:"+x;
           documnet.innerHTML += "<br/>y:"+y;
           document.innerHTML += "<br/>z:"+z;
     });

手机的 多指操作
    /// gesture事件只有 ios 有
    gesturestart
        当手指触摸元素，当前屏幕上有两根或者两根以上的手指执行
    gesturechange
          e.scale; 缩放比：change时两根手指之间距离 和 start时两根手指之间的距离比值
          e.rotation 旋转差: change时两根手指形成的直线和start时两根手指形成的直线，中间形成夹角
    gestureend
        当我们触发了 gesturestart时，然后抬起手指，这时屏幕上的手指个少于2个或者当前元素没有手指了，就会触发gestureend


case: 下滑刷新 -- 多只操作



