$(document).ready(function () {
    showhideTree();
    try {
        if (localStorage.getItem("tree_node")) {
            var istype = JSON.parse(localStorage.getItem("tree_node"))[0].type;
            var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
            var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
            if (socongto != "0") {
                $("#tendiemdo_span").html("Vui lòng chọn Đơn vị để xem dữ liệu");
                return;
            }
            else if (istype == "4")
                $("#tendiemdo_span").html("<span tkey='soghi'></span>: " + tendiemdo);
            else if (socongto == "0" && istype != "4")
                $("#tendiemdo_span").html("<span tkey='donvi'></span>: " + tendiemdo);
            else if (parseInt(istype) >= 6)
                $("#tendiemdo_span").html("Trạm: " + tendiemdo);
        }
        else {
            $("#tendiemdo_span").html("Vui lòng chọn Đơn vị để xem dữ liệu");
            $("#tab_content").empty();
            return;
        }
        loadthongkedangnhap();
        selectlang();
    } catch (e) {
        console.log(e);
    }

});
function loadthongkedangnhap() {
    try {
        var tree = JSON.parse(localStorage.getItem("tree_node"));
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_QUANLYNGUOIDUNG.THONGKETHANHVIENDANGNHAP", callback: "result_loadthongkedangnhap" };
        var para = {
            v_Code: tree[0].id
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}

function result_loadthongkedangnhap(config, para, lst) {
    try {
        var data = lst.data;

        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            showToast('Không có dữ liệu hiển thị', "error");
            return;
        }

        $("#tKdangnhap_tk").empty();
        $.makeTable = function (data) {
            var table = $('<table class="table table-striped table-bordered table-hover table-condensed cmiss_table">');
            var rowth = "<thead class=' bg-aqua-gradient'><tr>";
            for (var titile in data[0]) rowth += "<th>" + titile.toUpperCase() + "</th>";
            rowth += "</tr></thead>";
            $(rowth).appendTo(table);
            $.each(data, function (index, value) {
                var row = "<tr>";
                $.each(value, function (key, val) {
                    row += "<td class='a_c'>" + val + "</td>";
                });
                row += "</tr>";
                $(table).append(row);
            });
            return ($(table));
        };
        var table = $.makeTable(data);
        $(table).appendTo("#tKdangnhap_tk");


    } catch (e) {
        console.log(e);
    }
}