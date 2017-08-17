$(document).ready(function(){
    getAPKs();
    getPhoneModel();
});

function getPhoneModel() {
    $.ajax({
        type: "GET",
        url: "servlet/UserHome?from=get_phoneModel_market2",
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
        if (array[i] != "pc") {
            htm = "<option>" + array[i] + "</option>";
            $("#phoneModel").append(htm);
        }
    }
}

function getAPKs(){
	$.ajax({
		type:"GET",
		url:"servlet/APKServlet?from=check_apk",
		dataType:"json",
		success: function(msg){
			fillTable(msg);
		}
	});
}

function fillTable(msg){
	$("#apps-table").empty();

    var data = eval("data=" + msg.data);
    var apks = data.apks;

	for(var i=0;i<apks.length;i++){
        var id = apks[i].id;
        var name = apks[i].name;
        var packageName = apks[i].packageName;
        var url = apks[i].url;
		var icon = apks[i].icon == undefined?"":apks[i].icon;
		var version = apks[i].version;
        var forced = apks[i].forced==0?"否":"是";
		var tips = apks[i].tips == undefined?"":apks[i].tips;
		var phone = apks[i].phone == undefined?"":apks[i].phone;;
        var province = apks[i].province == undefined?"":apks[i].province;
        var month = apks[i].month;
        var brand = apks[i].brand == undefined?"":apks[i].brand;
		var solution = apks[i].solution == undefined?"":apks[i].solution;

		var htm = "<tr>"
			+"<td width='7%'>"+name+"</td>"
            +"<td width='7%'>"+packageName+"</td>"
            +"<td width='8%'>"+url+"</td>"
            +"<td width='8%'>"+icon+"</td>"
            +"<td width='4%'>"+version+"</td>"
            +"<td width='8%'>"+forced+"</td>"
            +"<td width='8%'>"+tips+"</td>"
            +"<td width='8%'>"+phone+"</td>"
            +"<td width='8%'>"+province+"</td>"
            +"<td width='8%'>"+month+"</td>"
            +"<td width='8%'>"+brand+"</td>"
            +"<td width='8%'>"+solution+"</td>"
			+"<td width='10%'>"+"|<a href='javascript:deleteapk("+id+",\"你确定删除么?\")' style='color:#44bf77'> 删除  </a>"+"</td>"
			+"</tr>";
			$("#apps-table").append(htm);
	}
}

function deleteapk(id,message){
	if(confirm(message)){
		$.ajax({
			type:"GET",
			url:"servlet/APKServlet?from=del_apk&id="+id,
			dataType:"json",
			success: function(msg){
				alert("删除成功");
				getAPKs();
			}
		});
	}
}

function addAPK(){
	var name = $("#name").val();
	var packageName = $("#packageName").val();
	var url = $("#url").val();
	var icon = $("#icon").val();
	var version = $("#version").val();
	var forced = $("input[name='apk-forced']:checked").val();
	var tips = $("#tips").val();
    var phone = $("#phoneModel").val();
    var province = $("#province").val();
    var month = $("#month").val();
	var brand = $("#brand").val();
	var solution = $("#solution").val();

    console.log(province);
    console.log(month);

    if(name != "" && packageName != "" && url != "" && version != ""){
		var requesturl = "&name="+name+"&packageName="+packageName+"&icon="+formatStr(icon)+"&url="+formatStr(url)+"&version="+version+"&forced="+forced
            +"&tips="+tips+"&phone="+phone+"&province="+province+"&month="+month+"&brand="+brand+"&solution="+solution;
		$.ajax({
			type:"POST",
			url:"servlet/APKServlet?from=add_apk",
			dataType:"json",
            data: requesturl,
            success: function(msg){
				CloseDiv('MyDiv','fade');
                getAPKs();
			}
		});
	}else{
		alert("请填写完整");
	}
}

function formatStr(stringObj){
	var reg=new RegExp("&","g");
	var newstr=stringObj.replace(reg,"%26");
	return newstr;
}
