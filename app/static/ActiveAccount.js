$(function () {
    var crudate = new Date();
    var beginTime = getthedate(crudate, -31);
    var endTime = getthedate(crudate, -1);
    $("#begintime").val(beginTime);
    $("#endtime").val(endTime);
    getPhoneModel();
    //getActiveProvince();
    queryUserData();
});
//$(document).ready(function(){
//	setPageSize();
//	getPhoneModel();
//	getThemeList();	
//});
function getPhoneModel() {
    $.ajax({
        type: "GET",
        url: "servlet/PushServlet?from=get_phoneModel",
        dataType: "json",
        success: function (msg) {
            setPhoneModelList(msg);
        }
    });

}

function getActiveProvince() {
    $.ajax({
        type: "GET",
        url: "servlet/PushServlet?from=query_user_data_provice",
        dataType: "json",
        success: function (msg) {
            setActiveProvinceList(msg);
        }
    });

}
function setActiveProvinceList(msg) {
    var data = msg.data;
    var array = eval(data).toString().split(",");
    array.sort();
    for (var i = 0; i < array.length; i++) {
        if (array[i] != "pc") {
            htm = "<option>" + array[i] + "</option>";
            $("#activeProvince").append(htm);
        }

    }
}

function setPhoneModelList(msg) {
    var data = msg.data;
    var array = eval(data).toString().split(",");
    array.sort();
    for (var i = 0; i < array.length; i++) {
        if (array[i] != "pc") {
            htm = "<option>" + array[i] + "</option>";
            $("#phoneModel").append(htm);
        }

    }
}

function getPhoneModelQueryURL() {
    var url = "servlet/PushServlet?from=query_user_regist_data";
    var phoneModel = $("#phoneModel").val();
    var begintime = $("#begintime").val();
    var endtime = $("#endtime").val();
    var activeProvince = $("#province").val();


    if (begintime != "") {
        url += "&beginTime=" + begintime;
    }
    if (endtime != "") {
        url += "&endTime=" + endtime;
    }
    if (phoneModel != "所有机型") {
        url += "&phoneModel=" + phoneModel;
    }
    if (activeProvince != "所有省份") {
        url += "&activeProvince=" + activeProvince;
    }
    return url;

}
function queryUserData() {
    $("#wait-anima").show();
    $("#container").hide();
    $.ajax({
        type: "GET",
        url: encodeURI(getPhoneModelQueryURL()),
        dataType: "json",
        success: function (msg) {
            drawTrendChart(msg);
            $("#wait-anima").hide();
            $("#container").show();
        }
    });
}

function drawTrendChart(msg) {
    var data = eval("data=" + msg.data);
    $('#container').highcharts({
        title: {
            text: $("#phoneModel").val() + '用户激活：总计' + data.TotalNum + '台',
            x: -20 //center
        },
        xAxis: {
            categories: data.dateList,
        },
        yAxis: {
            title: {
                text: 'count (个)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: ''
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '新增用户',
            data: data.newRegistCountList
        }, /* {
         name: '累计注册',
         data: data.registTotalCountList
         },  {
         name: '活跃用户',
         data: data.activeCountList
         }, {
         name: '在线用户',
         data: data.onlineCountList
         }*/]
    });
}

function getthedate(dd, dadd) {
    //可以加上错误处理
    var a = new Date(dd);
    a = a.valueOf();
    a = a + dadd * 24 * 60 * 60 * 1000;
    a = new Date(a);
    var m = a.getMonth() + 1;
    if (m.toString().length == 1) {
        m = '0' + m;
    }
    var d = a.getDate();
    if (d.toString().length == 1) {
        d = '0' + d;
    }
    return a.getFullYear() + "-" + m + "-" + d;
}