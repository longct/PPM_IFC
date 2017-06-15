
$(document).ready(function () {
    try {
       
        loadConetent();
        loadInitDate();
        setValToTxt('txt_datetobh_baocaonv',gettimenow());
        Loadcombox_baocaonv();
        
        Loadcomboxbanmien_baocaonv();
        Loadnhanvienbandau_baocaonv();
        Loadtrangthai_baocaonv('-1');
        $("#cbvattutb_baocaonv").change(function () {
            var p = getAllIdMod();
            var value = p.cbvattutb_baocaonv;
            Loadloaithietbi_baocaonv(value);
        });
        $("#cbbanmien_baocaonv").change(function () {
            var p = getAllIdMod();
            var value = p.cbbanmien_baocaonv;
            if (value != '-1') {
                console.log(1);
                Loadmanhanvien_baocaonv(value);
                
            } else {
                console.log(2);
               Loadnhanvienbandau_baocaonv();
            }
            
        });

        $("input[name=quanly_baocaonv]").change(function () {
            if ($(this).val() === '0') {
                $("#cbtrangthai_baocaonv").prop('disabled', 'disabled');
                $("#btninbaocao_baocaonv").show();
                $("#tb_bcnv_chitiet").hide();
                $("#tb_bcnv_tongquan").show();
            } else {
                $("#cbtrangthai_baocaonv").removeAttr('disabled');
                $("#btninbaocao_baocaonv").hide();
                $("#tb_bcnv_chitiet").show();
                $("#tb_bcnv_tongquan").hide();
            }
        });

        $("#btnCapNhat_baocaonv").click(function () {
            if ($("input[name=quanly_baocaonv]:checked").val() === "0")
                f_loc_du_lieu_tongquan_bcnv();
            else f_loc_du_lieu_chitiet_bcnv();
        });

    } catch (e) {
        console.log(e);
    }
});

function f_loc_du_lieu_chitiet_bcnv() {
    var p = getAllIdMod();
    var config = {
        namesql: "TB_BAOCAO_NHANVIENCHITIET",
        callback: "f_result_loc_du_lieu_chitiet_bcnv",
        connstr: "ConnectEMS"
    };
    var para = {
        ToDate: p.txt_datetobh_baocaonv,
        Banmien: p.cbbanmien_baocaonv,
        NhanvienId: p.cbnhanvien_baocaonv,
        TypeDeviceId: p.cbvattutbi_baocaonv,
        VendorId: p.cbloaithietbi_baocaonv,
        StatusId: p.cbtrangthai_baocaonv
    };
    localStorage.setItem("load_baocaonhanvienchitiet", JSON.stringify(para));
    ExecuteServiceSyns(config, para, false);
}

function f_result_loc_du_lieu_chitiet_bcnv(config, para, result) {
    try {
        var data = result.data;
        $("#tb_bcnv_chitiet tbody").empty();
        console.log(data);
        if (!data || data === '[]') {
            return;
        }

        var header = '<tr><td colspan="3" class="text-center"><b>Báo cáo chi tiết</b></td></tr>'
                    + '<tr>'
                        + '<td>Thống kê đến ngày:</td>'
                        + '<td colspan="2">' + $("#txt_datetobh_baocaonv").val() + '</td>'
                    + '</tr>'
                    + '<tr>'
                        + '<td>Tình trạng thiết bị:</td>'
                        + '<td colspan="2">' + $("#cbtrangthai_baocaonv option:checked").text() + '</td>'
                    + '</tr>'
                    + '<tr>'
                        + '<td>Dự án:</td>'
                        + '<td colspan="2">' + $("#cbduan_baocaonv option:checked").text() + '</td>'
                    + '</tr>';
        $("#tb_bcnv_chitiet tbody").append(header);
        $(data).each(function (i, item) {
            var tr = '<tr>'
            + '<td>Số lượng ' + item.typedevicename + '</td>'
            + '<td>' + item.soluong + '</td>'
            + '<td>' + '<a data-typedeviceid="' + item.typedeviceid + '">Xuất excel</a>' + '</td>'
            + '</tr>';
            $("#tb_bcnv_chitiet tbody").append(tr);
        });

        // Set click download
        $("#tb_bcnv_chitiet a").click(function () {
            var typedeviceid = $(this).data('typedeviceid');
            f_xuat_excel_bcnvchitiet(typedeviceid);
        });
    } catch (e) {
        console.log(e.message);
    }
}

function f_xuat_excel_bcnvchitiet(value) {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "[TB_BAOCAO_NHANVIENCHITIET_EXPORT]",
            namefile: "BaoCaoNhanvienChiTiet",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var para = JSON.parse(localStorage.getItem("load_baocaonhanvienchitiet"));
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
            default: var colum = { kq: [] }; break;
        }
        console.log(para);
        excuteExcel(config, para, colum, true);
    } catch (e) {
        console.log(e);
    }
}

function f_loc_du_lieu_tongquan_bcnv() {
    var p = getAllIdMod();
    var config = {
        namesql: "TB_BAOCAO_NHANVIENTONGQUAN",
        callback: "f_result_loc_du_lieu_tongquan_bcnv",
        connstr: "ConnectEMS"
    };
    var para = {
        ToDate: p.txt_datetobh_baocaonv,
        Banmien: p.cbbanmien_baocaonv,
        NhanvienId: p.cbnhanvien_baocaonv,
        TypeDeviceId: p.cbvattutbi_baocaokho,
        VendorId: p.cbloaithietbi_baocaokho,
        StatusId: p.cbtrangthai_baocaokho
    };
    console.log(para);
    ExecuteServiceSyns(config, para, false);
}
function f_result_loc_du_lieu_tongquan_bcnv(config, para, result) {
    try {
        var data = result.data;
        $("#myTableData_baocaonv").empty();
        console.log(data);
        if (!data || data === '[]') {
            return;
        }
        var TypeDeviceId;
        $(data).each(function (i, item) {
            var col_tongchung = '';
            if (item.typedeviceid !== TypeDeviceId) {
                col_tongchung = '<td class="text-center vertical-middle" rowspan=' + item.rowspan + '>' + item.tongchung + '</td>';
            }
            TypeDeviceId = item.typedeviceid;
            var tr = '<tr>'
            + '<td class="text-center">' + item.stt + '</td>'
            + '<td>' + item.tenvattu + '</td>'
            + '<td>' + item.donvitinh + '</td>'
            + col_tongchung
            + '<td class="text-center">' + item.tonkho + '</td>'
            + '<td class="text-center">' + item.hangmoi + '</td>'
            + '<td class="text-center">' + item.hangcothesd + '</td>'
            + '<td class="text-center">' + item.hangtest + '</td>'
            + '<td class="text-center">' + item.hanghong + '</td>'
            + '<td class="text-center">' + item.hangchomuon + '</td>'
            + '</tr>';
            $("#myTableData_baocaonv").append(tr);
        });
    } catch (e) {
        console.log(e.message);
    }
}
// Load vat tu thiet bị
function Loadcombox_baocaonv() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_loadbandau_baocaonv", connstr: "ConnectEMS" };
        var para = {
            Type: 'Basic',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadbandau_baocaonv(config, para, lst) {
    try {
        var data = lst.data;
        console.log(data);
        dataToCob("cbvattutbi_baocaonv", data[0].kq0, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
function Loadloaithietbi_baocaonv(value) {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loadthietbi_baocaonv", connstr: "ConnectEMS" };
        var para = { IsType: 'LoaiThietBi', Code: value };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadthietbi_baocaonv(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbloaivattu_baocaonv", data, "code", "name", "-1", "--Tất cả--");

    } catch (e) {
        console.log(e);
    }
}
//load banmien
function Loadcomboxbanmien_baocaonv() {
    try{
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loadbandaubanmien_baocaonv", connstr: "ConnectEMS" };
        var para = {
            IsType: 'BCLoadKhoXuat',
            Code: userInfo.code
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadbandaubanmien_baocaonv(config, para, lst) {
    try{
        var data = lst.data;
        dataToCob("cbbanmien_baocaonv", data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
//loadnhanvien mac dinh ban dau;
function Loadnhanvienbandau_baocaonv() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadStockUser", callback: "f_result_loadnhanvienbandau_baocaonv", connstr: "ConnectEMS" };
        var para = {
            TypeExport: '2',
            UserId: userInfo.userid,
            Code: '-1',
            IsType: 'LoadUserXuat'
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadnhanvienbandau_baocaonv(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbnhanvien_baocaonv", data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
//loadnhanvien vaule
function Loadmanhanvien_baocaonv(value) {
    try{
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadStockUser", callback: "f_result_manhanvien_baocaonv", connstr: "ConnectEMS" };
        var para = {
            TypeExport: '2',
            UserId: userInfo.userid,
            Code: value,
            IsType: 'LoadUserXuat'
        };
        ExecuteServiceSyns(config, para, false);
    }catch(e){
        console.log(e);
    }
}
function f_result_manhanvien_baocaonv(config, para, lst) {
    try{
        var data = lst.data;
        dataToCob("cbnhanvien_baocaonv", data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}

// load trang thai
function Loadtrangthai_baocaonv(value) {
    try {
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_resultLoadTrangThai_baocaonv", connstr: "ConnectEMS" };
        var para = { IsType: "LoadTrangThai", Code: value };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_resultLoadTrangThai_baocaonv(config, para, lst) {
    try {
        dataToCob("cbloaithietbi_baocaonv", lst.data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}