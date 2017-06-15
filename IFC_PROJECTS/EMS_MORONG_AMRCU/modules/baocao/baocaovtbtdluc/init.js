var dataReport_vttbdl = "";
var dataXuatExcel_bct_vttbdl = null;
$(document).ready(function () {
    try {

        loadConetent();
        loadInitDate();
        Loadcombox_baocaovtbtdluc();
       
        setValToTxt("txt_datefrom_baocaovttb", gettimenowweek());
        setValToTxt("txt_dateto_baocaovttb", gettimenow());
        $("#btnCapNhat_baocaovttb").click(function () {
            f_layDuLieu_baocao_vttbdl("TB_BAOCAO_TAIDIENLUC", "f_resultLayDuLieu_baocao_vttbdl");
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
            if (dataXuatExcel_bct_vttbdl !=null) {
                f_xuatexcel_baocao_vttbdl();
            } else {
                clear_thu_vttdl();
                messInfo("messinfo_baocaovttdl", "Vui lòng thực hiện trước khi xuất excel", "error");
            }
        });

    } catch (e) {
        console.log(e);
    }
});
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
            Type: 'Basic',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);


    } catch (e) {
        console.log(e);
    }
}
function f_result_loadbandau_baocaovtbtdluc(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbvattutb_baocaovttb", data[0].kq0, "code", "name", "-1", "--Tất cả-");

    } catch (e) {
        console.log(e);
    }
}
// thuc hien
function f_layDuLieu_baocao_vttbdl(namesql, callback) {
    try {
        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: namesql, callback: callback, connstr: "ConnectEMS" };
        var para = {
            Tungay: p.txt_datefrom_baocaovttb,
            Denngay: p.txt_dateto_baocaovttb,
            LOAIVATTU: p.cbvattutb_baocaovttb
        };
        ExecuteServiceSyns(config, para);


    } catch (e) { console.log(e); }
}

function f_resultLayDuLieu_baocao_vttbdl(config, para, lst) {
    try {
        console.log(lst);
        clear_thu_vttdl();
        if (lst == null || lst == undefined) {
            $("#messinfo_notdatavttdl").html("Chưa có dữ liệu hiển thị");
            $("#messinfo_notdatavttdl").attr("class", "alert alert-block alert-danger");
            $("#messinfo_notdatavttdl").show();
            return;
        }
        var p = getAllIdMod();
        dataXuatExcel_bct_vttbdl = lst.data[0].kq0;
        f_veGrid_baocao_vttbdl(lst)
    } catch (e) { console.log(e); }
}
function f_veGrid_baocao_vttbdl(lst) {
    try {
        clear_thu_vttdl();
        if (lst == null || lst == undefined) {
            $("#messinfo_notdatavttdl").html("Chưa có dữ liệu hiển thị");
            $("#messinfo_notdatavttdl").attr("class", "alert alert-block alert-danger");
            $("#messinfo_notdatavttdl").show();
            return;
        }
        var p = getAllIdMod();

        if (lst.data[0].kq0 != null && lst.data[0].kq0 != undefined && lst.data[0].kq0.length > 0) {
            dataXuatExcel_bct_vttbdl = dataReport_vttbdl = lst.data[0].kq0;
            var data = lst.data[0].kq0;
            $("#myTableData_baocaovttb").empty();
            $.makeTable = function (data) {

                var table = $('<table class="table table-striped table-bordered table-hover table-condensed cmiss_table">');
                var rowth = "<thead><tr>";
                rowth +="<th>STT</th>"
                for (var titile in data[0]) rowth += "<th>" + titile.toUpperCase() + "</th>";
                rowth += "</tr></thead>";
                $(rowth).appendTo(table);
               
                $.each(data, function (index, value) {
                  
                    var row = "<tr>";
                    row += "<td class='c'>" + (index + 1) + "</td>"
                    $.each(value, function (key, val) {
                        row += "<td class='c'>" + SetValnull(val) + "</td>";
                    });
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

//xuat excel
function f_xuatexcel_baocao_vttbdl() {
    try {
        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "TB_BAOCAO_TAIDIENLUC",
            namefile: "baocaovttbtaidienluc",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var para = {
            LOAIVATTU: p.cbvattutb_baocaovttb
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