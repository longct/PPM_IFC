$(document).ready(function () {
    showhideTree();
    try {
        
        if (localStorage.getItem("tree_node")) {
            var istype = JSON.parse(localStorage.getItem("tree_node"))[0].type;
            var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
            var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
            if (socongto != "0")
                $("#tendiemdo_span").html(tendiemdo + "(<span tkey='socongto'></span>: " + socongto + "- <span tkey='loaidiemdo'></span>: " + replacePha(istype) + ")");
            else if (istype == "4")
                $("#tendiemdo_span").html("<span tkey='soghi'></span>: " + tendiemdo);
            else if (socongto == "0" && istype != "4")
                $("#tendiemdo_span").html("<span tkey='donvi'></span>: " + tendiemdo);
            else if (istype >= "6")
                $("#tendiemdo_span").html("Trạm: " + tendiemdo);
            if (istype == "3" || istype == "31")
                $("#csc_thang").parent().hide();
            else
                $("#csc_thang").html("Chỉ số chốt ngày");

        }
        else {
            $("#tendiemdo_span").html("Vui lòng chọn điểm đo để xem dữ liệu");
            $("#tab_content").empty();
        }
        if ($(".content").hasClass("hidetree")) {
            $(".colslape_tree").click();
        }
        initformelement();

        
        loadContent();
        selectlang();
        display_tab();
        set_active();
        $(".tab_tsvh").click(function () {
            $(".tab_tsvh").removeClass("active");
            $(this).addClass("active");
            localStorage.setItem("tab", $(this).data("value"));
            var istype = JSON.parse(localStorage.getItem("tree_node"))[0].type;
            var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
            var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
            if ($(this).data("value") == "Thongsovanhanh/thongsovanhanh" && istype == "1") {
                $(".cscthang").hide();
                $(".thoidiem").hide();
                $(".btg").show();
                $("#tab_content").empty();
                $("#tab_content").append("<div data-include='modules/" + $(this).data("value") + "3pha'></div>");
                loadContent();
            }
            else if ($(this).data("value") == "Thongsovanhanh/thongsovanhanh" && istype != "1") {
                $(".cscthang").hide();
                $(".thoidiem").hide();
                $(".btg").show();
                $("#tab_content").empty();
                $("#tab_content").append("<div data-include='modules/" + $(this).data("value") + "3pha'></div>");
                loadContent();
            }
            else if ($(this).data("value") == "Thongsovanhanh/chisotungthoidiem" && istype == "1") {
                $(".cscthang").hide();
                $(".thoidiem").hide();
                $(".btg").show();
                $("#tab_content").empty();
                $("#tab_content").append("<div data-include='modules/" + $(this).data("value") + "3pha'></div>");
                loadContent();
            }
            else if ($(this).data("value") == "Thongsovanhanh/chisotungthoidiem" && istype != "1") {
                $(".cscthang").hide();
                $(".thoidiem").hide();
                $(".btg").show();
                $("#tab_content").empty();
                $("#tab_content").append("<div data-include='modules/" + $(this).data("value") + "3pha'></div>");
                loadContent();
            }
            else if ($(this).data("value") == "Thongsovanhanh/chisochotthang") {
                $(".cscthang").show();
                $(".btg").hide();
                $(".thoidiem").hide();

                $("#tab_content").empty();
                $("#tab_content").append("<div data-include='modules/" + $(this).data("value") + "'></div>");
                loadContent();
            }
            else {
                $(".cscthang").hide();
                $(".thoidiem").hide();
                $(".btg").show();
                $("#tab_content").empty();
                $("#tab_content").append("<div data-include='modules/" + $(this).data("value") + "'></div>");
                loadContent();
            }


        });
        
    } catch (e) {
        console.log(e.message);
    }
});
function set_active() {
    
    var idArray = $("div.tab-div > div").map(function () {
        return $(this).attr("data-value");
    }).get();
    if (localStorage.getItem("tab") == null || localStorage.getItem("tab") == undefined || localStorage.getItem("tab") == "") {
        var tab = "chisotungthoidiem";
        localStorage.setItem("tab", "chisotungthoidiem");
    }
    else {
        var tab = localStorage.getItem("tab");
    }
    $("#tab_content").empty();
    if ($.inArray(tab, idArray) !== -1) {

        $(".tab_tsvh").removeClass("active");
        $('*[data-value="' + tab + '"]').addClass("active");
        $("#tab_content").empty();
        var istype = JSON.parse(localStorage.getItem("tree_node"))[0].type;
        var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
        if (tab == "Thongsovanhanh/thongsovanhanh" && istype == "1") {
            $(".cscthang").hide();
            $(".thoidiem").hide();
            $(".btg").show();
            $("#tab_content").append("<div data-include='modules/" + tab + "3pha'></div>");
        }
        else if (tab == "Thongsovanhanh/thongsovanhanh" && istype != "1") {
            $(".cscthang").hide();
            $(".thoidiem").hide();
            $(".btg").show();
            $("#tab_content").append("<div data-include='modules/" + tab + "3pha'></div>");
        }
        else if (tab == "Thongsovanhanh/chisotungthoidiem" && istype == "1") {
            $(".cscthang").hide();
            $(".thoidiem").hide();
            $(".btg").show();
            $("#tab_content").append("<div data-include='modules/" + tab + "3pha'></div>");
        }
        else if (tab == "Thongsovanhanh/chisotungthoidiem" && istype != "1") {
            $(".cscthang").hide();
            $(".thoidiem").hide();
            $(".btg").show();
            $("#tab_content").append("<div data-include='modules/" + tab + "3pha'></div>");
        }
        else if (tab == "Thongsovanhanh/chisochotthang") {
            //alert(23);
            $(".cscthang").show();
            $(".thoidiem").hide();
            $(".btg").hide();   
            $("#tab_content").append("<div data-include='modules/" + tab + "'></div>");
        }
        else {
            $(".cscthang").hide();
            $(".thoidiem").hide();
            $(".btg").show();
            $("#tab_content").append("<div data-include='modules/" + tab + "'></div>");
        }
        $('*[data-value="' + tab + '"]').click();
        loadContent();
    } else {
        tab = "Thongsovanhanh/chisotungthoidiem";
        //set_active();
    }
}

function display_tab() {
    $('#id_tsvh').hide();
    $('#id_bdpt').hide();
    $('#id_sukien').hide();
    var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
    var type = JSON.parse(localStorage.getItem("tree_node"))[0].type;
    if (socongto != "" && socongto != "0") {
        $('#id_tsvh').show();
        $('#id_sukien').show();
        if (type == 3) {
            $('#id_bdpt').show();
        }
    }
}