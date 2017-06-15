$(document).ready(function () {
    showhideTree();
    try {
        if (localStorage.getItem("tree_node")) {
            // kiểm tra nếu socongto > 0 dang chon diem do, ngược lại chọn đơn vị
            // nếu socongto > 0 xet type=1: 1pha; type=3: 3 pha
            var istype = JSON.parse(localStorage.getItem("tree_node"))[0].type;
            var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
            var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
            if (socongto != "0" && istype != "4") {
                $("#tendiemdo_span").html(tendiemdo + "(<span tkey='socongto'></span>: " + socongto + "- <span tkey='loaidiemdo'></span>: " + replacePha(istype) + ")");
                $(".tab_cbvh.active").attr("data-value", "cb_cauhinh/cb_thietlapcb");
                set_active("cb_cauhinh/cb_thietlapcb");
            } else {
                if (istype == "4")
                    $("#tendiemdo_span").html("<span tkey='soghi'></span>: " + tendiemdo);
                else if (socongto == "0" && istype != "4")
                    $("#tendiemdo_span").html("<span tkey='donvi'></span>: " + tendiemdo);
                else if (istype >= "6")
                    $("#tendiemdo_span").html("Trạm: " + tendiemdo);
                $(".tab_cbvh.active").attr("data-value", "cb_cauhinh/cb_dscauhinh");
                set_active("cb_cauhinh/cb_dscauhinh");
            }
        }
        else {
            $("#tendiemdo_span").html("Vui lòng chọn đơn vị để xem dữ liệu");
            $("#tab_content").empty();
        }

      
        initformelement();
        loadContent();
        selectlang();
        $(".tab_cbvh").click(function () {
            $(".tab_cbvh").removeClass("active");
            $(this).addClass("active");
            localStorage.setItem("tab", $(this).data("value"));
            var istype = JSON.parse(localStorage.getItem("tree_node"))[0].type;
            var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
            var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;

            $("#tab_content").empty();
            $("#tab_content").append("<div data-include='modules/" + $(this).data("value") + "'></div>");
            loadContent();
        })
    } catch (e) {
        //console.log(e.message);
    }
});
function set_active(settab) {
    var idArray = $("div.tab-div > div").map(function () {
        return $(this).attr("data-value");
    }).get();

    if (localStorage.getItem("tab") == null || localStorage.getItem("tab") == undefined || localStorage.getItem("tab") == "") {
        localStorage.setItem("tab", settab);
    }
    else {
        var tab = localStorage.getItem("tab");
    }
    $("#tab_content").empty();
    if ($.inArray(tab, idArray) !== -1) {
        //////console.log(tab);
        $(".tab_cbvh").removeClass("active");
        $('*[data-value="' + tab + '"]').addClass("active");
        $("#tab_content").empty();
        var istype = JSON.parse(localStorage.getItem("tree_node"))[0].type;
        var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
        $("#tab_content").append("<div data-include='modules/" + tab + "'></div>");

        $('*[data-value="' + tab + '"]').click();
        loadContent();
    } else {
        $(".tab_cbvh").removeClass("active");
        $('*[data-value="' + idArray[0] + '"]').addClass("active");
        $("#tab_content").empty();
        var istype = JSON.parse(localStorage.getItem("tree_node"))[0].type;
        var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
        ////console.log(istype);
        $("#tab_content").append("<div data-include='modules/" + idArray[0] + "'></div>");

        $('*[data-value="' + idArray[0] + '"]').click();
        //loadContent();
    }
}


