function showAtRight(url){
    $.ajax({
    type :"GET",
    url : url,
    dataType:"html",
    success: function(data) {
        $("#content").html(data);
    },
    error: function(){
        $("#content").html("获取数据失败！");
    }
  });
}
