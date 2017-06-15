var countpage = 10;
$(document).ready(function () {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var p = getAllIdMod();
        loadConetent();
        loadInitDate();
        setValToTxt("txt_datefrom_danhsachxuat", gettimenowweek());
        setValToTxt("txt_dateto_danhsachxuat", gettimenow());
        loadLoaiThietBiSoLuongHayChiTiet_dsxuat();
        Loadcomboxbckho_nkdanhsachxuat();
       
        if (userInfo.code.length > 4) {
            $("#slkhonhanvien_nkdanhsachxuat").attr("disabled", true);
            $("#slkhobophan_nkdanhsachxuat").attr("disabled", true);
            $("#slkhotong_nkdanhsachxuat").attr("disabled", true);
        }
       
        $("#btnThucHienDanhsach_danhsachxuat").click(function () {
            var p = getAllIdMod();
            serachdatabase_danhsachxuat(p, 1);
        });
      
        $("#slkhotong_nkdanhsachxuat").change(function () {
            loaddienluc_nkdanhsachxuat($("#slkhotong_nkdanhsachxuat").val());
            Loadmanhanvien_nkdanhsachxuat($("#slkhotong_nkdanhsachxuat").val());
        });
        $("#slkhobophan_nkdanhsachxuat").change(function () {
            Loadmanhanvien_nkdanhsachxuat($("#slkhobophan_nkdanhsachxuat").val());
        });
        $("#btnXuatExcel_danhsachxuat").click(function () {
            XuatExcel_dsxuat();
        });
        $("#cbvattu_searchdsx").change(function () {
            loadgetlistthietbi_dsxuat();
        });

    } catch (e) {
        console.log(e);
    }
});
//load kho
function Loadcomboxbckho_nkdanhsachxuat() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));

        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loadcomboxkho_nkdanhsachxuat", connstr: "ConnectEMS" };
        var para = {
            IsType: 'BCLoadKhoXuat',
            Code: userInfo.code
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadcomboxkho_nkdanhsachxuat(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("slkhotong_nkdanhsachxuat", data, "code", "name", "-1", "-- Tất cả --");
        loaddienluc_nkdanhsachxuat(para.Code);
        Loadmanhanvien_nkdanhsachxuat(para.Code);
        if (para.Code.length == 4) {
            $("#slkhotong_nkdanhsachxuat").val(para.Code);
        }

    } catch (e) {
        console.log(e);
    }
}
//kho bo phan

function loaddienluc_nkdanhsachxuat(value) {
    try {
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loaddienluc_nkdanhsachxuat", connstr: "ConnectEMS" };
        var para = { IsType: 'LoadDienluc', Code: value };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddienluc_nkdanhsachxuat(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == '[]') return;
        var data = lst.data;
        $("#slkhobophan_nkdanhsachxuat").empty();
        $("#slkhobophan_nkdanhsachxuat").append("<option value='-1' data-code='-1'>--Tất cả---</option");
        $.each(data, function (index, val) {
            var option = "<option value='" + val.code + "' data-code='" + val.codevirtual + "'>"
                        + val.name
                        + "</option>";
            $("#slkhobophan_nkdanhsachxuat").append(option);
        });

    } catch (e) {
        console.log(e);
    }
}
//load nhan vien
function Loadmanhanvien_nkdanhsachxuat(value) {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadStockUser", callback: "f_result_manhanvien_nkdanhsachxuat", connstr: "ConnectEMS" };
        var para = {
            TypeExport: '2',
            UserId: userInfo.userid,
            Code: value,
            IsType: 'LoadUserXuatFull'
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_manhanvien_nkdanhsachxuat(config, para, lst) {
    try {
        var p = getAllIdMod();
        if (lst == null || lst == undefined || lst == "[]") return;
        var data = lst.data;
        dataToCob("slkhonhanvien_nkdanhsachxuat", data, "code", "name", "-1", "--Tất cả--");
       
        if ($("#slkhonhanvien_nkdanhsachxuat").val() == "-1" && para.Code.length == 4) {
            $("#slkhonhanvien_nkdanhsachxuat").val(para.UserId);
        }
        serachdatabase_danhsachxuat(p, 1);
    } catch (e) {
        console.log(e);
    }
}
// load ra loai thiet bi tuong ung khi chon chi tiet hay so luong
function loadLoaiThietBiSoLuongHayChiTiet_dsxuat() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_loadLoaiThietBiSoLuongHayChiTiet_dsxuat", connstr: "ConnectEMS" };
        var para = {
            Type: 'Basic',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadLoaiThietBiSoLuongHayChiTiet_dsxuat(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbvattu_searchdsx", data[0].kq0, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
// load ra list thiet bi
function loadgetlistthietbi_dsxuat() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "TB_Import_LstLoadByCode", callback: "f_result_loadlistthietbi_dsxuat", connstr: "ConnectEMS" };
        var para = { IsType: 'LoaiThietBi', Code: p.cbvattu_searchdsx };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadlistthietbi_dsxuat(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbloai_searchdsx", data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
//============================================================ XY LY CAC CHUC NANG==========================================================


function serachdatabase_danhsachxuat(p, page) {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var NhanVienXId = -1;
        var KhoXId = '-1';
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        if ($("#slkhonhanvien_nkdanhsachxuat").val() != null && userInfo.code.length == 4) {
            NhanVienXId = parseInt($("#slkhonhanvien_nkdanhsachxuat").val());
        }
        else if ($("#slkhonhanvien_nkdanhsachxuat").val() == null && userInfo.code.length == 4) {
            NhanVienXId = userInfo.userid;
        }
        if ($("#slkhotong_nkdanhsachxuat").val() != null && userInfo.code.length == 4) {
            KhoXId = $("#slkhotong_nkdanhsachxuat").val();
        }
        else if ($("#slkhotong_nkdanhsachxuat").val() == null && userInfo.code.length == 4) {
            KhoXId = userInfo.code;
        }
     
        var config = { namesql: "TB_Export_DanhSachPhieuXuat", callback: "f_result_loadduserachdatabase_Danhsachxuat", connstr: "ConnectEMS" };
        var para = {
            DateFrom: p.txt_datefrom_danhsachxuat,
            DateTo: p.txt_dateto_danhsachxuat,
            VoiceCode: p.txtMaphieu_danhsachxuat,
            kho: KhoXId,
            khoBoPhan: $("#slkhobophan_nkdanhsachxuat").val() != null ? $("#slkhobophan_nkdanhsachxuat").val() : '-1',
            NhanVienId: NhanVienXId,
            Userid: userInfo.userid,
            TypeInOut: 2,
            TypeDeviceId: parseInt(p.cbvattu_searchdsx),
            VendorId: parseInt(p.cbloai_searchdsx),
            v_page: page,
            v_pagecount: countpage
          
        };
        console.log(para);
        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}
function f_result_loadduserachdatabase_Danhsachxuat(config, para, list) {
    try {
        var p = getAllIdMod();
        var data = list.data;
        if (data[0].kq0 == null || data[0].kq0 == "[]" || data[0].kq0 == "" || data[0].kq0.length == 0) {
            try {
                messInfo("messinfo_danhsachxuat", "Không có dữ liệu hiển thị từ " + p.txt_datefrom_danhsachxuat + " đến " + p.txt_dateto_danhsachxuat, "error");
                clear_danhsachxuat();
                return;
            } catch (e) {
                console.log(e);
            }
        }
        messInfo("messinfo_danhsachxuat", "", "error");
        loaddulieu_Danhsachxuat(data);

    } catch (e) {
        console.log(e);
    }
}


function loaddulieu_Danhsachxuat(data) {
    try {
        $("#tblnhapkho_danhsachxuat").empty();
        $.each(data[0].kq0, function (key, val) {
            var row = "";
            row += "<tr class='" + val.approve + "'><td>"
                + val.rownum + "</td><td>"
                + val.voicecode + "</td><td class='r'>"
                + val.nguoigui + "</td><td class='r'>"
                + val.nguoinhan + "</td><td class='r'>"
                + val.tukho + "</td><td class='r'>"
                + val.toikho + "</td><td class='r'>"
                + val.countdivice + "</td><td class='r'>"
                + val.trackingnumber + "</td><td class='r'>"
                + val.inputdate + "</td><td class='r'>"
                + val.note + "</td>"

            + "<td class='c linktomod' href='#modaltracunhanhphieuxuat' id='btn_tracuunhanh_nkdanhsachxuat" + val.voicecode + "' data-toggle='modal' class='viewphieu' style='cursor: pointer;'><i class='fa fa-search'></i></td>"
            + "<td class='r linktomod' href='#modalXemChiTietPhieu_xuat' id='btn_xemchitiethoadon_danhsachxuat" + val.voicecode + "' data-toggle='modal' style='cursor: pointer;'> Xem</td> "
            + "</tr>";
            $("#tblnhapkho_danhsachxuat").append(row);

            $("#btn_xemchitiethoadon_danhsachxuat" + val.voicecode).click(function () {

                loadxemchitietmaphieu_xuatxct(val.voicecode,1);
                $("#xemchitiethoadon_danhsachxuat").show();

            });

            $("#btn_tracuunhanh_nkdanhsachxuat" + val.voicecode).click(function () {
                loadtracunhanh_xuatxct(val.voicecode);

            });
        });
        // tomausukien() ;
        $("#txt_tongsobanghi_danhsachxuat").empty();
        $.each(data[1].kq1, function (key, val) {
            var row1 = "Tổng Số Bản Ghi " + val.allrow;
            $("#txt_tongsobanghi_danhsachxuat").append(row1);
        });
        loadphantrang_Danhsachnhap(data);
    } catch (e) {
        console.log(e);
    }
}
function loadphantrang_Danhsachnhap(data) {
    try {
        $("#pagecurent_danhsachxuat ul").empty();
        $("#pagecurent_danhsachxuat ul").append('<li><a  >Trang đầu</a></li>');
        $.each(data[2].kq2, function (key, val) {
            var row2 = "";
            row2 += '<li><a  >' + val.pape + '</a></li>';
            $("#pagecurent_danhsachxuat ul").append(row2);
        });
        $("#pagecurent_danhsachxuat ul li a").click(function () {
            var cuoi = $("#txt_tongsobanghi_danhsachxuat").html().split('/')[1].trim();
            var page = $(this).html() == "Trang đầu" ? 1 : $(this).html() == "Trang cuối" ? cuoi : $(this).html();
            $("#pagecurent_danhsachxuat ul li a").addClass("active");
            var p = getAllIdMod();
            serachdatabase_danhsachxuat(p, page);
        });
    } catch (e) {
        console.log(e);
    }
}


//============================================================KET THUC XY LY CAC CHUC NANG==========================================================

function clear_danhsachxuat() {
    try {
        $("#tblnhapkho_danhsachxuat").empty();
        $("#txt_tongsobanghi_danhsachxuat").empty();
        $("#pagecurent_danhsachxuat ul").empty();
    } catch (e) {
        console.log(e);
    }
}

function checknull_danhsachnhap() {
    try {
        var p = getAllIdMod();
        if (p.txtMaphieu_danhsachxuat == "") return "Mã phiếu không được để trống";
        var compare = compareDates(timeyyyymmdd(p.txt_datefrom_danhsachxuat), timeyyyymmdd(p.txt_dateto_danhsachxuat));
        if (compare.days < 0) return "Từ ngày phải nhở hơn ngày đến";
        return "";
    } catch (e) {
        console.log(e);
    }
}

function f_thongbaothanhcong_danhsachxuat(mess) {
    messInfo("messinfo_danhsachxuat", mess, "ok");
    $("#messinfo_danhsachxuat").show();

}

function XuatExcel_dsxuat() {
    try {
        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var NhanVienXId = -1;
        var KhoXId = '-1';
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        if ($("#slkhonhanvien_nkdanhsachxuat").val() != null && userInfo.code.length == 4) {
            NhanVienXId = parseInt($("#slkhonhanvien_nkdanhsachxuat").val());
        }
        else if ($("#slkhonhanvien_nkdanhsachxuat").val() == null && userInfo.code.length == 4) {
            NhanVienXId = userInfo.userid;
        }
        if ($("#slkhotong_nkdanhsachxuat").val() != null && userInfo.code.length == 4) {
            KhoXId = $("#slkhotong_nkdanhsachxuat").val();
        }
        else if ($("#slkhotong_nkdanhsachxuat").val() == null && userInfo.code.length == 4) {
            KhoXId = userInfo.code;
        }

        var config = {
            namesql: "TB_Export_DanhSachPhieuXuat_Excel",
            namefile: "danhsachphieuxuat",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var para = {
            DateFrom: p.txt_datefrom_danhsachxuat,
            DateTo: p.txt_dateto_danhsachxuat,
            VoiceCode: p.txtMaphieu_danhsachxuat,
            kho: KhoXId,
            khoBoPhan: $("#slkhobophan_nkdanhsachxuat").val() != null ? $("#slkhobophan_nkdanhsachxuat").val() : '-1',
            NhanVienId: NhanVienXId,
            Userid: userInfo.userid,
            TypeInOut: 2,
            TypeDeviceId: parseInt(p.cbvattu_searchdsx),
            VendorId: parseInt(p.cbloai_searchdsx),
            v_page: 1,
            v_pagecount: 100000

        };
        var colum = {
            kq: [{ field: "rownum", name: "stt", type: "TextCenter" },
             { field: "voicecode", name: "Mã phiếu", type: "TextCenter" },
             { field: "vattuthietbi", name: "Vật tư thiêt bị", type: "Text" },
             { field: "tenvattu", name: "Loại thiết bị", type: "Text" },
             { field: "countdivice", name: "Số lượng", type: "TextCenter" },
             { field: "seriesModem", name: "IMEI", type: "Text" },
             { field: "seriessim", name: "series sim", type: "Text" },
             { field: "nguoigui", name: "Người gửi", type: "Text" },
             { field: "nguoinhan", name: "Người nhận", type: "Text" },
             { field: "toikho", name: "Tới kho", type: "Text" },
              { field: "trackingnumber", name: "Mã hợp đồng", type: "TextCenter" },
             { field: "inputdate", name: "Thời gian nhập", type: "TextCenter" },
             { field: "note", name: "Ghi chú", type: "Text" },
            ]
        };

        excuteExcel(config, para, colum, true);

    } catch (e) { console.log(e); }
}