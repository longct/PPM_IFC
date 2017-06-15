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
function f_loadChangeTree() {
    var p = getAllIdMod();
    loaddanhsachchitietcatruc(1);
}


function loaddanhsachchitietcatruc(page) {
    try {
        var config = { namesql: "PKG_CAKIP.LISTCHITIETNGUOICATRUC", callback: "f_result_listchitietcatruc", connstr: "ConnOracleXangDau" };
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
        console.log(data);
        $.each(data, function (key, val) {
         
            var row = "";
            row += "<tr idnhanvien='" + val.idnhanvien + "'><td>"
                + val.stt + "</td><td>"
                + val.tennhanvien + "</td><td>"
                + val.matram + "</td><td>"
                + "<select class='form-control input-sm m-bot15 cbchitiet_catruc " + val.tenca + "' value='" + val.tenca + "'> </select>" + "</td> <td>"
                + "<select class='form-control input-sm m-bot15 cbchitiet_cot " + val.tencot + "' value='" + val.tencot + "'> </select>" + "</td> </tr>";
               // + "<select class='form-control select2 cbchitietvoi " + val.tencot + "' value='" + val.tencot + "'  multiple='multiple' data-placeholder='Chọn vòi'> </select>" + "</td> </tr>";
            $("#table_chitietcatruc").append(row);


        });

        loadchitietcotcatruc();
        loadchitiettramcatruc();
       // loadchitietvoi();

        // đổ ra list combox
        setTimeout(function () {
            $('.cbchitiet_catruc').each(function () {
                $(".cbchitiet_catruc." + $(this).attr("value") +" ").val($(this).attr("value"));
            });

            $('.cbchitiet_cot').each(function () {
                $(".cbchitiet_cot." + $(this).attr("value") + " ").val($(this).attr("value"));
            });

        }, 300);
       
    } catch (e) {
        console.log(e);
    }
}
function loadchitietcotcatruc() {
    try {
        var config = { namesql: "PKG_CAKIP.LISTCOTTRAM", callback: "f_result_loadchitietcotcatruc", connstr: "ConnOracleXangDau" };
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
// vòi
function loadchitietvoi() {
    try {
        var config = { namesql: "PKG_CAKIP.LISTCOTTRAM", callback: "f_result_loadchitietvoi", connstr: "ConnOracleXangDau" };
        var infotree = JSON.parse(localStorage.getItem('infotree'));
        var para = {
            v_code: infotree.code
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadchitietvoi(config, para, lst) {
    try {
        var data = lst.data;
        dataToCobClass("cbchitietvoi", data, "ma_cot", "tencot", "", "");

        setTimeout(function(){
            $('.cbchitietvoi ').multiselect();
        }, 20);
    } catch (e) {
        console.log(e);
    }
}
//
function loadchitiettramcatruc() {
    try {
        var config = { namesql: "PKG_CAKIP.LISTCATTRUCTRAM", callback: "f_result_loadchitiettramcatruc", connstr: "ConnOracleXangDau" };
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
            var config = { namesql: "PKG_CAKIP.CAPNHATCHITIETCATRUC", callback: "f_result_capnhatchitietca", connstr: "ConnOracleXangDau" };

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

