/**
 * Created by Administrator on 2016/8/23.
 */

//设置
var set=document.getElementById("set");
var items=document.getElementById("items");
var num=document.getElementById("num");

num.onkeyup=function(){
    //用户手动输入人数时按钮也要动态移动
    moveButton();
}

//点击设置后的操作
set.onclick=function (){
    var text=document.getElementById("num").value.trim();
    if(text.match(/\D/)){
        alert("Number Only !");
        document.getElementById("num").value="";
        return;
    }
    //console.log(text);
    setItems(text);
}

//将人物添加到列表中
function setItems(n){
    var nodes=items.childNodes;
    var m=nodes.length;
    for(var i=0; i<m; i++){
        items.removeChild(nodes[0]);
    }
    for(var i=0; i<n; i++){
        addItem();
    }
}

//创建人物
function addItem(){
    var job=["杀&nbsp;手","医&nbsp;生","狙击手","警&nbsp;察","法&nbsp;官"];
    var cols=["#ee9f1b","#29bde0","#cd23ba","#def03a","#005fb7"];
    var num=Math.floor(Math.random()*5);
    var block=document.createElement("i");
    block.style.cssText="display:inline-block; width:10px; height:10px; background-color:"+cols[num]+"; position:relative; top:-3px;";
    var item=document.createElement("span");
    item.innerHTML=job[num]+"1人";
    item.style.cssText="font-size:26px;margin-left:30px;";
    var box=document.createElement("div");
    box.style.cssText="width: 200px; height:44px; float:left; margin:32px 0 0 40px; color:#ccc";
    box.appendChild(block);
    box.appendChild(item);
    items.appendChild(box);
}

var minus=document.getElementById("minus");
var plus=document.getElementById("plus");

minus.onclick=function(){
    if(num.value.trim()===""||parseInt(num.value.trim())===0){
        console.log("这脑残，都没数了还想往下减");
        return;
    }else{
        num.value=parseInt(num.value)-1;
    }
    moveButton();
}

plus.onclick=function(){
    if(num.value.trim()===""){
        num.value=1;
    }else if(parseInt(num.value)===20){
        console.log("这脑残，你能找到那么多人一起玩啊？");
    } else{
        num.value=parseInt(num.value)+1;
    }
    moveButton();
}


//移动滑块
function moveButton(){
    var button=document.getElementById("button");
    var left=document.getElementById("underline-l");
    var right=document.getElementById("underline-r");

    var n=num.value;
    if(n!=""){
        button.style.left=34+parseInt(n)*19+"px";
        left.style.width=parseInt(n)*19+"px";
        right.style.width=446-parseInt(n)*19+"px";
        right.style.left=32+parseInt(n)*19+"px";
    }else if(n===0||n===""){
        button.style.left=34+"px";
        left.style.width="0";
        right.style.width=446+"px";
        right.style.left=32+"px";
    }

}
