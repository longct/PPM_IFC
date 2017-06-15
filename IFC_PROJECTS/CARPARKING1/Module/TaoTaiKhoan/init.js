var countpage = 10;
$(document).ready(function () {
    try {
        loadConetent();
        loaddanhsachnhanvien(1);
    } catch (e) {
        console.log(e);
    }
});

function f_loadChangeTree() {
    loaddanhsachnhanvien(1);
}
function loaddanhsachnhanvien(page) {
    try{
        var config = { namesql: "CAR_DANGNHAP.LOADTHONGTIN", callback: "f_result_loadtaikh", connstr: "Oracle_HDDT" };
        var infotree = JSON.parse(localStorage.getItem('infotree'));
        var para = {
            v_CODE: infotree.code,
            v_pagenum: page,
            v_numrecs: countpage
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadtaikh(config, para, lst) {
    try{
        var data = lst.data;
        if (data == null || data == "[]" || data == "" || data.length == 0) {
            try {
                messInfo("messinfo_ttkh", "Không có dữ liệu hiển thị", "error");
                $("#table_ttkhachhang").empty();
                return;
            } catch (e) {
                console.log(e);
            }
        }
        messInfo("messinfo_ttkh", "", "error");
        pha1ttkhachhangdrowdataLm(data);
    } catch (e) {
        console.log(e);
    }
}
function pha1ttkhachhangdrowdataLm(data) {
    try {
      
        $("#table_ttkhachhang").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
               + val.stt + "</td><td>"
                + val.usercode + "</td><td>"
                + val.ten + "</td><td>"
                + setnull(val.sodienthoai) + "</td><td>"
                + setnull(val.mail) + "</td><td>"
                + setnull(val.diachi) + "</td><td>"
                + " <form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action' data-toggle='modal' href='#suakh' value='" + val.id + "' id='btn_suathongtinkh" + val.id + "'>Sửa</a></div>&nbsp;<div class='form-group'><a class='btn btn-danger btn-action' data-toggle='modal' href='#confimYesNo' value='" + val.id + "' id='btn_xoathongtinkh" + val.id + "'><i class='fa fa-trash-o'></i>Xóa</a></div></form></td> </tr>";
            $("#table_ttkhachhang").append(row);
            // load ra danh sach
            $("#btn_suathongtinkh" + val.id).click(function () {
                $("#messinfo_sua").empty();
                loadkhachhang_id(val.id);
            });
            $("#btn_xoathongtinkh" + val.id).click(function () {
                f_confimYesNo("Bạn chắc chắn muốn xóa khách ", "Bỏ qua", "Xác nhận", function () {
                    load_xoathongtinkhachhang(val.id);
                });
            });
            LoadPhanTrang("pageLst_tk", "pageCurent_tk", data, function () {
                loaddanhsachnhanvien($("#pagenumber").val());
            });
        });

    }catch (e) {
        console.log(e);
    }
}
function load_xoathongtinkhachhang(val) {
    try { 
        var config = { namesql: "CAR_DANGNHAP.CAPNHATXOA", callback: "f_result_loadtaikhoan_xoathongtinkhachhang", connstr: "Oracle_HDDT" };
        var para = {
              v_ID:val,
              v_TENNGUOIDUNG:'',
              v_SODIENTHOAI:'',
              v_EMAIL:'',
              v_DIACHI :'',
              v_GHICHU :'',
              v_CODE :'',
              v_USERID :'',
              v_TYPE: 'DELETE',
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadtaikhoan_xoathongtinkhachhang(config, para, lst) {
    try{
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_ttkh", row, "ok");
            loaddanhsachnhanvien(1);
        } else {
            messInfo("messinfo_ttkh", row, "error");
        }

    } catch (e) {
        console.log(e);
    }
}