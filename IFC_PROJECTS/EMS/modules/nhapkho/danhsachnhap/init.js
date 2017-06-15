var countpage = 10;
$(document).ready(function () {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var p = getAllIdMod();
        loadConetent();
       
        loadInitDate();
        setValToTxt("txt_datefrom_nkdanhsach", gettimenowweek());
        setValToTxt("txt_dateto_nkdanhsach", gettimenow());
        if (userInfo.code.length > 4) {
           
            $("#slkhobophan_nkdanhsach").attr("disabled", true);
            $("#slkhotong_nkdanhsach").attr("disabled", true);
        }
        if (userInfo.ispermission == false && userInfo.code.length > 4) {
            $("#slkhonhanvien_nkdanhsach").attr("disabled", true);
        }
        loadLoaiThietBiSoLuongHayChiTiet_dsnhap();
        Loadcomboxbckho_nkdanhsachnhap();
      
        $("#slkhotong_nkdanhsach").change(function () {
            loaddienluc_nkdanhsachnhap($("#slkhotong_nkdanhsach").val());
            Loadmanhanvien_nkdanhsachnhap($("#slkhotong_nkdanhsach").val());
        });
        $("#slkhobophan_nkdanhsach").change(function () {
            Loadmanhanvien_nkdanhsachnhap($("#slkhobophan_nkdanhsach").val());
        });

        $("#cbvattu_searchdsn").change(function () {
            loadgetlistthietbi_dsnhap();
        });

        $("#btnThucHienDanhsach_nkdanhsach").click(function () {
            var p = getAllIdMod();

            serachdatabase_danhsachnhap(p, 1);
        });

        $("#btnXuatExcel_nkdanhsach").click(function () {
            XuatExcel_dsnhap();
        });
    } catch (e) {
        console.log(e);
    }
});
//load kho
function Loadcomboxbckho_nkdanhsachnhap() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));

        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loadcomboxkho_baocaonxdadl", connstr: "ConnectEMS" };
        var para = {
            IsType: 'DSPHIEU',
            Code: userInfo.code
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadcomboxkho_baocaonxdadl(config, para, lst) {
    try {
       
        var data = lst.data;
        dataToCob("slkhotong_nkdanhsach", data, "code", "name","-1","-- Tất cả --");
        loaddienluc_nkdanhsachnhap(para.Code);
        Loadmanhanvien_nkdanhsachnhap(para.Code);
        $("#slkhotong_nkdanhsach").val(para.Code);
       
    } catch (e) {
        console.log(e);
    }
}
//kho bo phan

function loaddienluc_nkdanhsachnhap(value) {
    try {
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loaddienluc_nkdanhsachnhap", connstr: "ConnectEMS" };
        var para = { IsType: 'LoadDienluc', Code: value };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddienluc_nkdanhsachnhap(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == '[]') return;
        var data = lst.data;
        $("#slkhobophan_nkdanhsach").empty();
        $("#slkhobophan_nkdanhsach").append("<option value='-1' data-code='-1'>--Tất cả---</option");
        $.each(data, function (index, val) {
            var option = "<option value='" + val.code + "' data-code='" + val.codevirtual + "'>"
                        + val.name
                        + "</option>";
            $("#slkhobophan_nkdanhsach").append(option);
        });
    } catch (e) {
        console.log(e);
    }
}
//load nhan vien
function Loadmanhanvien_nkdanhsachnhap(value) {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadStockUser", callback: "f_result_manhanvien_baocaonv", connstr: "ConnectEMS" };
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
function f_result_manhanvien_baocaonv(config, para, lst) {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var p = getAllIdMod();
        if (lst == null || lst == undefined || lst == "[]") return;
        var data = lst.data;
        dataToCob("slkhonhanvien_nkdanhsach", data, "code", "name", "-1", "--Tất cả--");
        if ($("#slkhonhanvien_nkdanhsach").val() == "-1" && $("#slkhotong_nkdanhsach").val() == userInfo.code && $("#slkhobophan_nkdanhsach").val() =="-1") {
            console.log("abc");
            $("#slkhonhanvien_nkdanhsach").val(para.UserId);
        }
        serachdatabase_danhsachnhap(p, 1);
    } catch (e) {
        console.log(e);
    }
}
// load ra loai thiet bi tuong ung khi chon chi tiet hay so luong
function loadLoaiThietBiSoLuongHayChiTiet_dsnhap() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_loadLoaiThietBiSoLuongHayChiTiet_dsnhap", connstr: "ConnectEMS" };
        var para = {
            Type: 'VTTB',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadLoaiThietBiSoLuongHayChiTiet_dsnhap(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbvattu_searchdsn", data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
// load ra list thiet bi
function loadgetlistthietbi_dsnhap() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "TB_Import_LstLoadByCode", callback: "f_result_loadlistthietbi_dsnhap", connstr: "ConnectEMS" };
        var para = { IsType: 'LoaiThietBi', Code: p.cbvattu_searchdsn };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadlistthietbi_dsnhap(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbloai_searchdsn", data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}

//============================================================ XY LY CAC CHUC NANG==========================================================


function serachdatabase_danhsachnhap(p, page) {
    try {
        var NhanVienId = -1;
        var KhoId = '-1';
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        if ($("#slkhonhanvien_nkdanhsach").val()==null && userInfo.isadmin == 'false') {
            NhanVienId = userInfo.userid;
        } else {
            NhanVienId = parseInt($("#slkhonhanvien_nkdanhsach").val());
        }
        if ($("#slkhonhanvien_nkdanhsach").val() != null) {
            KhoId = $("#slkhotong_nkdanhsach").val();
        }
        var config = { namesql: "TB_Import_DanhSachPhieuNhap", callback: "f_result_loadduserachdatabase_Danhsachnhap", connstr: "ConnectEMS" };
        var para = {
            DateFrom: p.txt_datefrom_nkdanhsach,
            DateTo: p.txt_dateto_nkdanhsach,
            VoiceCode: p.txtMaphieu_nkdanhsach,
            kho: KhoId,
            khoBoPhan: p.slkhobophan_nkdanhsach !="" ? p.slkhobophan_nkdanhsach : '-1' ,
            NhanVienId: NhanVienId,
            Userid: userInfo.userid,
            TypeInOut: 1,
            TypeDeviceId:parseInt(p.cbvattu_searchdsn),
            VendorId: parseInt(p.cbloai_searchdsn),
            v_page: page,
            v_pagecount: countpage
        };
        console.log(para);
        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}
function f_result_loadduserachdatabase_Danhsachnhap(config, para, list) {
    try {
        var p = getAllIdMod();
        console.log(list);
        console.log(data);
        messInfo("messinfo_danhsachnhap", "", "error");
        var data = list.data;
        if (data[0].kq0 == null || data[0].kq0 == "[]" || data[0].kq0 == "" || data[0].kq0.length == 0) {
            try {
                messInfo("messinfo_danhsachnhap", "Không có dữ liệu hiển thị từ " + p.txt_datefrom_nkdanhsach + " đến " + p.txt_dateto_nkdanhsach, "error");
                clear_nkdanhsachnhap();
                return;
            } catch (e) {
                console.log(e);
            }
        }
        messInfo("messinfo_danhsachnhap", "", "error");
        loaddulieu_Danhsachnhap(data);

    } catch (e) {
        console.log(e);
    }
}


function loaddulieu_Danhsachnhap(data) {
    try {
        $("#tblnhapkho_nkdanhsachnhap").empty();
        $.each(data[0].kq0, function (key, val) {
            var row = "";
            row += "<tr class='" + val.approve + "'><td>"
                + val.rownum + "</td><td>"
                + val.voicecode + "</td><td class='c'>"
                + val.nguoigui + "</td><td>"
                + val.nguoinhan + "</td><td>"
            
                + val.toikho + "</td><td class='c'>"
                + val.countdivice + "</td><td>"
                + val.trackingnumber + "</td><td class='c'>"
                + val.inputdate + "</td><td>"
                + val.note + "</td>"
            + "<td class='c linktomod' href='#modaltracunhanhphieunhap' id='btn_tracuunhanh_nkdanhsachnhap" + val.voicecode + "' data-toggle='modal' class='viewphieu' style='cursor: pointer;'><i class='fa fa-search'></i></td>"
            + "<td class='c linktomod classquyen_sua' href='#modalXemChiTietPhieu' id='btn_xemchitiethoadon_nkdanhsachnhap" + val.voicecode + "' data-toggle='modal' class='viewphieu' style='cursor: pointer;'> Xem</td>"
            + "</tr>";
            $("#tblnhapkho_nkdanhsachnhap").append(row);

            $("#btn_xemchitiethoadon_nkdanhsachnhap" + val.voicecode).click(function () {

                loadxemchitietmaphieu_nhapxct(val.voicecode,1);
                $("#xemchitiethoadon_nkdanhsachnhap").show();

            });
            $("#btn_tracuunhanh_nkdanhsachnhap" + val.voicecode).click(function () {
                loadtracunhanh_nhapxct(val.voicecode);
                
            });
        });
        // tomausukien() ;
        $("#txt_tongsobanghi_nkdanhsachnhap").empty();
        $.each(data[1].kq1, function (key, val) {
            var row1 = "Tổng Số Bản Ghi " + val.allrow;
            $("#txt_tongsobanghi_nkdanhsachnhap").append(row1);
        });
        loadphantrang_Danhsachnhap(data);
    } catch (e) {
        console.log(e);
    }
}
function loadphantrang_Danhsachnhap(data) {
    try {
        $("#pagecurent_nkdanhsachnhap ul").empty();
        $("#pagecurent_nkdanhsachnhap ul").append('<li><a  >Trang đầu</a></li>');
        $.each(data[2].kq2, function (key, val) {
            var row2 = "";
            row2 += '<li><a  >' + val.pape + '</a></li>';
            $("#pagecurent_nkdanhsachnhap ul").append(row2);
        });
        $("#pagecurent_nkdanhsachnhap ul li a").click(function () {
            var cuoi = $("#txt_tongsobanghi_nkdanhsachnhap").html().split('/')[1].trim();
            var page = $(this).html() == "Trang đầu" ? 1 : $(this).html() == "Trang cuối" ? cuoi : $(this).html();
            $("#pagecurent_nkdanhsachnhap ul li a").addClass("active");
            var p = getAllIdMod();
            if (data[0].kq0.length > 0) {
               serachdatabase_danhsachnhap(p, page);
            }
        });
    } catch (e) {
        console.log(e);
    }
}


//============================================================KET THUC XY LY CAC CHUC NANG==========================================================

function clear_nkdanhsachnhap() {
    try {
        $("#tblnhapkho_nkdanhsachnhap").empty();
        $("#txt_tongsobanghi_nkdanhsachnhap").empty();
        $("#pagecurent_nkdanhsachnhap ul").empty();
    } catch (e) {
        console.log(e);
    }
}

function checknull_danhsachnhap() {
    try {
        var p = getAllIdMod();
        if (p.txtMaphieu_nkdanhsach == "") return "Mã phiếu không được để trống";
        var compare = compareDates(timeyyyymmdd(p.txt_datefrom_nkdanhsach), timeyyyymmdd(p.txt_dateto_nkdanhsach));
        if (compare.days < 0) return "Từ ngày phải nhở hơn ngày đến";
        return "";
    } catch (e) {
        console.log(e);
    }
}

function f_thongbaothanhcong_danhsachnhap(mess) {
    messInfo("messinfo_danhsachnhap", mess, "ok");
    $("#messinfo_danhsachnhap").show();

}

function XuatExcel_dsnhap() {
    try {
        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));

        var NhanVienId = -1;
        var KhoId = '-1';
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        if ($("#slkhonhanvien_nkdanhsach").val() == null && userInfo.isadmin == 'false') {
            NhanVienId = userInfo.userid;
        } else {
            NhanVienId = parseInt($("#slkhonhanvien_nkdanhsach").val());
        }
        if ($("#slkhonhanvien_nkdanhsach").val() != null) {
            KhoId = $("#slkhotong_nkdanhsach").val();
        }
       
        var config = {
            namesql: "TB_Import_DanhSachPhieuNhap_Excel",
            namefile: "danhsachphieunhap",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var para = {
            DateFrom: p.txt_datefrom_nkdanhsach,
            DateTo: p.txt_dateto_nkdanhsach,
            VoiceCode: p.txtMaphieu_nkdanhsach,
            kho: KhoId,
            khoBoPhan: p.slkhobophan_nkdanhsach != "" ? p.slkhobophan_nkdanhsach : '-1',
            NhanVienId: NhanVienId,
            Userid: userInfo.userid,
            TypeInOut: 1,
            TypeDeviceId: parseInt(p.cbvattu_searchdsn),
            VendorId: parseInt(p.cbloai_searchdsn),
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