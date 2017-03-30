$(document).ready(function(){
    try {
        $.ajaxSetup({
            error: function (x, e) {
                console.error("数据加载失败: "+e);
                nyarukoplayer_error();
                return false;
            }
        });
        $.getJSON("homepage/nyarukoplayer/nyaruko.json",function(responseTxt,statusTxt,xhr,data){
            if(statusTxt == "error") {
                console.error("数据加载失败: "+xhr.status+": "+xhr.statusText);
                nyarukoplayer_error();
            }
            if(statusTxt == "success") {
                var items = xhr.responseJSON;
                datdatacount = items.length;
                console.log("数据 "+datdatacount+": "+xhr.status+": "+xhr.statusText);
                console.log(responseTxt);
                nyarukoplayer_init(items);
            }
        });
        $("#showprivacy").click(function(){
            showprivacy();
        });
        $("#disablemedia").click(function(){
            disablemedia();
        });
    } catch (ex) {
        console.error("数据加载失败: "+ex);
        nyarukoplayer_error();
    }
    $.ajax({
        url: "homepage/nyarukoplayer/nyaruko.lrc",
        dataType: 'text',
        success: function(data) {
            nyarukoplayer_audioinit(data);
        }
    });
});
$(window).resize(function() {
    nyarukoplayer_resizeendimg();
});
function showprivacy() {
    if ($(".yashiprivacy").length == 0) {
        $("body").append("<div class='yashiprivacy'></div>");
        $(".yashiprivacy").load('privacy.html .yashiprivacyw');
    }
}
function disablemedia() {
    if ($.cookie("disable") == "true") {
        nyarukoplayer_disable(false);
    } else {
        nyarukoplayer_disable(true);
    }
}
document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        nyarukoplayer_titlelrc = true;
    } else  {
        nyarukoplayer_titlelrc = false;
        document.title = "神楽坂雅詩的个人网站 - 神楽坂雅詩的小世界";
    }
}, false);