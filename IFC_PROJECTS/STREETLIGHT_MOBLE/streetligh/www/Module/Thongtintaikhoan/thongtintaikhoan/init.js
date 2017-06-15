var quyen = [];
var dv = [];
$(document).ready(function () {
    try {
        loadConetent();
        loadquyen();
        loaddonvi();

       
    } catch (e) {
        console.log(e);
    }

});



function loadquyen() {
    try {
        var config = { namesql: "PKG_USERS.LSTQUYEN", callback: "f_result_loadquyen", connstr: "ConnectOracleStreetLight" };
        var para = [''];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadquyen(config, para, lst) {
    try {
        var l = lst.data;
        for (var i = 0 ; i < l.length; i++) {
            quyen.push(JSON.stringify(l[i]));
        }

        showall();
        return quyen;
    } catch (e) {
        console.log(e);
    }
}
function loaddonvi() {
    try {
        var config = { namesql: "PKG_USERS.LSTDONVI", callback: "f_result_loadlstdonvi", connstr: "ConnectOracleStreetLight" };
        var para = [''];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadlstdonvi(config, para, lst) {
    try {
        var l = lst.data;
        for (var i = 0 ; i < l.length; i++) {
            dv.push(JSON.stringify(l[i]));
        }

        showall();
        return dv;
    } catch (e) {
        console.log(e);
    }
}
function showquyen(id) {
    for (var i = 0; i < quyen.length; i++) {
        if (JSON.parse(quyen[i]).id == id) {
            return (JSON.parse(quyen[i]).name);
        }
    }
}
function showdv(id) {
    for (var i = 0; i < dv.length; i++) {
        if (JSON.parse(dv[i]).madonvi == id) {
            return (JSON.parse(dv[i]).tendonvi);
        }
    }
}

function showall() {
    var user = JSON.parse(localStorage.getItem("userinfo"));
    var tr = "<tr>" +
        "<td>" + user.manhanvien + "</td>" +
        "<td>" + user.tennhanvien + "</td>" +
        "<td>" + user.sodienthoai + "</td>" +
        "<td>" + user.diachi + "</td>" +
        "<td>" + showquyen(user.quyen) + "</td>" +
        "<td>" + showdv(user.madonvi) + "</td>" +
        "</tr>";
    $("tbody#table_ttkhachhang").empty();
    $("tbody#table_ttkhachhang").append(tr);
}