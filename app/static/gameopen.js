$(document).ready(function(){
	getOpenState();
});

function getOpenState(){
	$.ajax({
		type:"GET",
		url:encodeURI("servlet/GameOpenServlet?from=get_all"),
		dataType:"json",
		success: function(msg){
			dispalyOpenState(JSON.stringify(msg));
	    }
	});
}

function dispalyOpenState(msg){
	$("#tablevlue").empty();
	var data = JSON.parse(msg);
//	alert(data[0].phoneModel);
	for(var i=0; i<data.length; i++){
		var phoneModel = data[i].phoneModel;
		var openType = data[i].openType;
		var openTypeDesc = "";
		if(openType == 0){
			openTypeDesc = "根据用户激活时间打开";
		}else if(openType == 1){
			openTypeDesc = "该机型所有用户全打开";
		}else if(openType == 2){
			openTypeDesc = "该机型所有用户全不打开";
		}
		var htm = "<tr>"+"<td width='10%'>"+phoneModel+"</td>"
		+"<td  width='10%'>"+openTypeDesc+"</td>"
		+"<td  width='20%'>"+"<a href='javascript:showUpdatePop(\""+phoneModel+"\")'>修改</a>" 
		+"| <a href='javascript:deleteOpenState(\""+phoneModel+"\",\"你确定删除么\""+")' style='color:#44bf77'>删除</a>"+"</td>"
		+"</tr>";
	$("#tablevlue").append(htm);
	}
}

function deleteOpenState(phoneModel,message){
	if(confirm(message)){
		$.ajax({
			type:"GET",
			url:encodeURI("servlet/GameOpenServlet?from=delete&phoneModel="+phoneModel),
			dataType:"json",
			success: function(msg){
				getOpenState();
		    }
		});
	}
}

function showUpdatePop(phoneModel){
	ShowDiv('MyDiv','fade');
	$("#opentype-input").val(phoneModel);
}

function updateOpenState(){
		var openType = $("input[name='openType']:checked").val();
		var phoneModel = $("#opentype-input").val();
		$.ajax({
			type:"GET",
			url:encodeURI("servlet/GameOpenServlet?from=update&phoneModel="+phoneModel+"&openType="+openType),
			dataType:"json",
			success: function(msg){
				CloseDiv('MyDiv','fade');
				getOpenState();
		    }
		});
}

function addOpenState(){
	var openType = $("input[name='openType1']:checked").val();
	var phoneModel = $("#opentype-input1").val();
	trim(phoneModel);
	if(!isEmpty(phoneModel)){
		$.ajax({
			type:"GET",
			url:encodeURI("servlet/GameOpenServlet?from=add&phoneModel="+phoneModel+"&openType="+openType),
			dataType:"json",
			success: function(msg){
				CloseDiv('MyDiv1','fade1');
				getOpenState();
		    }
		});
	}
	
}

function isEmpty(param){
	if(param == ""){
		alert("请填写机型");
		return true;
	}else{
		return false;
	}
}

function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

