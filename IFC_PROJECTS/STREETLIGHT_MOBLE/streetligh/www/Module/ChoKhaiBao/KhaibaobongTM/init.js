var dataExcel='';
$(document).ready(function () {
    try {
        loadConetent();
        loadtu_thembong();
        loadchecklog_master();
        $("#btn_checkluu_thembong").click(function () {
            var check = checkvalidate();
            if (check != "") {
                messInfo("messinfo_thembong", check, "error");
                return;
            }
            Thembong();
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
function Thembong() {
    try{
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var p = getAllIdMod();
        var config = { namesql: "PKG_QUANLYBONG.THEMTHONGTINBONG", callback: "f_result_Thembong", connstr: "ConnectOracleStreetLight" };
        data = dataExcel;
        var count_success = 0;
        for (var i = 0; i < data.length; i++) {
            var para = {
                v_userid: userinfo.idnhanvien,
                v_idtu:p.cbtu_thembong,
                v_tenbong:data[i].tenbong,
                v_idrfbong: data[i].idrfbong,
                v_dienap: data[i].dienap,
                v_thoigian: data[i].thoigian,
                v_congsuat: data[i].congsuat,
                v_chieucaocot: data[i].chieucaocot,
                v_ghichu: data[i].ghichu,
                v_chisochieusang: data[i].chisochieusang,
            };
            var urli = "http://14.177.66.131:5566/ServiceSqlOracleNew";

            var jsonpara = { config: JSON.stringify(config), para: JSON.stringify(para) };
            var syns = false;
            $.ajax({
            url: urli + "/api/ExcuteOracle",
             type: "POST",
             data: jsonpara,
             async: syns,
            success: function (data, textStatus, jqXHR) {
              var lst = JSON.parse(data);
               data = lst.data
               var a = i + 2;
                if (data[0].count == 1) {
                    count_success++;
                    $('table tbody tr:eq(' + a + ')').find('td:last-child').text('Thêm thành công');
                }else if (data[0].count == 2) {
                    $('table tbody tr:eq(' + a + ')').find('td:last-child').text('IDRF của bóng đã tồn tại');
                 }else {
                    $('table tbody tr:eq(' + a + ')').find('td:last-child').text('Lỗi thêm');
                 }
               },
              complete: function () {
             },
               error: function (jqXHR, textStatus, errorThrown) {
              }
             });
        }
        messInfo("messinfo_thembong", "Tổng số thêm thành công " + count_success + " bóng đèn", "ok");
    


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


