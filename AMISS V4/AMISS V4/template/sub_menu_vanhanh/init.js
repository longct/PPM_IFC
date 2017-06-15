$(document).ready(function () {
    hideSub();
    subClick();
    $(".comment-sub").click(function () {
        localStorage.setItem("com_mod", $(this).parent().data("value"));
        $("#modal_comment").modal("show");
    })

});