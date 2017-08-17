$(document).ready(function(){
	getAllBranch();
});

function getAllBranch(){
	$.ajax({
		type:"GET",
		url:"servlet/UserHome?from=get_all_branch",
		dataType:"json",
		success: function(msg){
			setBranchParam(msg);
		}
	});
}

function getBranch(){
	if(getProvince() == 0){
		getAllBranch();
	}else{
		$.ajax({
			type:"GET",
			url:encodeURI("servlet/UserHome?from=get_branch&province="+getProvince()),
			dataType:"json",
			success:function(msg){
				setBranchParam(msg);
			}
		});
	}	
}

function getProvince(){
	var province = $("#province").val();
	return province;
}

function setBranchParam(msg){
	$("#tablevlue").empty();
	var state = msg.state;
	var data = JSON.parse(msg.data);
	for(var i=0; i<data.length; i++){
		var branchId = data[i].branchId;
		var brands = data[i].brands;
		var branchProvince = data[i].branchProvince;
		var branchAddr = data[i].branchAddr;
		var branchName = data[i].branchName;
		var branchTel = data[i].branchTel;
		var branchMobileTel = data[i].branchMobileTel;
		var branchHours = data[i].branchHours;
		if(branchTel == null){
			branchTel = "";
		}
		if(branchMobileTel == null){
			branchMobileTel = "";
		}
		if(branchHours == null){
			branchHours = "";
		}
		var htm = "<tr>"+"<td width='8%'>"+brands+"</td>"
			+"<td  width='8%'>"+branchProvince+"</td>"
			+"<td  width='8%'>"+branchAddr+"</td>"
			+"<td  width='15%'>"+branchName+"</td>"
			+"<td  width='13%'>"+branchTel+"</td>"
			+"<td  width='8%'>"+branchMobileTel+"</td>"
			+"<td  width='8%'>"+branchHours+"</td>"
			+"<td  width='7%'>"+"<a href='javascript:showBranchPop("+JSON.stringify(data[i])+")'>修改</a> " 
			+"| <a href='javascript:deleteBranch("+branchId+",\"你确定删除么\""+")'>删除</a>"+"</td>"
			+"</tr>";
		$("#tablevlue").append(htm);
	}
}

function addBranchInfo(){
	$.ajax({
		type:"GET",
		url:"servlet/UserHome?from=add_branchinfo&data="+getAddBranchinfo(),
		dataType:"json",
		success:function(msg){
			if(msg.state == 1){
				CloseDiv('MyDiv2','fade2');
				alert("增加成功");
			}
		}
	});
}

function getAddBranchinfo(){
	var data = "";
	var brands = $("#brands").val();
	var branchProvince = $("#branchProvince").val();
	var branchAddr = $("#branchAddr").val();
	var branchName = $("#branchName").val();
	var branchTel = $("#branchTel").val();
	var branchMobileTel = $("#branchMobileTel").val();
	var branchHours = $("#branchHours").val();
	var branchCity = $("#branchCity").val();
	data = "{brands:"+brands+",branchProvince:"+branchProvince+",branchAddr:"+branchAddr
		+",branchName:"+branchName;
	if(branchTel != ""){
		data += ",branchTel:"+branchTel;
	}
	if(branchMobileTel != ""){
		data += ",branchMobileTel:"+branchMobileTel;
	}
	if(branchHours != ""){
		data += ",branchHours:"+branchHours;
	}
	if(branchCity != ""){
		data += ",branchCity:"+branchCity;
	}
	data += "}";
//	alert(data);
	return data;
}

function updateBranch(){
	var data = "";
	var branchId = $("#branchId1").val();
	var branchAddr = $("#branchAddr1").val();
	var branchName = $("#branchName1").val();
	var branchTel = $("#branchTel1").val();
	var branchMobileTel = $("#branchMobileTel1").val();
	var branchHours = $("#branchHours1").val();
	var branchCity = $("#branchCity1").val();
	data = "{branchId:"+branchId+",branchAddr:"+branchAddr+",branchName:"+branchName
		+",branchTel:"+branchTel+",branchMobileTel:"+branchMobileTel
		+",branchHours:"+"\""+branchHours+"\""+",branchCity:"+branchCity
		+"}";
	if(isEmpty(branchHours) && isEmpty(branchCity)){
		$.ajax({
			type:"GET",
			url:encodeURI("servlet/UserHome?from=update_branch&data="+data),
			dataType:"json",
			success:function(msg){
				if(msg.state == 1){
					CloseDiv('MyDiv','fade');
					alert("修改成功");
				}
			}
		});
	}
	
	
}
function isEmpty(param){
	if(param == ""){
		alert("请填写完整");
		return false;
	}else{
		return true;
	}
}
function deleteBranch(branchId,message){
	if(confirm(message)){
//		alert("成功");
		$.ajax({
			type:"GET",
			url:encodeURI("servlet/UserHome?from=update_branch&data="+data),
			dataType:"json",
			success:function(msg){
				if(msg.state == 1){
					CloseDiv('MyDiv','fade');
					alert("修改成功");
				}
			}
		});
	}
}


function checkTheme(themeId){
	ShowDiv('MyDiv3','fade3');
}