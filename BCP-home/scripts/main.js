/**
 * Created by Administrator on 2016/9/20.
 */

$(
    function(){
        var g = function (id) {
            return document.getElementById(id)
        };
        var gc = function (cl) {
            return document.getElementsByClassName(cl)
        };

        play();



//选择目的地
        $(".send").hover(
            function () {
                $(".address").css("display", "block");
            },
            function () {
                $(".address").css("display", "none");
            }
        );
//选择目的地
        g("all-address").addEventListener("click", function (e) {
            var name = e.target.nodeName;
            var value = e.target.nodeValue
            if (name.toUpperCase() === "SPAN") {
                setAddress(e.target);
            }
        });

//选择目的地后修改显示
        function setAddress(target) {
            $(".address span").css({
                "backgroundColor": "#fff",
                "color": "#666"
            });
            var ad = target.getAttribute("value");
            target.style.cssText = "background-color:#f00; color:#fff";
            $("#send-address").html(ad);
        }

//顶部其他下拉菜单的操作
        $(".all-list-item").hover(
            function () {
                $(this).children(".all-list-content").css("display", "block");
            },
            function () {
                $(this).children(".all-list-content").css("display", "none");
            }
        );

//主轮播图
        var imgTimer;
        $(".main-show-img").click(
            function (e) {
                var no = e.target.nodeName.toUpperCase();
                if (no === "I") {
                    setAnimation(e.target);
                }
            }
        );
        //配置动画
        function setAnimation(target) {
            stop();
            var cla=target.getAttribute("class");
            if (cla === "prev") {
                animation($(".main-show-img-items"),720,72,"prev");
            } else {
                animation($(".main-show-img-items"),720,72,"next");
            }
        }

        //自动播放
        function play() {
            imgTimer = setInterval(function () {
                $(".main-show-img-nums li").css("backgroundColor","#333");
                var xxx=parseInt($(".main-show-img-items").css("marginLeft"))/720;
                switch (xxx){
                    case 0:
                        console.log("00000000");
                        break;
                    case 1:
                        console.log("1111111111");
                        break;
                    case 2:
                        console.log("2222222222");
                        break;
                    case 3:
                        console.log("3333333333");
                        break;
                    case 4:
                        console.log("444444444");
                        break;
                    case 5:
                        console.log("H55555555HH");
                        break;
                }
                animation($(".main-show-img-items"),720,72,"next");
            }, 5000);
        }
        //停止动画
        function stop() {
            clearInterval(imgTimer);
        }

//轮播图动态效果

        //鼠标经过
        $(".main-show-img-items").hover(
            function () {

                stop();
            },
            function () {
                play();
            }
        );
        //鼠标经过数字标签
        $(".main-show-img-nums").mouseover(
            function(e){
                stop();
                if(e.target.nodeName.toUpperCase()==="LI"){
                    var item=$(".main-show-img-items");
                    switch (e.target.innerHTML){
                        case "1":
                            item.css("marginLeft", "0");
                            break;
                        case "2":
                            item.css("marginLeft", "-720px");
                            break;
                        case "3":
                            item.css("marginLeft", "-1440px");
                            break;
                        case "4":
                            item.css("marginLeft", "-2160px");
                            break;
                        case "5":
                            item.css("marginLeft", "-2880px");
                            break;
                        case "6":
                            item.css("marginLeft", "-3600px");
                            break;
                    }
                }
            }
        );

//副轮播图

        $(".show-image").click(function (e) {
            if (e.target.nodeName.toUpperCase() === "SPAN") {
                showImg(e.target);
            }
        });
        function showImg(target) {
            if (target.getAttribute("class") === "left") {
                animation($(".show-image-list"),992,16,"prev");
            } else if (target.getAttribute("class") === "right") {
                animation($(".show-image-list"),992,16,"next");
            }
        }


        /*
        * 轮播图函数
        * @item     要操作移动的元素
        * @target   单个元素的宽度，即每次移动的距离
        * @speed    动画速度
        * @direc    移动方向（“prevv”，“next”）
        * */
        function animation(item,target,speed,direc){
            var timer=null;
            var pos=-(parseInt(item.css("marginLeft")));
            var value=0;
            if(pos%target!=0){
                return;
            }
            if(direc==="prev"){
                //value=item.width();
                clearInterval(timer);
                if(pos<=0){
                    console.log("FFFFFFFFFF");
                    var xxx=-(item.width()-target);
                    var zzz=(item.children().length-1)*target;
                    item.css("marginLeft",-zzz+"px");
                    pos=-(parseInt(item.css("marginLeft")));
                    timer=setInterval(function(){
                        value+=speed;
                        if(value>=target){
                            clearInterval(timer);
                        }
                        item.css("marginLeft",-(pos-value)+"px");
                    },10);
                }else{
                    //value=target;
                    timer=setInterval(function(){
                        value+=speed;
                        if(value>=target){
                            clearInterval(timer);
                        }
                        item.css("marginLeft",-(pos-value)+"px");
                    },10);
                }
            }
            else if(direc==="next"){
                clearInterval(timer);
                pos=-(parseInt(item.css("marginLeft")));
                if(pos>=(item.children().length-1)*target){
                    //console.log("FFFFFFFFFF");
                    item.css("marginLeft","0");
                    pos=-(parseInt(item.css("marginLeft")));
                    timer=setInterval(function(){
                        value+=speed;
                        if(value>=target){
                            clearInterval(timer);
                        }
                        item.css("marginLeft",-(pos+value)+"px");
                    },10);
                }else{
                    timer=setInterval(function(){
                        value+=speed;
                        if(value>=target){
                            clearInterval(timer);
                        }
                        item.css("marginLeft",-(pos+value)+"px");
                    },10);
                }
            }

        }





    }
);



