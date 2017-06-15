$(document).ready(function () {
    $("#baocaokho").empty();
    $("#baocaokho").append('<div data-include="modules/baocao/baocaokho"></div>');
    loadConetent();
    $(".clickTabsNhaptay a").click(function () {

        removeHtmlOld();
        var id = $(this).attr("href");
        if (id != null || id != undefined) {
            $(id).empty();
            if (id == "#baocaokho") {
                $(id).append('<div data-include="modules/baocao/baocaokho"></div>');
            }
            if (id == "#baocaonhanvien") {
                $(id).append('<div data-include="modules/baocao/baocaonhanvien"></div>');
            }
            if (id == "#baocaonhap") {
                $(id).append('<div data-include="modules/baocao/baocaonhap"></div>');
            }
            if (id == "#baocaoxuat") {
                $(id).append('<div data-include="modules/baocao/baocaoxuat"></div>');
            }
            if (id == "#baocaothuhoi") {
                $(id).append('<div data-include="modules/baocao/baocaothuhoi"></div>');
            }
            if (id == "#baocaovttbtaidienluc") {
                $(id).append('<div data-include="modules/baocao/baocaovtbtdluc"></div>');
            }
            //if (id == "#baocaovattuthietbi") {
            //    $(id).append('<div data-include="modules/baocao/baocaovattuthietbi"></div>');
            //}
            //if (id == "#baocaohangmuave") {
            //    $(id).append('<div data-include="modules/baocao/baocaotonghangmuave"></div>');
            //}
            //if (id == "#baocaovatuthietbi") {
            //    $(id).append('<div data-include="modules/baocao/baocaovattuthietbitaduan"></div>');
            //}
            

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
