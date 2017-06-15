$(document).ready(function () {
    try {
        loadConetent();
        loaddanhsachnhanvien();
    } catch (e) {
        console.log(e);
    }
});

function f_loadChangeTree() {
    loaddanhsachnhanvien();
}
function loaddanhsachnhanvien() {
    try{
        var config = { namesql: "PKG_USER.LISTNGUOIDUNG", callback: "f_result_loaddanhsachnhanvien", connstr: "ConnOracleXangDau" };
        var infotree = JSON.parse(localStorage.getItem('infotree'));
      
        var para = {
            v_MADONVI: infotree.code,
            v_pagenum:20,
            v_numrecs:0
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddanhsachnhanvien(config, para, lst) {
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
               + val.rnum + "</td><td>"
                + val.manhanvien + "</td><td>"
                + val.tennhanvien + "</td><td>"
                + val.sodienthoai + "</td><td>"
                + val.diachi + "</td><td>"
                + " <form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action' data-toggle='modal' href='#suakh' value='" + val.idnhanvien + "' id='btn_suathongtinkh" + val.idnhanvien + "'>Sửa</a></div>&nbsp;<div class='form-group'><a class='btn btn-danger btn-action' data-toggle='modal' href='#confimYesNo' value='" + val.idnhanvien + "' id='btn_xoathongtinkh" + val.idnhanvien + "'><i class='fa fa-trash-o'></i>Xóa</a></div></form></td> </tr>";
            $("#table_ttkhachhang").append(row);
            // load ra danh sach
            $("#btn_suathongtinkh" + val.idnhanvien).click(function () {
                $("#messinfo_sua").empty();
                loadkhachhang_id(val.idnhanvien);
            });
            $("#btn_xoathongtinkh" + val.idnhanvien).click(function () {
                f_confimYesNo("Bạn chắc chắn muốn xóa khách ", "Bỏ qua", "Xác nhận", function () {
                    load_xoathongtinkhachhang(val.idnhanvien);
                });
            });
           
        });

    }catch (e) {
        console.log(e);
    }
}
function load_xoathongtinkhachhang(val) {
    try {
        
        var config = { namesql: "PKG_USER.CREATEUSER", callback: "f_result_loadtaikhoan_xoathongtinkhachhang", connstr: "ConnOracleXangDau" };
        var para = {
            v_IDNHANVIEN: val,
            v_MANHANVIEN: '',
            v_TENNHANVIEN: '',
            v_MATKHAU: '',
            v_SODIENTHOAI: '',
            v_MADONVI: '',
            v_DIACHI: '',
            v_QUYEN: '',
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
            loaddanhsachnhanvien();
        } else {
            messInfo("messinfo_ttkh", row, "error");
        }

    } catch (e) {
        console.log(e);
    }
}