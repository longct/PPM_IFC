
$(document).ready(function () {
    try {
       
        loadConetent();
        loadInitDate();
        setValToTxt('txt_datetobh_baocaokho', gettimenow());
        Loadcombox_baocaokho();
        Loadcomboxbckho_baocaokho();
        Loadtrangthai_baocaokho('-1');
        $("#cbvattutbi_baocaokho").change(function () {
            var p = getAllIdMod();
            var value = p.cbvattutbi_baocaokho;
            Loadloaithietbi_baocaokho(value);
        });
        $("#cbkho_baocaokho").change(function () {
            var p = getAllIdMod();
            var value = p.cbkho_baocaokho;
            loaddienluc_baocaokho(value);
            Loadmanhanvien_baocaonv(value);
        });
        $("#cbdienluc_baocaokho").change(function () {
            Loadmanhanvien_baocaonv($("#cbdienluc_baocaokho").val());

        });

        $("input[name=quanly_baocaokho]").change(function () {
            if ($(this).val() === '0') {
                $("#btninbaocao_baocaokho").show();
                $("#tb_bckho_chitiet").hide();
                $("#tb_bckho_tongquan").show();
            } else {

                $("#btninbaocao_baocaokho").hide();
                $("#tb_bckho_chitiet").show();
                $("#tb_bckho_tongquan").hide();
            }
        });

        $("#btnCapNhat_baocaokho").click(function () {
           
            if ($("#cbkho_baocaokho").val() == "-1" && $("input[name=quanly_baocaokho]:checked").val()=="0") {
                messInfo("messinfo_baocaokho", "Vui lòng chọn kho", "error");
                return;
            }
            messInfo("messinfo_baocaokho", "", "error");
            if ($("input[name=quanly_baocaokho]:checked").val() === "0")
                f_loc_du_lieu_tongquan_bckhotong();
            else f_loc_du_lieu_chitiet_bckhotong();
        });
      
        $("#btninbaocao_baocaokho").click(function () {
            PrintElem("div_print");
        });
        $("#btnxuatexcel_baocaokho").click(function () {
            Xuatexcelkho();
        });
       
    } catch (e) {
        console.log(e);
    }
});
//loadbandau
function Loadcombox_baocaokho() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_loadbandau_baocaokho", connstr: "ConnectEMS" };
        var para = {
            Type: 'VTTB',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadbandau_baocaokho(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbvattutbi_baocaokho", data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
//loadloaithietbi
function Loadloaithietbi_baocaokho(value) {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loadthietbi_baocaokho", connstr: "ConnectEMS" };
        var para = { IsType: 'LoaiThietBi', Code: value };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadthietbi_baocaokho(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbloaithietbi_baocaokho", data, "code", "name", "-1", "--Tất cả--");

    } catch (e) {
        console.log(e);
    }
}
//load banmien
function Loadcomboxbckho_baocaokho() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));

        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loadcomboxkho_baocaokho", connstr: "ConnectEMS" };
        var para = {
            IsType: 'BCLoadKhoTong',
            Code: userInfo.code
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadcomboxkho_baocaokho(config, para, lst) {
    try {
        var data = lst.data;

        $("#cbkho_baocaokho").empty();
        $("#cbkho_baocaokho").append("<option value='-1' data-code='-1'>--Tất cả---</option");
        $.each(data, function (index, val) {
            var option = "<option value='" + val.code + "' data-code='" + val.codevirtual + "'>"
                        + val.name
                        + "</option>";
            $("#cbkho_baocaokho").append(option);
        });
    } catch (e) {
        console.log(e);
    }
}
//load du an
//function loadduan_baocaokho(value) {
//    try {
//        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loadduan_baocaokho", connstr: "ConnectEMS" };
//        var para = { IsType: 'LoadDuAn', Code: value };
//        ExecuteServiceSyns(config, para, false);
//    } catch (e) {
//        console.log(e);
//    }
//}
//function f_result_loadduan_baocaokho(config, para, lst) {
//    try {
//        dataToCob("cbduan_baocaokho", lst.data, "code", "name", "-1", "--Tất cả--");
//    } catch (e) {
//        console.log(e);
//    }
//}
// load trang thai
function Loadtrangthai_baocaokho(value) {
    try {
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_resultLoadTrangThai_baocaokho", connstr: "ConnectEMS" };
        var para = { IsType: "LoadTrangThai", Code: value };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_resultLoadTrangThai_baocaokho(config, para, lst) {
    try {
        dataToCob("cbtrangthai_baocaokho", lst.data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}

//load điện lực
function loaddienluc_baocaokho(value) {
    try {
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loaddienluc_baocaokho", connstr: "ConnectEMS" };
        var para = { IsType: 'LoadDienluc', Code: value };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddienluc_baocaokho(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == '[]') return;
        var data = lst.data;
        $("#cbdienluc_baocaokho").empty();
        $("#cbdienluc_baocaokho").append("<option value='-1' data-code='-1'>--Tất cả---</option");
        $.each(data, function (index, val) {
            var option = "<option value='" + val.code + "' data-code='" + val.codevirtual + "'>"
                        + val.name
                        + "</option>";
            $("#cbdienluc_baocaokho").append(option);
        });
    } catch (e) {
        console.log(e);
    }
}
function Loadmanhanvien_baocaonv(value) {
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
        if (lst == null || lst == undefined || lst == "[]") return;
        var data = lst.data;
        dataToCob("cbnhanvien_baocaonv", data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}

function checknull_baocaokho() {
    try {
        var p = getAllIdMod();
        if (p.cbvattutb_baocaokho == '-1') return "Bạn chưa chọn vật tư thiết bị";
        if (p.cbkhoxuat_baocaokho == '-1') return "Bạn chưa chọn kho ";
        if (p.cbnhaccap_baocaokho == '-1') return "Bạn chưa chọn nhà cung cấp";
        var compare = compareDates(timeyyyymmdd(p.txt_datefrom_baocaokho), timeyyyymmdd(p.txt_dateto_baocaokho));
        if (compare.days < 0) return "Từ ngày phải nhở hơn ngày đến";
        return "";
    } catch (e) {
        console.log(e);
    }
}



function f_loc_du_lieu_chitiet_bckhotong() {
    var p = getAllIdMod();
    var config = {
        namesql: "TB_BAOCAO_KHOCHITIET",
        callback: "f_result_loc_du_lieu_chitiet_bckhotong",
        connstr: "ConnectEMS"
    };
    var para = {
        ToDate: p.txt_datetobh_baocaokho,
        Kho: p.cbkho_baocaokho,
        Khotongmien: p.cbdienluc_baocaokho,
        NhanvienId: p.cbnhanvien_baocaonv,
        TypeDeviceId: p.cbvattutbi_baocaokho,
        VendorId: p.cbloaithietbi_baocaokho,
        StatusId: p.cbtrangthai_baocaokho,
        CodeVirtual: $("#cbkho_baocaokho option:checked").attr("data-code")
    };
    console.log(para);
   
    localStorage.setItem("load_baocaokhochitiet", JSON.stringify(para));
    ExecuteServiceSyns(config, para, false);
}

function f_xuat_excel_bckhochitiet(value) {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "TB_BAOCAO_KHOCHITIET_EXPORT",
            namefile: "BaoCaoKhoChiTiet",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var para = JSON.parse(localStorage.getItem("load_baocaokhochitiet"));
        para.TypeDeviceId = value;
        switch (value) {
            case 1: // Sim
                var colum = {
                    kq: [{ field: "STT", name: "Stt", type: "TextCenter" },
                       { field: "SeriesDivice", name: "Series SIM", type: "TextCenter" },
                       { field: "Phone", name: "Số điện thoại", type: "TextCenter" },
                       { field: "TenVatTu", name: "Trả trước/Trả sau", type: "TextCenter" },
                       { field: "TenNhaCungCap", name: "Nhà cung cấp", type: "TextCenter" },
                       { field: "tinhtrang", name: "Tình trạng", type: "TextCenter" },
                       { field: "TimeActive", name: "Thời gian kích hoạt", type: "TextCenter" },
                       { field: "BHTimeStart", name: "TG bắt đầu bảo hành", type: "TextCenter" },
                       { field: "BHTimeEnd", name: "TG kết thúc bảo hành", type: "TextCenter" }]
                }; break;
            case 2: // Modem
                var colum = {
                    kq: [{ field: "STT", name: "Stt", type: "TextCenter" },
                       { field: "SeriesDivice", name: "IMEI", type: "TextCenter" },
                       { field: "tinhtrang", name: "Tình trạng", type: "TextCenter" },
                       { field: "TenNhaCungCap", name: "Nhà cung cấp", type: "TextCenter" },
                       { field: "BHTimeStart", name: "TG bắt đầu bảo hành", type: "TextCenter" },
                       { field: "BHTimeEnd", name: "TG kết thúc bảo hành", type: "TextCenter" }]
                }; break;
            case 3: // Adapter
                var colum = {
                    kq: [{ field: "STT", name: "Stt", type: "TextCenter" },
                       { field: "Name", name: "Kho", type: "TextCenter" },
                       { field: "soluong", name: "Số lượng", type: "TextCenter" },
                       { field: "Tenvattu", name: "Nhà cung cấp", type: "TextCenter" }]
                }; break;
            case 5: // Angten
                var colum = {
                    kq: [{ field: "STT", name: "Stt", type: "TextCenter" },
                       { field: "Name", name: "Kho", type: "TextCenter" },
                       { field: "soluong", name: "Số lượng", type: "TextCenter" },
                       { field: "Tenvattu", name: "Nhà cung cấp", type: "TextCenter" }]
                }; break;
            case 8: // Repeater
                var colum = {
                    kq: [{ field: "STT", name: "Stt", type: "TextCenter" },
                       { field: "Name", name: "Kho", type: "TextCenter" },
                       { field: "soluong", name: "Số lượng", type: "TextCenter" },
                       { field: "Tenvattu", name: "Nhà cung cấp", type: "TextCenter" }]
                }; break;
            case 4: // Sim + Modem
                var colum = {
                    kq: [{ field: "STT", name: "Stt", type: "TextCenter" },
                       { field: "imei", name: "IMEI", type: "TextCenter" },
                       { field: "loaimodem", name: "Loại modem", type: "TextCenter" },
                       { field: "serisim", name: "Seri sim", type: "TextCenter" },
                       { field: "loaisim", name: "Loại sim", type: "TextCenter" },
                        { field: "timeinput", name: "Thời điểm nhập", type: "TextCenter" }]
                }; break;
            default: var colum = {kq:[]};break;
        }
        
        excuteExcel(config, para, colum, true);
    } catch (e) {
        console.log(e);
    }
}

function f_result_loc_du_lieu_chitiet_bckhotong(config, para, result) {
    try {
        var data = result.data;

        $("#tb_bckho_chitiet tbody").empty();
        if (!data || data === '[]') {
            return;
        }

        var header = '<tr><td colspan="3" class="text-center"><b>Báo cáo chi tiết</b></td></tr>'
                    + '<tr>'
                        + '<td>Thống kê đến ngày:</td>'
                        + '<td colspan="2">' + $("#txt_datetobh_baocaokho").val() + '</td>'
                    + '</tr>'
                    + '<tr>'
                        + '<td>Tình trạng thiết bị:</td>'
                        + '<td colspan="2">' + $("#cbtrangthai_baocaokho option:checked").text() + '</td>'
                    + '</tr>'
                    + '<tr>'
                        + '<td>Dự án:</td>'
                        + '<td colspan="2">' + $("#cbduan_baocaokho option:checked").text() + '</td>'
                    + '</tr>';
        $("#tb_bckho_chitiet tbody").append(header);
      
        $(data).each(function (i, item) {
            var tr = '<tr>'
            + '<td>Số lượng ' + item.typedevicename + '</td>'
            + '<td>' + item.soluong + '</td>'
            + '<td>' + '<a data-typedeviceid="' + item.typedeviceid + '">Xuất excel</a>' + '</td>'
            + '</tr>';
            $("#tb_bckho_chitiet tbody").append(tr);
        });

        // Set click download
        $("#tb_bckho_chitiet a").click(function () {
            var typedeviceid = $(this).data('typedeviceid');
            f_xuat_excel_bckhochitiet(typedeviceid);
        });
    } catch (e) {
        console.log(e.message);
    }
}

function f_loc_du_lieu_tongquan_bckhotong() {
    var p = getAllIdMod();
    var config = {
        namesql: "TB_BAOCAO_KHOTONGQUAN",
        callback: "f_result_loc_du_lieu_tongquan_bckhotong",
        connstr: "ConnectEMS"
    };
    var CodeVirtual = "";
    if ($("#cbdienluc_baocaokho").val() != "-1") {
        CodeVirtual = $("#cbdienluc_baocaokho option:checked").attr("data-code")
    }
    else {
        CodeVirtual = $("#cbkho_baocaokho option:checked").attr("data-code")
    }
    var para = {
        ToDate: p.txt_datetobh_baocaokho,
        Kho: p.cbkho_baocaokho,
        Khotongmien: p.cbdienluc_baocaokho,
        NhanvienId:parseInt(p.cbnhanvien_baocaonv),
        TypeDeviceId: parseInt(p.cbvattutbi_baocaokho),
        VendorId: parseInt(p.cbloaithietbi_baocaokho),
        StatusId: parseInt(p.cbtrangthai_baocaokho),
        CodeVirtual: CodeVirtual
    };
    console.log(para);
    ExecuteServiceSyns(config, para, false);
}
function f_result_loc_du_lieu_tongquan_bckhotong(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "[]") return;
        var data = lst.data;
        $("#myTableData_baocaokho").empty();
        if (!data || data === '[]') {
            return;
        }
        var TypeDeviceId;
        $(data).each(function (i, item) {
            //var col_tongchung = '';
            //if (item.typedeviceid !== TypeDeviceId) {
            //    col_tongchung = '<td class="text-center vertical-middle" rowspan=' + item.rowspan + '>' + item.tongchung + '</td>';
            //}
            
            var userInfo = JSON.parse(localStorage.getItem("userinfo"));
            TypeDeviceId = item.typedeviceid;
            if (item.typedetailorcount == 0) {
                var slmoi_tonkho = '<td class="text-center slmoi modal-chitiet btn_chitiet_baocaokhotong" href="#modalBaocaokhotong_chitiet" data-toggle="modal" data-vendorid="' + item.vendorid + '" data-trangthai="moi" data-tinhtrang="tonkho">' + item.slmoitk + '</td>';
                var slmoitot_tonkho = '<td class="text-center slmoitot modal-chitiet btn_chitiet_baocaokhotong" href="#modalBaocaokhotong_chitiet" data-toggle="modal" data-vendorid="' + item.vendorid + '" data-trangthai="moitot" data-tinhtrang="tonkho">' + item.slmoitottk + '</td>';
                var slmoiloi_tonkho = '<td class="text-center slmoiloi modal-chitiet btn_chitiet_baocaokhotong" href="#modalBaocaokhotong_chitiet" data-toggle="modal" data-vendorid="' + item.vendorid + '" data-trangthai="moiloi" data-tinhtrang="tonkho">' + item.slmoiloitk + '</td>';
                var slthuhoi_tonkho = '<td class="text-center slthuhoi modal-chitiet btn_chitiet_baocaokhotong" href="#modalBaocaokhotong_chitiet" data-toggle="modal" data-vendorid="' + item.vendorid + '" data-trangthai="thuhoi" data-tinhtrang="tonkho">' + item.slthuhoitk + '</td>';
                var slthuhoitot_tonkho = '<td class="text-center slthuhoitot modal-chitiet btn_chitiet_baocaokhotong" href="#modalBaocaokhotong_chitiet" data-toggle="modal" data-vendorid="' + item.vendorid + '" data-trangthai="thuhoitot" data-tinhtrang="tonkho">' + item.slthuhoittk + '</td>';
                var slthuhoiloi_tonkho = '<td class="text-center slthuhoiloi modal-chitiet btn_chitiet_baocaokhotong" href="#modalBaocaokhotong_chitiet" data-toggle="modal" data-vendorid="' + item.vendorid + '" data-trangthai="thuhoiloi" data-tinhtrang="tonkho">' + item.slthuhoiltk + '</td>';

                var slmoi_choduyet = '<td class="text-center slmoi modal-chitiet btn_chitiet_baocaokhotong" href="#modalBaocaokhotong_chitiet" data-toggle="modal" data-vendorid="' + item.vendorid + '" data-trangthai="moi" data-tinhtrang="tamxuat">' + item.slmoicd + '</td>';
                var slmoitot_choduyet = '<td class="text-center slmoitot modal-chitiet btn_chitiet_baocaokhotong" href="#modalBaocaokhotong_chitiet" data-toggle="modal" data-vendorid="' + item.vendorid + '" data-trangthai="moitot" data-tinhtrang="tamxuat">' + item.slmoitotcd + '</td>';
                var slmoiloi_choduyet = '<td class="text-center slmoiloi modal-chitiet btn_chitiet_baocaokhotong" href="#modalBaocaokhotong_chitiet" data-toggle="modal" data-vendorid="' + item.vendorid + '" data-trangthai="moiloi" data-tinhtrang="tamxuat">' + item.slmoiloicd + '</td>';
                var slthuhoi_choduyet = '<td class="text-center slthuhoi modal-chitiet btn_chitiet_baocaokhotong" href="#modalBaocaokhotong_chitiet" data-toggle="modal" data-vendorid="' + item.vendorid + '" data-trangthai="thuhoi" data-tinhtrang="tamxuat">' + item.slthuhoicd + '</td>';
                var slthuhoitot_choduyet = '<td class="text-center slthuhoitot modal-chitiet btn_chitiet_baocaokhotong" href="#modalBaocaokhotong_chitiet" data-toggle="modal" data-vendorid="' + item.vendorid + '" data-trangthai="thuhoitot" data-tinhtrang="tamxuat">' + item.slthuhoitcd + '</td>';
                var slthuhoiloi_choduyet = '<td class="text-center slthuhoiloi modal-chitiet btn_chitiet_baocaokhotong" href="#modalBaocaokhotong_chitiet" data-toggle="modal" data-vendorid="' + item.vendorid + '" data-trangthai="thuhoiloi" data-tinhtrang="tamxuat">' + item.slthuhoilcd + '</td>';

                var tongtk = '<td class="text-center sltongtk modal-chitiet btn_chitiet_baocaokhotong" href="#modalBaocaokhotong_chitiet" data-toggle="modal" data-vendorid="' + item.vendorid + '" data-trangthai="-1" data-tinhtrang="tonkho" style="background-color: #eee;">' + item.tongtk + '</td>';
                var tongcd = '<td class="text-center sltongtk modal-chitiet btn_chitiet_baocaokhotong" href="#modalBaocaokhotong_chitiet" data-toggle="modal" data-vendorid="' + item.vendorid + '" data-trangthai="-1" data-tinhtrang="tamxuat" style="background-color: #eee;">' + item.tongcd + '</td>';
                var tongchung = '<td class="text-center sltongtk modal-chitiet btn_chitiet_baocaokhotong" href="#modalBaocaokhotong_chitiet" data-toggle="modal" data-vendorid="' + item.vendorid + '" data-trangthai="-1" data-tinhtrang="tongchung" style="background-color: #eee;">' + item.tongchung + '</td>';

            } else {
                var slmoi_tonkho = '<td class="slmoi text-center">' + item.slmoitk + '</td>';
                var slmoitot_tonkho = '<td class="slmoitot text-center">' + item.slmoitottk + '</td>';
                var slmoiloi_tonkho = '<td class="slmoiloi text-center">' + item.slmoiloitk + '</td>';
                var slthuhoi_tonkho = '<td class="slthuhoi text-center">' + item.slthuhoitk + '</td>';
                var slthuhoitot_tonkho = '<td class="slthuhoitot text-center">' + item.slthuhoittk + '</td>';
                var slthuhoiloi_tonkho = '<td class="slthuhoiloi text-center">' + item.slthuhoiltk + '</td>';
                var tongtk = '<td class="slthuhoiloi text-center"  style="background-color: #eee;">' + item.tongtk + '</td>';

                var slmoi_choduyet = '<td class="slmoi text-center">' + item.slmoicd + '</td>';
                var slmoitot_choduyet = '<td class="slmoitot text-center">' + item.slmoitotcd + '</td>';
                var slmoiloi_choduyet = '<td class="slmoiloi text-center">' + item.slmoiloicd + '</td>';
                var slthuhoi_choduyet = '<td class="slthuhoi text-center">' + item.slthuhoicd + '</td>';
                var slthuhoitot_choduyet = '<td class="slthuhoitot text-center">' + item.slthuhoitcd + '</td>';
                var slthuhoiloi_choduyet = '<td class="slthuhoiloi text-center">' + item.slthuhoilcd + '</td>';
                var tongcd = '<td class="slthuhoiloi text-center"  style="background-color: #eee;">' + item.tongcd + '</td>';
                var tongchung = '<td class="text-center">' + item.tongchung + '</td>';
            }
            var tr = '<tr>'
            + '<td class="text-center">' + item.stt + '</td>'
            + '<td>' + item.tenvattu + '</td>'
            + '<td>' + item.donvitinh + '</td>'
            + tongchung
            + tongtk
            + slmoi_tonkho
            + slmoitot_tonkho
            + slmoiloi_tonkho

            + slthuhoi_tonkho
            + slthuhoitot_tonkho
            + slthuhoiloi_tonkho
            + tongcd
            + slmoi_choduyet
            + slmoitot_choduyet

            + slmoiloi_choduyet

            + slthuhoi_choduyet
            + slthuhoitot_choduyet
            + slthuhoiloi_choduyet
            + '</tr>';
            $("#myTableData_baocaokho").append(tr);

            
        });

        $(".btn_chitiet_baocaokhotong").click(function () {
            var vendorid = $(this).data("vendorid");
            var trangthai = $(this).data("trangthai");
            var khotong = $("#cbkho_baocaokho").val();
            var khobophan = $("#cbdienluc_baocaokho").val();
            var nhanvien = $("#cbnhanvien_baocaonv").val();
            var vattuthietbi = $("#cbvattutbi_baocaokho").val();
            var loaithietbi = $("#cbloaithietbi_baocaokho").val();
            var tinhtrang = $(this).data("tinhtrang");
            var dateto=$("#txt_datetobh_baocaokho").val()
            load_chitiet_baocaokhotong(vendorid, trangthai, khotong, khobophan, nhanvien, vattuthietbi, loaithietbi, tinhtrang, dateto,1);

        });
        
    } catch (e) {
        console.log(e.message);
    }
}

function PrintElem(elem) {
    var mywindow = window.open('', 'PRINT', 'height=600px,width=900px');


    mywindow.document.write('<html><head><title>' + document.title + '</title>');

    mywindow.document.write('</head><body >');
    mywindow.document.write('<h1>' + document.title + '</h1>');
    mywindow.document.write(document.getElementById(elem).innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;

}
function Xuatexcelkho() {
    try {
        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "TB_BAOCAO_KHOTONGQUAN",
            namefile: "baocaokhotong",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var para = {
            ToDate: p.txt_datetobh_baocaokho,
            Kho: p.cbkho_baocaokho,
            Khotongmien: p.cbdienluc_baocaokho,
            NhanvienId: p.cbnhanvien_baocaonv,
            TypeDeviceId: parseInt(p.cbvattutbi_baocaokho),
            VendorId: parseInt(p.cbloaithietbi_baocaokho),
            StatusId: parseInt(p.cbtrangthai_baocaokho),
            CodeVirtual: $("#cbkho_baocaokho option:checked").attr("data-code")
           
        };
        var colum = {
            kq: [
               { field: "stt", name: "STT", type: "TextCenter" },
               { field: "tenvattu", name: "Tên VTTB", type: "TextCenter" },
               { field: "donvitinh", name: "ĐVT", type: "TextCenter" },
                { field: "tongchung", name: "Tổng SL(SLTK+SLXCD)", type: "TextAndBoldCenter" },
               { field: "tongtk", name: "Tổng SL tồn kho", type: "TextAndBoldCenter" },
               { field: "slmoitk", name: "SL mới tồn kho", type: "TextCenter" },
               { field: "slmoitottk", name: "SL mới tốt tồn kho", type: "TextCenter" },
               { field: "slmoiloitk", name: "SL mới lỗi tồn kho", type: "TextCenter" },
               { field: "slthuhoitk", name: "SL thu hồi tồn kho", type: "TextCenter" },
               { field: "slthuhoittk", name: "SL thu hồi tốt tồn kho", type: "TextCenter" },
               { field: "slthuhoiltk", name: "SL thu hồi lỗi tồn kho", type: "TextCenter" },
               { field: "tongcd", name: "SL đã xuất chờ duyệt", type: "TextAndBoldCenter" },
               { field: "slmoicd", name: "SL mới đã xuất chờ duyệt", type: "TextCenter" },
               { field: "slmoitotcd", name: "SL mới tốt đã xuất chờ duyệt", type: "TextCenter" },
               { field: "slmoiloicd", name: "SL mới lỗi đã xuất chờ duyệt", type: "TextCenter" },
               { field: "slthuhoicd", name: "SL thu hồi đã xuất chờ duyệt", type: "TextCenter" },
               { field: "slthuhoitcd", name: "SL thu hồi tốt đã xuất chờ duyệt", type: "TextCenter" },
               { field: "slthuhoilcd", name: "SL thu hồi lỗi đã xuất chờ duyệt", type: "TextCenter" },
            ]
        };

        excuteExcel(config, para, colum, true);
    } catch (e) {
        console.log(e);
    }
}

