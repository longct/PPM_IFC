var countpage=10;
$(document).ready(function () {
    try {

        loadInitDate();
        //loadConetent();
        loadchecklog_master();
        var p = getAllIdMod();
        $("#txt_ngayfrom_bcaodientieuthu").val(gettimenow());
        $("#txt_ngayto_bcaodientieuthu").val(gettimenow());

       // loaddanhsach_bcaond(1);
        $("#btn_checkluu_bcaodientieuthu").click(function () {
            loaddanhsach_bcaodientieuthu(1);
        });

        $("#btn_print_bcaodientieuthu").click(function () {
            //PrintElem("div-print-bcdiennangtieuthu");
            exportExcel_bcdientieuthu();
        });

    } catch (e) {
        console.log(e);
    }

});

function loaddanhsach_bcaodientieuthu(page) {
    try{
        var p = getAllIdMod();
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var config = {
            namesql: "PKG_BAOCAO2.BAOCAO_DIENNANG_TIEUTHU",
            callback: "f_result_loaddanhsach_bcaodientieuthu",
            connstr: "ConnectOracleStreetLight"
        };
        var para = {
            v_datefrom: p.txt_ngayfrom_bcaodientieuthu,
            v_dateto: p.txt_ngayto_bcaodientieuthu,
          v_pagenum:page,
          v_numrecs: countpage,
        };
        ////console.log(para);
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddanhsach_bcaodientieuthu(config, para, lst) {
    try {
        var data = lst.data;
        console.log(data);
        if (data == null || data == '[]' || data == undefined || data.length == 0) {
            messInfo("messinfo_bcaodientieuthu", "Không có dữ liệu hiển thị", "error");
            clearnull_bcaond();
            return;
        }
        messInfo("messinfo_bcaodientieuthu", "", "ok");
        hienthi_bcaodientieuthu(data);

    } catch (e) {
        console.log(e);
    }
}
function hienthi_bcaodientieuthu(data) {
    try {
        $("#table_bcaodientieuthu").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td class='a-left'>"
                + setnull(val.tenkhachhang) + "</td><td >"
                + setnull(val.tendonvi) + "</td><td >"
                + setnull(val.diachikhachhang) + "</td><td class='a-center'>"
                + setnull(val.quan) + "</td><td class='a-center'>"
                + setnull(val.sobong) + "</td><td class='a-center'>"
                + setnull(val.congsuattrungbinh) + "</td><td class='a-center'>"
                + setnull(val.congsuat) + "</td><td class='a-center'>"
                + setnull(val.thoigianhoatdong) + "</td><td class='a-center'>"
                + setnull(val.diennangtieuthu) + "</td><td class='a-center'>"
                + setnull(val.chisomoi) + "</td><td class='a-center'>"
                + setnull(val.chisocu) + "</td><td class='a-center'>"
                + setnull(val.diennangtieuthu2) + "</td><td class='a-center'>"
                + setnull(val.diennangtietgiam) + "</td><td class='a-center'>"
                + setnull(val.phantramtietgiam) + "</td><td>"
                + setnull(val.ghichu) + "</td></tr>";
            $("#table_bcaodientieuthu").append(row);
        });

        LoadPhanTrang("pageLst_bcaodientieuthu", "pageCurent_bcaodientieuthu", data, function () {
            var p = getAllIdMod();
            loaddanhsach_bcaond($("#pagenumber").val());
        });


    } catch (e) {
        console.log(e);
    }

}

function clearnull_bcaond() {
    try {
        $("#table_bcaodientieuthu").empty();
        $("#pageCurent_bcaodientieuthu").empty();
        $("#pageLst_bcaodientieuthu").empty();

    } catch (e) {
        console.log(e);
    }
}

function exportExcel_bcdientieuthu()
{
    var p = getAllIdMod();
    var userinfo = JSON.parse(localStorage.getItem('userinfo'));
    var config = {
        namesql: "PKG_BAOCAO2.BAOCAO_DIENNANG_TIEUTHU",
        connstr: "ConnectOracleStreetLight",
        namefile: "BC_DiennangTieuthu"
    };
    var para = {
        v_datefrom: p.txt_ngayfrom_bcaodientieuthu,
        v_dateto: p.txt_ngayto_bcaodientieuthu,
        v_pagenum: page,
        v_numrecs: countpage,
    };
    var colum = {
        kq: [
            { field: "stt", name: "STT", type: "TextAndBoldCenter" },
            { field: "tenkhachhang", name: "Tên Tủ Điều khiển", type: "TextAndBoldCenter" },
            { field: "tendonvi", name: "Tên tuyến đường được chiếu sáng", type: "TextAndBoldCenter" },
            { field: "diachikhachhang", name: "Địa chỉ của tủ điều khiển chiếu sáng", type: "TextAndBoldCenter" },
            { field: "quan", name: "Quận", type: "Text" },
            { field: "congsuat", name: "Công suất tiêu thụ của các bộ đèn có lắp thiết bị điều khiển trong tủ điều khiển khi chưa điều chỉnh ánh sáng - từ Phụ lục 2 - P100% (kW)", type: "Text" },
            { field: "thoigianhoatdong", name: "Thời gian hoạt động - thđ (h)", type: "Text" },
            { field: "diennangtieuthu", name: "Điện năng tiêu thụ của tủ điều khiển có lắp thiết bị điều khiển khi chưa điều chỉnh ánh sáng - E100% = P100%xthđ (kWh)", type: "Text" },
            { field: "chisomoi", name: "Chỉ số điện kế mới - ĐKmới (kWh)", type: "Text" },
            { field: "chisocu", name: "Chỉ số điện kế cũ - ĐKcũ (kWh)", type: "Text" },
            { field: "diennangtieuthu2", name: "Điện năng tiêu thụ của tủ điều khiển khi có điều chỉnh ánh sáng - tính bằng hiệu 2 chỉ số điện kế - Etháng = Đkmới - ĐKcũ (kwh) ", type: "Text" },
            { field: "diennangtietgiam", name: "Điện năng tiết giảm - Etiết giảm = E100% - Etháng(kWh)", type: "Text" },
            { field: "phantramtietgiam", name: "Phần trăm điện năng tiết giảm (%) = Etiết giảm / ETTĐK", type: "Text" },
            { field: "ghichu", name: "Ghi chú", type: "Text" }
        ]
    };
    ExecuteExportExcelOracle(config, para, colum);
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