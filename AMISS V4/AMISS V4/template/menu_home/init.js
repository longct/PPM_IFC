$(document).ready(function () {
    getSubMenu("chiso");  
    $(".menu_metro").click(function () {
        var linkmod = $(this).data("value");
        var id = $(this)[0].id;
        $(".active_metro").hide();
        $("#" + id + " .active_metro").show();
        $(".right-content").css("margin-left","665px");
        getSubMenu(linkmod);
    })

    $('#modal_comment').on('shown.bs.modal', function () {
        var com_mod = localStorage.getItem("com_mod");
        $("#title_comment").text(com_mod);
    })

});
function getSubMenu(mod) {
    $(".left-submenu").empty();
    var link = '<div data-include="template/sub_menu_' + mod + '"></div>';
    $(".left-submenu").append(link);
    loadContent();
    
}

