$(document).ready(function(){
    //getAPKs();
    getPhoneModel();
});

function getPhoneModel() {
    $.ajax({
        type: "GET",
        url: "servlet/APKServlet?from=get_apk_phones",
        dataType: "json",
        success: function (msg) {
            setPhoneModelList(msg);
        }
    });
}

function setPhoneModelList(msg) {
	$("#apps-table").empty();
	if(msg == undefined)
		return;
	var data = eval("data=" + msg.data);
	var apks = data.phones;

	for(var i=0;i<apks.length;i++){
		var id = apks[i].id;
		var name = apks[i].name;
		// var packageName = apks[i].packageName;
		// var url = apks[i].url;
		// var icon = apks[i].icon == undefined?"":apks[i].icon;
		// var version = apks[i].version;
		// var forced = apks[i].forced==0?"否":"是";
		// var tips = apks[i].tips == undefined?"":apks[i].tips;
		// var phone = apks[i].phone == undefined?"":apks[i].phone;;
		// var province = apks[i].province == undefined?"":apks[i].province;
		// var month = apks[i].month;
		// var brand = apks[i].brand == undefined?"":apks[i].brand;
		// var solution = apks[i].solution == undefined?"":apks[i].solution;

		var htm = "<tr>"
			+"<td width='60%'>"+name+"</td>"
			+"<td width='40%'>"+"|<a href='javascript:deleteapk("+id+",\"你确定删除么?\")' style='color:#44bf77'> 删除  </a>"+"</td>"
			+"</tr>";
		$("#apps-table").append(htm);
	}
}



function deleteapk(id,message){
	if(confirm(message)){
		$.ajax({
			type:"GET",
			url:"servlet/APKServlet?from=del_apk_phones&id="+id,
			dataType:"json",
			success: function(msg){
				alert("删除成功");
				getPhoneModel();
			}
		});
	}
}

function addAPK(){
	var name = $("#name").val();

    if(name != ""){
		var requesturl = "&name="+name;
		$.ajax({
			type:"POST",
			url:"servlet/APKServlet?from=add_apk_phones",
			dataType:"json",
            data: requesturl,
            success: function(msg){
				CloseDiv('MyDiv','fade');
				getPhoneModel();
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
