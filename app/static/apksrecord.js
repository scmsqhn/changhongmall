var pageSize;
var pageNumber = 1;
var pagetotalnum = 1;
var totalNum = 0;

$(document).ready(function () {
    setPageSize();
    getPhoneModel();
});

function setPageSize() {
    if ($.cookie("page_size") != null) {
        pageSize = $.cookie("page_size");
    } else {
        pageSize = 10;
    }
}

function setPageBottom() {
    $("#totalNUm").text(totalNum);
    $("#currentPage").text(pageNumber);
    $("#totalPage").text(pagetotalnum);
}

function getIMEIList() {
    $.ajax({
        type: "GET",
        url: encodeURI(getQueryURL()),
        dataType: "json",
        success: function (msg) {
            setUserParas(msg);
        }
    });

}

function getPhoneModel() {
    $.ajax({
        type: "GET",
        url: "servlet/APKServlet?from=get_apk_phone",
        dataType: "json",
        success: function (msg) {
            setPhoneModelList(msg);
        }
    });

}

function setPhoneModelList(msg) {
    var data = msg.data;
    var array = eval(data).toString().split(",");
    console.log(array);
    array.sort();
    for (var i = 0; i < array.length; i++) {
        if (array[i] != "pc") {
            htm = "<option>" + array[i] + "</option>";
            $("#phoneModel").append(htm);
        }

    }
}

function getQueryURL() {
    var url = "servlet/APKServlet?from=get_apkvsuser";

    var province = $("#province").val();
    var phoneModel = $("#phoneModel").val();
    if (province != "所有省份") {
        url += "&province=" + province;
    }
    if (phoneModel != "所有机型") {
        url += "&phoneModel=" + phoneModel;
    }

    var begintime = $("#begintime").val();
    var endtime = $("#endtime").val();
    if (begintime != "") {
        url += "&begintime=" + begintime;
    }
    if (endtime != "") {
        url += "&endtime=" + endtime;
    }

    url += "&pageSize=" + pageSize + "&pageNumber=" + pageNumber;

    return url;
}

function setUserParas(msg) {
    $("#tablevlue").empty();
    var state = msg.state;
    var data = eval("data=" + msg.data);
    var count = data.count;
    if(count == 0){
        var htm = "<tr>"+"<td width='%100'>" + "没有查询到数据" + "</td>"
            +"</tr>";
        $("#tablevlue").append(htm);
        return;
    }
    totalNum = count;
    var userInfos = data.userInfos;
    pagetotalnum = Math.ceil(count / pageSize);
    for (var i = 0; i < userInfos.length; i++) {
        var userId = userInfos[i].userId;
        var apkPN = userInfos[i].apkPN;
        var activeTime = userInfos[i].dates;
        var phoneModel = userInfos[i].phoneType == undefined ? "":userInfos[i].phoneType;
        var province = userInfos[i].province == undefined ? "":userInfos[i].province;
        var duration = userInfos[i].duration;
        var installed = userInfos[i].installed == 0 ? "否":"是";
        var htm = "<tr>"+"<td width='%10'>" + userId + "</td>"
            +"<td  width='40%'>"+apkPN+"</td>"
            +"<td  width='10%'>"+phoneModel+"</td>"
            +"<td  width='10%'>"+province+"</td>"
            +"<td  width='10%'>"+dateToStr(activeTime)+"</td>"
            +"<td  width='10%'>"+duration+"</td>"
            +"<td  width='10%'>"+installed+"</td>"
            +"</tr>";
        $("#tablevlue").append(htm);
        $("#perpageshownum").val(pageSize);
    }
    setPageBottom();
}

function jumptoPage() {
    if ($("#jumpto").val() != "") {
        pageNumber = parseInt($("#jumpto").val());
        if (pageNumber > pagetotalnum || pageNumber < 1) {
            alert("没有此页,，请重新输入跳转页");
        } else if (pageNumber >= 1 && pageNumber <= pagetotalnum) {
            getIMEIList();
        }
    }
}

//下一页
$("#next_page").live("click", getNextPage);
function getNextPage() {
    if (pageNumber < pagetotalnum) {
        pageNumber += 1;
        getIMEIList();
    }
}

//上一页
$("#pre_page").live("click", getPrePage);
function getPrePage() {
    if (pageNumber > 1) {
        pageNumber -= 1;
        getIMEIList();
    }
}

function resetPageNum() {
    if (pageNumber != 1) {
        pageNumber = 1;
    }
}

//刷新页面
function refreshPage() {
    resetPageNum();
    pageSize = $("#perpageshownum").val();
    $.cookie("page_size", pageSize);
    getIMEIList();
}

function dateToStr(dateTime) {
    var time = "";
    if (dateTime != null) {
        var datetime = new Date(dateTime);
        var year = datetime.getFullYear();
        var month = datetime.getMonth() + 1;//
        var date = datetime.getDate();
        var hour = datetime.getHours();
        var minutes = datetime.getMinutes();
        var second = datetime.getSeconds();

        if (month < 10) {
            month = "0" + month;
        }
        if (date < 10) {
            date = "0" + date;
        }
        if (hour < 10) {
            hour = "0" + hour;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (second < 10) {
            second = "0" + second;
        }
        time = year + "-" + month + "-" + date + " " + hour + ":" + minutes;
    }
    return time;
}