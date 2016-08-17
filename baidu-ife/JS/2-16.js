/**
 * Created by Administrator on 2016/8/11.
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};


/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city=document.getElementById("aqi-city-input").value.trim();//获取城市名称
    var num=document.getElementById("aqi-value-input").value.trim();//获取指数
    if(!city.match(/^[\u4e00-\u9fa5_a-zA-Z\s]+$/)){
        alert("城市名称只能是中文或英文");
        document.getElementById("aqi-city-input").value="";
        return;
    }
    if(!num.match(/^[0-9]*$/)){
        alert("空气质量指数应为数字");
        document.getElementById("aqi-value-input").value="";
        return;
    }

    aqiData[city]=num;

}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var items = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";//添加表头
    for(var city in aqiData){
        //添加每一行表格
        items += "<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button data-city='"+city+"' class='btn-del'>删除</button></td></tr>"
    }
    //如果输入有误，城市名称未获取数据，和表格同样为underfined，显示空“”
    document.getElementById("aqi-table").innerHTML = city ? items : "";
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
    // do sth.
    //获取事件目标对应的data-city属性值，即城市名称
    var city=target.getAttribute("data-city");
    //从对象中删除对应的城市名和指数
    delete aqiData[city];

    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    document.getElementById("add-btn").onclick=addBtnHandle;
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    var table=document.getElementById("aqi-table");
    //添加事件监听器
    table.addEventListener('click',function(e){
        //e.target 监听到的事件目标，浏览器会显示大写的BUTTON
        if(e.target.nodeName.toLowerCase()==="button"){
            //如果点击的事按钮，就执行删除操作，传入事件目标
            delBtnHandle(e.target);
        }
    });
}

init();