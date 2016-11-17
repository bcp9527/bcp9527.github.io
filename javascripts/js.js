/**
 * Created by Administrator on 2016/11/17.
 */
$(function(){
    var cols=['#00F','#0F0','#0FF','DAA520','#F00','#4B0082','#191970','#C71585','#F0F','#FF0'];
    $('.show').css({
        'height':$(window).height()-$('.top').height()+'px'
    });
    $('.title').click(drop);
    setInterval(function(){
        drop();
    },3000);
    //main
    function drop(){
        var w=$('.show').width();
        var h=$('.show').height();
        var item=$('<i class="items"></i>');
        item.appendTo($('.show'));
        var size=getR(2,9);
        item.css({
            'width':0,
            'height':0,
            'top':h+'px',
            'left':getR(0,w-90)+'px',
            'backgroundColor':cols[getR(cols.length)]
        });
        item.animate({
            top:h*0.8+'px',
            'width':size*10+'px',
            'height':size*10+'px',
            'opacity':getR(3,10)/10,
            'left':'-='+size*5+'px'
        },1000).animate({
            top:0
        },6000).animate({
            'opacity':'toggle'
        },1000,function(){
            item.remove();
        });
        item.click(function(){
            $(this).stop();
            $(this).animate({
                'width':0,
                'height':0
            },500,function(){
                $(this).empty();
            });
        });
    }
    //m-下限， n-上限
    function getR(m,n){
        if(arguments.length===2){
            return Math.floor(Math.random()*(n-m)+m);
        }else if(arguments.length===1){
            return Math.floor(Math.random()*m);
        }else{
            return Math.floor(Math.random());
        }
    }
});