/**
 * Created by Administrator on 2016/11/17.
 */

$(function(){
    var count= 0,//展示时的变量
        itemLenght= 1,//当前关卡要点几次item
        strict=false;
    $('.ctr span').click(function(){
        $('.btn').toggleClass('ctr-on');
        $('.btn').hasClass('ctr-on')?$('.count').html(itemLenght):$('.count').html('');
    });
    //选择困难模式
    $('.strict').on({
        mousedown: function(){
            $(this).addClass('btn-on');
        },
        mouseup: function(){
            $(this).removeClass('btn-on');
            strict?strict=false:strict=true;
            if(strict){
                $(this).removeClass('strict-off').addClass('strict-on');
            }else{
                $(this).removeClass('strict-on').addClass('strict-off');
            }
        }
    });
    $('.start').on({
        mousedown: function(){
            $(this).addClass('btn-on');
        },
        mouseup: function(){
            $(this).removeClass('btn-on');
            itemsLignt();
        }
    });
    var ids=['b-l','b-r','t-l','t-r','b-r','t-r','t-l','b-l','t-l','b-r','b-l','t-r','t-r','b-r','t-r','t-r','t-l','b-l','t-l','b-r'];
    var list=[];
    for(var i=0; i<20; i++){
        list[i]=ids[Math.floor(Math.random()*4)];
    }
    //动画模拟，关卡演示时的动作
    function itemsLignt(){
        if($('.btn').hasClass('ctr-on')){
            $('.count').html(itemLenght);
        }else{
            $('.count').html('');
        }
        $('#a-'+ids[count])[0].play();
        $('#'+ids[count]).css('opacity','1').animate({
            'opacity':1
        },1000,function(){
            $('#'+ids[count]).css('opacity','.5');
            count++;
            if(count>=itemLenght){
                playerClick();
            }else{
                itemsLignt();
            }
        });
    }
    //玩家点击
    var playerCount=0;
    var timer=null;
    function playerClick(){
        $('.items').addClass('clickable');
        timer=setTimeout(function(){
            wrong();
        },3000);//3秒还未点击正确就提示失败
    }
    $('.items').mousedown(function(){
        if($(this).hasClass('clickable')){
            $(this).css('opacity','1');
        }
    }).mouseup(function(){
        $(this).css('opacity','.5');
        if($(this).hasClass('clickable')){
            if($(this).attr('id')===ids[playerCount]){//点击正确
                $('#a-'+ids[playerCount])[0].play();
                clearTimeout(timer);
                playerCount++;
                if(playerCount>=20){//连续正确20次
                    win();
                    return;
                }
                if(playerCount<itemLenght){//没到当前回合的点击次数
                    playerClick();
                }else{
                    clearTimeout(timer);
                    itemLenght++;
                    count=playerCount=0;
                    $(this).animate({'opacity':'.5'},1000,function(){itemsLignt();});
                }
            }else{//点击错误
                if(strict){//困难模式
                    itemLenght=1;
                }
                wrong();
            }
        }
    });

    function win(){//全部通关
        $('.count').html('WIN');
        alert('YOU WIN !!!');
    }
    function wrong(){//点击失败
        clearTimeout(timer);
        $('#wrong')[0].play();
        $('.items').removeClass('clickable');
        $('.count').html('MISS').css('color','red').animate({'opacity':'1'},1000,function(){
            $('.count').html('').css('color','#0f0');
            $('.items').addClass('clickable');
            count=playerCount=0;
            itemsLignt();
        });
    }

    //停止游戏
    $('.stop').click(function(){
        clearTimeout(timer);
        count=playerCount=0;
        itemLenght= 1;
        strict=false;
        $('.count').html('');
    });
});