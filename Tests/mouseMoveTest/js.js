/**
 * Created by Administrator on 2016/11/18.
 */
var getEl=function(id){
    return document.getElementById(id);
};
var col=["#fff","#7FFF00","#0000CD","#ff0","#000","#FF00FF","#800080"];
var box=getEl("content");
var ctx=box.getContext("2d");
var box2=getEl("content2");
var ctx2=box2.getContext("2d");
var flag=false;
var flag2=false;
var points=[];
box.onmouseover=function(e){
    console.log("IN");
    flag=true;
};
box.onmouseout=function(){
    console.log("OUT");
    flag=false;
    box.width=box.width;
};
box2.onmouseover=function(e){
    console.log("IN");
    flag2=true;
    for(var i=0; i<col.length; i++){
        points.push([Math.floor(Math.random()*600),Math.floor(Math.random()*400)]);
    }
};
box2.onmouseout=function(){
    console.log("OUT");
    flag2=false;
    box2.width=box.width;
    points=[];
};
document.onmousemove=function(e){
    getEl("mouseX").innerHTML= e.pageX;
    getEl("mouseY").innerHTML= e.pageY;
    if(flag){
        drawLine(e.pageX, e.pageY);
    }else if(flag2){
        drawLine2(e.pageX, e.pageY);
    }

};

function drawLine(x,y){
    box.width=box.width;
    for(var i=0; i<col.length; i++){
        ctx.beginPath();
        ctx.strokeStyle=col[i];
        ctx.lineWidth=5;
        ctx.moveTo(Math.floor(Math.random()*600),Math.floor(Math.random()*400));
        ctx.lineTo(x-box.offsetLeft,y-box.offsetTop);
        ctx.stroke();
        ctx.closePath();
    }
}
function drawLine2(x,y){
    box2.width=box2.width;
    for(var i=0; i<col.length; i++){
        ctx2.beginPath();
        ctx2.strokeStyle=col[i];
        ctx2.lineWidth=5;
        ctx2.moveTo(points[i][0],points[i][1]);
        ctx2.lineTo(x-box2.offsetLeft,y-box2.offsetTop);
        ctx2.stroke();
        ctx2.closePath();
    }
}