$(document).ready(function () {
    try {
        
        loadConetent();
        loadInitDate();  
        setValToTxt("txt_dateto_search", gettimenow());
        setValToTxt("txt_datefrom_search", gettimenow());
        loadall();
       
        $("#cb_vendorid_search").change(function () {
            loadTenThietBi($(this).val());
        });
        loadtable_bctondm(1);
        $("#btn_search_bcxuatvttb_da").click(function () {
            loadtable_bctondm(1);
        });
        $("#btn_xuatexcel_bcxuatvttb_da").click(function () {
            XuatExcel_bctondm();
        });
    } catch (e) { console.log(e); }
});
//------------------------------------------------------
function loadtable_bctondm(page) {
    try {
        var p = getAllIdMod();
        var config = { namesql: "Load_TonKho_DM", callback: "result_loadchitiet", connstr: "ConnectEMS" };
        var para = {
            TuNgay: p.txt_datefrom_search,
            DenNgay: p.txt_dateto_search,
            MaVT: parseInt(p.cb_vendorid_search),
            TenVT: p.cb_tenvt_search,
            MaKho: p.txt_makho_search,
            TenKho: p.txt_tenkho_search,
            pagenum: page,
            numrecs: 20
        };

        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_loadchitiet(config, para, lst) {
    console.log(lst);
    try {
        if (lst == null || lst == undefined) return;
        var data = lst.data;
        if (data == null || data == "[]" || data == "" || data.length == 0) {
            try {
                messInfo("messinfo_bcdm", "Không có dữ liệu hiển thị ", "error");
                return;
            } catch (e) {
                console.log(e);
            }
        }
        messInfo("messinfo_bcdm", "", "error");
        $("#myTableData_bcdm").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + val.makho + "</td><td>"
                + val.tenkho + "</td><td>"
                + val.mavt + "</td><td>"
                + val.tenvt + "</td><td>"
                + val.sltondm + "</td><td>"
                + val.sltonthucte + "</td><td>"
                + val.chenhlech + "</td><td>"
                + val.ghichu + "</td></tr>";
            $("#myTableData_bcdm").append(row);
        });
        LoadPhanTrang("pageLst_bcdm", "pageCurent_bcdm", data, function () {
            loadtable_bctondm($("#pagenumber").val());
        });
    } catch (e) {
        console.log(e);
    }
}
//------------------------------------------------------
function loadTenThietBi(id) {
    try {
        var config = { connstr: "ConnectEMS", namesql: "TB_GetTenThietBi", callback: "result_loadtenthietbi1" };
        var para = {
            v_typedeviceid: parseInt(id)
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function result_loadtenthietbi1(config, para, lst) {
    try {
        $("#cb_tenvt_search").empty();
        $("#cb_tenvt_search").append("<option value='0'>[ Chọn VTTB ]</option>")
        if (lst == null || lst == undefined) return;
        var data = lst.data;
        if (data == null || data.length == 0 || data == undefined) {
            return;
        }
        $.each(data, function (key, val) {
            $("#cb_tenvt_search").append("<option value='" + val.tenvattu + "'>" + val.tenvattu + "</option>");
        });
        //var id_nv = $('#cb_tenvt_kbhd').attr("data_id");
        //$('#cb_tenvt_kbhd').val(id_nv).change();
    } catch (e) {
        console.log(e);
    }
}
function loadall() {
    try {
        var config = { namesql: "TB_LoadAll", callback: "result_loadall1", connstr: "ConnectEMS" };
        var para = {
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function result_loadall1(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cb_vendorid_search", data[0].kq0, "code", "name", "-1", "[ Chọn loại thiết bị ]");
        dataToCob("cb_tenvt_search", data[1].kq1, "name", "name", "-1", "[ Chọn vttb ]");
        dataToCob("cb_banmien_search", data[4].kq4, "code", "name", "-1", "[ Chọn ban miền ]");
    } catch (e) {
        console.log(e);
    }
}
function XuatExcel_bctondm() {
    try {
        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "Load_TonKho_DM",
            namefile: "baocaotonkhotheoDM",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var para = {
            TuNgay: p.txt_datefrom_search,
            DenNgay: p.txt_dateto_search,
            MaVT: parseInt(p.cb_vendorid_search),
            TenVT: p.cb_tenvt_search,
            MaKho: p.txt_makho_search,
            TenKho: p.txt_tenkho_search,
            pagenum: 1,
            numrecs: 10000000
        };
        var colum = {
            kq: [{ field: "stt", name: "stt", type: "TextCenter" },
             { field: "makho", name: "Ngày tạo", type: "TextCenter" },
             { field: "tenkho", name: "Số phiếu", type: "TextCenter" },
             { field: "mavt", name: "Kho xuất", type: "TextCenter" },
             { field: "tenvt", name: "Kho nhập", type: "TextCenter" },
             { field: "sltondm", name: "Tình trạng", type: "TextCenter" },
             { field: "sltonthucte", name: "Ghi chú", type: "TextCenter" },
             { field: "chenhlech", name: "Ghi chú", type: "TextCenter" },
             { field: "ghichu", name: "Ghi chú", type: "TextCenter" },
            ]
        };

        excuteExcel(config, para, colum, true);

    } catch (e) { console.log(e); }
}

