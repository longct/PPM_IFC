$(document).ready(function () {
    showhideTree();
    try {
        if (localStorage.getItem("tree_node")) {
            var istype = JSON.parse(localStorage.getItem("tree_node"))[0].type;
            var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
            var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
            if (istype != "0" && istype != "4" && socongto != "0")
                $("#tendiemdo_span").html(tendiemdo + "(Số công tơ: " + socongto + "- Loại điểm đo: " + replacePha(istype) + ")");
            else if (istype == "4")
                $("#tendiemdo_span").html("Sổ ghi: " + tendiemdo);
            else if (socongto == "0" && istype != "4")
                $("#tendiemdo_span").html("Đơn vị: " + tendiemdo);
            else if (istype >= "6")
                $("#tendiemdo_span").html("Trạm: " + tendiemdo);
        }
        else {
            $("#tendiemdo_span").html("Vui lòng chọn điểm đo để xem dữ liệu");
            $("#tab_content").empty();

        }
        if ($(".content").hasClass("hidetree")) {
            $(".colslape_tree").click();
        }

        if ($(".datepicker").val() == "") $(".datepicker").val(gettimenow());

        initformelement();
        loadContent();
        selectlang();
        set_active();
        $(".tab_tlcb").click(function () {
            $(".tab_tlcb").removeClass("active");
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
        console.log(e.message);
    }
});
function set_active() {
    var idArray = $("div.tab-div > div").map(function () {
        return $(this).attr("data-value");
    }).get();

    if (localStorage.getItem("tab") == null || localStorage.getItem("tab") == undefined || localStorage.getItem("tab") == "") {
        var tab = "thietlapcbsukien";
        localStorage.setItem("tab", "thietlapcbsukien");
    }
    else {
        var tab = localStorage.getItem("tab");
    }
    $("#tab_content").empty();
    if ($.inArray(tab, idArray) !== -1) {
        //console.log(tab);
        $(".tab_tlcb").removeClass("active");
        $('*[data-value="' + tab + '"]').addClass("active");
        $("#tab_content").empty();
        var istype = JSON.parse(localStorage.getItem("tree_node"))[0].type;
        var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;

        $("#tab_content").append("<div data-include='modules/" + tab + "'></div>");

        $('*[data-value="' + tab + '"]').click();
        loadContent();
    } else {
        $(".tab_tlcb").removeClass("active");
        $('*[data-value="' + idArray[0] + '"]').addClass("active");
        $("#tab_content").empty();
        var istype = JSON.parse(localStorage.getItem("tree_node"))[0].type;
        var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
        console.log(istype);

        $("#tab_content").append("<div data-include='modules/" + idArray[0] + "'></div>");

        $('*[data-value="' + idArray[0] + '"]').click();
        //loadContent();
    }


}
function replacePha(pha) {
    if (pha == "1")
        return "1 Pha";
    else if (pha == "3")
        return "3 Pha";
    else if (pha == "31")
        return "3 Pha 1 biểu";
    else {
        return;
    }
}