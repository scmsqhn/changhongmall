$(document).ready(function(){
	getApkInfo();
});

function getApkInfo(){
	$.ajax({
		type:"GET",
		url:encodeURI("servlet/UserHome?from=get_apkinfo"),
		dataType:"json",
		success: function(msg){
			if(msg.state == 1){
				setApkInfoParams(msg.data);
			}
	    }
	});
}

function setApkInfoParams(data){
	$("#tablevlue").empty();
	var json = JSON.parse(data);
	var downloadUrl = json.downloadUrl;
	var versionCode = json.versionCode;
	var versionName = json.versionName;
	var desc = json.desc;
//	alert(desc);
	var htm = "<tr><td width='10%'>"+"用户中心"+"</td>"
		+"<td width='10%'>"+versionCode+"</td>"
		+"<td width='20%'>"+versionName+"</td>"
		+"<td width='30%'>"+desc+"</td>"
		+"<td width='20%'><a href='javascript:ShowDiv(\"MyDiv\",\"fade\")'>修改  </a>"
		+"|<a href="+downloadUrl+"> 下载</a>"+"</td>"
		+"<tr>";
	$("#tablevlue").append(htm);
}

function updateApk(){
	if(!isFileEmpty()&&getApkUpdateInfo()!=""){
		$.ajaxFileUpload({
			url : 'servlet/UserHome?from=update_apk&data='+getApkUpdateInfo(),
			secureuri : false,
			fileElementId : 'uploadapk',
			dataType : 'json',
			success : function(status) {
				if(status.state == 1){
					CloseDiv('MyDiv','fade');
					alert("修改成功");
					getApkInfo();
				}	
			}
		});
	}
	
}

function getApkUpdateInfo(){
	var versionCode = $("#versionCode").val();
	var versionName = $("#versionName").val();
	var desc = $("#desc").val();
	var data = "";
	if((!isEmpty(versionCode))&&(!isEmpty(versionName))&&(!isEmpty(desc))){
		data = "{versionCode:"+versionCode+",versionName:"+versionName+",desc:"+"\""+desc+"\""+"}";
	}	
	return data;
}

function isFileEmpty(){
	var file = $("#uploadapk").val();
	if(file==""){
		alert("请选择文件");
		return true;
	}else{
		return false;
	}
}

function isEmpty(param){
	if(param==""){
		alert("请填写完整");
		return true;
	}else{
		return false;
	}
}