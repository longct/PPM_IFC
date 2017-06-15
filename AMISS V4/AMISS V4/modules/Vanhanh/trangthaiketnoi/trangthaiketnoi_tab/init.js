$(document).ready(function () {
    loadContent();
    try {
        if (localStorage.getItem("tree_node")) {
            
            var istype = JSON.parse(localStorage.getItem("tree_node"))[0].type;
            var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
            var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
            if (socongto == "0") {
                if (istype != "0" && istype != "4" && socongto == "0")
                    $("#tendiemdo_span").html(tendiemdo + "(<span tkey='socongto'></span>: " + socongto + "- <span tkey='loaidiemdo'></span>: " + replacePha(istype) + ")");
                else if (istype == "4")
                    $("#tendiemdo_span").html("<span tkey='soghi'></span>: " + tendiemdo);
                else if (socongto == "0" && istype != "4")
                    $("#tendiemdo_span").html("<span tkey='donvi'></span>: " + tendiemdo);
                else if (istype >= "6")
                    $("#tendiemdo_span").html("Trạm: " + tendiemdo);
            } else {
                $("#tendiemdo_span").html("Vui lòng chọn đơn vị");
            }
        }
        else {
            $("#tendiemdo_span").html("Vui lòng chọn đơn vị");
            return;
        }
      
        set_active();
        if ($(".datepicker").val() == "") $(".datepicker").val(gettimenow());
        $(".tab_thongketrangthai").click(function () {
            $(".tab_thongketrangthai").removeClass("active");
            $(this).addClass("active");
            localStorage.setItem("tab", $(this).data("value"));
            $("#tab_content").empty();
            console.log($(this).data("value"));
            var istype = JSON.parse(localStorage.getItem("tree_node"))[0].type;
            var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
            var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
            $("#tab_content").append("<div data-include='modules/Vanhanh/trangthaiketnoi/" + $(this).data("value") + "'></div>");
            loadContent();
        })
    } catch (e) {
        console.log(e.message);
    }
});
function set_active() {
    var idArray = $("div.tab-div > div").map(function () {
        return $(this).attr("data-value");
    }).get();

    if (localStorage.getItem("tab") == null || localStorage.getItem("tab") == undefined || localStorage.getItem("tab") == "") {
        var tab = "thongketrangthaiketnoi";
        localStorage.setItem("tab", "thongketrangthaiketnoi");
    }
    else {
        var tab = localStorage.getItem("tab");
    }
    $("#tab_content").empty();
    if (jQuery.inArray(tab, idArray) !== -1) {
        //console.log(tab);
        $(".tab_thongketrangthai").removeClass("active");
        $('*[data-value="' + tab + '"]').addClass("active");
        $("#tab_content").empty();
        var istype = JSON.parse(localStorage.getItem("tree_node"))[0].type;
        var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
        console.log(istype);
        $("#tab_content").append("<div data-include='modules/Vanhanh/trangthaiketnoi/" + tab + "'></div>");
        //}
        $('*[data-value="' + tab + '"]').click();
        loadContent();
    } else {
        $(".tab_thongketrangthai").removeClass("active");
        $('*[data-value="' + idArray[0] + '"]').addClass("active");
        $("#tab_content").empty();
        var istype = JSON.parse(localStorage.getItem("tree_node"))[0].type;
        var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
        $("#tab_content").append("<div data-include='modules/Vanhanh/trangthaiketnoi/" + idArray[0] + "'></div>");
        $('*[data-value="' + idArray[0] + '"]').click();
        loadContent();
    }
}

