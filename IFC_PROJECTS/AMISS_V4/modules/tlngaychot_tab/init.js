$(document).ready(function () {
    showhideTree();
    try {
        initformelement();
        loadContent();
        selectlang();
        set_active();
        $(".tab_tlnc").click(function () {
            $(".tab_tlnc").removeClass("active");
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
        var tab = "cs_thietlapngaychot";
        localStorage.setItem("tab", "cs_thietlapngaychot");
    }
    else {
        var tab = localStorage.getItem("tab");
    }
    $("#tab_content").empty();
    if ($.inArray(tab, idArray) !== -1) {
        $(".tab_tlnc").removeClass("active");
        $('*[data-value="' + tab + '"]').addClass("active");
        $("#tab_content").empty();
        $("#tab_content").append("<div data-include='modules/" + tab + "'></div>");
        $('*[data-value="' + tab + '"]').click();
        loadContent();
    } else {
        $(".tab_tlnc").removeClass("active");
        $('*[data-value="' + idArray[0] + '"]').addClass("active");
        $("#tab_content").empty();
       $("#tab_content").append("<div data-include='modules/" + idArray[0] + "'></div>");

        $('*[data-value="' + idArray[0] + '"]').click();
 
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