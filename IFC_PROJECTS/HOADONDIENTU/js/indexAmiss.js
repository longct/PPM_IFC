$(document).ready(function () {

});

function getMenuUser() {
    try {
        var uname = JSON.parse(localStorage.getItem("userinfo")).tendangnhap;
        var config = { namesql: "PKG_PHANQUYEN.GET_MENU", callback: "f_result_menuuser", connstr: "ConnectOracle233" };
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
        if (m.length == 0) {
            menuClick('quanlymenu');
            $(".content-tree.hidetree").hide();
        } else {
            genarateMenu(m);
        }

    } catch (e) {
        console.log(e);
    }
}

function genarateMenu(content) {
    var mc = JSON.parse(content[0].menu_content);
    var firstLI = '<li class="header">QUẢN LÝ HỆ THỐNG</li>';
    var LI = "";
    for (var i = 0 ; i < mc.length; i++) {
        var subm = mc[i].sub;
        if (subm.length > 0) {
            LI += '<li class="treeview">' +
              '<a href="#">' +
              '<i class="fa fa-' + mc[i].icon + '"></i> <span>' + mc[i].mainmenu + '</span>' +
              '<span class="pull-right-container">' +
              '<i class="fa fa-angle-left pull-right"></i>' +
              '</span>' +
              '</a>' +
              '<ul class="treeview-menu">';
            for (var j = 0 ; j < subm.length; j++) {
                LI += '<li class=""><a onclick="menuClickAmiss(\'' + subm[j].link + '\',' + subm[j].per + ')"><i class="fa fa-circle-o"></i> ' + subm[j].tenmenu + '</a></li>';
            }
            LI += '</ul></li>';
        }
        else {
            LI += '</ul>';
        }
    }
    $("ul.sidebar-menu").empty();
    $("ul.sidebar-menu").append(firstLI + LI);
}
