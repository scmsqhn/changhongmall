var imagURL = "";
var flag = false;

$(document).ready(function(){
	$('#uploadfile').change(function(){
		flag = true;
	});
});

function reply(){
	if(flag){
		ajaxFileUpload();
	}else{
		postReply();
	}	
}

function ajaxFileUpload() {
		$.ajaxFileUpload({
			url : 'servlet/UserHome?from=file_upload',
			secureuri : false,
			fileElementId : 'uploadfile',
			dataType : 'json',
			success : function(status) {
				if(status.state == 1){
					imagURL = status.data;
					postReply();
				}else{
					
				}	
			},
			error : function(status, e) {
				alert("上传失败");
			}
		});

		return false;

}


function setReplyData(){
	var replyId = "";
	var themeId = $("#themeId").text();
	var replyBody = $("#replyBody").val();
	var replyAttachPicUrl = imagURL;
	var replyTime;
	var replyState;
	var replyCheckState;
	var userId = $("#userId").val();
	var data = "{themeId:"+themeId+",replyBody:"+"\""+replyBody+"\"";
	if(replyAttachPicUrl != ""){
		data += ",replyAttachPicUrl:"+"'"+replyAttachPicUrl+"'";
	}
	data +=",userId:"+userId+"}";
//	alert(data);
	return data;
}

function postReply(){
	var replyBody = $("#replyBody").val();
	if(replyBody!=""){
		$.ajax({
			type:"POST",
			url:"servlet/UserHome?from=post_reply_admin&data="+setReplyData(),
			dataType:"json",
			success: function(msg){
				if(msg.state==1){
					alert("回复成功");
					CloseDiv('MyDiv2','fade2');
					getThemeList();
				}else{
					alert("回复失败");
				}
			}
		});
	}else{
		alert("请输入回复内容");
	}
	
}