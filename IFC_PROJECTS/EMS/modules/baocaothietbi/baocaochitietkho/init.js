var countpage = 10;
$(document).ready(function () {
    try {
        
        var p = getAllIdMod();
        loadConetent();
        loadInitDate();
        Loadcomboxbckho_baocaochitietkho();
        Loadvattucombox_baocaochitietkho();
        loaddatabase_baocaochitietkho(p, 1);
        $("#cbkho_baocaochitietkho").change(function () {
            var p = getAllIdMod();
            var value = p.cbkho_baocaochitietkho;
            loadduan_baocaochitietkho(value);
            Loadtrangthai_baocaochitietkho(value);
            Loadnguoidung_baocaochitietkho(value);
        });


        $("#cbvattutb_baocaochitietkho").change(function () {
            loadgetlistthietbi_baocaochitietkho();
        });

        $("#btnThucHienDanhsach_baocaochitietkho").click(function () {
            var p = getAllIdMod();
            loaddatabase_baocaochitietkho(p, 1);
        });
        $("#btnExecl_baocaochitietkho").click(function () {
            Xuatexecl_baocaochitietkho();
        });
    } catch (e) {
        console.log(e);
    }
});

//============================================================ XY LY CAC CHUC NANG==========================================================
//loadvattuthietbi
function Loadvattucombox_baocaochitietkho() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_loadvattucombox_baocaochitietkho", connstr: "ConnectEMS" };
        var para = {
            Type: 'Basic',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadvattucombox_baocaochitietkho(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbvattutb_baocaochitietkho", data[0].kq0, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
//load loại thiết bị
function loadgetlistthietbi_baocaochitietkho() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "TB_Import_LstLoadByCode", callback: "f_result_loadlistthietbi_baocaochitietkho", connstr: "ConnectEMS" };
        var para = { IsType: 'LoaiThietBi', Code: p.cbvattutb_baocaochitietkho };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadlistthietbi_baocaochitietkho(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbloạithietbi_baocaochitietkho", data, "code", "name", "-1", "--Tất cả-");
    } catch (e) {
        console.log(e);
    }
}


//load banmien
function Loadcomboxbckho_baocaochitietkho() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));

        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loadcomboxkho_baocaochitietkho", connstr: "ConnectEMS" };
        var para = {
            IsType: 'BCLoadKhoXuat',
            Code: userInfo.code
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadcomboxkho_baocaochitietkho(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbkho_baocaochitietkho", data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
//load du an
function loadduan_baocaochitietkho(value) {
    try {
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loadduan_baocaochitietkho", connstr: "ConnectEMS" };
        var para = { IsType: 'LoadDuAn', Code: value };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadduan_baocaochitietkho(config, para, lst) {
    try {
        dataToCob("cbduan_baocaochitietkho", lst.data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
// load trang thai
function Loadtrangthai_baocaochitietkho(value) {
    try {
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_resultLoadTrangThai_baocaochitietkho", connstr: "ConnectEMS" };
        var para = { IsType: "LoadTrangThai", Code: value };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_resultLoadTrangThai_baocaochitietkho(config, para, lst) {
    try {
        dataToCob("cbtrangthai_baocaochitietkho", lst.data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
//loadnhanvien
function Loadnguoidung_baocaochitietkho(value) {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadByCode", callback: "f_result_nguoidung_baocaochitietkho", connstr: "ConnectEMS" };
        var para = { IsType: 'User', Code: value };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_nguoidung_baocaochitietkho(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbnguoidung_baocaochitietkho", data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
// load danh sach tim kiem
function loaddatabase_baocaochitietkho(p, page) {
    try {
        var config = { namesql: "TB_BAOCAO_CHITIETKHOUSER", callback: "f_result_loaddatabase_baocaochitietkho", connstr: "ConnectEMS" };
        var para = {
            StockCode: p.cbkho_baocaochitietkho,
            TypeDeviceId: p.cbvattutb_baocaochitietkho,
            StatusDivice: p.cbtrangthai_baocaochitietkho,
            ProjectId: p.cbduan_baocaochitietkho,
            UserId: p.cbnguoidung_baocaochitietkho,
            VendorId: p.cbloạithietbi_baocaochitietkho,
            v_page: page,
            v_pagecount: countpage
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddatabase_baocaochitietkho(config, para, lst) {
    try {
        var data = lst.data;
        if (data[0].kq0 == null || data[0].kq0 == "[]" || data[0].kq0 == "" || data[0].kq0.length == 0) {
            try {
                messInfo("messinfo_baocaochitietkho", "Không có dữ liệu hiển thị ", "error");
                clead_baocaochitietkho();
                return;
            } catch (e) {
                console.log(e);
            }
        }
        messInfo("messinfo_baocaochitietkho", "", "error");
        loaddulieu_baocaochitietkho(data);

    } catch (e) {
        console.log(e);
    }
}
function loaddulieu_baocaochitietkho(data) {
    try {
       
        $("#myTableData_baocaochitietkho").empty();
        var Count = 1;
        $.each(data[0].kq0, function (key, val) {
            var row = "";
            row += "<tr><td class='c'>"
                + Count++ + "</td><td class='c'>"
                + val.tenkho + "</td><td class='c'>"
                + val.tenvattu + "</td><td class='c'>"
                + val.fullname + "</td><td class='c'>"
                + SetValnull(val.seriesdivice) + "</td><td class='c'>"
                + val.countdivice + "</td><td class='c'>"
                + SetValnull(val.projectname) + "</td><td class='c'>"
                + val.trangthai + "</td></tr>";

            $("#myTableData_baocaochitietkho").append(row);
        });
        $("#txt_tongsobanghi_baocaochitietkho").empty();
        $.each(data[1].kq1, function (key, val) {
            var row1 = "Tổng" + val.allrow;
            $("#txt_tongsobanghi_baocaochitietkho").append(row1);
        });
        loadphantrang_baocaochitietkho(data);

    } catch (e) {
        console.log(e);
    }
}
function loadphantrang_baocaochitietkho(data) {
    try {
        $("#pagecurent_baocaochitietkho ul").empty();
        $("#pagecurent_baocaochitietkho ul").append('<li><a  >Trang đầu</a></li>');
        $.each(data[2].kq2, function (key, val) {
            var row2 = "";
            row2 += '<li><a  >' + val.pape + '</a></li>';
            $("#pagecurent_baocaochitietkho ul").append(row2);
        });
        $("#pagecurent_baocaochitietkho ul li a").click(function () {
            var cuoi = $("#txt_tongsobanghi_baocaochitietkho").html().split('/')[1].trim();
            var page = $(this).html() == "Trang đầu" ? 1 : $(this).html() == "Trang cuối" ? cuoi : $(this).html();
            $("#pagecurent_baocaochitietkho ul li a").addClass("active");
            var p = getAllIdMod();
            loaddatabase_baocaochitietkho(p, page);
        });
    } catch (e) {
        console.log(e);
    }
}
function Xuatexecl_baocaochitietkho() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var p = getAllIdMod();
        var config = {
            namesql: "TB_BAOCAO_CHITIETKHOUSER",
            namefile: "Bao_Cao_chi_tiet_kho",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var para = {
            StockCode: p.cbkho_baocaochitietkho,
            TypeDeviceId: p.cbvattutb_baocaochitietkho,
            StatusDivice: p.cbnguoidung_baocaochitietkho,
            ProjectId: p.cbduan_baocaochitietkho,
            UserId: p.cbnguoidung_baocaochitietkho,
            VendorId: p.cbloạithietbi_baocaochitietkho,
            v_page: -1,
            v_pagecount: countpage
        };
     
        var colum = {
            kq: [{ field: "rownum", name: "Stt", type: "TextAndBoldCenter" },
               { field: "tenkho", name: "Tên vật tư", type: "TextAndBoldCenter" },
               { field: "tenvattu", name: "Mã vật tư", type: "TextAndBoldCenter" },
               { field: "fullname", name: "Người dùng", type: "TextAndBoldCenter" },
               { field: "seriesdivice", name: "Serial", type: "TextAndBoldCenter" },
               { field: "countdivice", name: "Số lượng", type: "TextAndBoldCenter" },
               { field: "projectname", name: "Dự án ", type: "TextAndBoldCenter" },
               { field: "trangthai", name: "Trạng thái", type: "TextAndBoldCenter" }]
        };
        excuteExcel(config, para, colum, true);
    } catch (e) {
        console.log(e);
    }
}

//============================================================KET THUC XY LY CAC CHUC NANG==========================================================
//bat validate
function clead_baocaochitietkho() {
    try {
        $("#myTableData_baocaochitietkho").empty();
        $("#txt_tongsobanghi_baocaochitietkho").empty();
        $("#pagecurent_baocaochitietkho ul").empty();
    } catch (e) {
        console.log(e);
    }

}
// ket thuc validate