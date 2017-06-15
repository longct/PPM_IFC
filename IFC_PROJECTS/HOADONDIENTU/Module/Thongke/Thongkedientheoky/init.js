$(document).ready(function () {
    try {
        loadConetent();
        lst_donvi_ttky();
        lst_soghi_ttky();
        $('#txt_thang_tkky').datepicker({
            format: 'mm/yyyy',
            todayHighlight: true,
            minViewMode: "months",
            autoclose: true
        });
        $('#txt_thang_tkky').datepicker('setDate', new Date());

        $("#btn_thuchien_tkky").click(function () {
            loaddanhsach_tiendien();
        });
        $("#btn_execl_tkky").click(function () {
            execlhoadontien_ky();
        });

    } catch (e) {
        console.log(e);
    }
});

function lst_donvi_ttky() {
    try {
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_DONVI", callback: "result_lst_donvi_ttky" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lst_donvi_ttky(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_donvi_tkky", data, "id", "ten", "-1", "Vui lòng đơn vị");
    } catch (e) {
        console.log(e);
    }
}
function lst_soghi_ttky() {
    try {
        var p = getAllIdMod();
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_SOGHI", callback: "result_lst_soghi_ttky" };
        var para = { v_CODE: '-1' };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lst_soghi_ttky(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_masoghi_tkky", data, "id", "ten", "-1", "Vui lòng chọn sổ ghi");
    } catch (e) {
        console.log(e);
    }
}
function checkchon_ttky() {
    try {
        var p = getAllIdMod();
        var gia = "";
        if (p.cb_masoghi_tkky != '-1') {
            gia = p.cb_masoghi_tkky;
        } else {
            gia = p.cb_donvi_tkky;
        }

        return gia;
    } catch (e) {
        console.log(e);
    }
}
function loaddanhsach_tiendien() {
    try {
        var p = getAllIdMod();
        var thang = p.txt_thang_tkky.split('/');
        var config = { connstr: "Oracle_HDDT", namesql: "HD_THONGKETIENDIEN.THONGKETD", callback: "result_loaddanhsach_tiendien" };
        var para = {
            v_CODE: checkchon_ttky(),
            v_KY: p.cb_kychot_tkky,
            v_THANG: thang[0],
            v_NAM: thang[1]
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_loaddanhsach_tiendien(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 1 || data == '' || data == null || data == undefined) {

            messInfo("messinfo_ttky", "Không có dữ liệu hiển thị", 'error');
            $("#table_ttky").empty();
            return;
        }
        messInfo("messinfo_ttky", '', 'error');

        $("#table_ttky").empty();
        $.each(data, function (key,val) {
            var row = "";
            var row1 = "";
            if (val.stt != 99999999){
                row += "<tr><td>"
                    + val.stt + "</td><td>"
                    + val.magsc + "</td><td>"
                    + val.makhachhang + "</td><td>"
                    + val.tenkhachhang + "</td><td>"
                    + val.diachi + "</td><td>"
                    + val.tongsanluong + "</td><td>"
                    + val.tongtientruocthue + "</td><td>"
                    + val.thue + "</td><td>"
                    + val.tongtiensauthue + "</td></tr>";
        }else{
                     
                row += "<tr class='tong'><td>"
                   + "Tổng" + "</td><td>"
                   + "" + "</td><td>"
                   + "" + "</td><td>"
                   + "" + "</td><td>"
                   + "" + "</td><td>"
                   + val.tongsanluong + "</td><td>"
                   + val.tongtientruocthue + "</td><td>"
                   + val.thue + "</td><td>"
                   + val.tongtiensauthue + "</td></tr>";
            }
            $("#table_ttky").append(row+row1);
        });

    } catch (e) {
        console.log(e);
    }
}
function execlhoadontien_ky() {
    try{
        var p = getAllIdMod();
        var thang = p.txt_thang_tkky.split('/');
        var namef = "THONGKETIENDIEN";
        var config = { connstr: "Oracle_HDDT", namesql: "HD_THONGKETIENDIEN.THONGKETD", namefile: namef };
        var para = {
            v_CODE: checkchon_ttky(),
            v_KY: p.cb_kychot_tkky,
            v_THANG: thang[0],
            v_NAM: thang[1]
        };
        var colum = {
            kq: [
            { field: "magsc", name: "Mã GSC", type: "Text" },
            { field: "makhachhang", name: "Mã KH", type: "Text" },
            { field: "tenkhachhang", name: "Tên khách hàng", type: "Text" },
            { field: "diachi", name: "Địa chỉ", type: "Text" },
            { field: "tongsanluong", name: "Kwh", type: "Text" },
            { field: "tongtientruocthue", name: "Tiền điện", type: "Text" },
            { field: "thue", name: "Tiền GTGT", type: "Text" },
            { field: "tongtiensauthue", name: "Tổng", type: "TextAndBoldCenter" }
            ]
        };
       
        ExecuteExportExcelOracle(config, para, colum);

    } catch (e) {
        console.log(e);
    }
}