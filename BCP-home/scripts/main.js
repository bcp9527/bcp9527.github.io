/**
 * Created by Administrator on 2016/9/20.
 */


$(function(){

    $(".main-show-img-items a").slice(1).fadeOut();
    $(".main-show-img-nums li:eq(0)").addClass("main-show-img-nums-on");
    play();


    $("#hidead").click(function(){
        console.log("AAAAAAA");
            $(".title-ad").hide();
    });

    //ѡ��Ŀ�ĵ�
    $(".send").hover(
        function () {
            $(".address").removeClass("hide");
        },
        function () {

            $(".address").addClass("hide");
        }
    );
    //ѡ��Ŀ�ĵ�
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
    //ѡ��Ŀ�ĵغ��޸���ʾ
    function setAddress(target) {
        $(".address span").removeClass("address-select");
        var ad = target.getAttribute("value");
        $("#send-address").html(ad);
    }

    //�������������˵��Ĳ���
    $(".all-list-item").hover(
        function () {
            $(this).children(".all-list-content").removeClass("hide");
        },
        function () {
            $(this).children(".all-list-content").addClass("hide");
        }
    );
    //����������ͷ��ת����
    $(".warpjiantou").hover(
        function(){
            $(this).find('[class~="jiantou"]').removeClass("i-down").addClass("i-up");
        },
        function(){
            $(this).find('[class~="jiantou"]').removeClass("i-up").addClass("i-down");
        }
    );


    //�������Զ�����
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

    //���ֲ�ͼ
    $(".content").hover(
        function(){
            stop();
        },
        function(){
            play();
        }
    );
    //�������
    $(".main-show-img i").on({
            click:function(){
                console.log($(this).attr("class"));
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

    //���뵭���ֲ�ͼ
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

    //�������ֱ�ǩ����
    function setNumsBg(len){
        if(len===6){
            len=0;
        }
        $(".main-show-img-nums li").removeClass("main-show-img-nums-on").addClass("main-show-img-nums-over");
        $(".main-show-img-nums").find("li").eq(len).removeClass("main-show-img-nums-over").addClass("main-show-img-nums-on");
    }

    //λ���ֲ�ͼ
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
    }

    //��꾭��ͼƬ
    $(".main-show-img-items").hover(
        function () {
            stop();
        },
        function () {
            play();
        }
    );
    //��꾭�����ֱ�ǩ
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
    //��꾭�����ֱ�ǩ��̬Ч��
    function setNums(target,item){
        var num=target.html();
        item.find("a").fadeOut();
        item.find("a").eq(num-1).fadeIn();
    }

    //���ֲ�ͼ
    $(".show-image").click(function (e) {
        if (e.target.nodeName.toUpperCase() === "SPAN") {
            showImg(e.target);
        }
    });
    function showImg(target) {
        if (target.getAttribute("class") === "left") {
            //animation($(".show-image-list"),992,16,"prev");
            setAnimation($(".show-image-list"),"prev");
        } else if (target.getAttribute("class") === "right") {
            //animation($(".show-image-list"),992,16,"next");
            setAnimation($(".show-image-list"),"next");
        }
    }

    //�Ƽ���С����
    $(".tuijian").mouseover(function(){
        $(".guess-flash").css("left","-365px").animate({left:"835px"},1000);
    });

    //��¥����Ĭ����ʾ�����б�Ĭ����ʾ��һ��
    $(".f-i-c-r >div").hide();
    $(".f-i-c-r >div[class~='f-i-c-r-1']").show();

    //¥��tab����̬
    $(".floor-item-t").find("li").mousemove(function(){
        var nnn=$(this);
        var liNum=parseInt($(this).attr("li-num"));
        var par=$(this).parents(".floor-item");
        $(this).parent().find("li").removeClass("floor-list-on").addClass("floor-list-off");
        $(this).removeClass("floor-list-off").addClass("floor-list-on");
        par.find(".f-i-c-r >div").hide();
        par.find(".f-i-c-r >div").eq(liNum).show();
    });


    //����ͼ�ҳ��ͼƬ����
    $(".days-con li").hover(
        function(){
          $(this).find("a").animate({left:"-6px"});
        },
        function(){
            $(this).find("a").animate({left:"0"});
        }
    );



















    //ҳ�����ʱ���Ҳ�����Ķ���
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

    });

    //���������Ч��
    $("#floor li").on("click",function(){
        var num=parseInt($(this).find("a").text());
        console.log(num);
        var itemH=$(".floor-item").eq(num-1).offset().top;
        console.log(itemH);
        $("html,body").animate({scrollTop:itemH+"px"},1000);

    });

    //��������̬Ч��
    function setScroll(item,num){
        $(item+" span").removeClass("items-t").addClass("items-o");
        $(item+" span:eq("+num+")").removeClass("items-o").addClass("items-t");
        $(".floor-item").find(".f-t-l").removeClass("f-t-l-on").addClass("f-t-l-off");
        $(".floor-item").eq(num).find(".f-t-l").removeClass("f-t-l-off").addClass("f-t-l-on");
    }


    //�Ҳ������̬Ч��
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



});



