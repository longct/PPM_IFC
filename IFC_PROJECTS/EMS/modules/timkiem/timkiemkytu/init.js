
$(document).ready(function () {
    try {
        loadConetent();
        loadInitDate();
        var p = getAllIdMod();
        var value = p.serach_all;
        if (value == "") {
            $("#myTable_timkiemkytu").empty();
            var row3 = "Không có kết quả hiển thị hãy nhập từ khóa tìm kiếm"
            $("#messinfo_timkiemkytu").html(row3);
            return;
        }
        loadtimkiem_tkkytu(value);
        $("#btn_timkiem_master").click(function () {
            var p = getAllIdMod();
            var value = p.serach_all;
            loadtimkiem_tkkytu(value)
        });
 
    } catch (e) { console.log(e); }
});

function loadtimkiem_tkkytu(value) {
    try{
        var config = { namesql: "TB_Search_Tim1TB", callback: "f_result_loadtimkiem_tkkytu", connstr: "ConnectEMS" };
        var para = {
            Search: value
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadtimkiem_tkkytu(config, para, lst) {
    try{
        var data = lst.data;
        var p = getAllIdMod();
        if (data[0].kq0 == '[]' || data[0].kq0 == "" || data[0].kq0 == null || data[0].kq0.length == 0) {
            $("#myTable_timkiemkytu").empty();
            var row1 = "Không có kết quả hiển thị " + p.serach_all;
            $("#messinfo_timkiemkytu").html(row1); 
            return;
        }
        loadtrang_timkiemkytu(data);
        loadphantrang_timkiemkytu(data);

    } catch (e) {
        console.log(e);
    }
}
function loadtrang_timkiemkytu(data) {
    try {
        var p = getAllIdMod();
        $("#messinfo_timkiemkytu").empty();
        var row = "Tìm thấy " + data[0].kq0.length + " quả thỏa mãn từ khóa " + p.serach_all;
        $("#messinfo_timkiemkytu").html(row);

        $("#myTable_timkiemkytu").empty();
        var row2 = "<tr><th>STT</th><th>Vật Tư</th><th>Loại Vật Tư</th><th>Vị Trí Hiện Tại</th><th>Người Quản Lý</th><th>Tình Trạng Thiết Bị</th><th>Serial</th><th>IMEI Ghép Nối</th> <th>Series Sim Ghép Nối</th><th>Mã hợp đồng</th><th>Dự Án</th><th>Ngày Giao Nhận Cuối</th><th>Ghi chú - Số điện thoại</th></tr>";
        $("#myTable_timkiemkytu").html(row2);

        $("#myTableData_timkiemkytu").empty();
        $.each(data[0].kq0, function (key, val) {
            var seriesdivive = val.seriesmodem != null && val.seriessim != null ? '-' : val.seriesdivice

            var row1 = "";
            row1 += "<tr><td class='c'>"
                + val.rownum + "</td><td class='c'>"
                + SetValnull(val.tenvattu) + "</td><td class='c'>"
                + SetValnull(val.mavattu) + "</td><td class='c'>"
                + SetValnull(val.tenkho) + "</td><td class='c'>"
                + SetValnull(val.fullname )+ "</td><td class='c'>"
                + SetValnull(val.trangthai) + "</td><td class='c'>"
                + seriesdivive + "</td><td class='c'>"
                + SetValnull(val.seriesmodem) + "</td><td class='c'>"
                + SetValnull(val.seriessim) + "</td><td class='c'>"
                + SetValnull(val.trackingnumber) + "</td><td class='c'>"
                + SetValnull(val.projectname) + "</td class='c'><td>"
                + SetValnull(val.bhtimeend )+ "</td><td class='c'>"
                + SetValnull(val.infoadd1) + "</td></tr>";
            $("#myTableData_timkiemkytu").append(row1);
        });

    } catch (e) {
        console.log(e);
    }
}
function loadphantrang_timkiemkytu(data) {
    try {
        var Count = 1;
        $("#myTablekq1_timkiemkytu").empty();
        var row3 = "<tr><th>STT</th><th>Mã phiếu</th><th>Người gửi</th><th>Người nhận</th><th>Từ kho</th><th>Tới kho</th><th>Số lượng</th><th>Mã hợp đồng</th><th>Thời gian nhập</th><th>Tình trạng<th>Ghi chú</th><th>Xem</th></tr>";
        $("#myTablekq1_timkiemkytu").html(row3);
       
        //console.log(data[1].kq1.length);
        $("#myTableDatakq1_timkiemkytu").empty();
        $.each(data[1].kq1, function (key, val) {
            var row4 = "";
            row4 += "<tr class='C"+val.typeinout+"'><td>"
                + Count++ + "</td><td>"
                + SetValnull(val.voicecode) + "</td><td class='c'>"
                + SetValnull(val.nguoigui) + "</td><td class='c'>"
                + SetValnull(val.nguoinhan) + "</td><td class='c'>"
                + SetValnull(val.tukho) + "</td><td class='c'>"
                + SetValnull(val.toikho) + "</td><td class='c'>"
                + SetValnull(val.countdivice) + "</td><td class='c'><a href='#modules/baocao/khaibaohopdong/danhsachHD'>"
                + SetValnull(val.trackingnumber) + "</a></td><td class='c'>"
                + SetValnull(val.inputdate) + "</td><td class='c'>"
                + SetValnull(val.approve) + "</td><td class='c'>"
                + SetValnull(val.note) + "</td>"
               + "<td class='linktomod c' href='#modalXemChiTietPhieu_kytu' id='btn_xemchitiethoadon_timkiemkytu" + val.voicecode + "' data-toggle='modal'> Xem"
                + "</td> </tr>";
            $("#myTableDatakq1_timkiemkytu").append(row4);
            $("#btn_xemchitiethoadon_timkiemkytu" + val.voicecode).click(function () {
                //console.log(val.voicecode);
                loadxemchitietmaphieu_timkiemkytu(val.voicecode);

            });
        });
       
    } catch (e) {
        console.log(e);
    }
}
