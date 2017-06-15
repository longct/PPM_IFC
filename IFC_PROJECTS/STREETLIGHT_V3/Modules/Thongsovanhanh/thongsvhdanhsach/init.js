var coutpage = 10;
$(document).ready(function () {
    try {
        $('#thongso_vanhanh').on('shown.bs.modal', function () {
            // alert(2);
            loadfrom();
            // loadlsttu();
         

        })
        $(".tungay").css("display", "none");
        $("#txt_ngayfrom_tsvhds").val(gettimenow());
        $("#txt_ngayto_tsvhds").val(gettimenow());
        //loadlsttu();

        $("#btn_checkluu_tsvhds").click(function () {
            var tu = JSON.parse(localStorage.getItem("quan"));
            if (tu == "[]" || tu.length == 0) { 
                loadthong_tu(1);
            } else {
                loadthong_tram(1);
            }
        });

        $("#btn_execl_tsvhds").click(function () {

            var tu = JSON.parse(localStorage.getItem("quan"));
            if (tu == "[]" || tu.length == 0) {
                excthongsvhanh_tu();
            } else {
                excthongsvhanh_tram();
            }
        });

    } catch (e) {
        console.log(e);
    }

});

function loadfrom() {
    try {
        var tu = JSON.parse(localStorage.getItem("quan"));
            
        if (tu == "[]"|| tu.length==0) {
            $(".tungay").css("display", "block");
            $(".quan").css("display", "none");
            loadthong_tu(1);
        } else {
            $(".tungay").css("display", "none");
            $(".quan").css("display", "block");
            loadthong_tram(1);
          
        }

    } catch (e) {
        console.log(e);
    }
}
function loadlsttu() {
    try {
        var config = { namesql: "THONGTSVH.LSTCAY", callback: "f_result_loadlsttu", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_CODE: ''
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadlsttu(config, para, lst) {
    try {
        var data = lst.data;
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            return;
        }
        dataToCob("cbchon_tsvhds", data, "id", "ten", "-1", "");


    } catch (e) {
        console.log(e);
    }
}
//ca trạm
function loadthong_tram(page) {
    try {
        var quan = JSON.parse(localStorage.getItem("quan"));
        var p = getAllIdMod();
        var config = { namesql: "THONGTSVH.THONGSOVANHANH", callback: "f_result_loadthong_tram", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_CODE: quan[0],
            v_TUNGAY:p.txt_ngayfrom_tsvhds,
            v_DENNGAY:'',
            v_TYPE:'1',
            v_pagenum:page,
            v_numrecs:countpage,
        };
        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}
function f_result_loadthong_tram(config, para, lst) {
    try {
        var data = lst.data;
        if (data == null || data == '[]' || data == undefined || data.length == 0) {
            messInfo("messinfo_tsvhds", "Không có dữ liệu hiển thị", "error");
            clearnull_tsvh();
            return;
        }
        messInfo("messinfo_tsvhds", "", "ok");
        hienthi_tsvh(data);

    } catch (e) {
        console.log(e);
    }
}
function hienthi_tsvh(data) {
    try{
     
        $("#table_tsvhds").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td class=='tc'>"
                + val.stt + "</td><td class='tl'>"
                + setnull(val.tenkhachhang) + "</td><td class='tr'>"
                + setnull(val.socongto) + "</td><td class='tr'>"
                + setnull(val.pgiaotong) + "</td><td class='tc'>"
                + setnull(val.timemeter) + "</td><td class='ca'>"
                + setnull(val.ua) + "</td><td class='cb'>"
                + setnull(val.ub) + "</td><td class='cc'>"
                + setnull(val.uc) + "</td><td class='ca'>"
                + setnull(val.ia) + "</td><td class='cb'>"
                + setnull(val.ib) + "</td><td class='cc'>"
                + setnull(val.ic) + "</td><td class='ca'>"
                + setnull(val.cosa) + "</td><td class='cb'>"
                 + setnull(val.cosb) + "</td><td class='cc'>"
                + setnull(val.cosc) + "</td></tr>";
            $("#table_tsvhds").append(row);
        });

        LoadPhanTrang("pageLst_tsvh", "pageCurent_tsvh", data, function () {
            var p = getAllIdMod();
            load_tsvhbong($("#pagenumber").val());
        });


    } catch (e) {
        console.log(e);
    }
}
// một tủ
function loadthong_tu(page) {
    try {

        var tuthong = JSON.parse(localStorage.getItem("tu_ar"));
        $("#txt_thongtintu").text(tuthong[0].text);


        var tu = JSON.parse(localStorage.getItem("tuSelected"));
        var p = getAllIdMod();
        var config = { namesql: "THONGTSVH.THONGSOVANHANH", callback: "f_result_loadthong_tu", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_CODE: tu[0],
            v_TUNGAY: p.txt_ngayfrom_tsvhds,
            v_DENNGAY: p.txt_ngayto_tsvhds,
            v_TYPE: '2',
            v_pagenum: page,
            v_numrecs: countpage,
        };
        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}
function f_result_loadthong_tu(config, para, lst) {
    try {
        var data = lst.data;
        if (data == null || data == '[]' || data == undefined || data.length == 0) {
            messInfo("messinfo_tsvhds", "Không có dữ liệu hiển thị", "error");
            clearnull_tsvh();
            return;
        }
        messInfo("messinfo_tsvhds", "", "ok");
        hienthi_tsvh_tu(data);

    } catch (e) {
        console.log(e);
    }
}
function hienthi_tsvh_tu(data) {
    try {
        $("#table_tsvhdngays").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td class=='tc'>"
                + val.stt + "</td><td class=='tr'>"
                + setnull(val.socongto) + "</td><td class=='tr'>"
                + setnull(val.pgiaotong) + "</td><td class=='tc'>"
                + setnull(val.timemeter) + "</td><td class='ca'>"
                + setnull(val.ua) + "</td><td class='cb'>"
                + setnull(val.ub) + "</td><td class='cc'>"
                + setnull(val.uc) + "</td><td class='ca'>"
                + setnull(val.ia) + "</td><td class='cb'>"
                + setnull(val.ib) + "</td><td class='cc'>"
                + setnull(val.ic) + "</td><td class='ca'>"
                + setnull(val.cosa) + "</td><td class='cb'>"
                 + setnull(val.cosb) + "</td><td class='cc'>"
                + setnull(val.cosc) + "</td></tr>";
            $("#table_tsvhdngays").append(row);
        });

        LoadPhanTrang("pageLst_tsvh", "pageCurent_tsvh", data, function () {
            var p = getAllIdMod();
            loadthong_tu($("#pagenumber").val());
        });


    } catch (e) {
        console.log(e);
    }
}

function clearnull_tsvh() {
    try {
        $("#table_tsvhdngays").empty();
        $("#table_tsvhds").empty();
        $("#pageLst_tsvh").empty();
        $("#pageCurent_tsvh").empty();

    } catch (e) {
        console.log(e);
    }
}

function excthongsvhanh_tu() {
    var tu = JSON.parse(localStorage.getItem("tuSelected"));
    var p = getAllIdMod();
    var namef_l = 'TSVHcuatu' + p.txt_ngayfrom_tsvhds.replace("/", "-") + "_" + p.txt_ngayto_tsvhds.replace("/", "-");
    var config = { connstr: "ConnectOracleStreetLight", namesql: "THONGTSVH.THONGSOVANHANH", namefile: namef_l };
    var para = {
        v_CODE: tu[0],
        v_TUNGAY: p.txt_ngayfrom_btds,
        v_DENNGAY: p.txt_ngayto_btds,
        v_TYPE: '2',
        v_pagenum: '1',
        v_numrecs: '10000000',
    };
    var colum = {
        kq: [
            { field: "stt", name: "STT", type: "TextAndBoldCenter" },
            { field: "socongto", name: "Số công tơ", type: "TextAndBoldCenter" },
            { field: "tenkhachhang", name: "Tên khách hàng", type: "TextAndBoldCenter" },
            { field: "timemeter", name: "Thời gian", type: "TextAndBoldCenter" },
            { field: "ua", name: "UA(V)", type: "Text" },
            { field: "ub", name: "UB(V)", type: "Text" },
            { field: "uc", name: "UC(V)", type: "Text" },
            { field: "ia", name: "IA(A)", type: "Text" },
            { field: "ib", name: "IB(A)", type: "Text" },
            { field: "ic", name: "IC(A)", type: "Text" },
            { field: "cosa", name: "cosA", type: "Text" },
            { field: "cosb", name: "cosB", type: "Text" },
            { field: "cosc", name: "cosC", type: "Text" },
            { field: "pgiaotong", name: "P(Kwh)", type: "Text" }
        ]
    };
    ExecuteExportExcelOracle(config, para, colum);

}

function excthongsvhanh_tram() {
    var quan = JSON.parse(localStorage.getItem("quan"));
    var p = getAllIdMod();
    var namef_l = 'TSVHcuatu' + p.txt_ngayfrom_tsvhds.replace("/", "-") + "_" + p.txt_ngayto_tsvhds.replace("/", "-");
    var config = { connstr: "ConnectOracleStreetLight", namesql: "THONGTSVH.THONGSOVANHANH", namefile: namef_l };
    var para = {
        v_CODE: quan[0],
        v_TUNGAY: p.txt_ngayfrom_btds,
        v_DENNGAY: '',
        v_TYPE: '1',
        v_pagenum: '1',
        v_numrecs: '10000000',
    };
    var colum = {
        kq: [
            { field: "stt", name: "STT", type: "TextAndBoldCenter" },
            { field: "socongto", name: "Số công tơ", type: "TextAndBoldCenter" },
            { field: "tenkhachhang", name: "Tên khách hàng", type: "TextAndBoldCenter" },
            { field: "timemeter", name: "Thời gian", type: "TextAndBoldCenter" },
            { field: "ua", name: "UA(V)", type: "Text" },
            { field: "ub", name: "UB(V)", type: "Text" },
            { field: "uc", name: "UC(V)", type: "Text" },
            { field: "ia", name: "IA(A)", type: "Text" },
            { field: "ib", name: "IB(A)", type: "Text" },
            { field: "ic", name: "IC(A)", type: "Text" },
            { field: "cosa", name: "cosA", type: "Text" },
            { field: "cosb", name: "cosB", type: "Text" },
            { field: "cosc", name: "cosC", type: "Text" },
            { field: "pgiaotong", name: "P(Kwh)", type: "Text" }
        ]
    };
    ExecuteExportExcelOracle(config, para, colum);

}




