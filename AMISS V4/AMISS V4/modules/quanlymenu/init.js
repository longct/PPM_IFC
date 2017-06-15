var flag = 1;
$(document).ready(function () {
    showhideTree();
    getModPermission();
    getMenuUser();
    var width = $(window).width();
    var height = $(window).height();
    init_createSub_click();

    $("#btn_luumenu").click(function () {
        var lst = [];
        var menu = [];
        var menuitem;
        var x = 0;
        var menuicon = ["dashboard", "calendar", "bell", "bar-chart", "group", "gears"];
        for (var i = 1; i < $("ul.sidebar-menu-qlm").children().length; i++) {
            var child = ($("ul.sidebar-menu-qlm").children()[i]);
            var maintext = ($("#" + child.id + " input").val());
            var submenu = [];
            if ($("#" + child.id + " ul")[0].childElementCount > 0) {
                for (var j = 0 ; j < $("#" + child.id + " ul")[0].childElementCount; j++) {
                    var subm = $("#" + child.id + " ul li .menu-lv2")[j];
                    //console.log();
                    var tenmenu = $(subm).val();
                    var linkmenu = $(subm).data("value");
                    var permission = $(subm).data("per").toString();
                    var submenuitem = {tm: tenmenu, lk: linkmenu,pr:permission };
                    submenu.push(submenuitem);
                }
                //console.log(submenu);
            }
            menuitem = { mainmenu: maintext, sub: submenu, icon: menuicon[x] };
            menu.push(menuitem);
            x++;

        }
        //console.log(menu);
        //return;
        saveMenu(JSON.stringify(menu));
        //console.log(JSON.stringify(menu));

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
            $("[data-empty = 'true']").attr("data-per", ($(this).data("per")));
            $("[data-empty = 'true']").removeAttr("data-empty");
            //console.log($(this)[0].innerText);
        }
        else {
            //$(this).removeClass("use");
            //$(this).addClass("notuse");
            showToast("Chức năng đã được đưa vào menu", "error");
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
        var div_ = '<li class="active treeview" id="qlm-li' + 1 + '">' +
                   '<input type="text" data-value="" class="form-control menu-lv1" id="qlm-menu' + 1 + '" placeholder="" disabled value="Chỉ số">' +
                   '<i data-value="' + 1 + '" class="fa fa-dedent qlm_i b"></i>' +
                   '<ul class="treeview-menu">' +
                   '</ul>' +
                   '<li class="active treeview" id="qlm-li' + 2 + '">' +
                   '<input type="text" data-value="" class="form-control menu-lv1" id="qlm-menu' + 2 + '" placeholder="" disabled value="Vận hành">' +
                   '<i data-value="' + 2 + '" class="fa fa-dedent qlm_i b"></i>' +
                   '<ul class="treeview-menu">' +
                   '</ul>' +
                   '<li class="active treeview" id="qlm-li' + 3 + '">' +
                   '<input type="text" data-value="" class="form-control menu-lv1" id="qlm-menu' + 3 + '" placeholder="" disabled value="Cảnh báo">' +
                   '<i data-value="' + 3 + '" class="fa fa-dedent qlm_i b"></i>' +
                   '<ul class="treeview-menu">' +
                   '</ul>' +
                   '<li class="active treeview" id="qlm-li' + 4 + '">' +
                   '<input type="text" data-value="" class="form-control menu-lv1" id="qlm-menu' + 4 + '" placeholder="" disabled value="Báo cáo">' +
                   '<i data-value="' + 4 + '" class="fa fa-dedent qlm_i b"></i>' +
                   '<ul class="treeview-menu">' +
                   '</ul>' +
                   '<li class="active treeview" id="qlm-li' + 5 + '">' +
                   '<input type="text" data-value="" class="form-control menu-lv1" id="qlm-menu' + 5 + '" placeholder="" disabled value="Quản lý">' +
                   '<i data-value="' + 5 + '" class="fa fa-dedent qlm_i b"></i>' +
                   '<ul class="treeview-menu">' +
                   '</ul>' +
                   '<li class="active treeview" id="qlm-li' + 6 + '">' +
                   '<input type="text" data-value="" class="form-control menu-lv1" id="qlm-menu' + 6 + '" placeholder="" disabled value="Tiện ích">' +
                   '<i data-value="' + 6 + '" class="fa fa-dedent qlm_i b"></i>' +
                   '<ul class="treeview-menu">' +
                   '</ul>';
        $("ul.sidebar-menu-qlm").append(div_);
        //Tạo Menu con
        init_create();

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
function getModPermission() {
    try {
        var uname = JSON.parse(localStorage.getItem("userinfo")).usercode;
        var config = { namesql: "PKG_PHANQUYEN.GET_MODULES", callback: "f_result_modpermission", connstr: "ConnectOracle_Amiss4" };
        var para = {
            v_tendangnhap: uname
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_modpermission(config, para, lst) {
    try {
        var subMenuArray = [];
        $('.sidebar-menu-qlm input').each(function () {
            subMenuArray.push($(this)[0].defaultValue);
        });
        var modper = lst.data;
        var li = "";
        for (var i = 0; i < modper.length; i++) {
            var m = modper[i];
            if ($.inArray(m.tenmodule,subMenuArray) == -1){
                li += '<li alt="' + m.mid + '"data-per="' + m.chitietquyen + '" data-value="' + m.linkmodule + '" class="notuse">' + m.tenmodule + '</li>';
            } else {
                li += '<li alt="' + m.mid + '"data-per="' + m.chitietquyen + '" data-value="' + m.linkmodule + '" class="use" disabled>' + m.tenmodule + '</li>';
            }
            
        }
        $('.dschucnang').empty();
        $('.dschucnang').append(li);
        createColumsFilter_qlmenu();
    } catch (e) {
        console.log(e);
    }
}


function saveMenu(data) {
    //////console.log(data);
    var uid = JSON.parse(localStorage.getItem("userinfo")).userid;
    try {
        var config = { namesql: "PKG_PHANQUYEN.SAVE_MENU", callback: "f_result_saveMenu", connstr: "ConnectOracle_Amiss4" };
        var para = {
            v_userid: uid,
            v_menucontent: data

        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_saveMenu(config, para, lst) {
    try {
        var m = lst.data;
        if (m[0].count == "Tạo menu thành công") {
            showToast("Tạo menu thành công", "success");
            getMenuUser();
        }
    } catch (e) {
        console.log(e);
    }
}
function getMenuUser() {
    try {
        var uname = JSON.parse(localStorage.getItem("userinfo")).usercode;
        var config = { namesql: "PKG_PHANQUYEN.GET_MENU", callback: "f_result_menuuser", connstr: "ConnectOracle_Amiss4" };
        var para = {
            v_tendangnhap: uname
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_menuuser(config, para, lst) {
    try {
        var m = lst.data;
        console.log(m);
        if (m.length == 0) {
            menuClick('quanlymenu','11111');
            $(".content-tree.hidetree").hide();
        } else {
            genarateMenu(m);
            drawMenu(m);
            init_create();
        }

    } catch (e) {
        console.log(e);
    }
}
function drawMenu(m) {
    var m_ = JSON.parse(m[0].menu_content);
    var ul = '<li class="header">' +
             '   <label class="filter_tsvh" style="margin-left: 11px;margin-top: 11px;">CHỨC NĂNG HỆ THỐNG</label>' +
             '</li>';
    var LI = "";
    for (var i = 0; i < m_.length; i++) {
        var sub_ = m_[i].sub;
        LI += '<li class="active treeview" id="qlm-li' + i + '">' +
                 '<input type="text" data-value="" class="form-control menu-lv1" id="qlm-menu1" placeholder="" disabled="" value="' + m_[i].mainmenu + '">' +
                 '<i data-value="'+i+'" class="fa fa-dedent qlm_i b"></i>' +
                 '<ul class="treeview-menu">';

        var submenu = "";
        if (sub_.length > 0) {
            for (var j = 0 ; j < sub_.length; j++) {
                //console.log(sub_[j]);
                submenu += '<li>' +
                           '<input type="text" data-value="' + sub_[j].lk + '" class="form-control menu-lv2" id="" value="' + sub_[j].tm + '" disabled="" data-per="'+sub_[j].pr+'">' +
                           '<i data-value="" class="fa fa-trash qlm_i r"></i>' +
                           '</li>';
            }
            LI += submenu;
        } else {
        }
        LI += '</ul></li>';
    }

    $("ul.sidebar-menu-qlm").empty();
    $("ul.sidebar-menu-qlm").append(ul + LI);
    
}

function init_createSub_click() {
    $(".fa-plus.qlm_i").click(function () {
        createTxtMenu(1);
        flag++;
    });
}
function init_create() {
    $(".fa-dedent.qlm_i").click(function () {
        var numItems = $('input[data-empty = "true"]').length;
        var _id = $(this).data("value");
        console.log(_id);
        if (numItems == 0) {
            createTxtMenu(2, "qlm-li" + _id);
        }
        else {
            showToast("Chưa chọn chức năng menu <br/> Click chức năng bên trái để chọn", "error");
        }
    });
    $(".fa-trash.qlm_i").click(function () {
        removeLI($(this).parent());
        getModPermission();
    });
}