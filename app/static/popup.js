function ShowDiv(show_div,bg_div){
		document.getElementById(show_div).style.display='block';
		document.getElementById(bg_div).style.display='block' ;
		var bgdiv = document.getElementById(bg_div);
		bgdiv.style.width = document.body.scrollWidth;
		// bgdiv.style.height = $(document).height();
		$("#"+bg_div).height($(document).height());
};

function CloseDiv(show_div,bg_div)
{
	document.getElementById(show_div).style.display='none';
	document.getElementById(bg_div).style.display='none';
};

function showPop(themeId,body,userAlias,userId,attachPicUrl){
	ShowDiv('MyDiv2','fade2');
	$("#themeId").text(themeId);
	$("#userId").text(userId);
	$("#quesContent").html(body);
	$("#quesUser").html(userAlias);
	if(attachPicUrl != "undefined"){
		$("#ques_imgTr").show();
		$("#quesPicture").attr("src",attachPicUrl);
		$("#ques_imgA").attr("href",attachPicUrl);
	}else{
		$("#ques_imgTr").hide();
	}
	getDetailTheme(themeId,userId); 
	$("#uploadfile").val('');
	$("#replyBody").val("");
}

function showBranchPop(data){
	ShowDiv('MyDiv','fade');
	$("#branchId1").val(data.branchId);
	$("#branchProvince1").text(data.branchProvince);
	$("#brands1").text(data.brands);
	$("#branchAddr1").val(data.branchAddr);
	$("#branchName1").val(data.branchName);
	$("#branchTel1").val(data.branchTel);
	$("#branchMobileTel1").val(data.branchMobileTel);
	$("#branchHours1").val(data.branchHours);
	$("#branchCity1").val(data.branchCity);
}