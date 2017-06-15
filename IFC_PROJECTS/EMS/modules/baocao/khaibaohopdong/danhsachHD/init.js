$(document).ready(function () {
    try {
        loadConetent();
        loadInitDate();
        loadtable_chitiet(1);
        $("#btn_search_kbhd").click(function () {
            loadtable_chitiet(1);
        });
        $("#btn_xuatexcel_kbhd").click(function () {
            xuatexcel_khhd();
        });
    } catch (e) { console.log(e); }
});
//------------------------------------------------------
function loadtable_chitiet(page) {
    try {
        var config = { namesql: "TB_Import_LoadKhaiBaoHopDong", callback: "result_loadByCode_chitiet", connstr: "ConnectEMS" };
        var para = {

            TenHopDong: $("#txt_tenhd_search").val(),
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
                messInfo("messinfo_kbhd", "Không có dữ liệu hiển thị ", "error");
                return;
            } catch (e) {
                console.log(e);
            }
        }
        messInfo("messinfo_kbhd", "", "error");

        $("#myTableData_kbhd").empty();
        $.each(data, function (key, val) {

            var row = "";
            row += "<tr><td class='c'>"
                + val.stt + "</td><td class='c'>"
                + val.mahd + "</td><td>"
                + val.tenhd + "</td><td class='c'>"
                + val.soluonghd + "</td><td>"
                + val.ghichu + "</td><td style='width: 200px;'>"        
                + "<div style='float:left'><a class='btn btn-success btn-action' data-toggle='modal' href='#xemchitiet_kbhd' style='width: 60px;height: 30px;' id='btn_chitiet" + val.id + "'>Chi tiết</a></div>"
                + "<div style='float:left'><a class='btn btn-success btn-action classquyen_sua' data-toggle='modal' href='#sua_kbhd' style='width: 60px;height: 30px;' id='btn_suahd" + val.id + "'>Sửa</a></div>"
                + "<div style='float:left'><a class='btn btn-success btn-action classquyen_xoa' data-toggle='modal' style='width: 35px;height: 30px;' onclick='Xoakbhd(" + val.id + ")' >Xóa</a></div>"
                +"</td> </tr>";
            $("#myTableData_kbhd").append(row);
            $("#btn_chitiet" + val.id).click(function () {
                messInfo("messinfo_kbhd", '', "error");
                loadthongtin_kbhd(val.id);
            });
            $("#btn_suahd" + val.id).click(function () {
                messInfo("messinfo_kbhd", '', "error");
                loadthongtin_sua_kbhd(val.id);
            });

        });
        LoadPhanTrang("pageLst_kbhd", "pageCurent_kbhd", data, function () {
            loadtable_chitiet($("#pagenumber").val());
        });
    } catch (e) {
        console.log(e);
    }
}
//------------------------------------------------------
function Xoakbhd(id) {
    f_confimYesNo("Bạn chắc chắn muốn xóa?", "Bỏ qua", "Đồng ý", function () { f_xoa_kbhd(id); });
}
function f_xoa_kbhd(id) {
    try {
        var config = { connstr: "ConnectEMS", namesql: "TB_Lis_XoaKBHD", callback: "result_XoaKBHD" };
        var para = {
            v_id: parseInt(id)
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function result_XoaKBHD(config, para, lst) {
    try {
        if (lst == null || lst == undefined) return;
        if (lst.data[0].result.toLowerCase().indexOf("thành công") > 0) {
            messInfo("messinfo_kbhd", lst.data[0].result, "ok");
            loadtable_chitiet(1);
        }
        else {
            messInfo("messinfo_kbhd", lst.data[0].result, "error");
         }
    } catch (e) {
        console.log(e);
    }
}
function xuatexcel_khhd() {
    try {
        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "TB_Import_LoadKhaiBaoHopDong",
            namefile: "danhsachhopdong",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var para = {
            TenHopDong: $("#txt_tenhd_search").val(),
            pagenum: 1,
            numrecs: 1000000

        };
        var colum = {
            kq: [{ field: "stt", name: "STT", type: "Text" },
             { field: "mahd", name: "Mã hợp đồng", type: "Text" },
             { field: "tenhd", name: "Tên hợp đồng", type: "Text" },
             { field: "soluonghd", name: "Tổng số lượng giao theo HĐ", type: "TextCenter" },
             { field: "ghichu", name: "Ghi chú", type: "Text" }
            ]
        };

        excuteExcel(config, para, colum, true);

    } catch (e) { console.log(e); }
}