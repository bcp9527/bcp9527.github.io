/**
 * Created by Administrator on 2016/9/20.
 */


$(function(){

    $(".main-show-img-items a").slice(1).fadeOut();
    $(".main-show-img-nums li:eq(0)").addClass("main-show-img-nums-on");
    play();


    //页面滚动时左侧边栏动态
    $(".content-floor").hide();
    $(document).scroll(function(){
        var scrollH=$(window).scrollTop();
        var itemH=$(".floors").offset().top+300;
        var simH=$(".floor-item").outerHeight(true);
        var lastH=$(".floor-item").eq(-1).offset().top;
        var xxx=scrollH+$(window).height()-itemH;
        var yyy=Math.floor(xxx/simH);
        if(scrollH+$(window).height()<itemH||scrollH>(lastH+simH-400)){
            $(".content-floor").hide(300);
            $(".floor-item").find(".f-t-l").removeClass("f-t-l-on").addClass("f-t-l-off");
        }
        else {
            $(".content-floor").show(300);
            setScroll(".content-floor",yyy)
        }

        $('.floors').show();
    });

    //左侧边栏点击
    $("#floor li").on("click",function(){
        var num=parseInt($(this).find("a").text());
        var itemH=$(".floor-item").eq(num-1).offset().top;
        $("html,body").animate({scrollTop:itemH+"px"},1000);

    });

    //左侧边栏动态
    function setScroll(item,num){
        $(item+" span").removeClass("items-t").addClass("items-o");
        $(item+" span:eq("+num+")").removeClass("items-o").addClass("items-t");
        $(".floor-item").find(".f-t-l").removeClass("f-t-l-on").addClass("f-t-l-off");
        $(".floor-item").eq(num).find(".f-t-l").removeClass("f-t-l-off").addClass("f-t-l-on");
    }


    //右侧边栏动态
    $(".right-side li").on({
        mouseover:function(){
            $(this).find("div").removeClass("side-out").addClass("side-on");
        },
        mouseout:function(){
            $(this).find("div").removeClass("side-on").addClass("side-out");
        },
        click:function(){
            if($(this).attr("class")==="to-top"){
                //$(window).scrollTop(0);
                $("html,body").animate({scrollTop:"-=100px"},300);
                $("html,body").animate({scrollTop:"100px"},1000);
                $("html,body").animate({scrollTop:"0px"},300);


            }
        }
    });

    //隐藏广告
    $("#hidead").click(function(){
        $(".title-ad").hide();
    });

    //选择地址标签鼠标经过
    $(".send").hover(
        function () {
            $(".address").removeClass("hide");
        },
        function () {

            $(".address").addClass("hide");
        }
    );

    //选择地址动态
    $(".address span").on({
        click:function (e) {
            var name = e.target.nodeName;
            var value = e.target.nodeValue;
            $(".address span").removeClass("address-select");
            $(this).addClass("address-select");
            $("#send-address").html($(this).attr("value"));
            $(".address").addClass("hide");
        },
        mouseover:function(){
            if(!$(this).hasClass("address-select")){
                $(this).addClass("address-hover");
            }
        },
        mouseout:function(){
            $(this).removeClass("address-hover");
        }

    });

    //选择地址后的显示
    function setAddress(target) {
        $(".address span").removeClass("address-select");
        var ad = target.getAttribute("value");
        $("#send-address").html(ad);
    }

    //顶部其他下拉菜单�
    $(".all-list-item").hover(
        function () {
            $(this).children(".all-list-content").removeClass("hide");
        },
        function () {
            $(this).children(".all-list-content").addClass("hide");
        }
    );

    //顶部小箭头动画��
    $(".warpjiantou").hover(
        function(){
            $(this).find('[class~="jiantou"]').removeClass("i-down").addClass("i-up");
        },
        function(){
            $(this).find('[class~="jiantou"]').removeClass("i-up").addClass("i-down");
        }
    );

    //自动播放��
    var timer;
    function play(){
        clearInterval(timer);
        timer=setInterval(function(){
            //setAnimation($(".main-show-img-items"),"next");
            animate2("next");
        },5000);
    }
    function stop(){
        clearInterval(timer);
    }

    //主轮播图
    $(".content").hover(
        function(){
            stop();
        },
        function(){
            play();
        }
    );

    //主轮播图控制器
    $(".main-show-img i").on({
            click:function(){
                if($(this).attr("class")==="prev"){
                    //setAnimation($(".main-show-img-items"),"prev");
                    animate2("prev");
                }else if($(this).attr("class")==="next"){
                    //setAnimation($(".main-show-img-items"),"next");
                    animate2("next");
                }
            },
            mouseover:function(){
                stop();
            },
            mouseout: function(){
                play();
            }
        }
    );

    //淡入淡出轮播图
    function animate2(direc){
        var items;
        var len;
        var xx;

        if(direc==="prev"){

            items=$(".main-show-img-items a:visible:last");
            len=$(".main-show-img-items").find("a:visible").length;
            setNumsBg(len-2);
            items.fadeOut(200);

            if(len==1){
                xx=$(".main-show-img-items a:hidden");
                xx.fadeIn(200);
                items.fadeIn();
            }
        }else if(direc==="next"){

            len=$(".main-show-img-items").find("a:visible").length;
            items=$(".main-show-img-items a:hidden:first");
            setNumsBg(len);
            if(len==6){
                //$(".content2 img:first").fadeIn(500);
                xx=$(".main-show-img-items a").slice(1);
                xx.fadeOut(200);
            }
            items.fadeIn(200);

        }


    }

    //设置数字标签背景色
    function setNumsBg(len){
        if(len===6){
            len=0;
        }
        $(".main-show-img-nums li").removeClass("main-show-img-nums-on").addClass("main-show-img-nums-over");
        $(".main-show-img-nums").find("li").eq(len).removeClass("main-show-img-nums-over").addClass("main-show-img-nums-on");
    }

    //位移轮播图
    function setAnimation(item,direc){
        var width=item.width();
        var itemWidth=width/item.children().length;
        var itemleft=parseInt(item.css("left"));
        if(itemleft%itemWidth!=0){
            return;
        }
        if(direc==="prev"){
            if(itemleft===0){
                item.css("left",-(width-itemWidth)+"px");
            }
            item.animate({
                left:"+="+itemWidth+"px"
            });

        }else
        {
            if(direc==="next"){
                itemWidth*=-1;
            }
            if(itemleft===-(width+itemWidth)){
                item.css("left","0");
            }

            item.animate({
                left:"+="+itemWidth+"px"
            });
        }
        //如果当前轮播图中有圆点类的标签
        if(item.parent().find("div").hasClass('p')){
            setPoint(item,itemWidth);
        }
    }

    //鼠标经过图片
    $(".main-show-img-items").hover(
        function () {
            stop();
        },
        function () {
            play();
        }
    );
    //鼠标经过数字标签
    $(".main-show-img-nums li").hover(
        function(e){
            stop();
            setNums($(this),$(".main-show-img-items"));
            $(".main-show-img-nums li").removeClass("main-show-img-nums-on").addClass("main-show-img-nums-over");
            $(this).removeClass("main-show-img-nums-over").addClass("main-show-img-nums-on");
        },
        function(){
            play();
        }
    );
    //鼠标经过数字标签动态
    function setNums(target,item){
        var num=target.html();
        item.find("a").fadeOut();
        item.find("a").eq(num-1).fadeIn();
    }

    //副轮播图
    $(".show-image").click(function (e) {
        if (e.target.nodeName.toUpperCase() === "SPAN") {
            showImg(e.target);
        }
    });
    function showImg(target) {
        if (target.getAttribute("class") === "left") {
            setAnimation($(".show-image-list"),"prev");
        } else if (target.getAttribute("class") === "right") {
            setAnimation($(".show-image-list"),"next");
        }
    }

    //猜你喜欢页面小动画
    $(".tuijian").mouseover(function(){
        $(".guess-flash").css("left","-365px").animate({left:"835px"},1000);
    });

    //楼层子列表，默认显示第一个�
    $(".f-i-c-r >div").hide();
    $(".f-i-c-r >div[class~='f-i-c-r-1']").show();

    //楼层tab切换动态效果��̬
    $(".floor-item-t").find("li").mousemove(function(){
        var nnn=$(this);
        var liNum=parseInt($(this).attr("li-num"));
        var par=$(this).parents(".floor-item");
        $(this).parent().find("li").removeClass("floor-list-on").addClass("floor-list-off");
        $(this).removeClass("floor-list-off").addClass("floor-list-on");
        par.find(".f-i-c-r >div").hide();
        par.find(".f-i-c-r >div").eq(liNum).show();
    });


    //楼层内轮播图
    $(".floor-imgs").on({
        click:function(e){
            if (e.target.getAttribute("class") === "left") {
                setAnimation($(".floor-imgs ul"),"prev");
            } else if (e.target.getAttribute("class") === "right") {
                setAnimation($(".floor-imgs ul"),"next");
            }
        },
        mouseover:function(){
            stop2();
        },
        mouseout: function(){
            play2();
        }
    });

    var timer2=null;
    function play2(){
        clearInterval(timer2);
        timer2=setInterval(function(){
            setAnimation($(".floor-imgs ul"),"next");
        },2000);
    }
    function stop2(){
        clearInterval(timer2);
    }
    play2();

    function setPoint(item,iW){
        var lef=parseInt(item.css('left'));
        var n=Math.abs(lef/iW);
        if(n===3){
            n=-1;
        }
        item.parent().find("i").removeClass('f-i-on').addClass('f-i-off');;
        item.parent().find("i").eq(n+1).removeClass('f-i-off').addClass('f-i-on');
    }

    //楼层内轮播图圆点动态效果
    $(".floor-imgs").find("i").hover(
        function(){
            stop2();
            var num=$(this).attr("num");
            var wid=parseInt($(".floor-imgs ul").find("li").css("width"));
            $(".floor-imgs ul").animate({left:-wid*num+'px'});
            $(this).siblings().removeClass('f-i-on').addClass('f-i-off');
            $(this).removeClass('f-i-off').addClass('f-i-on');
        },
        function(){
            play2();
            $(this).removeClass('f-i-on').addClass('f-i-off');
        }
    );


    //天天低价
    $(".days-con li").hover(
        function(){
          $(this).find("a").animate({left:"-6px"});
        },
        function(){
            $(this).find("a").animate({left:"0"});
        }
    );

    //热门晒单轮播图
    var timer3=null;
    function play3(){
        clearInterval(timer3);
        timer3=setInterval(function(){
            shaidanImg();
        },3000);
    }
    function stop3(){
        clearInterval(timer3);
    }

    play3();
    function shaidanImg(){
        $('.days-show ul').animate({top:"-=142px"});
        var t=parseInt($('.days-show ul').css("top"));
        var ih=$('.days-show li').height();
        var h=-($('.days-show ul').height())+3*ih;
        if(t<h){
            $('.days-show ul').animate({top:"0"});
        }
    }
    $('.days-show').hover(
        function(){
            stop3();
        },
        function(){
            play3();
        }
    );





});



