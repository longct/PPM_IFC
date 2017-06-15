var flag = 1;
$(document).ready(function () {
    $("#curentPage").html("Quản lý menu");
    var mod = getModules(localStorage.getItem("uspe").split(","));
    console.log(mod);
    var width = $(window).width();
    var height = $(window).height();
    createColumsFilter_qlmenu();
    $(".fa-plus.qlm_i").click(function () {
        createTxtMenu(1);
        flag++;
    });
});

//List chức năng click
function createColumsFilter_qlmenu() {
    $("ul.dschucnang li").click(function () {
        if ($(this).hasClass("notuse")) {
            $(this).removeClass("notuse");
            $(this).addClass("use");
            $("[data-empty = 'true']").val($(this)[0].innerText);
            $("[data-empty = 'true']").attr("data-value", ($(this).data("value")));
            $("[data-empty = 'true']").removeAttr("data-empty");
            //console.log($(this)[0].innerText);
        }
        else {
            $(this).removeClass("use");
            $(this).addClass("notuse");
        }
    });
}
//Xóa Menu
function removeLI(selector) {
    selector.remove();
}
//Tạo Menu
function createTxtMenu(lv, id) {
    if (lv == 0) {
        var div_ = '<li class="header">QUẢN LÝ HỆ THỐNG' +
            '<i class="fa fa-plus qlm_i g"></i>' +
            '</li>';
        $("ul.sidebar-menu-qlm").append(div_);
    }
    else if (lv == 1) {
        var div_ = '<li class="active treeview" id="qlm-li' + flag + '">' +
                   '<input type="text" data-value="" class="form-control menu-lv1" id="qlm-menu' + flag + '" placeholder="Menu lớn">' +
                   '<i data-value="' + flag + '" class="fa fa-dedent qlm_i b"></i>' +
                   '<i data-value="' + flag + '" class="fa fa-trash qlm_i r"></i>' +
                   '<ul class="treeview-menu">' +
                   '</ul>';
        $("ul.sidebar-menu-qlm").append(div_);
        //Tạo Menu con
        $(".fa-dedent.qlm_i").click(function () {
            var numItems = $('input[data-empty = "true"]').length;
            var _id = $(this).data("value");
            if (numItems == 0) {
                createTxtMenu(2, "qlm-li" + _id);
            }
            else {
                showToast("Chưa chọn chức năng menu <br/> Click chức năng bên trái để chọn", "error");
            }
        });
        //Xóa Menu lớn
        $(".fa-trash.qlm_i").click(function () {
            removeLI($(this).parent());
        });

    } else if (lv == 2) {
        var div_ = '<li>' +
                   '<input type="text" data-value ="" class="form-control menu-lv2" id="" placeholder="Menu con" disabled data-empty = "true">' +
                   '</i><i data-value="" class="fa fa-trash qlm_i r"></i>' +
                   '</li>';
        $("#" + id + " ul.treeview-menu").append(div_);
        //Xóa Menu con
        $(".fa-trash.qlm_i").click(function () {
            removeLI($(this).parent());
        });
    }

}
