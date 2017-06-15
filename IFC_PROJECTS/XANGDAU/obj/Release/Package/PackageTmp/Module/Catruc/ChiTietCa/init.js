var countPage = 10;
var dataExcel = '';
$(document).ready(function () {
    try {
        loadConetent();
        loadchitietcotcatruc();
        loaddanhsachchitietcatruc(1);
        $("#btn_lichsutram").click(function () {
            capnhatchitietca();
        });


    } catch (e) {
        console.log(e);
    }
});
function loaddanhsachchitietcatruc(page) {
    try {
        var config = { namesql: "THONGTINTRAM.LISTCHITIETNGUOICATRUC", callback: "f_result_listchitietcatruc", connstr: "ConnOracleXangDau" };
        var infotree = JSON.parse(localStorage.getItem('infotree'));
        var para = {
            v_madonvi: infotree.code,
            v_pagenum: page,
            v_numrecs: countPage
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_listchitietcatruc(config, para, lst) {
    try {
        var data = lst.data;    
        if (data == null || data == "[]" || data == "" || data.lenght == 0) {
            messInfo("messinfo_chitietcatruc", "Không có dữ liệu hiển thị ", "error");
            $("#table_chitietcatruc").empty();
            return;
        }
        
        datalichchitietcatruc(data);
    } catch (e) {
        console.log(e);
    }
}
function datalichchitietcatruc(data) {
    try {
        $("#table_chitietcatruc").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr idnhanvien='" + val.idnhanvien + "'><td>"
                + val.stt + "</td><td>"
                + val.tennhanvien + "</td><td>"
                + val.manhanvien + "</td><td>"
                + "<select class='form-control input-sm m-bot15 cbchitiet_catruc'><option value='-1'> Chọn cột</option> </select>" + "</td> <td>"
                + "<select class='form-control input-sm m-bot15 cbchitiet_cot' ><option value='-1'> Chọn cột</option> </select>" + "</td> </tr>";
            $("#table_chitietcatruc").append(row);
        });
        loadchitietcotcatruc();
        loadchitiettramcatruc();

    } catch (e) {
        console.log(e);
    }
}
function loadchitietcotcatruc() {
    try {
        var config = { namesql: "THONGTINTRAM.LISTCOTTRAM", callback: "f_result_loadchitietcotcatruc", connstr: "ConnOracleXangDau" };
        var infotree = JSON.parse(localStorage.getItem('infotree'));
        var para = {
            v_code: infotree.code
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadchitietcotcatruc(config, para, lst) {
    try {
        var data = lst.data;
        dataToCobClass("cbchitiet_cot", data, "ma_cot", "tencot", "-1", "Chọn cột");
    } catch (e) {
        console.log(e);
    }
}
function loadchitiettramcatruc() {
    try {
        var config = { namesql: "THONGTINTRAM.LISTCATTRUCTRAM", callback: "f_result_loadchitiettramcatruc", connstr: "ConnOracleXangDau" };
        var infotree = JSON.parse(localStorage.getItem('infotree'));
        var para = {
            v_code: infotree.code
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadchitiettramcatruc(config, para, lst) {
    try {
        var data = lst.data;
        dataToCobClass("cbchitiet_catruc", data, "id_maca", "tenca", "-1", "Chọn ca");
    } catch (e) {
        console.log(e);
    }
}
function capnhatchitietca() {
    try {

        var paraa = [];
        $('#table_chitietcatruc tr').each(function () {
            var info = { idnhanvien: $(this).attr("idnhanvien"), catruc: $(this).find('.cbchitiet_catruc').first().val(), cot: $(this).find('.cbchitiet_cot').first().val() };
            paraa.push(info);
        });
        for (var i = 0; i < paraa.length; i++) {
            var config = { namesql: "THONGTINTRAM.CAPNHATCHITIETCATRUC", callback: "f_result_capnhatchitietca", connstr: "ConnOracleXangDau" };

            var para = {
                v_macatruc: paraa[i].catruc,
                v_manhanvien: paraa[i].idnhanvien,
                v_listcot: paraa[i].cot
            };
            ExecuteServiceSyns(config, para);
        }
    } catch (e) {
        console.log(e);
    }
}
function f_result_capnhatchitietca(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_chitietcatruc", row, "ok");
    
        } else {
            messInfo("messinfo_chitietcatruc", row, "error");
        }
    } catch (e) {
        console.log(e);
    }
}

function loadchicathucsu() {
    try {

    } catch (e) {
        console.log(e);
    }
}