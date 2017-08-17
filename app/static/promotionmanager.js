$(document).ready(function(){
	getAllPromotion();
});

function getAllPromotion(){
	$.ajax({
		type:"GET",
		url:"servlet/PromotionServlet?from=get_all_promotion",
		dataType:"json",
		success: function(msg){
			fillTable(msg);
		}
	});
}

function fillTable(msg){
	$("#apps-table").empty();
	$("#games-table").empty();
	for(var i=0;i<msg.length;i++){
		var id = msg[i].id;
		var name = msg[i].name;
		var pkg = msg[i].pkg;
		var logo = msg[i].logo;
		var url = msg[i].url;
		var type = msg[i].type;
		var push = msg[i].push;
		var htm = "<tr>"
			+"<td width='10%'>"+name+"</td>"
			+"<td width='10%'>"+pkg+"</td>"
			+"<td width='30%'>"+logo+"</td>"
			+"<td width='30%'>"+url+"</td>"
			+"<td width='10%'>"+showIsPushText(push)+"</td>"
			+"<td width='10%'>"+"<a href="+setIsPushHref(id,push)+">"+setOrcancelPush(push)+"</a>"
					+"|<a href='javascript:deletepromotion("+id+",\"你确定删除么?\")' style='color:#44bf77'> 删除  </a>"+"</td>"
			+"</tr>";
		if(type == 1){
			$("#apps-table").append(htm);
		}else{
			$("#games-table").append(htm);
		}
		
	}
}

function deletepromotion(id,message){
	if(confirm(message)){
		$.ajax({
			type:"GET",
			url:"servlet/PromotionServlet?from=delete_promotion&id="+id,
			dataType:"json",
			success: function(msg){
				alert("删除成功");
				getAllPromotion();
			}
		});
	}
}

function setIsPushHref(id,push){
	var href ="";
	if(push == 0){
		href="'javascript:update("+id+",1"+",\"你确定推送么?\")'";
	}else{
		href="'javascript:update("+id+",0"+",\"你确定取消推送么?\")'";
	}
	return href;
}

function setOrcancelPush(push){
	var isPush = "";
	if(push == 0){
		isPush ="推送";
	}else{
		isPush ="取消推送";
	}
	return isPush;
}

function update(id,push,message){
	if(confirm(message)){
		$.ajax({
			type:"GET",
			url:"servlet/PromotionServlet?from=update_promotion&id="+id+"&push="+push,
			dataType:"json",
			success: function(msg){
				getAllPromotion();
			}
		});
	}
}

function addPromotion(){
	var name = $("#name").val();
	var pkg = $("#pkg").val();
	var logo = $("#logo").val();
	var url = $("#url").val();
	var type = $("input[name='promotion-type']:checked").val();
	var push = $("input[name='promotion-push']:checked").val();
	var requesturl = "servlet/PromotionServlet?from=add_promotion"
		+"&name="+name+"&pkg="+pkg+"&logo="+formatStr(logo)+"&url="+formatStr(url)+"&type="+type+"&push="+push;
	if(name != "" && pkg != "" && logo != "" && url != ""){
		$.ajax({
			type:"GET",
			url:requesturl,
			dataType:"json",
			success: function(msg){
				CloseDiv('MyDiv','fade');
				getAllPromotion();
			}
		});
	}else{
		alert("请填写完整");
	}
	
}

function showIsPushText(push){
	var ispushText = "";
	if(push == 0){
		ispushText = "否";
	}else{
		ispushText = "是";
	}
	return ispushText;
}

function formatStr(stringObj){
	var reg=new RegExp("&","g"); 
	var newstr=stringObj.replace(reg,"%26");
	return newstr;
}