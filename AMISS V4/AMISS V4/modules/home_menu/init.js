//$(document).bind("contextmenu", function (event) {
//    // Avoid the real one
//    event.preventDefault();
//    // Show contextmenu
//    $(".custom-menu").finish().toggle(100).
//    // In the right position (the mouse)
//    css({
//        top: event.pageY - 50 + "px",
//        left: event.pageX + "px"
//    });

//    console.log(event.pageY);
//});


//// If the document is clicked somewhere
//$(document).bind("mousedown", function (e) {
//    // If the clicked element is not the menu
//    if (!$(e.target).parents(".custom-menu").length > 0) {
//        // Hide it
//        $(".custom-menu").hide(100);
//    }
//});


//// If the menu element is clicked
//$(".custom-menu li").click(function () {
//    // This is the triggered action name
//    switch ($(this).attr("data-action")) {
//        // A case for each action. Your actions here
//        case "first": alert("first"); break;
//        case "second": alert("second"); break;
//        case "third": alert("third"); break;
//    }
//    // Hide it AFTER the action was triggered
//    $(".custom-menu").hide(100);
//});

$(document).ready(function () {
    loadContent();
    $("#check_searchmeter").change(function () {
        if ($(this).is(":checked")) {
            $("#search_home_txt").val("");
            setTreeDL(data_tree, 0);
            $("#search_home_txt").slideDown();
        }
        else {
            $("#search_home_txt").slideUp();
            setTreeDL(data_tree, 1);
        }
    })

    $("#search_home_txt").autocomplete({
        minLength: 0,
        delay: 200,
        source: meter_,
        select: function (event, ui) {
            $('.easy-tree').jstree('open_node', '#' + ui.item.parentid, function (e, data) {
                $('.easy-tree').jstree('select_node', '#' + ui.item.id);
            }, true);
            console.log(ui);
            show_meter_info(ui.item);
        },
    });
});

function show_meter_info(item) {
    $("#trangthai_diemdo").attr("src", get_icon_trangthai(item.icon));
    $("#tendiemdo").html(item.label);
    $("#makhachhang").html(item.madiemdo);
    $("#socongto").html(item.socongto);

    $("#tabl_info").show();
    $("#metro_menu").css("max-height", 370);
}
function get_icon_trangthai(str) {
    if (str == "1")
        return "img/tt1.png";
    else if (str == "0")
        return "img/tt0.png";
}