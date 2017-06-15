
var paraTable_NhapExcel = [];
var maphieuexcel = "";
$(document).ready(function () {
    try {
        var user = JSON.parse(localStorage.getItem("userinfo"));
        if (user.code.length > 4) {
            $(".classnhapexcel").html("Không có quyền xem trang này");
            return;
        } else {
            loadConetent();
            loadInitDate();
            clearthanhcong_NhapExcel();
            loaddatabasebandaukhotong_NhapExcel();

            $("#cbkhonhan_NhapExcel").change(function () {
                loaduserkho_NhapExcel();
               
            });

            $("#cbvatuthietbi_NhapExcel").change(function () {
                loadgetlistthietbi_NhapExcel();
            });

            $("#btnCapNhat_NhapExcel").click(function () {
                f_confimYesNo("Cập nhật phiếu nhập?", "Bỏ qua", "Đồng ý", function () { f_ExcuteDatabase_NhapExcel("TB_Import_ImportWaitInHard_Excel", "f_resultCapNhatDatabase_NhapExcel") });

            });


            $("#btnXuatExecl_NhapExcel").click(function () {
                try {

                    xuatexecl_NhapExcel();
                } catch (e) {
                    console.log(e);
                }
            });
            $("#cbchuloainhap_nhapexcel").click(function () {
                if ($("#cbchuloainhap_nhapexcel").val() == "1") {
                    $("#txmavandon_NhapExcel").val("-1");
                    $("#txtMaphieu_NhapExcel").val(maphieuexcel.replace("PNTP", "PNM"));
                    $("#txmavandon_NhapExcel").removeAttr("disabled");
                }
                else {
                    $("#txtMaphieu_NhapExcel").val(maphieuexcel.replace("PNM", "PNTP"));
                    $("#txmavandon_NhapExcel").attr("disabled", true);
                }
            });
            $("#btnkiemtra_NhapExcel").click(function () {
                f_ExcuteDatabase_NhapExcel("TB_Import_CheckSameInHard_excel", "f_resultCheckTrungTB_NhapExcel");
            });

            $("#file_chonexecl_NhapExcel").click(function () {
                $("#file_chonexecl_NhapExcel").val("");
            });

            $("#txmavandon_NhapExcel").change(function () {
                var val = $(this).val();
                console.log(val);
                $('#txmavandon_NhapExcel option[selected=selected]').removeAttr('selected');
                $('#txmavandon_NhapExcel option[value="' + val + '"]').attr('selected', 'selected');
            });
        }
    } catch (e) {
        console.log(e);
    }
});

// doc file excel
function f_UploadFile_NhapExcel() {
    try {
       
        messInfo("messinfo_NhapExcel", "", "error");
        messInfo("messinfo_NhapExcel", "", "ok");
        $("#grvnhapkho_NhapExcel").hide();
        $("#grvnhapkhotrung_NhapExcel").hide();
        $("#grvnhapkho_NhapExcel tbody").empty();
        $("#grvnhapkhotrung_NhapExcel tbody").empty();

        var p = getAllIdMod();
        var fdata = new FormData();
        var file = document.getElementById("file_chonexecl_NhapExcel").files[0];

        fdata.append("file", file);
        fdata.append("select", "select *");
        fdata.append("where", "");
        if (file == null || file == 'undefined' || file.length == 0) {
            messInfo("messinfo_NhapExcel", "Bạn chưa chọn file execl", "error");
            return;
        }
        var config = { callback: "f_resultImportExcel_NhapExcel" };
        f_importExcel(config, fdata);
    } catch (e) { console.log(e); }
}

function f_resultImportExcel_NhapExcel(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "[]") {
            messInfo("messinfo_NhapExcel", "Không có dữ liệu, vui lòng kiểm tra", "error");
            return;
        }
       
        paraTable_NhapExcel = [];
        var p = getAllIdMod();
        $.each(lst.data, function (key, val) {
            if (val.series != "" && val.series != undefined) {
                var temp = {
                    SeriesDivice: val.series,
                    Sim_TimeActive: "",
                    Sim_Phone: val.thongtinthem,
                    CountDivice: 1,
                    InfoAdd1: val.thongtinthem,
                    InfoAdd2: "",
                    StatusDivice: "1",
                    Stt: key
                };
                paraTable_NhapExcel.push(temp);
            }
      
        });
      
        // danh sách nhập bằng exccel
        f_drawOk_NhapExcel(paraTable_NhapExcel);
       
    } catch (e) { console.log(e); }
}

// excute database

function f_ExcuteDatabase_NhapExcel(namesql, calkBackTo) {
    try {


        if (paraTable_NhapExcel == null || paraTable_NhapExcel == undefined || paraTable_NhapExcel == "" || paraTable_NhapExcel == "[]" || paraTable_NhapExcel.length == 0) {
            messInfo("messinfo_NhapExcel", "Không có dữ liệu, vui lòng kiểm tra", "error");
        }

        var check = checkkytunull_NhapExcel();
        if (check != "") {
            messInfo("messinfo_NhapExcel", check, "error");
            return;
        }
        var user = JSON.parse(localStorage.getItem("userinfo"));
        var p = getAllIdMod();

        var dt = '{ "table": ' + JSON.stringify(paraTable_NhapExcel) + ' }';

        var config = { namesql: namesql, callback: calkBackTo, connstr: "ConnectEMS" };
        var para = {
           TrackingNumber: p.txmavandon_NhapExcel
          , ProjectId: "-1"
          , UserIdFrom: user.userid
          , UserIdTo: p.cbnguoiduyet_NhapExcel
          , Note: p.txtlydonhap_NhapExcel
          , FileCV: p.file_bienban_NhapExcel
          , CodeStockFrom: user.code
          , CodeStockTo: p.cbkhonhan_NhapExcel
          , Onner: p.cbchusohuu_NhapExcel
          , TypeInOut: "1"
          , Version: p.txtversion_NhapExcel
          , BHTimeStart: p.txt_datefrombh_NhapExcel
          , BHTimeEnd: p.txt_datetobh_NhapExcel
          , TypeDeviceId: p.cbvatuthietbi_NhapExcel
          , VendorId: p.cbloaithietbi_NhapExcel
          , LoaiNhap: p.cbchuloainhap_nhapexcel
        };
        console.log(para);
        ExecuteBulkCopyDatatable_Sql(config, para, JSON.parse(dt));
      

    } catch (e) {
        console.log(e);
    }
}
function f_resultCheckTrungTB_NhapExcel(config, para, lst) {
    try {
        if (lst != null && lst != undefined && lst != "" && lst != "[]" && lst.data != null && lst.data != "" && lst.data != "[]" && lst.data.length > 0 && lst.data[0] !=null&& lst.data[0].kq0.length > 0) {
            // check trung loi vao day
            localStorage.setItem("ketqua_NhapExcel", JSON.stringify(lst.data[1].kq1));
            
            if (lst.data[0].kq0[0].result.toLowerCase().indexOf("mã phiếu đã có tồn tại") < 0) {
                messInfo("messinfo_NhapExcel", lst.data[0].kq0[0].result, "error");
                $("#messinfo_tongbanghi").html("");
                $("#btnCapNhat_NhapExcel").attr("disabled", "disabled");
                $("#btnXuatExecl_NhapExcel").removeAttr("disabled");
                $("#grvnhapkhotrung_NhapExcel").show();
                f_drowCheckTrung_NhapExcel(lst.data[1].kq1);
            } else {
                messInfo("messinfo_NhapExcel", "Bạn có thể nhập những thiết bị này", "ok");
                $("#grvnhapkho_NhapExcel").show();
                $("#btnCapNhat_NhapExcel").removeAttr("disabled");
                $("#btnXuatExecl_NhapExcel").removeAttr("disabled");
                f_loadMaPhieuNhap_NhapExcel();
                $("#grvnhapkhotrung_NhapExcel").hide();
                $("#grvnhapkhotrung_NhapExcel tbody").empty();
            }
        }
        else {
            // check trung ok moi xuong day  
            $("#tblxuattaytrung").hide();
            messInfo("messinfo_NhapExcel", "Bạn có nhập những thiết bị này", "ok");
            $("#grvnhapkho_NhapExcel").show();
            $("#grvnhapkhotrung_NhapExcel").hide();
            $("#grvnhapkhotrung_NhapExcel tbody").empty();
            $("#btnCapNhat_NhapExcel").removeAttr("disabled");
            $("#btnXuatExecl_NhapExcel").removeAttr("disabled");
           
        }
      
    } catch (e) {
        console.log(e);
    }
}

function f_resultCapNhatDatabase_NhapExcel(config, para, lst) {
    try {
        $("#btnCapNhat_NhapExcel").attr("disabled", "disabled");
        if (lst == null || lst == "" || lst == "[]" || lst.data == null || lst.data == "" || lst.data == "[]") {
            messInfo("messinfo_NhapExcel", lst.data[0].result, "error");
            f_loadMaVanDon_NhapExcel();
            return;
        }
        if (lst.data[0].result.toLowerCase().indexOf("thành công") >= 0) {
            messInfo("messinfo_NhapExcel", lst.data[0].result , "ok");
            paraTable_NhapExcel = [];
            clearthanhcong_NhapExcel();
            $("#myTableData_NhapExcel").empty();
            $("#btnCapNhat_NhapExcel").attr("disabled", "disabled");
            f_uploadFileMaVanDon_NhapExcel();
            f_loadMaVanDon_NhapExcel();
            $("#messinfo_tongbanghi").html("");
            $("#file_chonexecl_NhapExcel").val("");
        }
        else
            messInfo("messinfo_NhapExcel", lst.data[0].result, "error");
    } catch (e) { console.log(e); }
}

function f_drawOk_NhapExcel(data) {
    try {
        if (paraTable_NhapExcel == null || paraTable_NhapExcel == undefined || paraTable_NhapExcel == "" || paraTable_NhapExcel == "[]" || paraTable_NhapExcel.length == 0) {
            messInfo("messinfo_NhapExcel", "File excel không đúng định dạng, vui lòng kiểm tra", "error");
            $("#file_chonexecl_NhapExcel").val("");
        }
        $("#btnCapNhat_NhapExcel").attr("disabled", "disabled");
        $("#grvnhapkho_NhapExcel").show();
        $("#grvnhapkho_NhapExcel tbody").empty();
        var i = 0;
        $.each(data, function (key, val) {
            if (val.SeriesDivice != '' && val.SeriesDivice != null && val.SeriesDivice != 'null') {
                i++;
                var tr = "<tr>";
                tr += "<td class='c'>" + (key + 1) + "</td>";
                tr += "<td class='c'>" + val.SeriesDivice + "</td>";
                tr += "<td class='c'>" +SetValnull(val.InfoAdd1) + "</td>";
                tr += "</tr>";
                $("#grvnhapkho_NhapExcel tbody").append(tr);
            }
           
        });
        $("#messinfo_tongbanghi").html("Tổng số  <b>" + i + "</b> thiết bị");
    } catch (e) { console.log(e); }
}

function f_drowCheckTrung_NhapExcel(data) {
    try {
        console.log(data);
        $("#grvnhapkhotrung_NhapExcel").show();
        $("#grvnhapkhotrung_NhapExcel tbody").empty();
        $.each(data, function (key, val) {
            if (val.seriesdivice != '' && val.seriesdivice != null && val.seriesdivice != 'null') {
                var tr = "<tr>";
                    tr += "<td>" + (key + 1) + "</td>";
                    tr += "<td>" + val.seriesdivice + "</td>";
                    tr += "</tr>";
                    $("#grvnhapkhotrung_NhapExcel tbody").append(tr);
                }
        });
    } catch (e) { console.log(e); }
}


function f_uploadFileMaVanDon_NhapExcel() {
    try {
        var fdata = new FormData();
        var file = document.getElementById("file_bienban_nhaptay").files[0];
        //var file = p.btn_import_1pha_khachhang.files[0];
        fdata.append("file", file);
        if (file == null || file == 'undefined' || file.length == 0) {
            return;
        }
        var config = { callback: "f_resultuploadFileMaVanDon_NhapExcel" };
        f_UploadFileAny(config, fdata);
    } catch (e) { console.log(e); }
}

function f_resultuploadFileMaVanDon_NhapExcel(config, para, data) {
    console.log(data);
}


//============================================================ LOAD CAC CONTROL==========================================================
// load ra list du lieu ban dau
function loaddatabasebandaunhaptay_NhapExcel() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_loaddulieunhaptay_NhapExcel", connstr: "ConnectEMS" };
        var para = { Type: 'SoHuu', UserId: userInfo.userid };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}

function f_result_loaddulieunhaptay_NhapExcel(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbchusohuu_NhapExcel", data, "code", "name", "-1", "--Chọn chủ sở hữu-");
        loadLoaiThietBiSoLuongHayChiTiet_NhapExcel(0);

    } catch (e) {
        console.log(e);
    }
}
function loaddatabasebandaukhotong_NhapExcel() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_loaddulieukhotong_NhapExcel", connstr: "ConnectEMS" };
        var para = { Type: 'khotongtheouser', UserId: userInfo.userid };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddulieukhotong_NhapExcel(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbkhonhan_NhapExcel", data, "code", "name");
        loaduserkho_NhapExcel();
        f_loadMaVanDon_NhapExcel();
    } catch (e) {
        console.log(e);
    }
}
// load ra loai thiet bi tuong ung khi chon chi tiet hay so luong
function loadLoaiThietBiSoLuongHayChiTiet_NhapExcel(type) {
    try {
        var config = { namesql: "TB_Import_LstLoadByCode", callback: "f_result_loadLoaiThietBiSoLuongHayChiTiet_NhapExcel", connstr: "ConnectEMS" };
        var para = { IsType: 'SoLuongChiTiet', Code: type };

        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadLoaiThietBiSoLuongHayChiTiet_NhapExcel(config, para, lst) {
    try {
        dataToCob("cbvatuthietbi_NhapExcel", lst.data, "code", "name", "-1", "--Chọn loại vật tư--");
    } catch (e) {
        console.log(e);
    }
}

// load ra list thiet bi
function loadgetlistthietbi_NhapExcel() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "TB_Import_LstLoadByCode", callback: "f_result_loadlistthietbi_NhapExcel", connstr: "ConnectEMS" };
        var para = { IsType: 'LoaiThietBi', Code: p.cbvatuthietbi_NhapExcel };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadlistthietbi_NhapExcel(config, para, lst) {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var data = lst.data;
        dataToCob("cbloaithietbi_NhapExcel", data, "code", "name", "-1", "--Chọn loại thiết bị--");
    } catch (e) {
        console.log(e);
    }
}


// load ra user kho
function loaduserkho_NhapExcel() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "TB_Import_LstLoadByCode", callback: "f_result_loadlistuserkho_NhapExcel", connstr: "ConnectEMS" };
        var para = { IsType: 'User', Code: p.cbkhonhan_NhapExcel };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadlistuserkho_NhapExcel(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbnguoiduyet_NhapExcel", data, "code", "name", "-1", "--Chọn người duyệt--");
    } catch (e) {
        console.log(e);
    }
}


// load ra mã van don
function f_loadMaVanDon_NhapExcel() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "TB_Import_LstLoadByCode", callback: "f_resultLoadMaVanDon_NhapTay", connstr: "ConnectEMS" };
        var para = { IsType: 'MaHD', Code: $("#cbkhonhan_NhapExcel").val() };

        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}

var LIST_HOP_DONG;

function f_resultLoadMaVanDon_NhapTay(config, para, lst) {
    try {

        if (lst == null || lst == undefined || lst == "[]") return;
        var data = lst.data;
        LIST_HOP_DONG = lst.data;
        dataToCob("txmavandon_NhapExcel", data, "mahd", "mahd", "-1", "--Chọn mã hợp đồng--");

        $("#txmavandon_NhapExcel").hover(function () {
            console.log('hover');
            $("#txmavandon_NhapExcel").popover("destroy");
            var mahd = $("#txmavandon_NhapExcel option:selected").val();
            if (mahd == "-1") return;

            var hdObj = $.grep(LIST_HOP_DONG, function (val, index) {
                return val.mahd == mahd;
            })[0];
            $("#txmavandon_NhapExcel").popover({
                placement: 'bottom',
                html: true,
                trigger: 'manual',
                content: '<div><span style="margin-right:5px;font-size:13px">Mã hợp đồng:</span><b style="font-size:13px">' + hdObj.mahd + '</b><br/>'
                    + '<span style="margin-right:5px;font-size:13px">Tên hợp đồng:</span><b style="font-size:13px">' + hdObj.tenhd + '</b><br/>'
                    + '<span style="margin-right:5px;font-size:13px">Số lượng:</span><b style="font-size:13px">' + hdObj.soluonghd + '</b><br/>'
                    + '<span style="margin-right:5px;font-size:13px">Ghi chú:</span><b style="font-size:13px">' + hdObj.ghichu + '</b><br/>'
                    + '</div>'
            });
            $("#txmavandon_NhapExcel").popover('show');
        });

        $("#txmavandon_NhapExcel").mouseleave(function () {
            console.log('mouseleave');
            $("#txmavandon_NhapExcel").popover("destroy");
        });
    } catch (e) {
        console.log(e);
    }
}
// check giá trị null
function checkkytunull_NhapExcel() {
    try {
        var p = getAllIdMod();
        if (p.txtMaphieu_NhapExcel == "") return "Mã Phiếu không được để trống.";
        if (p.cbvatuthietbi_NhapExcel == "-1") return "Vui lòng chọn vật tư thiết bị";
        if (p.cbloaithietbi_NhapExcel == "-1") return "Vui lòng chọn loại thiết bị";
        if (p.cbkhonhan_NhapExcel == "-1") return "Vui lòng chọn nhập kho";
        if (p.cbnguoiduyet_NhapExcel == "-1") return "Vui lòng chọn người duyệt";
        if (p.cbchusohuu_NhapExcel == "-1") return "Vui lòng chọn nhà sở hữu";
        if (p.txmavandon_NhapExcel == "-1" && $("#cbchuloainhap_nhapexcel").val()=="1") return "Vui lòng chọn mã hợp đồng";
     
        if (p.txtlydonhap_NhapExcel == "") return "Vui lòng nhập lý do";
        if (p.file_chonexecl_NhapExcel == "") return "Vui lòng chọn file excel";
        return "";

    } catch (e) {
        console.log(e);
    }
}

// clear nhập thành công
function clearthanhcong_NhapExcel() {
    try {
       
        loaddatabasebandaunhaptay_NhapExcel();
        setValToTxt('cbnguoiduyet_NhapExcel', '-1');
        setValToTxt('txmavandon_NhapExcel', '');
        setValToTxt('btnMaVanDon_NhapExcel', '');
        setValToTxt('txtlydonhap_NhapExcel', '');
        setValToTxt('cbloaithietbi_NhapExcel', '-1');
        setValToTxt('txtversion_NhapExcel', '');
        setValToTxt('txt_datefrombh_NhapExcel', gettimenow());
        setValToTxt('txt_datetobh_NhapExcel', gettimenow());
        $("#grvnhapkho_NhapExcel").hide();
        $("#grvnhapkhotrung_NhapExcel").hide();
    } catch (e) {
        console.log(e);
    }
}
// xuất execl
function xuatexecl_NhapExcel() {
    try{
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "TB_Import_CheckSameInHard",
            namefile: "Loi_series_nhap_execl",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var para = JSON.parse(localStorage.getItem("ketqua_NhapExcel"));
        var dt = '{ "data": ' + JSON.stringify(para) + ' }';
        var colum = {
            kq: [
               { field: "seriesdivice", name: "Series", type: "TextAndBoldCenter" },
        ]};

        excuteExcelHaveData(config, JSON.parse(dt), colum, true);

    } catch (e) {
        console.log(e);
    }

}

//============================================================KET THUC LOAD CAC CONTROL==========================================================


