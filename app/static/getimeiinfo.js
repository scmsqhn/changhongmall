function getIMEIinfo(){
	var imei = $("#imeic").val();
	if(imei == ""){
		alert("请输入IMEI!");
		return;
	}
	$.ajax({
		type:"GET",
		url:encodeURI(getURL()),
		dataType:"json",
		success: function(msg){
			setUserParas(msg);
		}
	});
}

function getURL(){
	var url = "servlet/UserHome?from=get_imei_info";
	var imei = $("#imeic").val();
	url += "&imei="+imei;
	return url;
}

function setUserParas(msg){
	$("#tablevlue").empty();
	var state = msg.state;
	var data = eval("data="+msg.data);
	var count = data.count;
	if(count == 0){
		var htm = "<tr>"+"<td width='%100'>" + "没有查询到数据" + "</td>"
		+"</tr>";
		$("#tablevlue").append(htm);
		return;
	}
	var userInfos = data.userInfos;
	for(var i=0;i<userInfos.length;i++){
		var userId = userInfos[i].userId;
		var activeTime = userInfos[i].activeTime;
		var phoneModel = userInfos[i].phoneModel;
		var province = userInfos[i].province == undefined ? "":userInfos[i].province;
		var city = userInfos[i].city == undefined ? "":userInfos[i].city;
		var district = userInfos[i].district == undefined ? "":userInfos[i].district;
		var htm = "<tr>"+"<td width='%15'>" + userId + "</td>"
		+"<td  width='15%'>"+dateToStr(activeTime)+"</td>"
		+"<td  width='15%'>"+province+"</td>"
		+"<td  width='15%'>"+city+"</td>"
		+"<td  width='15%'>"+district+"</td>"
		+"<td  width='15%'>"+phoneModel+"</td>"
		+"</tr>";
		$("#tablevlue").append(htm);
	}
}

function dateToStr(dateTime){
	var time = "";
	if(dateTime != null){
		var datetime = new Date(dateTime);
		var year = datetime.getFullYear();
		var month = datetime.getMonth()+1;//
		var date = datetime.getDate(); 
		var hour = datetime.getHours(); 
		var minutes = datetime.getMinutes(); 
		var second = datetime.getSeconds();
		 
		if(month<10){
		  month = "0" + month;
		}
		if(date<10){
		  date = "0" + date;
		}
		if(hour <10){
		  hour = "0" + hour;
		}
		if(minutes <10){
		  minutes = "0" + minutes;
		}
		if(second <10){
		  second = "0" + second ;
		}
		 
		time = year+"-"+month+"-"+date+" "+hour+":"+minutes;
	}
	return time;
}