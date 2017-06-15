var dataReport_vttbdl = "";
var dataXuatExcel_bct_vttbdl = null;
$(document).ready(function () {
    try {

        loadConetent();
        loadInitDate();
        Loadcombox_baocaovtbtdluc();
        Loadcombox_banmien_vttbdl();
        Loadloaithietbi_baocaovttbdl("-1");
        setValToTxt("txt_dateto_baocaovttb", gettimenow());
        $("#btnCapNhat_baocaovttb").click(function () {
            if ($("#cbduan_baocaovttbdl").val() != "-1") {
                f_layDuLieu_baocao_vttbdl("TB_BAOCAO_TAIDIENLUC_DUAN", "f_resultLayDuLieu_baocao_vttbdl");
            } else {
                f_layDuLieu_baocao_vttbdl("TB_BAOCAO_TAIDIENLUC", "f_resultLayDuLieu_baocao_vttbdl");
            }
        });
        $("#cbvattutb_baocaovttb").change(function () {

            Loadloaithietbi_baocaovttbdl($("#cbvattutb_baocaovttb").val());
        });
        $("#cbkho_baocaovttbdl").change(function () {
            loadduan_baocaovttbdl($("#cbkho_baocaovttbdl").val());
        });
        $("#btninbaocao_baocaovttb").click(function () {

            if (dataReport_vttbdl != "") {
                if (dataReport_vttbdl.length > 0) {
                    localStorage.setItem("datareportxuat_Id", 7);
                    location.href = "master.html#modules/baocao/printreport";
                } else {
                    clear_thu_vttdl();
                    messInfo("messinfo_baocaovttdl", "Chưa có dữ liệu", "error");
                }
            } else {
                clear_thu_vttdl();
                messInfo("messinfo_baocaovttdl", "Chưa có dữ liệu", "error");
            }

        });
        $("#btnxuatexecl_baocaovttb").click(function () {
            if (dataXuatExcel_bct_vttbdl != null) {
                if ($("#cbduan_baocaovttbdl").val() != "-1") {
                    f_xuatexcel_baocao_vttbdl("TB_BAOCAO_TAIDIENLUC_DUAN");
                } else {
                    f_xuatexcel_baocao_vttbdl("TB_BAOCAO_TAIDIENLUC");
                }
            } else {
                clear_thu_vttdl();
                messInfo("messinfo_baocaovttdl", "Vui lòng thực hiện trước khi xuất excel", "error");
            }
           
        });
        $("#btnxuatexecl_Serial_baocaovttb").click(function () {
            xuatexcel_serial_vttb();
        });
    } catch (e) {
        console.log(e);
    }
});

//load du an
function loadduan_baocaovttbdl(value) {
    try {
        var p = getAllIdMod();
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loadduan_baocaovttbdl", connstr: "ConnectEMS" };
        var para = { IsType: 'LoadDuAn', Code: value };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadduan_baocaovttbdl(config, para, lst) {
    try {
        dataToCob("cbduan_baocaovttbdl", lst.data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
//loadloaithietbi
function Loadloaithietbi_baocaovttbdl(value) {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_Loadloaithietbi_baocaovttbdl", connstr: "ConnectEMS" };
        var vttbdl = value;
        if (vttbdl != '-1') {
            var TypeDeviceIdbm = "";
            $.each(vttbdl, function (key, val) {
                TypeDeviceIdbm += val + ',';
            });
        } else
            TypeDeviceIdbm = value;
        var para = { IsType: 'LoaiThietBiSelect', Code: TypeDeviceIdbm };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_Loadloaithietbi_baocaovttbdl(config, para, lst) {
    try {

        if (lst == null || lst == undefined || lst == "[]") return;
        var data = lst.data;
        $("#cbloaithietbi_baocaovttbdl").multiselect('destroy');
        dataToCob("cbloaithietbi_baocaovttbdl", data, "code", "name", "", "");
        $('#cbloaithietbi_baocaovttbdl').multiselect({
            includeSelectAllOption: true,
            enableFiltering: false,
            includeSelectAllOption: true,
            selectAllJustVisible: false,
            buttonWidth: '200px'
        });
    

    } catch (e) {
        console.log(e);
    }
}
function clear_thu_vttdl() {
    dataReport_vttbdl = "";
    $("#myTableData_baocaovttb").empty();
    $("#messinfo_notdatavttdl").hide();
    $("#messinfo_baocaovttdl").hide();
    $("#titleReportvttdl").hide();
}
function Loadcombox_baocaovtbtdluc() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_loadbandau_baocaovtbtdluc", connstr: "ConnectEMS" };
        var para = {
            Type: 'VTTB',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);


    } catch (e) {
        console.log(e);
    }
}
function f_result_loadbandau_baocaovtbtdluc(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "[]") return;
        var data = lst.data;
        dataToCob("cbvattutb_baocaovttb", data, "code", "name", "", "");
        $('#cbvattutb_baocaovttb').multiselect({
            includeSelectAllOption: true,
            enableFiltering: false,
            includeSelectAllOption: true,
            selectAllJustVisible: false,
            buttonWidth: '200px'
        });
      
    } catch (e) {
        console.log(e);
    }
}
function Loadcombox_banmien_vttbdl() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_Loadcombox_banmien_vttbdl", connstr: "ConnectEMS" };
        var para = {
            Type: 'banmien',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_Loadcombox_banmien_vttbdl(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbkho_baocaovttbdl", data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
// thuc hien
function f_layDuLieu_baocao_vttbdl(namesql, callback) {
    try {
        var p = getAllIdMod();
        if (p.cbkho_baocaovttbdl == "-1") {
            messInfo("messinfo_baocaovttdl", "Vui lòng chọn ban miền", "error");
            return;
        }
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: namesql, callback: callback, connstr: "ConnectEMS" };
        var vttb = $("#cbvattutb_baocaovttb").val();
        var TypeDeviceIdvttb = "";
        if (vttb != null && vttb != undefined) {
            $.each(vttb, function (key, val) {
                TypeDeviceIdvttb += val + ',';
            });
        } else TypeDeviceIdvttb = "-1";

        var ltb = $("#cbloaithietbi_baocaovttbdl").val();
        var vendoridvttb = "";
        if (ltb != null && ltb != undefined) {
            $.each(ltb, function (key, val) {
                vendoridvttb += val + ',';
            });
        } else vendoridvttb = "-1";

        var para = {
            Denngay: p.txt_dateto_baocaovttb,
            Kho: p.cbkho_baocaovttbdl,
            TypeDeviceId: TypeDeviceIdvttb,
            VendorId: vendoridvttb,
            ProjectId: parseInt(p.cbduan_baocaovttbdl)
        };
        ExecuteServiceSyns(config, para);


    } catch (e) { console.log(e); }
}

function f_resultLayDuLieu_baocao_vttbdl(config, para, lst) {
    try {
        clear_thu_vttdl();
        if (lst == null || lst == undefined) {
            $("#messinfo_notdatavttdl").html("Chưa có dữ liệu hiển thị");
            $("#messinfo_notdatavttdl").attr("class", "alert alert-block alert-danger");
            $("#messinfo_notdatavttdl").show();
            return;
        }
        var p = getAllIdMod();
        dataXuatExcel_bct_vttbdl = lst.data;
        f_veGrid_baocao_vttbdl(lst)
    } catch (e) { console.log(e); }
}
function f_veGrid_baocao_vttbdl(lst) {
    try {
        var p = getAllIdMod();
     
        if (lst.data != null && lst.data!= undefined && lst.data.length > 0) {
            dataXuatExcel_bct_vttbdl = dataReport_vttbdl = lst.data;
            var data = lst.data;
            $("#myTableData_baocaovttb").empty();
            $.makeTable = function (data) {

                var table = $('<table class="table table-striped table-bordered table-hover table-condensed" id="tb_vttbtdl" style="margin-bottom:0 !important; ">');
                var rowth = "<thead><tr>";
                for (var titile in data[0]) {
                    if (titile.toUpperCase() == 'MAVATTU')
                        rowth += "<th>MÃ VẬT TƯ</th>";
                    else if (titile.toUpperCase() == 'TENVATTU')
                        rowth += "<th>TÊN VẬT TƯ</th>";
                    else if (titile.toUpperCase() == 'DONVITINH')
                        rowth += "<th>ĐVT</th>";
                    else if (titile.toLowerCase() != 'vendorid')
                        rowth += "<th>" + titile.toUpperCase() + "</th>";
                }
                rowth += "<th>Xuất excel</th>";
                rowth += "</tr></thead>";
                $(rowth).appendTo(table);
               
                $.each(data, function (index, value) {
                    var row = "<tr>";
                    var data_vendoirid = value.vendorid;
                    delete value['vendorid'];

                    $.each(value, function (key, val) {
                        row += "<td class='c nw'>" + SetValnull(val) + "</td>";
                    });
                    row += "<td><a href='#' onclick='xuatexcelvttbtaidienluc(" + data_vendoirid + ")'><i class='fa fa-download'></i></td>";
                    row += "</tr>";
                    $(table).append(row);
                });
                return ($(table));

            };
            var table = $.makeTable(data);
            $(table).appendTo("#myTableData_baocaovttb");
            $("#titleReportvttdl").html("BÁO CÁO SỐ LƯỢNG VTTB TẠI CÁC KHO ĐIỆN LỰC");
            $("#titleReportvttdl").show();
        } else {
            messInfo("messinfo_baocaovttdl", "Không có dữ liệu hiển thị", "error");
        }
    } catch (e) { console.log(e); }
}
function xuatexcelvttbtaidienluc(vendorid) {
    try {
        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: 'TB_BAOCAO_TAIDIENLUC_VTTB',
            namefile: "baocaokhodienluc",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };

        var para = {
            Denngay: p.txt_dateto_baocaovttb,
            Kho: p.cbkho_baocaovttbdl,
            VendorId: vendorid,
            TypeDeviceId: '-1',
            ProjectId: parseInt(p.cbduan_baocaovttbdl)
        };
        console.log(para);
        var colum = {
            kq: [{ field: "stt", name: "stt", type: "TextCenter" },
             { field: "vattuthietbi", name: "Vật tư thiết bị", type: "Text" },
             { field: "tenvattu", name: "Loại thiết bị", type: "Text" },
             { field: "countdivice", name: "Số lượng", type: "TextCenter" },
             { field: "seriesdivice", name: "Series", type: "TextCenter" },
             { field: "duan", name: "Dự án", type: "Text" },
            ]
        };

        excuteExcel(config, para, colum, true);
    } catch (e) {
        console.log(e);
    }
}
//xuất excel serial
function xuatexcel_serial_vttb() {
    try {
        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: 'TB_BAOCAO_TAIDIENLUC_VTTB',
            namefile: "baocaokhodienluc",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var vttb = $("#cbvattutb_baocaovttb").val();
        var TypeDeviceIdvttb = "";
        if (vttb != null && vttb != undefined) {
            $.each(vttb, function (key, val) {
                TypeDeviceIdvttb += val + ',';
            });
        } else TypeDeviceIdvttb = "-1";

        var ltb = $("#cbloaithietbi_baocaovttbdl").val();
        var vendoridvttb = "";
        if (ltb != null && ltb != undefined) {
            $.each(ltb, function (key, val) {
                vendoridvttb += val + ',';
            });
        } else vendoridvttb = "-1";

        var para = {
            Denngay: p.txt_dateto_baocaovttb,
            Kho: p.cbkho_baocaovttbdl,
            VendorId: vendoridvttb,
            TypeDeviceId: TypeDeviceIdvttb,
            ProjectId: parseInt(p.cbduan_baocaovttbdl)
        };
       
        var colum = {
            kq: [{ field: "stt", name: "stt", type: "TextCenter" },
             { field: "vattuthietbi", name: "Vật tư thiết bị", type: "Text" },
             { field: "tenvattu", name: "Loại thiết bị", type: "Text" },
             { field: "countdivice", name: "Số lượng", type: "TextCenter" },
             { field: "seriesdivice", name: "Series", type: "TextCenter" },
             { field: "duan", name: "Dự án", type: "Text" },
            ]
        };

        excuteExcel(config, para, colum, true);
    } catch (e) {
        console.log(e);
    }
}
//xuat excel
function f_xuatexcel_baocao_vttbdl(namesql) {
    try {
        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: namesql,
            namefile: "baocaovttbtaidienluc",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var vttb = $("#cbvattutb_baocaovttb").val();
        var TypeDeviceIdvttb = "";
        if (vttb != null && vttb != undefined) {
            $.each(vttb, function (key, val) {
                TypeDeviceIdvttb += val + ',';
            });
        } else TypeDeviceIdvttb = "-1";

        var ltb = $("#cbloaithietbi_baocaovttbdl").val();
        var vendoridvttb = "";
        if (ltb != null && ltb != undefined) {
            $.each(ltb, function (key, val) {
                vendoridvttb += val + ',';
            });
        } else vendoridvttb = "-1";
        var para = {
            Denngay: p.txt_dateto_baocaovttb,
            Kho: p.cbkho_baocaovttbdl,
            TypeDeviceId: TypeDeviceIdvttb,
            VendorId: vendoridvttb,
            ProjectId: parseInt(p.cbduan_baocaovttbdl)
        };
        var kq = [];
        var info = { field: "rownum", name: "STT", type: "TextAndBoldCenter" };
        kq.push(info);
        var data = dataXuatExcel_bct_vttbdl;      
        for (var titile in data[0]) {
            info = { field: titile.toLowerCase(), name: titile, type: "Text" };
            kq.push(info);
        }
        var colum = { kq: kq };
        excuteExcel(config, para, colum, true);
    } catch (e) { console.log(e); }
}