$(function () {
    var sWidth = $("#focus").width();
    var len = $("#focus ul li").length;
    var index = 0;
    var picTimer;
    var btnll = "<div class='btnllBg'></div><div class='btnll'>";
    for (var i = 0; i < len; i++) {
        btnll += "<span></span>";
    }
    btnll += "</div><div class='preNext pre'></div><div class='preNext next'></div>";
    $("#focus").append(btnll);
    $("#focus .btnllBg").css("opacity", 0.5);
    $("#focus .btnll span").css("opacity", 0.4).mouseenter(function () {
        index = $("#focus .btnll span").index(this);
        showPics(index);
    }).eq(0).trigger("mouseenter");
    $("#focus .preNext").css("opacity", 0.5).hover(function () {
        $(this).stop(true, false).animate({ "opacity": "0.9" }, 300);
    }, function () {
        $(this).stop(true, false).animate({ "opacity": "0.5" }, 300);
    });
    $("#focus .pre").click(function () {
        index -= 1;
        if (index == -1) { index = len - 1; }
        showPics(index);
    });
    $("#focus .next").click(function () {
        index += 1;
        if (index == len) { index = 0; }
        showPics(index);
    });
    $("#focus ul").css("width", sWidth * (len));
    $("#focus").hover(function () {
        clearInterval(picTimer);
    }, function () {
    }).trigger("mouseleave");
    function showPics(index) {
        var nowLeft = -index * sWidth;
        $("#focus ul").stop(true, false).animate({ "left": nowLeft }, 300);
        $("#focus .btnll span").stop(true, false).animate({ "opacity": "0.4" }, 300).eq(index).stop(true, false).animate({ "opacity": "1" }, 300);
    }
});