var dataExcel='';
$(document).ready(function () {
    try {
       
       // loadConetent();
        loadtu_thembong();
       // loadchecklog_master();
        $("#btn_checkluu_thembong").click(function () {
            var check = checkvalidate();
            if (check != "") {
                messInfo("messinfo_thembong", check, "error");
                return;
            }
            f_confimYesNo("Bạn chắc chắn muốn cập nhật", "Bỏ qua", "Xác nhận", function () {
                Capnhatkhaibaobong();
            });

          
        });

    } catch (e) {
        console.log(e);
    }
});

function loadtu_thembong() {
    try {
        var config = { namesql: "PKG_QUANLYBONG.DANHSACHTU", callback: "f_result_loadtu_thembong", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_Code:'0119'
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadtu_thembong(config, para, lst) {
    try {
        var data = lst.data;
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            return;
        }
        dataToCob("cbtu_thembong", data, "id", "tenkhachhang", "-1", "Vui lòng chọn tủ");
    } catch (e) {
        console.log(e);
    }
}
function f_UploadFile_xuatexcel() {
    try {
        messInfo("messinfo_thembong", '', "ok");

        var p = getAllIdMod();
        var fdata = new FormData();
        var file = document.getElementById("uploadexcel_thembong").files[0];
      
        fdata.append("file", file);
        fdata.append("select", "select *");
        fdata.append("where", "");
        if (file == null || file == 'undefined' || file.length == 0) {
            messInfo("messinfo_xuatexcel", "Bạn chưa chọn file execl", "error");
            return;
        }
        var config = { callback: "f_resultImportExcel_xuatexcel" };

        f_importExcel(config, fdata);
    } catch (e) { console.log(e); }
}
function f_resultImportExcel_xuatexcel(config, para, lst) {
    try{
        var data = lst.data;
        dataExcel = data;
        $("#table_thembong").empty();
        $.makeTable = function (data) {
            var table = $('<table class="table table-striped table-bordered table-hover table-condensed cmiss_table">');
            var rowth = "<thead><tr>";
            for (var titile in data[0]) rowth += "<th>" + titile.toUpperCase() + "</th>";
            rowth += "</tr></thead>";
            $(rowth).appendTo(table);
            $.each(data, function (index, value) {
                var row = "<tr>";
                $.each(value, function (key, val) {   
                    row += "<td>" + val + "</td>";
                });
                row += "</tr>";
                $(table).append(row);
            });
            return ($(table));
        };
        var table = $.makeTable(data);
        $(table).appendTo("#table_thembong");

    } catch (e) {
        console.log(e);
    }
}
function Capnhatkhaibaobong() {
    try {
        var lstId = [];
   
        data = dataExcel;
     
        for (var i = 0; i < data.length; i++) {
            if (data[i].idrfbong != null & data[i].tenbong != null) {
                var ID = {
                    cot1: data[i].tenbong,
                    cot2: data[i].idrfbong,
                    cot3: data[i].dienap,
                    cot4: data[i].congsuat,
                    cot5: data[i].thoigian,
                    cot6: data[i].chieucaocot,
                    cot7: data[i].ghichu,
                    cot8: data[i].chisochieusang,
                    cot9: 'THEMBONG',
                    cot10: data[i].phabong
                };
                lstId.push(ID);
            } else {
                messInfo("messinfo_thembong", 'File của bạn chưa đúng (Tên bóng và IDRFbong không được bỏ trống )', "error");
                return;
            }
        }

        var config = {
            connstr: "ConnectOracleStreetLight",
            insertto: "TEMP_NHIEUCOT",
        }
        var table = {
            table: JSON.stringify(lstId)
        };
        var lst = ExecuteBulkCopyOracle(config, table);
        if (lst != null) {
            Thembong();
        }
        else {
            messInfo("messinfo_thembong", 'File của bạn chưa đúng ', "error");
        }
    } catch (e) {
        console.log(e);
    }
}
function Thembong() {
    try{
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var p = getAllIdMod();
        var config = { namesql: "PKG_QUANLYBONG.THEMBONGKHAIBAO", callback: "f_result_Thembong", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_userid: userinfo.idnhanvien,
            v_idtu: p.cbtu_thembong
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}

function f_result_Thembong(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_thembong", row, "ok");
        } else {
            messInfo("messinfo_thembong", row, "error");
        }

    } catch (e) {
        console.log(e);
    }
}

function checkvalidate() {
    try{
        var p = getAllIdMod();
        if(p.cbtu_thembong=='-1') return"Bạn chưa chọn tủ";
        return "";
    } catch (e) {
        console.log(e);
    }
}


