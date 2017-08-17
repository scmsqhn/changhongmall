function IsPC(){
    var userAgentInfo=navigator.userAgent;
    var Agents = ["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"];
    for (var v=0; v<Agents.length; v++){
        if(userAgentInfo.indexOf(Agents[v]>0){
            window.location="http://127.0.0.1:5000/mb"
        }
    }
    window.location="http://127.0.0.1:5000/"
}
