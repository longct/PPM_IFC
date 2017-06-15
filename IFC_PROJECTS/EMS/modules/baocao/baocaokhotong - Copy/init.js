
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
            loadduan_baocaokho(value);

            if($(this).val() !== '-1'){
                $("#cbkhotong_baocaokho").hide();
                $("#cbdienluc_baocaokho").show();
                
                loaddienluc_baocaokho($(this).val());
            } else {
                $("#cbkhotong_baocaokho").show();
                $("#cbdienluc_baocaokho").hide();
            }
        });

        $("input[name=quanly_baocaokho]").change(function () {
            if ($(this).val() === '0') {
                $("#cbtrangthai_baocaokho").prop('disabled', 'disabled');
                $("#btninbaocao_baocaokho").show();
                $("#tb_bckho_chitiet").hide();
                $("#tb_bckho_tongquan").show();
            } else {
                $("#cbtrangthai_baocaokho").removeAttr('disabled');
                $("#btninbaocao_baocaokho").hide();
                $("#tb_bckho_chitiet").show();
                $("#tb_bckho_tongquan").hide();
            }
        });

        $("#btnCapNhat_baocaokho").click(function () {
           
            if ($("#cbkho_baocaokho").val() == "-1") {
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
            Type: 'Basic',
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
        console.log(data);
        dataToCob("cbvattutbi_baocaokho", data[0].kq0, "code", "name", "-1", "--Tất cả--");
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
            IsType: 'BCLoadKhoXuat',
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
        dataToCob("cbkho_baocaokho", data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
//load du an
function loadduan_baocaokho(value) {
    try {
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loadduan_baocaokho", connstr: "ConnectEMS" };
        var para = { IsType: 'LoadDuAn', Code: value };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadduan_baocaokho(config, para, lst) {
    try {
        dataToCob("cbduan_baocaokho", lst.data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
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
        dataToCob("cbdienluc_baocaokho", lst.data, "code", "name", "-1", "--Tất cả--");
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
        Khotongmien: p.cbkhotong_baocaokho,
        ProjectId: p.cbduan_baocaokho,
        Dienluc: p.cbdienluc_baocaokho,
        TypeDeviceId: p.cbvattutbi_baocaokho,
        VendorId: p.cbloaithietbi_baocaokho,
        StatusId: p.cbtrangthai_baocaokho
    };
   
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
    var para = {
        ToDate: p.txt_datetobh_baocaokho,
        Kho: p.cbkho_baocaokho,
        Khotongmien: p.cbdienluc_baocaokho,
        ProjectId: parseInt(p.cbduan_baocaokho),
        TypeDeviceId: parseInt(p.cbvattutbi_baocaokho),
        VendorId: parseInt(p.cbloaithietbi_baocaokho),
        StatusId: parseInt(p.cbtrangthai_baocaokho)
    };
    console.log(para);
    ExecuteServiceSyns(config, para, false);
}
function f_result_loc_du_lieu_tongquan_bckhotong(config, para, lst) {
    try {
        console.log(lst);
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
            var tr = '<tr>'
            + '<td class="text-center">' + item.stt + '</td>'
            + '<td>' + item.tenvattu + '</td>'
            + '<td>' + item.donvitinh + '</td>'
            + '<td class="text-center">' + item.tongchung + '</td>'
            + '<td class="text-center" style="background-color: #eee;">' + item.tongtk + '</td>'
            + '<td class="text-center">' + item.slmoitk + '</td>'
            + '<td class="text-center">' + item.slmoitottk + '</td>'
            + '<td class="text-center">' + item.slmoiloitk + '</td>'
            + '<td class="text-center">' + item.slthuhoitk + '</td>'
            + '<td class="text-center">' + item.slthuhoittk + '</td>'
            + '<td class="text-center">' + item.slthuhoiltk + '</td>'
             + '<td class="text-center" style="background-color: #eee;">' + item.tongcd + '</td>'
            + '<td class="text-center">' + item.slmoicd + '</td>'
            + '<td class="text-center">' + item.slmoitotcd+ '</td>'
            + '<td class="text-center">' + item.slmoiloicd + '</td>'
            + '<td class="text-center">' + item.slthuhoicd + '</td>'
            + '<td class="text-center">' + item.slthuhoitcd + '</td>'
            + '<td class="text-center">' + item.slthuhoilcd + '</td>'
            + '</tr>';
            $("#myTableData_baocaokho").append(tr);
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
            Khotongmien: p.cbkhotong_baocaokho,
            ProjectId: parseInt(p.cbduan_baocaokho),
            TypeDeviceId: parseInt(p.cbvattutbi_baocaokho),
            VendorId: parseInt(p.cbloaithietbi_baocaokho),
            StatusId: parseInt(p.cbtrangthai_baocaokho)
        };
        var colum = {
            kq: [
               { field: "stt", name: "STT", type: "TextAndBoldCenter" },
               { field: "tenvattu", name: "Tên VTTB", type: "TextAndBoldCenter" },
               { field: "donvitinh", name: "ĐVT", type: "TextAndBoldCenter" },
                { field: "tongchung", name: "Tổng SL(SLTK+SLXCD)", type: "TextAndBoldCenter" },
               { field: "tongtk", name: "Tổng SL tồn kho", type: "TextAndBoldCenter" },
               { field: "slmoitk", name: "SL mới tồn kho", type: "TextAndBoldCenter" },
               { field: "slmoitottk", name: "SL mới tốt tồn kho", type: "TextAndBoldCenter" },
               { field: "slmoiloitk", name: "SL mới lỗi tồn kho", type: "TextAndBoldCenter" },
               { field: "slthuhoitk", name: "SL thu hồi tồn kho", type: "TextAndBoldCenter" },
               { field: "slthuhoittk", name: "SL thu hồi tốt tồn kho", type: "TextAndBoldCenter" },
               { field: "slthuhoiltk", name: "SL thu hồi lỗi tồn kho", type: "TextAndBoldCenter" },
               { field: "tongcd", name: "SL đã xuất chờ duyệt", type: "TextAndBoldCenter" },
               { field: "slmoicd", name: "SL mới đã xuất CD", type: "TextAndBoldCenter" },
               { field: "slmoitotcd", name: "SL mới tốt đã xuất CD", type: "TextAndBoldCenter" },
               { field: "slmoiloicd", name: "SL mới lỗi đã xuất CD", type: "TextAndBoldCenter" },
               { field: "slthuhoicd", name: "SL thu hồi đã xuất CD", type: "TextAndBoldCenter" },
               { field: "slthuhoitcd", name: "SL thu hồi tốt đã xuất CD", type: "TextAndBoldCenter" },
               { field: "slthuhoilcd", name: "SL thu hồi lỗi đã xuất CD", type: "TextAndBoldCenter" },
            ]
        };

        excuteExcel(config, para, colum, true);
    } catch (e) {
        console.log(e);
    }
}