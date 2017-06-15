$(document).ready(function () {
    $("#timkiemtheofileexecl").empty();
    $("#timkiemtheofileexecl").append('<div data-include="modules/timkiemnangcao/timkiemtheoexecl"></div>');
    loadConetent();
    $(".clickTabsNhaptay a").click(function () {

        removeHtmlOld();
        var id = $(this).attr("href");
        if (id != null || id != undefined) {
            $(id).empty();
            if (id == "#timkiemtheomaphieu") {
                $(id).append('<div data-include="modules/timkiemnangcao/timkiemtheomaphieu"></div>');
            }
            if (id == "#timkiemtheofileexecl") {
                $(id).append('<div data-include="modules/timkiemnangcao/timkiemtheoexecl"></div>');
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
