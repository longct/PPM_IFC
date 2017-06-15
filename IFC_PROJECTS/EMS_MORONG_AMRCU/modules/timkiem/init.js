$(document).ready(function () {
    $("#timkiemkytu").empty();
    $("#timkiemkytu").append('<div data-include="modules/timkiem/timkiemkytu"></div>');
    loadConetent();
    $(".clickTabsNhaptay a").click(function () {

        removeHtmlOld();
        var id = $(this).attr("href");
        if (id != null || id != undefined) {
            $(id).empty();
            if (id == "#timkiemkytu") {
                $(id).append('<div data-include="modules/timkiem/timkiemkytu"></div>');
            }
        }
        loadConetent();
        // f_loadInitFromTree();
    });

});


function removeHtmlOld() {
    $(".clickTabsNhaptay a").each(function () {
        try {
            var id1 = $(this).attr('href');
            $(id1).empty();
        }
        catch (e) { }
    });
}
