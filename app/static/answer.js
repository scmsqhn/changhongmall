
var pageSize;
var pageNumber = 1;
var pagetotalnum = 1;
var totalNum = 0;

$(document).ready(function(){
	setPageSize();
	getPhoneModel();
	getThemeList();	
});

function setPageBottom(){
	$("#totalNUm").text(totalNum);
	$("#currentPage").text(pageNumber);
	$("#totalPage").text(pagetotalnum);
}

function getThemeList(){
	$.ajax({
		type:"GET",
		url:encodeURI(getQueryURL()),
		dataType:"json",
		success: function(msg){
			setParameter(msg);
	        }
	});
	
}

function getPhoneModel(){
	$.ajax({
		type:"GET",
		url:"servlet/UserHome?from=get_phoneModel",
		dataType:"json",
		success: function(msg){
			setPhoneModelList(msg);
	        }
	});
	
}

function setPhoneModelList(msg){
	var data = msg.data;
	var array = eval(data).toString().split(",");
	array.sort();
	for(var i=0;i<array.length;i++){
		if(array[i]!="pc"){
			htm = "<option>"+array[i]+"</option>";
			$("#phoneModel").append(htm);
		}
		
	}
}


function getQueryURL(){
	var url = "servlet/UserHome?from=get_theme_to_web";
	var begintime = $("#begintime").val();
	var endtime = $("#endtime").val();
	var status = $("#status").val();
	var audit = $("#audit").val();
	var classId = $("#class").val();
	var phoneModel = $("#phoneModel").val();
	var userAlias = $("#userAlias").val();
    	var topState = $("input[name='headId']:checked").val();
	if(phoneModel != "所有机型"){
		url += "&phoneModel="+phoneModel;
	}
	if(userAlias != ""){
		url += "&userAlias="+userAlias;
	}
	if(begintime != ""){
		url += "&begintime="+begintime;
	}
	if(endtime != ""){
		url += "&endtime="+endtime;
	}
	if(status != "所有状态"){
		url += "&themeState="+status;
	}
	if(audit != "所有状态"){
		url += "&checkState="+audit;
	}
	if(classId != "所有类型"){
		url += "&classId="+classId;
	}
	if(topState == 1){
		url += "&topState="+topState;
	}
	url += "&pageSize="+pageSize+"&pageNumber="+pageNumber;
//	alert(top);
	return url;
	
}

//下一页
$("#next_page").live("click",getNextPage);
function getNextPage(){
	if(pageNumber<pagetotalnum){
		pageNumber +=1;
		getThemeList();
	}	
}

//上一页
$("#pre_page").live("click",getPrePage);
function getPrePage(){
	if(pageNumber>1){
		pageNumber -= 1;
		getThemeList();
	}	
}

//刷新页面
function refreshPage(){
	resetPageNum();
	pageSize = $("#perpageshownum").val();
	$.cookie("page_size",pageSize);
	getThemeList();
}

function setPageSize(){
	if($.cookie("page_size")!=null){
		pageSize=$.cookie("page_size");
	}else{
		pageSize=20;
	}	
}

function resetPageNum(){
	if(pageNumber !=1){
		pageNumber=1;
	}
}

function jumptoPage(){	
	if($("#jumpto").val() != ""){
		pageNumber = parseInt($("#jumpto").val());
		if(pageNumber > pagetotalnum || pageNumber < 1){
			alert("没有此页,，请重新输入跳转页");
		}else if(pageNumber >= 1 && pageNumber <= pagetotalnum){
			getThemeList();
		}		
	}	
}

function dateToStr(dateTime){
	var time = "";
	if(dateTime != null){
		var datetime = new Date(dateTime);
		var year = datetime.getFullYear();
		var month = datetime.getMonth()+1;//js��0��ʼȡ 
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

function strToDate(strDate){
	//�ַ�ת���ڸ�ʽ��strDateҪתΪ���ڸ�ʽ���ַ�
	return new Date(strDate);
	
}

function setParameter(msg){
	$("#tablevlue").empty();
	var state = msg.state;
	var data = eval("data="+msg.data);
	var themeSum = data.themeSum;
	totalNum = themeSum;
	pagetotalnum = Math.ceil(themeSum/pageSize);
//	alert(themeSum);
	var themeAndUserInfos = data.themeAndUserInfos;
	for(var i=0;i<themeAndUserInfos.length;i++){
		if(themeAndUserInfos[i].userBean != null){
			var themeId = themeAndUserInfos[i].themeBean.themeId;
			var body = themeAndUserInfos[i].themeBean.body;
			var attachPicUrl = themeAndUserInfos[i].themeBean.attachPicUrl;
			var createTime = themeAndUserInfos[i].themeBean.createTime;
			var themeState = themeAndUserInfos[i].themeBean.themeState;
			var replyNum = themeAndUserInfos[i].themeBean.replyNum;
			var checkState = themeAndUserInfos[i].themeBean.checkState;
			var classId = themeAndUserInfos[i].themeBean.classId;
			var classId2 = themeAndUserInfos[i].themeBean.classId2;
			var disposeType = themeAndUserInfos[i].themeBean.disposeType;
			var lateReplyTime = themeAndUserInfos[i].themeBean.lateReplyTime;
			var phoneModel = themeAndUserInfos[i].themeBean.phoneModel;
			var hardVersion = themeAndUserInfos[i].themeBean.hardVersion == undefined ? "":themeAndUserInfos[i].themeBean.hardVersion;
			var topState = themeAndUserInfos[i].themeBean.topState;
			var userAlias = themeAndUserInfos[i].userBean.userAlias;
			var headUrl = themeAndUserInfos[i].userBean.headUrl;
			var userId = themeAndUserInfos[i].userBean.userId;
			var contact = "";
			if(typeof(themeAndUserInfos[i].themeBean.contact) != "undefined")
			{
				contact = themeAndUserInfos[i].themeBean.contact;
			}
			
			var htm = "<tr>"+"<td width='8%'>"+dateToStr(createTime)+"</td>"
				+"<td width='8%'>"+dateToStr(lateReplyTime)+"</td>"
				+"<td width='8%'>"+phoneModel+"</td>"
				+"<td width='6%'>"+hardVersion+"</td>"
				+"<td width='7%'>"+userAlias+"</td>"
				+"<td width='22%'>"+cutStr(body,50)+"</td>"
				+"<td width='10%'>"+contact+"</td>"
				+"<td width='5%'>"+themeStateDesc(themeState)+"</td>"
				+"<td width='5%'>"+replyNum+"</td>"
				+"<td width='7%'>"+checkStateDesc(checkState)+"</td>"
				+"<td width='5%'>"+classId+"</td>"	
				+"<td width='8%'>"+"<a href='javascript:showPop("+themeId+",\""+body+"\",\""+userAlias+"\",\""+userId+"\""
					+",\""+attachPicUrl+"\")'>回复  </a>" 
				+"|<a id='top' style='color:#cf2233' href="+setTophref(topState,themeId,phoneModel)+">"+setOrcancelTop(topState)+"</a>"
				+"|<a style='color:#cf2233' href="+setEssencehref(disposeType,themeId)+"> "+setOrcancelEssence(disposeType)+"</a>"
				+"|<a href='javascript:deleteTheme("+themeId+",\"你确定删除么?\")' style='color:#cfbfbf'> 删除  </a>"
				+"|<a href='javascript:checkTheme("+themeId+")'>审核</a>"+"</td>"
				+"</tr>";
			$("#tablevlue").append(htm);
			$("#perpageshownum").val(pageSize);
		}
	}
	setPageBottom();
};

function setTophref(topState,themeId,phoneModel){
	var href ="";
	if(topState == 0){
		href="'javascript:setTopTheme("+themeId+",\"你确定置顶么?\",\""+phoneModel+"\")'";
	}else{
		href="'javascript:cancelTopTheme("+themeId+",\"你确定取消置顶么?\",\""+phoneModel+"\")'";
	}
	return href;
}
function setOrcancelTop(topState){
	var topOrnottop = "";
	if(topState == 0){
		topOrnottop ="置顶";
	}else{
		topOrnottop ="取消置顶";
	}
	return topOrnottop;
}
function setEssencehref(disposeType,themeId){
	var href ="";
	if(disposeType == 0){
		href="'javascript:setEssenceTheme("+themeId+",\"你确定加精么?\")'";
	}else{
		href="'javascript:cancelEssenceTheme("+themeId+",\"你确定取消加精么?\")'";
	}
	return href;
}
function setOrcancelEssence(disposeType){
	var isEssence = "";
	if(disposeType == 0){
		isEssence ="加精";
	}else{
		isEssence ="取消加精";
	}
	return isEssence;
}
function deleteTheme(themeId,message){
//	if(confirm(message)){
//		alert("成功");
//	}
}

function themeStateDesc(themeState){
	var desc = "";
	if(themeState == 0){
		desc = "未回复";
	}else if(themeState == 1){
		desc = "<span style='color:red;'>待回复</span>";
	}else if(themeState == 2){ 
		desc = "已回复";
	}else if(themeState == 3){
		desc = "关闭";
	}	
	return desc;
}

function checkStateDesc(checkState){
	var desc = "";
	if(checkState == 0){
		desc = "<span style='color:red;'>未审核</span>";
	}else if(checkState == 1){
		desc = "审核未通过";
	}else if(checkState == 2){
		desc = "审核通过";
	}
	return desc;
}
function setTopTheme(themeId,message,phoneModel){
	if(confirm(message)){
		$.ajax({
			type:"GET",
			url:"servlet/UserHome?from=set_toptheme&themeId="+themeId+"&phoneModel="+phoneModel,
			dataType:"json",
			success: function(msg){
				if(msg.state == 1){
					alert("置顶成功");
					getThemeList();
				}				
		    }
		});
	};
};

function cancelTopTheme(themeId,message,phoneModel){
	if(confirm(message)){
		$.ajax({
			type:"GET",
			url:"servlet/UserHome?from=cancel_toptheme&themeId="+themeId,
			dataType:"json",
			success: function(msg){
				if(msg.state == 1){
					alert("取消置顶成功");
					getThemeList();
				}				
		    }
		});
	}
}

function setEssenceTheme(themeId,message){
	if(confirm(message)){
		$.ajax({
			type:"GET",
			url:"servlet/UserHome?from=set_essence_theme&themeId="+themeId,
			dataType:"json",
			success: function(msg){
				if(msg.state == 1){
					alert("加精成功");
					getThemeList();
				}				
		    }
		});
	}
};

function cancelEssenceTheme(themeId,message){
	if(confirm(message)){
		$.ajax({
			type:"GET",
			url:"servlet/UserHome?from=cancel_essence_theme&themeId="+themeId,
			dataType:"json",
			success: function(msg){
				if(msg.state == 1){
					alert("取消加精成功");
					getThemeList();
				}				
		    }
		});
	}
};


function checkTheme(themeId){
	ShowDiv('MyDiv3','fade3');
	$("#themeId1").val(themeId);
}

function upCheckThemeState(){
	var themeId = $("#themeId1").val();
	var checkState = $("input[name='checkState']:checked").val();
	$.ajax({
		type:"GET",
		url:"servlet/UserHome?from=check_theme_state&themeId="+themeId+"&checkState="+checkState,
		dataType:"json",
		success: function(msg){
			if(msg.state == 1){
				alert("审核成功");
				CloseDiv('MyDiv3','fade3');
				getThemeList();
			}				
	    }
	});
}

function getDetailTheme(themeId,uid){
	$.ajax({
		type:"GET",
		url:"servlet/UserHome?from=get_detail_theme&themeId="+themeId+"&uid="+uid,
		dataType:"json",
		success: function(msg){
			$("#replyList").empty();
			if(msg.state == 1){
				setReplyListParams(msg.data);
			}				
	    }
	});
}

function setReplyListParams(data){
	var json = eval("json="+data);
	var replyAndUserInfos = json.replyAndUserInfos;
	for(var i=0;i<replyAndUserInfos.length;i++){
		var replyBody = replyAndUserInfos[i].replyBean.replyBody;
		var replyState = replyAndUserInfos[i].replyBean.replyState;
		var replyAttachPicUrl = replyAndUserInfos[i].replyBean.replyAttachPicUrl;
		var userAlias = replyAndUserInfos[i].userBean.userAlias;
		var htm = "<tr><td>"+userAlias+"</td>"
			+"<td>"+replyBody+"</td>"+"<td>";
		if(replyAttachPicUrl != null){
			htm += "<a href='"+replyAttachPicUrl+"' target=cont>"
			+"<img id='replyImg' style='width:30px;height:20px;' src='"+replyAttachPicUrl+"'></a>";
		}
		htm +="</td>"+"<td>"+replyState+"</td>"
		+"</tr>";
		$("#replyList").append(htm);
	}
}

function cutStr(obj,len){
	var afterStr = "";
	if(obj.length > len){
		afterStr = obj.substring(0,len)+'…';
	}else{
		afterStr = obj;
	}
    return  afterStr;
}
