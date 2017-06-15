var countPage = 10;
$(document).ready(function () {
    try {
        f_checkAnHienCb_lscb();
        loadInitDate();
        lstcot_lscb();
        
        setValToTxt("datefrom_lscb", gettimenow());
        setValToTxt("dateto_lscb", gettimenow());
        var p = getAllIdMod();
        load_lichsucanhbao_lscb(p,1);
        $("#btnThucHien_lscb").click(function () {
            try {
                var p = getAllIdMod();
                var check = checkoverday_lscb(p);
                if (check != "") {
                    messInfo("messinfo_lscb", check, "error");
                    clearnulllichsukien();
                    return;
                }
                load_lichsucanhbao_lscb(p, 1);
            } catch (e) {
                console.log(e);
            }
        });

        $("#cbcot_lscb").change(function () {
            lstvoi_lscb();
        });
    } catch (e) {
        console.log(e);
    }
});


function f_checkAnHienCb_lscb() {
    var idvoi = localStorage.getItem("idvoiclick");
    if (idvoi == null || idvoi == undefined) {
        var a;
        //console.log(idvoi);
        //$(".cb_cotbom_lscb").css("display", "block");
        //$(".cb_voibom_lscb").css("display", "block");
    }
    else {
        $(".cb_cotbom_lscb").css("display", "none");
        $(".cb_voibom_lscb").css("display", "none");
    }
}

function f_loadChangeTree() {
    var p = getAllIdMod();
    load_lichsuchottram(p, 1);
    Listsukien_lscb();
}

function checkoverday_lscb(p) {
    try {
        var compare = compareDates(timeyyyymmdd(p.datefrom_lscb), timeyyyymmdd(p.dateto_lscb));
        if (compare.days < 0)
            return "Từ ngày phải nhỏ hơn đến ngày";
        var ovderday = compareDates(new Date(), timeyyyymmdd(p.datefrom_lscb));
        if (ovderday.days > 0)
            return "Từ ngày không được chọn quá ngày hiện tại";
        var ovderday1 = compareDates(new Date(), timeyyyymmdd(p.dateto_lscb));
        if (ovderday1.days > 0)
            return "Đến ngày không được chọn quá ngày hiện tại";
        return "";
    } catch (e) {
        console.log(e);
    }
}

function load_lichsucanhbao_lscb(p, page) {
    try {
        f_checkAnHienCb_lscb();
        messInfo("messinfo_lscb", "", "ok");
        var idvoi = localStorage.getItem("idvoiclick");
        var config = { namesql: "PKG_CANHBAO.LOADLICHSUCANHBAO", callback: "f_result_lscb", connstr: "ConnOracleXangDau" };
        var infotree = JSON.parse(localStorage.getItem('infotree'));
        var para = {
            V_MAVOI: (idvoi == null || idvoi == undefined) ? p.cbvoi_lscb : idvoi,
            V_MACOT: (idvoi == null || idvoi == undefined) ? p.cbcot_lscb : -1,
            V_MATRAM: infotree.code,
            V_TUNGAY: p.datefrom_lscb,
            V_DENNGAY: p.dateto_lscb,
            v_pagenum: page,
            v_numrecs: countPage
        };
      
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_lscb(config, para, lst) {
    try {
        var data = lst.data;
        if (data == "[]" || data == null || data.length == 0) {
            try {
                //$('#btn_lichsuchot_execl').attr('disabled', 'disabled');
                var p = getAllIdMod();

                messInfo("messinfo_lscb", "Không có dữ liệu hiển thị từ " + p.datefrom_lscb + " đến " + p.dateto_lscb, "error");
                clearnulllichsukien();
                return;
            } catch (e) {
                console.log(e);
            }
        }
        
        datloadlichsusk(data);

    } catch (e) {
        console.log(e);
    }
}
function datloadlichsusk(data) {
    try {
        console.log(data);
        $("#grv_View_lscb tbody").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + setnull(val.tenvoibom) + "</td><td>"
                + setnull(val.noidung) + "</td><td>"
                + setnull(val.tencot) + "</td><td>"
                + setnull(val.tendonvi) + "</td><td>"
                + setnull(val.thoidiem) + "</td></tr>";
            $("#grv_View_lscb tbody").append(row);
        });
        LoadPhanTrang("pageLst_lscb", "pageCurent_lscb", data, function () {
            var p = getAllIdMod();
            load_lichsuchottram(p, $("#pagenumber").val());
        });
    } catch (e) {
        console.log(e);
    }
}

function clearnulllichsukien() {
    try {
        $("#grv_View_lscb tbody").empty();
        $("#pageLst_lscb").empty();
        $("#pageCurent_lscb").empty();
    } catch (e) {
        console.log(e);
    }
}



function lstcot_lscb() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "PKG_LSTCOMBOX.LSTCOT", callback: "f_result_lstcot_lscb", connstr: "ConnOracleXangDau" };
        var para = { v_Code: '' };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_lstcot_lscb(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cbcot_lscb", data, "id", "name", "-1", "Tất cả");
               
    } catch (e) {
        console.log(e);
    }
}


function lstvoi_lscb() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "PKG_LSTCOMBOX.LST_VOIBOM", callback: "f_result_lstvoi_lscb", connstr: "ConnOracleXangDau" };
        var para = { v_Code: p.cbcot_lscb };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_lstvoi_lscb(config, para, lst) {
    try {
        console.log(lst);
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cbvoi_lscb", data, "id", "name", "-1", "Tất cả");
    } catch (e) {
        console.log(e);
    }
}