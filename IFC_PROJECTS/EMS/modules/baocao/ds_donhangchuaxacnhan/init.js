$(document).ready(function () {
    try {
        loadConetent();
        loadInitDate();
        setValToTxt('txt_tungay_search', getfirsttime());
        setValToTxt('txt_denngay_search', gettimenow());
        loadtable_chitiet(1);
        loadall();
       
        $("#cb_banmien_search").change(function () {
            loadKho($(this).val());
        });

        $("#btn_search_dsdhcxn").click(function () {
            loadtable_chitiet(1);
        });
        $("#btn_xuatexcel_dsdhcxn").click(function () {
            xuatexcel_dsdhcxn();
        });
    } catch (e) { console.log(e); }
});
//------------------------------------------------------
function loadtable_chitiet(page) {
    try {
        var p = getAllIdMod();
        var config = { namesql: "Load_DSDonHang_ChuaXacNhan", callback: "result_loadDS", connstr: "ConnectEMS" };
        var para = {
            TuNgay: p.txt_tungay_search,
            DenNgay: p.txt_denngay_search,
            BanMien: p.cb_banmien_search,
            Kho: p.cb_kho_search,
            pagenum: page,
            numrecs: 10
        };
        console.log(para);
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }              
}
function result_loadDS(config, para, lst) {
    try {
        $("#myTableData_dsdhcxn").empty();
        if (lst == null || lst == undefined) return;
        var data = lst.data;
        if (data == null || data == "[]" || data == "" || data.length == 0) {
            try {
                messInfo("messinfo_dsdhcxn", "Không có dữ liệu hiển thị ", "error");
                return;
            } catch (e) {
                console.log(e);
            }
        }
        messInfo("messinfo_dsdhcxn", "", "error");
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + val.ngay + "</td><td>"
                + val.sophieu + "</td><td>"
                + val.khoxuat + "</td><td>"
                + val.khonhap + "</td><td>"
                + val.tinhtrang + "</td><td>"
                + val.ghichu + "</td>";
            $("#myTableData_dsdhcxn").append(row);
          
        });
        LoadPhanTrang("pageLst_dsdhcxn", "pageCurent_dsdhcxn", data, function () {
            loadtable_chitiet($("#pagenumber").val());
        });
    } catch (e) {
        console.log(e);
    }
}
//------------------------------------------------------
function loadall() {
    try{
        var config = { namesql: "TB_LoadAll", callback: "result_loadall", connstr: "ConnectEMS" };
        var para = {

        };
        ExecuteServiceSyns(config, para, false);
    }catch (e){
        console.log(e);
    }
}
function result_loadall(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cb_banmien_search", data[4].kq4, "code", "name", "-1", "--Chọn kho tổng--");
    } catch (e) {
        console.log(e);
    }
}
function loadKho(code) {
    console.log(code);
    try{
        var config = { namesql: "TB_LoadKho", callback: "result_loadkho", connstr: "ConnectEMS" };
        var para = {
            v_codebanmien: code
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function result_loadkho(config, para, lst) {
    try {
        $("#cb_kho_search").empty();
        $("#cb_kho_search").append("<option value='-1'>-- Chọn Kho--</option>")
        if (lst == null || lst == undefined) return;
        var data = lst.data;
        if (data == null || data.length == 0 || data == undefined) {
            return;
        }
        $.each(data, function (key, val) {
            $("#cb_kho_search").append("<option value='" + val.code + "'>" + val.name + "</option>");
        });

    } catch (e) {
        console.log(e);
    }
}
function xuatexcel_dsdhcxn() {
    try {
        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "Load_DSDonHang_ChuaXacNhan",
            namefile: "danhsachdonhangchuaxacnhan",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var para = {
            TuNgay: p.txt_tungay_search,
            DenNgay: p.txt_denngay_search,
            BanMien: p.cb_banmien_search,
            Kho: p.cb_kho_search,
            pagenum: 1,
            numrecs: 10000000

        };
        var colum = {
            kq: [{ field: "stt", name: "stt", type: "TextCenter" },
             { field: "ngay", name: "Ngày tạo", type: "TextCenter" },
             { field: "sophieu", name: "Số phiếu", type: "TextCenter" },
             { field: "khoxuat", name: "Kho xuất", type: "TextCenter" },
             { field: "khonhap", name: "Kho nhập", type: "TextCenter" },
             { field: "tinhtrang", name: "Tình trạng", type: "TextCenter" },
             { field: "ghichu", name: "Ghi chú", type: "TextCenter" },
            ]
        };

        excuteExcel(config, para, colum, true);

    } catch (e) { console.log(e); }
}
