
var pageSize;
var pageNumber = 1;
var pagetotalnum = 1;
var totalNum = 0;

$(document).ready(function(){
	getPhoneModel();
	setPageSize();
	getUserinfo();
});

function getUserinfo(){
	$.ajax({
		type:"GET",
		url:encodeURI(getURL()),
		dataType:"json",
		success: function(msg){
			setUserParas(msg);
		}
	});
}

function setPageBottom(){
	$("#totalNUm").text(totalNum);
	$("#currentPage").text(pageNumber);
	$("#totalPage").text(pagetotalnum);
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
		htm = "<option>"+array[i]+"</option>";
		$("#phoneModel").append(htm);
	}
}

function setPageSize(){
	if($.cookie("page_size")!=null){
		pageSize=$.cookie("page_size");
	}else{
		pageSize=10;
	}	
}
function getURL(){
	var url = "servlet/UserHome?from=get_all_userinfo";
	var phoneModel = $("#phoneModel").val();
	var userAlias = $("#userAlias").val();
	if(phoneModel!="所有机型"){
		url += "&phoneModel="+phoneModel;
	}
	if(userAlias != ""){
		url += "&userAlias="+userAlias;
	}
	url += "&pageSize="+pageSize+"&pageNumber="+pageNumber;
//	alert(url);
	return url;
}

function setUserParas(msg){
	$("#tablevlue").empty();
	var state = msg.state;
	var data = eval("data="+msg.data);
	var count = data.count;
	totalNum = count;
	var userInfos = data.userInfos;
	pagetotalnum = Math.ceil(count/pageSize);
	for(var i=0;i<userInfos.length;i++){
//		alert(userInfos[i].id);
		var id = userInfos[i].id;
		var userId = userInfos[i].userId;
		var userAlias = userInfos[i].userAlias;
		var headUrl = userInfos[i].headUrl;
		var amount = userInfos[i].amount;
		var themeNum = userInfos[i].themeNum;
		var replyNum = userInfos[i].replyNum;
		var acceptNum = userInfos[i].acceptNum;
		var activeTime = userInfos[i].activeTime;
		var phoneModel = userInfos[i].phoneModel;
		var htm = "<tr>"+"<td width='%8'>" + userId + "</td>"
		+"<td width='8%'>"+userAlias+"</td>"
		+"<td  width='6%'>"+amount+"</td>"
		+"<td  width='5%'>"+themeNum+"</td>"
		+"<td  width='5%'>"+replyNum+"</td>"
		+"<td  width='10%'>"+acceptNum+"</td>"
		+"<td  width='10%'>"+dateToStr(activeTime)+"</td>"
		+"<td  width='10%'>"+phoneModel+"</td>"
		+"<td  width='12%'>"+"<a>修改</a> | <a>删除</a>"+"</td>"
		+"</tr>";
	$("#tablevlue").append(htm);
	$("#perpageshownum").val(pageSize);
	}
	setPageBottom();
}

function jumptoPage(){	
	if($("#jumpto").val() != ""){
		pageNumber = parseInt($("#jumpto").val());
		if(pageNumber > pagetotalnum || pageNumber < 1){
			alert("没有此页,，请重新输入跳转页");
		}else if(pageNumber >= 1 && pageNumber <= pagetotalnum){
			getUserinfo();
		}		
	}	
}

//下一页
$("#next_page").live("click",getNextPage);
function getNextPage(){
	if(pageNumber<pagetotalnum){
		pageNumber += 1;
		getUserinfo();
	}	
}

//上一页
$("#pre_page").live("click",getPrePage);
function getPrePage(){
	if(pageNumber>1){
		pageNumber -= 1;
		getUserinfo();
	}	
}

function resetPageNum(){
	if(pageNumber !=1){
		pageNumber=1;
	}
}

//刷新页面
function refreshPage(){
	resetPageNum();
	pageSize = $("#perpageshownum").val();
	$.cookie("page_size",pageSize);
	getUserinfo();
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