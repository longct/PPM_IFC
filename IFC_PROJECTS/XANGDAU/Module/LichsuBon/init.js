var countPage = 10;
$(document).ready(function () {
    try {
        loadInitDate();

        Lst_bon();
        setValToTxt("datefrom_bon", gettimenow());
        setValToTxt("dateto_bon", gettimenow());
        var p = getAllIdMod();
        load_lichsubon(p, 1);
        $("#btn_bon").click(function () {
            try {
                var p = getAllIdMod();
                var check = checkoverday_bon(p);
                if (check != "") {
                    messInfo("messinfo_bon", check, "error");
                    clearnull_bon();
                    return;
                }
                load_lichsubon(p, 1);
            } catch (e) {
                console.log(e);
            }
        });
    
    } catch (e) {
        console.log(e);
    }
});


function checkoverday_bon(p) {
    try {
        var compare = compareDates(timeyyyymmdd(p.datefrom_bon), timeyyyymmdd(p.dateto_bon));
        if (compare.days < 0)
            return "Từ ngày phải nhỏ hơn đến ngày";
        var ovderday = compareDates(new Date(), timeyyyymmdd(p.datefrom_bon));
        if (ovderday.days > 0)
            return "Từ ngày không được chọn quá ngày hiện tại";
        var ovderday1 = compareDates(new Date(), timeyyyymmdd(p.dateto_bon));
        if (ovderday1.days > 0)
            return "Đến ngày không được chọn quá ngày hiện tại";
        return "";
    } catch (e) {
        console.log(e);
    }
}
function Lst_bon() {
    try {

        var config = { namesql: "PKG_LSTCOMBOX.LSTBON", callback: "f_result_Lst_bon", connstr: "ConnOracleXangDau" };
        var infotree = JSON.parse(localStorage.getItem('infotree'));
        var para = { v_code: infotree.code };

        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_Lst_bon(config, para, lst) {
    try {
        var data = lst.data;
        if (data == "[]" || data == null || data.length == 0) return;
        dataToCob("cbbon_chot", data, "id", "name", "-1", "Tất cả");
    } catch (e) {
        console.log(e);
    }
}

function load_lichsubon(p, page) {
    try {
        var config = { namesql: "PKG_TKBON.TKKBON", callback: "f_result_load_lichsubon", connstr: "ConnOracleXangDau" };
        var infotree = JSON.parse(localStorage.getItem('infotree'));
        var para = {
            v_CODE: infotree.code,
            v_MABON: p.cbbon_chot,
            v_datefrom: p.datefrom_bon,
            v_dateto: p.dateto_bon,
            v_pagenum: page,
            v_numrecs: countPage,
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_load_lichsubon(config, para, lst) {
    try{
        var data = lst.data;
        if (data == "[]" || data == null || data.length == 0) {
            try {
                var p = getAllIdMod();
                        messInfo("messinfo_bon", "Không có dữ liệu hiển thị từ " + p.datefrom_bon + " đến " + p.dateto_bon, "error");
                        clearnull_bon();
                        return;
                    } catch (e) {
                        console.log(e);
                    }
        }
        messInfo("messinfo_bon", "", "error");
        datloadlichsu_bon(data);

    } catch (e) {
        console.log(e);
    }
}
function datloadlichsu_bon(data) {
    try {
        $("#table_bon").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td class='l'>"
                + setnull(val.tenbon) + "</td><td class='l'>"
                + setnull(val.tenxang) + "</td><td class='r'>"
                + setnull(val.thoidiemdoc) + "</td><td class='r'>"
                + setnull(val.tonglit) + "</td><td>"
                + setnull(val.tendonvi) + "</td></tr>";
            $("#table_bon").append(row);
        });
        LoadPhanTrang("pageLst_bon", "pageCurent_bon", data, function () {
            var p = getAllIdMod();
            load_lichsubon(p, $("#pagenumber").val());
        });
    } catch (e) {
        console.log(e);
    }
}
function clearnull_bon() {
    try {
        $("#table_bon").empty();
        $("#pageLst_bon").empty();
        $("#pageCurent_bon").empty();
    } catch (e) {
        console.log(e);
    }
}
