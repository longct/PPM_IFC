var Countpage = 10;
$(document).ready(function () {
    try {
        loadContent();
        loadchecklog_master();
        loaddanhsachtaikhoang(1);
    } catch (e) {
        console.log(e);
    }
});


function loaddanhsachtaikhoang(page) {
    try{
        var config = { namesql: "PKG_USERS.LISTNGUOIDUNG", callback: "f_result_loaddanhsach_tk", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_MADONVI: '0101',
            v_pagenum: page,
            v_numrecs: Countpage
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddanhsach_tk(config,para,lst) {
    try {
        var data = lst.data;
        if (data == [] || data == "[]" || data == null || data == undefined || data.length == 0) {
            messInfo("messinfo_ttkh", "Không có dữ liệu hiển thị", "ok");
            clearnull();
            return;
        }
        loaddanhsachtk(data);
    } catch (e) {
        console.log(e);
    }
}
function loaddanhsachtk(data) {
    try {
        $("#table_ttkhachhang").empty();
        $.each(data, function (key,val) {
            var row = "";
            row += "<tr><td>"
               + val.stt + "</td><td>"
                + setnull(val.manhanvien) + "</td><td>"
                + setnull(val.tennhanvien) + "</td><td>"
                + setnull(val.sodienthoai) + "</td><td>"
                + setnull(val.diachi) + "</td><td>"
                + setnull(val.name) + "</td><td>"
                + setnull(val.tendonvi) + "</td><td>"
                + " <form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action' data-toggle='modal' href='#suakh' value='" + val.idnhanvien + "' id='btn_suathongtinkh" + val.idnhanvien + "'>Sửa</a></div>&nbsp;<div class='form-group'><a class='btn btn-danger btn-action' data-toggle='modal' href='#confimYesNo' value='" + val.idnhanvien + "' id='btn_xoathongtinkh" + val.idnhanvien + "'><i class='fa fa-trash-o'></i>Xóa</a></div></form></td> </tr>";
            $("#table_ttkhachhang").append(row);
            
            $("#btn_suathongtinkh" + val.idnhanvien).click(function () {
              
                $("#messinfo_sua").empty();
                loadkhachhang_id(val.idnhanvien);
            });
            $("#btn_xoathongtinkh" + val.idnhanvien).click(function () {
                f_confimYesNo("Bạn chắc chắn muốn xóa khách hàng", "Bỏ qua", "Xác nhận", function () {
                    load_xoathongtinkhachhang(val.idnhanvien);
                });
            });

            LoadPhanTrang("pageLst_tk", "pageCurent_tk", data, function () {
                loaddanhsachtaikhoang($("#pagenumber").val());
            });
        });

    } catch (e) {
        console.log(e);
    }
}

function clearnull (){
    try{
        $("#table_ttkhachhang").empty();
        $("#pageCurent_tk").empty();
        $("#pageLst_tk").empty();

    } catch (e) {
        console.log(e);
    }
}

function load_xoathongtinkhachhang(val) {
    try {
        //console.log(val);
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var config = { namesql: "PKG_USERS.CREATEUSER", callback: "f_result_loadtaikhoan_xoathongtinkhachhang", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_userid:userinfo.idnhanvien,
            v_IDNHANVIEN: val,
            v_MANHANVIEN: '',
            v_TENNHANVIEN: '',
            v_MATKHAU: '',
            v_SODIENTHOAI: '',
            v_MADONVI: '',
            v_DIACHI: '',
            v_QUYEN: '',
            v_EMAIL: "",
            v_NHANCB: "",
            v_TYPE: 'DELETE',
        };
        //console.log('para');
        //console.log(para);
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadtaikhoan_xoathongtinkhachhang(config, para, lst) {
    try {
        var data = lst.data;
        //console.log(data);
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_ttkh", row, "ok");
            loaddanhsachtaikhoang(1);
        } else {
            messInfo("messinfo_ttkh", row, "error");
        }

    } catch (e) {
        console.log(e);
    }
}