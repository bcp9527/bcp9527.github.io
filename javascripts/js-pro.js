/**
 * Created by Administrator on 2016/11/17.
 */
$(function(){
    $('.items').addClass('item-hide');
    $('.item-main').click(function(){
        if($(this).next().hasClass('item-hide')){
            $(this).next().removeClass('item-hide');
            $(this).find('span').html('-');
        }else{
            $(this).next().addClass('item-hide');
            $(this).find('span').html('+');
        }
    });
    $('a').click(function(){
        $('li').removeClass('li-h');
        $(this).parent().addClass('li-h').parent().prev().addClass('li-h').parent().prev().addClass('li-h');
    });
});