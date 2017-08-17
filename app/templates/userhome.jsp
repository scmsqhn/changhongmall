<%@ page language="java" contentType="text/html; charset=utf-8"
		 pageEncoding="utf-8"%>
<%	String username = "" + request.getSession().getAttribute("username");%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>售后服务管理系统</title>
	<script type="text/javascript" src="scripts/jquery-1.8.0.min.js"></script>
	<link rel="stylesheet" type="text/css" href="styles/theme.css">
	<style type="text/css">
		.navbar {
			height: 50px;
			background: #efefef;
			position: relative;
			background: #4d5b76;
			background: -webkit-gradient(linear, left bottom, left top, color-stop(0, #4d5b76),
			color-stop(1, #6c7a95));
			background: -ms-linear-gradient(bottom, #4d5b76, #6c7a95);
			background: -moz-linear-gradient(center bottom, #4d5b76 0%, #6c7a95 100%);
			background: -o-linear-gradient(bottom, #4d5b76, #6c7a95);
			filter: progid:dximagetransform.microsoft.gradient(startColorStr='#4d5b76',
			EndColorStr='#6c7a95');
			-ms-filter:
					"progid:DXImageTransform.Microsoft.gradient(startColorStr='#6c7a95',EndColorStr='#4d5b76')";
			padding: 0em 1em;
			margin: 0px;
			-webkit-border-radius: 0px;
			-moz-border-radius: 0px;
			border-radius: 0px;
			-moz-background-clip: padding;
			-webkit-background-clip: padding-box;
			background-clip: padding-box;
			border: 0px;
			border-bottom: none;
		}

		.left {
			width: 9%;
			height: 1200px;
			background: #cfcfcf;
			float: left;
			border-width: 1px;
			border-color: #000;
			box-shadow: 0px 1px 3px rgba(34, 25, 25, 0.2);
		}

		.right {
			height: 100%;
			float: left;
			width: 90%;
		}

		a {
			text-decoration: NONE;
		}

		a:hover {
			background: #f4f4f4;
			color: #000;
		}
	</style>
	<script type="text/javascript">
		$(document).ready(function () {
			var username = "<%=username%>";
			$("#user").text("欢迎您：" + username);
			$('.nav-header').click(function(e) {
				var dropDown = $(this).next();
				dropDown.slideToggle('slow');
				e.preventDefault();

			});
		});

		function getLinkURL(key) {
			if (key == "threeguar") {
				$('#iframe', parent.document.body).attr("src", "threeguarantees.html");
			} else if (key == "brandintro") {
				$('#iframe', parent.document.body).attr("src", "brandintroduction.html");
			} else if (key == "branch") {
				$('#iframe', parent.document.body).attr("src", "branch.jsp");
			} else if (key == "answer") {
				$('#iframe', parent.document.body).attr("src", "answer.jsp");
			} else if (key == "usermanager") {
				$('#iframe', parent.document.body).attr("src", "usermanager.jsp");
			} else if (key == "application") {
				$('#iframe', parent.document.body).attr("src", "apkmanager.jsp");
			} else if (key == "pushNotification") {
				$('#iframe', parent.document.body).attr("src", "pushNotification.jsp");
			} else if (key == "pushuserdata") {
				$('#iframe', parent.document.body).attr("src", "pushuserdata.jsp");
			} else if (key == "promotionManager") {
				$('#iframe', parent.document.body).attr("src", "promotionManager.jsp");
			} else if (key == "gameopen") {
				$('#iframe', parent.document.body).attr("src", "gameopen.jsp");
			} else if (key == "imeil2") {
				$('#iframe', parent.document.body).attr("src", "imeilookup2.jsp");
			} else if (key == "imeil3") {
				$('#iframe', parent.document.body).attr("src", "imeilookup3.jsp");
			} else if (key == "imei14") {
				$('#iframe', parent.document.body).attr("src", "baiduMapTest1.jsp");
			} else if (key == "imeil5") {
				$('#iframe', parent.document.body).attr("src", "imeilookup4.jsp");
			} else if(key == "apks"){
				$('#iframe', parent.document.body).attr("src", "apks.jsp");
			} else if(key == "apksrecord"){
                $('#iframe', parent.document.body).attr("src", "apksrecord.jsp");
            } else if(key == "apksphone"){
				$('#iframe', parent.document.body).attr("src", "apksphone.jsp");
			}  else if (key == "imeil") {
				//alert("ddd");
				$('#iframe', parent.document.body).attr("src", "imeilookup.jsp");
			} else if (key == "imeil2") {
				//alert("ddd");
				$('#iframe', parent.document.body).attr("src", "imeilookup2.jsp");
			} else if(key == "imei_group"){
				$('#iframe', parent.document.body).attr("src", "groupimeilookup.jsp");
			} else if(key == "phone"){
				$('#iframe', parent.document.body).attr("src", "phone.jsp");
			} else if(key == "highcharts"){
				$('#iframe', parent.document.body).attr("src", "highchartsTest.jsp");
			} else {
				$('#iframe', parent.document.body).attr("src", "index.jsp");
			}
		}
	</script>
</head>
<body>
<div class="container">
	<div class="navbar">
		<table style="width:100%;">
			<tr>
				<td>客户服务中心</td>
				<td id="user" style="width:10%;"></td>
				<td style="width:10%;"><a href="servlet/UserHome?from=logout">退出登录</a></td>
			</tr>
		</table>
	</div>
	<div class="left">
		<div style="display: block;">
			<a href="#" class="nav-header"> <i>客户中心</i>
			</a>
			<ul class="nav-list" style="list-style:none;">
				<li><a id="threeguar" href="#"
					   onclick="getLinkURL('threeguar')">三包政策</a></li>
				<li><a id="brandintro" href="#"
					   onclick="getLinkURL('brandintro')">品牌介绍</a></li>
				<li><a id="application" href="#"
					   onclick="getLinkURL('application')">应用更新</a></li>
				<li><a id="branch" href="#" onclick="getLinkURL('branch')">网点管理</a></li>
			</ul>
		</div>
		<div>
			<a href="#" class="nav-header"> <i>在线咨询</i>
			</a>
			<ul class="nav-list" style="list-style:none;">
				<li><a id="answer" href="#" onclick="getLinkURL('answer')">问题解答</a></li>
				<li><a id="usermanager" href="#"
					   onclick="getLinkURL('usermanager')">用户管理</a></li>
			</ul>
		</div>
		<%--<div>--%>
			<%--<a href="#" class="nav-header"> <i>推送管理</i></a>--%>
			<%--<ul class="nav-list" style="list-style:none;">--%>
				<%--<li><a href="#" onclick="getLinkURL('apks')">APK管理</a></li>--%>
			<%--</ul>--%>
			<%--<ul class="nav-list" style="list-style:none;">--%>
				<%--<li><a href="#" onclick="getLinkURL('apksrecord')">推送记录</a></li>--%>
			<%--</ul>--%>
			<%--<ul class="nav-list" style="list-style:none;">--%>
				<%--<li><a href="#" onclick="getLinkURL('apksphone')">机型管理</a></li>--%>
			<%--</ul>--%>
		<%--</div>--%>
		<div>
			<a href="#" class="nav-header"> <i>推送服务</i>
			</a>
			<ul class="nav-list" style="list-style:none;">
				<li><a href="#" onclick="getLinkURL('pushNotification')">推送通知</a></li>
				<li><a href="#" onclick="getLinkURL('promotionManager')">每日推荐</a></li>
				<li><a href="#" onclick="getLinkURL('gameopen')">游戏控制</a></li>
			</ul>
		</div>
		<div>
			<a href="#" class="nav-header"> <i>数据统计</i>
			</a>
			<ul class="nav-list" style="list-style:none;">
				<li><a href="#" onclick="getLinkURL('imeil3')">激活统计</a></li>
				<li><a href="#" onclick="getLinkURL('pushuserdata')">激活趋势</a></li>
				<li><a id="highcharts" href="#" onclick="getLinkURL('highcharts')">机型省份示意图</a></li>
				<li><a href="#" onclick="getLinkURL('imei14')">激活地图</a></li>
				<li><a href="#" onclick="getLinkURL('imeil2')">激活数据</a></li>
				<li><a href="#" onclick="getLinkURL('imeil5')">激活信息</a></li>
				<li><a href="#" onclick="getLinkURL('phone')">机型管理</a></li>
			</ul>
		</div>
		<div><a href="#" class="nav-header"> <i>信息查询</i>
		</a>
		<ul class="nav-list" style="list-style:none;">
			<li><a id="imeil" href="#" onclick="getLinkURL('imeil')">IMEI查询</a></li>
			<li><a id="imei_group" href="#" onclick="getLinkURL('imei_group')">IMEI批量查询</a></li>
		</ul>
		</div>
	</div>
	<div class="right">
		<iframe id="iframe" src="threeguarantees.html" height=1200px width=100%
				frameborder="0" scrolling="auto"> </iframe>
	</div>
</div>
</body>
</html>