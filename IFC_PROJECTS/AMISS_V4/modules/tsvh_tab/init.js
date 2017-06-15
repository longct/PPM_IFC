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
        if (localStorage.getItem("dateF") == "" && localStorage.getItem("dateT") == "") {
            $("#date_tungay").val(gettimenow());
            //$(".datepicker").val(gettimenow());
            $("#date_denngay").val(gettimenow());
        } else {
            $("#date_tungay").val(localStorage.getItem("dateF"));
            $("#date_denngay").val(localStorage.getItem("dateT"));
        }
        $("#date_tungay").change(function () {
            localStorage.setItem("dateF", $("#date_tungay").val());
        });
        $("#date_denngay").change(function () {
            localStorage.setItem("dateT", $("#date_denngay").val());
        });
        loadContent();
        selectlang();
        set_active();

        $(".tab_tsvh").click(function () {
            $(".tab_tsvh").removeClass("active");
            $(this).addClass("active");
            localStorage.setItem("tab", $(this).data("value"));
            var istype = JSON.parse(localStorage.getItem("tree_node"))[0].type;
            var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
            var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
            if ($(this).data("value") == "thongsovanhanh" && istype == "1") {
                $(".cscthang").hide();
                $(".thoidiem").hide();
                $(".btg").show();
                $("#tab_content").empty();
                $("#tab_content").append("<div data-include='modules/" + $(this).data("value") + "1pha'></div>");
                loadContent();
            }
            else if ($(this).data("value") == "chisotungthoidiem" && istype == "1") {
                $(".cscthang").hide();
                $(".thoidiem").hide();
                $(".btg").show();
                $("#tab_content").empty();
                $("#tab_content").append("<div data-include='modules/" + $(this).data("value") + "1pha'></div>");
                loadContent();
            }
            else if ($(this).data("value") == "chisochotthang") {
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


        })
        $("#btn_thuchien").click(function () {
            var tab = localStorage.getItem("tab");
            var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
            var type = JSON.parse(localStorage.getItem("tree_node"))[0].type;

            switch (tab) {
                case "thongsovanhanh":
                    console.log(type);
                    if (type != "" && type == "1") {
                        if (socongto != "" && socongto != "0") {
                            get_TSVH1pha_KH(0);
                        } else if (socongto != "" && socongto == "0") {
                            get_TSVH1pha_LIST_KH(0);
                        }
                    } else {
                        if (socongto != "" && socongto != "0") {
                            get_TSVH_KH(0);
                        } else if (socongto != "" && socongto == "0") {
                            get_TSVH_LIST_KH(0);
                        }
                    }

                    break;
                case "chisochotngay":
                    if (JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "" && JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "0") {
                        get_CSCNgay_KH(0);
                    } else if (JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "" && JSON.parse(localStorage.getItem("tree_node"))[0].socongto == "0") {
                        get_CSCNgay_list_KH(0);
                    }
                    break;
                    
                    break;
                case "chisotungthoidiem":
                    if (type != "" && type == "1") {
                        if (socongto != "" && socongto != "0") {
                            get_CSCTTD_KH_1pha(0);
                        } else if (socongto != "" && socongto == "0") {
                            get_CSCTTD_LIST_KH_1pha(0);
                        }
                    } else {
                        if (socongto != "" && socongto != "0") {
                            get_CSCTTD_KH(0);
                        } else if (socongto != "" && socongto == "0") {
                            get_CSCTTD_LIST_KH(0);
                        }
                    }
                    break;
                case "chisochotthang":
                    if (socongto != "" && socongto != "0") {
                        get_CSCThang_KH();
                    } else if (socongto != "" && socongto == "0") {
                        get_CSCThang_list_KH()
                    }
                
                    break;
                case "bieudophutai":
                    get_BDPT_KH();
                    break;
                case "bieudotsvh":
                    get_BDTSVH_KH();
                    break;
                case "sukien":
                    get_SUKIEN_KH();
                    break;

            }
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
        var tab = "chisotungthoidiem";
        localStorage.setItem("tab", "chisotungthoidiem");
    }
    else {
        var tab = localStorage.getItem("tab");
    }
    $("#tab_content").empty();
    if ($.inArray(tab, idArray) !== -1) {
        //console.log(tab);
        $(".tab_tsvh").removeClass("active");
        $('*[data-value="' + tab + '"]').addClass("active");
        $("#tab_content").empty();
        var istype = JSON.parse(localStorage.getItem("tree_node"))[0].type;
        var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
        if (tab == "thongsovanhanh" && istype == "1") {
            $(".cscthang").hide();
            $(".thoidiem").hide();
            $(".btg").show();
            $("#tab_content").append("<div data-include='modules/" + tab + "1pha'></div>");
        }
        else if (tab == "chisotungthoidiem" && istype == "1") {
            $(".cscthang").hide();
            $(".thoidiem").hide();
            $(".btg").show();
            $("#tab_content").append("<div data-include='modules/" + tab + "1pha'></div>");
        }
        else if (tab == "chisochotthang") {
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
        tab = "chisotungthoidiem";
        set_active();
        //$(".tab_tsvh").removeClass("active");
        //$('*[data-value="' + idArray[0] + '"]').addClass("active");
        //$("#tab_content").empty();
        //var istype = JSON.parse(localStorage.getItem("tree_node"))[0].type;
        //var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        //var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
        //console.log(istype);
        //if (idArray[0] == "thongsovanhanh" && istype == "1") {
        //    $("#tab_content").append("<div data-include='modules/" + idArray[0] + "1pha'></div>");
        //} else {
        //    $("#tab_content").append("<div data-include='modules/" + idArray[0] + "'></div>");
        //}
        //$('*[data-value="' + idArray[0] + '"]').click();
        //loadContent();
    }
}
