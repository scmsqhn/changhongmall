$(document).ready(function () {
    $("#export").hide();
    getIMEIList();
});

function setData() {
    $("#tabletile").empty();

    var province = new Array("北京","天津","河北","山西","内蒙古","辽宁","吉林","黑龙江","上海","江苏","浙江",
        "安徽","福建","江西","山东","河南","湖北","湖南","广东","广西","海南","重庆","四川","贵州","云南","西藏","陕西","甘肃",
        "宁夏","新疆","青海","其他","总计");
    var html = "<tr><th>型号</th>";

    for(p in province){
        var co = "<th>"+ province[p] + "</th>";
        html += co;
    }
    html += "</tr>"
    $("#tabletile").append(html);
}

function getIMEIList() {
    $("#wait-anima").show();
    $("#result").hide();
    $("#export").hide();

    $.ajax({
        type: "GET",
        url: encodeURI(getQueryURL()),
        dataType: "json",
        success: function (msg) {
            setData();
            setUserParas(msg);
            $("#wait-anima").hide();
            $("#result").show();
        }
    });
}

function getQueryURL() {
    var url = "servlet/UserHome?from=get_phonevsprovince";

    var begintime = $("#begintime").val();
    var endtime = $("#endtime").val();

    if (begintime != "") {
        url += "&begintime=" + begintime;
    }
    if (endtime != "") {
        url += "&endtime=" + endtime;
    }
    return url;
}

function setUserParas(msg) {
    $("#tablevlue").empty();
    var state = msg.state;
    var data = eval("data=" + msg.data);
    var pps = data.pps;
    console.log(pps.length);
    for (var i = 0; i < pps.length; i++) {
        var phone = pps[i].phone;
        var numbers = pps[i].numbers;
        console.log(phone);
        console.log(numbers);
        var htm = "<tr>"+"<td>" + phone + "</td>";
        var count = 0;
        for (var ii = 0; ii < numbers.length-1; ii++){
            count += numbers[ii];
            var col = "<td>"+numbers[ii]+"</td>";
            htm += col;
        }
        var other = numbers[numbers.length-1] - count;
        htm +="<td>"+ other +"</td>";
        var total = numbers[numbers.length-1];
        htm +="<td>"+ total +"</td>";
        htm +="</tr>";
        $("#tablevlue").append(htm);
    }
    $("#export").show();
    var $exportLink = document.getElementById('export');
    $exportLink.addEventListener('click', function(e){
        e.preventDefault();
        if(e.target.nodeName === "A"){
            tableExport('table2', 'test', e.target.getAttribute('data-type'));
        }
    }, false);
}
