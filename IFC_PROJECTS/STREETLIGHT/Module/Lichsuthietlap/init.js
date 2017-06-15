var Countpage = 8;
$(document).ready(function () {
    try {
        loadConetent();
        loadInitDate();
        loadchecklog_master();
        $("#tungay_txt").val(gettimenow());
        $("#toingay_txt").val(gettimenow());
        get_lsthietlap(1);
        $("#btn_loadls").click(function () {
           
            get_lsthietlap(1);
        });

    } catch (e) {
        console.log(e);
    }
});


function get_lsthietlap(page) {
    try {
        var p = getAllIdMod();

        var config = { namesql: "PKG_LICHSU.GET_LSDK", callback: "f_result_lsthietlap", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_loai: p.loaithietbi,
            v_tungay: p.tungay_txt,
            v_toingay: p.toingay_txt,
            v_pagenum: page,
            v_numrecs: Countpage
        };
       
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_lsthietlap(config, para, lst) {
    try {
        var data = lst.data;
        if (data == [] || data == "[]" || data == null || data == undefined || data.length == 0) {
            messInfo("messinfo_ttkh", "Không có dữ liệu hiển thị", "error");
            clearnull_lsthietlap();
            return;
        }
        messInfo("messinfo_ttkh", "", "ok");

        loaddanhsach_lsthietlap(data);
    } catch (e) {
        console.log(e);
    }
}
function loaddanhsach_lsthietlap(data) {
    try {
        $("#tbl_lstl").empty();
      
        $.each(data, function (key, val) {
            var loai = "";

            if (val.loaidieukhien.toLowerCase() == "pha" && val.chedo.toLowerCase() == "tudong") {
                loai = "<a class='btn btn-success btn-action' data-toggle='modal' href='#DieuKhien_Pha_TuDong' value='" + val.meterid + "' id='btn_phatudong" + val.mathietlap + "'>Xem</a>";
            }
            if (val.loaidieukhien.toLowerCase() == "pha" && val.chedo.toLowerCase() == "tucthoi") {
                loai = "<a class='btn btn-success btn-action' data-toggle='modal' href='#DieuKhien_Pha_TucThoi' value='" + val.meterid + "' id='btn_phatucthoi" + val.mathietlap + "'>Xem</a>";
            }
            if (val.loaidieukhien.toLowerCase() == "dim" && val.chedo.toLowerCase() == "tudong") {
                loai = "<a class='btn btn-success btn-action' data-toggle='modal' href='#DieuKhien_Dim_TuDong' value='" + val.meterid + "' id='btn_dimtudong" + val.mathietlap + "'>Xem</a>";
            }
            if (val.loaidieukhien.toLowerCase() == "dim" && val.chedo.toLowerCase() == "tucthoi") {
                loai = "<a class='btn btn-success btn-action' data-toggle='modal' href='#DieuKhien_Dim_TucThoi' value='" + val.meterid + "' id='btn_dimtucthoi" + val.mathietlap + "'>Xem</a>";
            }
           
           var d1 = " <form class='form-inline' role=''form'><div class='form-group'>" + loai + "</div> <div class='form-group'></div> </form></td></tr>";
           

            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + setnull(val.tenkhachhang) + "</td><td>"
                + setnull(val.loaidieukhien) + "</td><td>"
                + val.chedoname + "</td><td>"
                + val.thoidiemcapnhata + "</td><td>"
                + val.tennhanvien + "</td><td>"
                + d1;
            $("#tbl_lstl").append(row);

            $("#btn_phatudong" + val.mathietlap).click(function () {
                var lst = [];
                var idd = { id: val.meterid, mathietlap: val.mathietlap, an: true ,tcgannhat:"-1"}
                lst.push(idd);
                
                f_loadInfoOne_Dkttd(lst);

            });

            $("#btn_phatucthoi" + val.mathietlap).click(function () {
                var lst = [];
                var idd = { id: val.meterid, mathietlap: val.mathietlap, an: true, tcgannhat: "-1" }
                lst.push(idd);
              
                f_loadInfoOne_Dktptt(lst);

            });
            $("#btn_dimtudong" + val.mathietlap).click(function () {
                var lst = [];
                var idd = { id: val.meterid, mathietlap: val.mathietlap, an: true, tcgannhat: "-1" }
                lst.push(idd);
          
                f_loadInfoOne_Dktdtd(lst);

            });
            $("#btn_dimtucthoi" + val.mathietlap).click(function () {
                var lst = [];
                var idd = { id: val.meterid, mathietlap: val.mathietlap, an: true, tcgannhat: "-1" }
                lst.push(idd);
              
                f_loadInfoOne_Dkdtt(lst);

            });
           
        });


        LoadPhanTrang("pageLst_tk", "pageCurent_tk", data, function () {
            var p = getAllIdMod();
            get_lsthietlap($("#pagenumber").val());
        });

    } catch (e) {
        console.log(e);
    }
}
function clearnull_lsthietlap() {
    try {
        $("#tbl_lstl").empty();
        $("#pageCurent_tk").empty();
        $("#pageLst_tk").empty();

    } catch (e) {
        console.log(e);
    }
}
