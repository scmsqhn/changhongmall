$(document).ready(function () {
    getPhoneModel();
});

function getPhoneModel() {
    $("#wait-anima").hide();
    $.ajax({
        type: "GET",
        url: "servlet/UserHome?from=get_phoneModel_market",
        dataType: "json",
        success: function (msg) {
            setPhoneModelList(msg);
        }
    });
}

function setPhoneModelList(msg) {
    var data = msg.data;
    var array = eval(data).toString().split(",");
    array.sort();
    for (var i = 0; i < array.length; i++) {
        //console.log(array[i]);
        htm = "<p><input name=\"Fruit\" type=\"checkbox\" value= " + array[i] + " />" + array[i] + "</p>";
        $("#choices").append(htm);
    }
}

function refresh() {
    var arr = new Array();
    var items = document.getElementsByName("Fruit");
    for (i = 0; i < items.length; i++) {
        if (items[i].checked) {
            arr.push(items[i].value);
            console.log(items[i].value);
        }
    }
    if(arr.length == 0){
        alert("请选择机型！");
        return;
    }
    getIMEIList();
}

function getIMEIList() {
    $("#wait-anima").show();
    $("#export").hide();

    $.ajax({
        type: "POST",
        url: "servlet/UserHome?from=get_imeiinfo4",
        data: getQueryURL(),
        dataType: "json",
        success: function (msg) {
            setUserParas(msg);
            $("#wait-anima").hide();
            $("#export").show();
        }
    });
}

function getQueryURL() {
    var url = "";

    var begintime = $("#begintime").val();
    var endtime = $("#endtime").val();

    if (begintime != "") {
        url += "&begintime=" + begintime;
    }
    if (endtime != "") {
        url += "&endtime=" + endtime;
    }

    var arr = new Array();
    var items = document.getElementsByName("Fruit");
    for (i = 0; i < items.length; i++) {
        if (items[i].checked) {
            arr.push(items[i].value);
            console.log(items[i].value);
        }
    }
    if(arr.length == 0)
        return;
    url += "&phones=" + arr.join("+");
    console.log(url);
    return url;
}

function setUserParas(msg) {
    $("#tablevlue1").empty();
    var state = msg.state;
    var data = eval("data="+msg.data);
    var count = data.count;
    if(count == 0){
        alert("未查询到数据！");
        return;
    }
    var userInfos = data.userInfos;
    for(var i=0;i<userInfos.length;i++){
        var userId = userInfos[i].userId;
        var activeTime = userInfos[i].activeTime;
        var phoneModel = userInfos[i].phoneModel;
        var province = userInfos[i].province == undefined ? "":userInfos[i].province;
        var city = userInfos[i].city == undefined ? "":userInfos[i].city;
        //var district = userInfos[i].district == undefined ? "":userInfos[i].district;
        var htm = "<tr>"+"<td width='%10'>" + (i+1) + "</td>"
            +"<td  width='10%'>"+userId+"</td>"
            +"<td  width='10%'>"+""+"</td>"
            +"<td  width='10%'>"+"changhong"+"</td>"
            +"<td  width='10%'>"+phoneModel.split("::")[1]+"</td>"
            +"<td  width='10%'>"+(province+city)+"</td>"
            +"<td  width='10%'>"+dateToStr(activeTime)+"</td>"
            +"<td  width='10%'>"+""+"</td>"
            +"<td  width='10%'>"+""+"</td>"
            +"<td  width='10%'>"+dateToStrPlusYear(activeTime)+"</td>"
            +"</tr>";
        $("#tablevlue1").append(htm);
    }
    tableExport('datagrid1', 'data', "xls");
}

function dateToStr(dateTime){
    var time = "";
    if(dateTime != null){
        var datetime = new Date(dateTime);
        var year = datetime.getFullYear();
        var month = datetime.getMonth()+1;
        var date = datetime.getDate();
        time = year+"-"+month+"-"+date;
    }
    return time;
}
function dateToStrPlusYear(dateTime){
    var time = "";
    if(dateTime != null){
        var datetime = new Date(dateTime);
        var year = datetime.getFullYear()+1;
        var month = datetime.getMonth()+1;//
        var date = datetime.getDate();
        time = year+"-"+month+"-"+date
    }
    return time;
}