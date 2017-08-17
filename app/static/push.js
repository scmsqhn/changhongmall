$(document).ready(function(){
	showOrhideUserTag();
	showOrhideUrlDiv();
	showOrhideSendTime();
	showOrhideDivOffline();
	hideDiv();
	getPhoneModel();
	getAllProvince();
	toggleDivProvince();
	toggleDivPhonetype();
});

function pushNotifiction(){
	var title = $("#input-title").val();
	var text = $("#push-content").val();
	if(!isEmpty(title) && !isEmpty(text)){
		$.ajax({
			type:"GET",
			url:getPushNotifictonUrl(),
			dataType:"json",
			success: function(msg){
				if(msg.state==1){
					alert("成功");
				}
			}
		});
	}else if(isEmpty(title)){
		alert("请填写标题");
	}else if(isEmpty(text)){
		alert("请填写内容");
	}
}

function getPushNotifictonUrl(){
	var requestUrl = "servlet/PushServlet?from=push_to_app";
	var title = $("#input-title").val();
	var text = $("#push-content").val();
	var offline = $("input[name='isOffline']:checked").val();
	var offlineExpireTime = $("#offline-time").val();
	var successor = $("input[name='successor']:checked").val();
	var logo = "";
	var logoUrl = "";
	var tagList = "[]";
	if($("#selected-province").val()!=""&&$("#selected-phonetype").val()!=""){
		tagList = "["+$("#selected-province").val()+","+$("#selected-phonetype").val()+"]";
	}else if($("#selected-province").val()!=""&&$("#selected-phonetype").val()==""){
		tagList = "["+$("#selected-province").val()+"]";
	}else if($("#selected-province").val()==""&&$("#selected-phonetype").val()!=""){
		tagList = "["+$("#selected-phonetype").val()+"]";
	}	
	var url = $("#input-url").val();
	var data = "{tagList:"+tagList+",offline:"+offline;
	if(offline == "true"){
		data +=",offlineExpireTime:"+offlineExpireTime;
	}
	if(successor == 0){
		data += ",notificationTemplate:";
	}else if(successor == 1){
		data += ",linkTemplate:";
	}
	data += "{title:"+"\""+title+"\""
		+",text:"+"\""+text+"\""
		+",logo:"+"\""+logo+"\""
		+",logoUrl:"+"\""+logoUrl+"\"";
	if(successor == 1){
		data +=",url:"+"\""+formatStr(url)+"\"";
	}
	data +="}}";
	requestUrl += "&data="+data;
//	alert(requestUrl);
	return requestUrl;
}

function showOrhideUserTag(){
	$(":radio[name='targetUser']").click(function() {
		var index = $(":radio[name='targetUser']").index($(this));
		if(index==1){
			$(".userTag").show();
		}else{
			$(".userTag").hide();
		}	
	});

}

function showOrhideUrlDiv(){
	$(":radio[name='successor']").click(function() {
		var index = $(":radio[name='successor']").index($(this));
		if(index==1){
			$("#urlDiv").show();
		}else{
			$("#urlDiv").hide();
		}	
	});
}

function showOrhideSendTime(){
	$(":radio[name='send-time']").click(function() {
		var index = $(":radio[name='send-time']").index($(this));
		if(index==1){
			$("#sendtime").show();
		}else{
			$("#sendtime").hide();
		}	
	});
}

function showOrhideDivOffline(){
	$(":radio[name='isOffline']").click(function() {
		var index = $(":radio[name='isOffline']").index($(this));
		if(index==0){
			$("#div-offline").show();
		}else{
			$("#div-offline").hide();
		}	
	});
}

function getPhoneModel(){
	$.ajax({
		type:"GET",
		url:"servlet/PushServlet?from=get_push_phonemodel",
		dataType:"json",
		success: function(msg){
			setDivPhoneType(msg);
	        }
	});
	
}
function setDivPhoneType(msg){
	var data = msg.data;
	var array = eval(data).toString().split(",");
	for(var i=0;i<array.length;i++){
		if(array[i]!="pc"){
			htm = '<label class="label-tag"><input type="checkbox" name="check-phonetype" value="'+array[i]+'">'+array[i]+'</label>';
			$("#div-phonetype").append(htm);
		}
		
	}
	$("#div-phonetype").append('<div><input class="submit-phonetype" type="button" value="确定"></div>');
}

function getAllProvince(){
	$.ajax({
		type:"GET",
		url:"servlet/PushServlet?from=get_push_province",
		dataType:"json",
		success: function(msg){
			setDivProvince(msg);
	        }
	});
}

function setDivProvince(msg){
	var data = msg.data;
	var array = eval(data).toString().split(",");
	for(var i=0;i<array.length;i++){
		htm = '<label class="label-tag"><input class="btn-general" type="checkbox" name="check-province" value='+array[i]+'>'+array[i]+'</label>';
		$("#div-provinve").append(htm);
	}
	$("#div-provinve").append('<div><input class="submit-province" type="button" value="确定"></div>');
	
}

function hideDiv(){
	$(".userTag").hide();
	$("#urlDiv").hide();
	$("#sendtime").hide();
	$("#div-provinve").hide();
	$("#div-phonetype").hide();
}

function toggleDivProvince(){
	$("#btn-provinve").click(function(){
		  $("#div-provinve").toggle();
		});
}

function toggleDivPhonetype(){
	$("#btn-phonetype").click(function(){
		  $("#div-phonetype").toggle();
		});
}
$(".submit-province").live("click",getProvinceSelected);
function getProvinceSelected(){
	obj = document.getElementsByName("check-province");
	check_val = [];
	for(k in obj){
		if(obj[k].checked)
			check_val.push(obj[k].value);
	}
//	alert(check_val);
	$("#div-provinve").hide();
	$("#selected-province").val(check_val);
	return check_val;	
}

$(".submit-phonetype").live("click",getPhonetypeSelected);
function getPhonetypeSelected(){
	obj = document.getElementsByName("check-phonetype");
	check_val = [];
	for(k in obj){
		if(obj[k].checked)
			check_val.push(obj[k].value);
	}
//	alert(check_val);
	$("#div-phonetype").hide();
	$("#selected-phonetype").val(check_val);
	return check_val;	
}

function formatStr(stringObj){
	var reg=new RegExp("&","g"); 
	var newstr=stringObj.replace(reg,"%26");
	return newstr;
}

$(function(){  	  
	$('#input-title').bind('input onchange', function() { 
		if($(this).val().length>20){
			$('#input-title').blur();
        	$('#input-title').focus();
		}
	    $('#title-span').html($(this).val().length+"/20");
	});
});

function textarealimit(){ 
	if($('#push-content').val().length>50){
		$('#push-content').blur();
    	$('#push-content').focus();
	}
    $('#content-span').html($('#push-content').val().length+"/50");
}

function isEmpty(param){
	if(param == ""){
		return true;
	}else{
		return false;
	}
}


