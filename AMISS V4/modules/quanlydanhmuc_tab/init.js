$(document).ready(function () {
    try {
        showhideTree();

        if ($(".content").hasClass("showtree")) {
            $(".colslape_tree").click();
        }
        initformelement();
        loadContent();
        selectlang();
        set_active();
        $(".tab_qldm").click(function () {
            $(".tab_qldm").removeClass("active");
            $(this).addClass("active");
            localStorage.setItem("tab", $(this).data("value"));
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
        var tab = "qldm_dienluc";
        localStorage.setItem("tab", "qldm_dienluc");
    }
    else {
        var tab = localStorage.getItem("tab");
    }
    $("#tab_content").empty();
    if ($.inArray(tab, idArray) !== -1) {
        //console.log(tab);
        $(".tab_qldm").removeClass("active");
        $('*[data-value="' + tab + '"]').addClass("active");
        $("#tab_content").empty();
        $("#tab_content").append("<div data-include='modules/" + tab + "'></div>");
        $('*[data-value="' + tab + '"]').click();
        loadContent();
    } else {
        $(".tab_qldm").removeClass("active");
        $('*[data-value="' + idArray[0] + '"]').addClass("active");
        $("#tab_content").empty();
        $("#tab_content").append("<div data-include='modules/" + idArray[0] + "'></div>");

        $('*[data-value="' + idArray[0] + '"]').click();
        //loadContent();
    }
}

