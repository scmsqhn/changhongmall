function showAtRight(url){
    print("showAtRight")
    print(url)
    $.ajax({
        type: "GET",
        url: url,
        dataType: "html",
        success: function(data) {
            console.log('[x]data=', data)
            $("#content").html(data);
        },
        error: function(){
            $("#content").html("获取数据失败！");
        }
    });
}
