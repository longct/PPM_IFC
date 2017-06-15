var HD_ID = 0;
$(document).ready(function () {
    try {
        loadConetent();
        loadInitDate();
        loadtable_chitiet(1);
        $("#btn_search_bcmuavttb_hd").click(function () {
            loadtable_chitiet(1);
        });
        $("#btn_xuatexcel_bcmuavttb_hd").click(function () {
            xuatexcel_bcmuavttb();
        });
    } catch (e) { console.log(e); }
});
//------------------------------------------------------
function loadtable_chitiet(page) {
    try {
        var config = { namesql: "Load_BCMUAVTTB_HD", callback: "result_loadByCode_chitiet", connstr: "ConnectEMS" };
        var para = {
            MaHD: $("#txt_mahd_search").val(),
            TenHD: $("#txt_tenhd_search").val(),
            pagenum: page,
            numrecs: 10
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function result_loadByCode_chitiet(config, para, lst) {
    try {
        if (lst == null || lst == undefined) return;
        var data = lst.data;
        if (data == null || data == "[]" || data == "" || data.length == 0) {
            try {
                messInfo("messinfo_bcmuavttb_hd", "Không có dữ liệu hiển thị ", "error");
                return;
            } catch (e) {
                console.log(e);
            }
        }
        messInfo("messinfo_bcmuavttb_hd", "", "error");

        $("#myTableData_bcmuavttb_hd").empty();
        $.each(data, function (key, val) {
            console.log(val);
            var row = "";
            row += "<tr><td class='c'>"
                + val.stt + "</td><td class='c'>"
                + val.mahd + "</td><td>"
                + val.tenhd + "</td><td class='c'>"
                + val.soluonghd + "</td><td>"
                + val.ghichu + "</td><td style='width: 100px;'>"
                + "<div style='float:left'><a class='btn btn-success btn-action'  data-toggle='modal' href='#muavattuthietbi' style='width: 60px;height: 30px;' id='btn_chitiet" + val.id + "'>Chi tiết</a></div></tr>";
            $("#myTableData_bcmuavttb_hd").append(row);
            $("#btn_chitiet" + val.id).click(function () {
                messInfo("messinfo_kbhd", '', "error");
    
                loadthongtin_bcmuavttb_hd(val.id);
              
            });


        });
        LoadPhanTrang("pageLst_bcmuavttb_hd", "pageCurent_bcmuavttb_hd", data, function () {
            loadtable_chitiet($("#pagenumber").val());
        });
    } catch (e) {
        console.log(e);
    }
}
function xuatexcel_bcmuavttb() {
    try {
        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "Load_BCMUAVTTB_HD",
            namefile: "baocaomuaVTTB",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
      
        var para = {
            MaHD: $("#txt_mahd_search").val(),
            TenHD: $("#txt_tenhd_search").val(),
            pagenum: 1,
            numrecs: 1000000
        };
        var colum = {
            kq: [{ field: "stt", name: "stt", type: "TextCenter" },
             { field: "mahd", name: "Mã hợp đồng", type: "TextCenter" },
             { field: "tenhd", name: "Tên hợp đồng", type: "TextCenter" },
             { field: "soluonghd", name: "Tổng số lượng giao theo HĐ", type: "TextCenter" },
             { field: "ghichu", name: "Ghi chú", type: "TextCenter" },
           
            ]
        };

        excuteExcel(config, para, colum, true);

    } catch (e) { console.log(e); }
}