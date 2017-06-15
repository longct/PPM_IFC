$(document).ready(function () {
    try {
        setTitle("Báo cáo hàng ngày");
        loadConetent();
        setActiveTab();
        $(".tab_baocaohangngay").click(function () {
            $(".tab_baocaohangngay").removeClass("active");
            $(this).addClass("active");
            localStorage.setItem("tab", $(this).data("value"));
            if ($(this).data("value") == "BaocaoRFhangngay") {
                $("#tab_content").empty();
                $("#tab_content").append("<div data-include='module/BaocaoRFhangngay'></div>");
                loadConetent();
            }
            else if ($(this).data("value") == "BaocaoTBA_kem") {
                $("#tab_content").empty();
                $("#tab_content").append("<div data-include='module/BaocaoTBA_kem'></div>");
                loadConetent();
            }
            else {
                $("#tab_content").empty();
                $("#tab_content").append("<div data-include='module/" + $(this).data("value") + "'></div>");
                loadConetent();
            }
        })

    } catch (e) {
        console.log(e.message);
    }
});
function setActiveTab() {
        var active = "BaocaoRFhangngay";
        $('.tab1').addClass("active");
        $("#tab_content").empty();
        $("#tab_content").append("<div data-include='module/BaocaoRFhangngay'></div>");
        loadConetent();
}