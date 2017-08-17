$(document).ready(function () {
	queryUserData();
});

 var province = new Array("北京","天津","河北","山西","内蒙古","辽宁","吉林","黑龙江","上海","江苏","浙江",
        "安徽","福建","江西","山东","河南","湖北","湖南","广东","广西","海南","重庆","四川","贵州","云南","西藏","陕西","甘肃",
        "宁夏","新疆","青海","其他","总计");
var ppsData;


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
};

function queryUserData() {
    $("#wait-anima").show();
    $("#container").hide();
	var startDate = $("#begintime").val();
    var endDate = $("#endtime").val();

    //var url = "servlet/Care?from=get_model_count";
    
    $.ajax({
        type: "GET",
        url: encodeURI(getQueryURL()),
        dataType: "json",
        success: function (msg) {
        	if(msg.state == 1){
				patchMessageData(msg);
        		drawTrendChart();
            }
            $("#wait-anima").hide();
            $("#container").show();
        }
    });
}

function patchMessageData(msg){
    var data = eval("data=" + msg.data);
    ppsData = data.pps;
}

function drawTrendChart(){

	var head = new Array();
	var number = new Array();
	var length = ppsData.length;
    for(i=0;i<length;i++){
    	head.push(ppsData[i].phone);
		var nlength = ppsData[i].numbers.length
    	number.push(ppsData[i].numbers[nlength-1]);
    }

    $('#container').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: $("#begintime").val() + ' - ' + $("#endtime").val() + '用户激活统计',
        },
        xAxis: {
            categories: head//修改
        },
        yAxis: {
            min: 0,
            title: {
                text: '数量（台）',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
        	valueSuffix: ''
        },
        //设置点击事件
        plotOptions: {
        	series:{
        		cursor: 'pointer',
        		point:{
        			events:{
            			click: function(event){
            				drawHighchats2(event.point.category);
							ShowDiv('container2','fade');
            			}
            		}
        		},
        		marker: {
                    lineWidth: 1
                }
        	}
        },

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '数量',
            data: number//修改
        }]
    });
}

function openPop(type){
	var url = "servlet/Care?from=test&type="+type;
	$.ajax({
        type: "GET",
        url: encodeURI(url),
        dataType: "json",
        success: function (msg) {
        	if(msg.state == 1){
        		drawHighchats2(msg.data);
            }
        	ShowDiv('container2','fade');
        }
    });
}

function drawHighchats2(type){
	var nlength = ppsData.length;
	var numbers = new Array() ;
	for(j=0 ; j < nlength; j++ ){
		if(ppsData[j].phone == type){
			numbers = ppsData[j].numbers;
			break;
		}
	}
	//numbers.splice(numbers.length-1,numbers.length);

    $('#container3').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: $("#begintime").val() + ' - ' + $("#endtime").val() + type +'机型省份分布' + '  总计' + numbers[numbers.length-1] +'台',
        },
        xAxis: {
            categories: province//修改
        },
        yAxis: {
            min: 0,
            title: {
                text: '数量（台）',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
        	valueSuffix: ''
        },

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '数量',
            data: numbers.slice(0,-1)//修改
        }]
    });
}

function ShowDiv(show_div,bg_div){
	document.getElementById(show_div).style.display='block';
	document.getElementById(bg_div).style.display='block' ;
	var bgdiv = document.getElementById(bg_div);
	bgdiv.style.width = document.body.scrollWidth;
	$("#"+bg_div).height($(document).height());
};

function CloseDiv(show_div,bg_div){
	document.getElementById(show_div).style.display='none';
	document.getElementById(bg_div).style.display='none';
};

