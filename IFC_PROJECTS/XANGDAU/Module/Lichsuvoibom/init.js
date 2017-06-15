var countPage = 9;
$(document).ready(function () {
    try {
     //   loadConetent();
        loadInitDate();
        lstcot_lvbom();
        Listvoi_lvbom();
     
        setValToTxt("datefrom_lvoibom", gettimenowweek());
        setValToTxt("dateto_lvoibom", gettimenow());
        var p = getAllIdMod();
        load_lvbom(p, 1);
        $("#btn_lvoibom").click(function () {
            try {
                var p = getAllIdMod();
                var check = checkoverday_lvbom(p);
                if (check != "") {
                    messInfo("messinfo_lvoibom", check, "error");
                    clearnul_lvbom();
                    return;
                }
                load_lvbom(p, 1);
            } catch (e) {
                console.log(e);
            }
        });
        $("#cbcot_voibom").change(function () {
            Listvoi_lvbom();
        });

    } catch (e) {
        console.log(e);
    }
});


function f_checkAnHienCb_lsvb() {
    var idvoi = localStorage.getItem("idvoiclick");
    if (idvoi == null || idvoi == undefined)
        //console.log(idvoi);
        //$(".cb_voibom_lsvb").css("display", "block");
        var a;
    else
        $(".cb_voibom_lsvb").css("display", "none");
}

function f_load1VoiBom_lsvb()
{
    try
    {
        var p = getAllIdMod();  
        load_lvbom(p,1);
    } catch (e) { console.log(e);}
}
function checkoverday_lvbom(p) {
    try {
        var compare = compareDates(timeyyyymmdd(p.datefrom_lvoibom), timeyyyymmdd(p.dateto_lvoibom));
        if (compare.days < 0)
            return "Từ ngày phải nhỏ hơn đến ngày";
        var ovderday = compareDates(new Date(), timeyyyymmdd(p.datefrom_lvoibom));
        if (ovderday.days > 0)
            return "Từ ngày không được chọn quá ngày hiện tại";
        var ovderday1 = compareDates(new Date(), timeyyyymmdd(p.dateto_lvoibom));
        if (ovderday1.days > 0)
            return "Đến ngày không được chọn quá ngày hiện tại";
        return "";
    } catch (e) {
        console.log(e);
    }
}
function lstcot_lvbom() {
    try {
      
        var config = { namesql: "PKG_LSTCOMBOX.LSTCOT", callback: "f_result_lstcot_lvbom", connstr: "ConnOracleXangDau" };
        var para = { v_Code:'' };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_lstcot_lvbom(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cbcot_voibom", data, "id", "name", "-1", "Tất cả");

    } catch (e) {
        console.log(e);
    }
}


function Listvoi_lvbom() {
    try {
       
        var config = { namesql: "PKG_LSTCOMBOX.LST_VOIBOM", callback: "f_result_Listvoi_lvbom", connstr: "ConnOracleXangDau" };
        var p = getAllIdMod();
        var para = { v_code: p.cbcot_voibom };
       
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_Listvoi_lvbom(config, para, lst) {
    try {
        var data = lst.data;
        if (data == "[]" || data == null || data.length == 0) return;
        dataToCob("cb_lvoibom", data, "id", "name", "-1", "Tất cả");
    } catch (e) {
        console.log(e);
    }
}
function load_lvbom(p, page) {
    try {
        f_checkAnHienCb_lsvb();
        var idvoi = localStorage.getItem("idvoiclick");
        
        var config = { namesql: "PKG_TKVOIBOM.THONGKEVOIBOM", callback: "f_result_lvboma", connstr: "ConnOracleXangDau" };
        var infotree = JSON.parse(localStorage.getItem('infotree'));
        var para = {
            v_code: infotree.code,
            v_fromdate: p.datefrom_lvoibom,
            v_todate: p.dateto_lvoibom,
            v_Mavoi: (idvoi == null || idvoi == undefined) ? p.cb_lvoibom : idvoi,
            v_Macot: (idvoi == null || idvoi == undefined) ? p.cbcot_voibom : -1,
            v_pagenum: page,
            v_numrecs: countPage,
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_lvboma(config, para, lst) {
    try {
        var data = lst.data;
        if (data == "[]" || data == null || data.length == 0) {
            try {   
                var p = getAllIdMod();
                $("#txt_tongtien").hide();
                messInfo("messinfo_lvoibom", "Không có dữ liệu hiển thị từ " + p.datefrom_lvoibom + " đến " + p.dateto_lvoibom, "error");
                        clearnul_lvbom();
                        return;
                    } catch (e) {
                        console.log(e);
                    }
        }
        //$('#btn_execl_lichsuatram').removeAttr('disabled');
        $("#txt_tongtien").show();
        messInfo("messinfo_lvoibom", "", "error");
        datload_lsvoibom(data);

    } catch (e) {
        console.log(e);
    }
}
function datload_lsvoibom(data) {
    try {
        
        $("#txt_tongtien_lvoibom").empty();
        $("#txt_tongtien_lvoibom").html(data[0].tongtien);
        $("#table_lvoibom").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td class='l'>"
                + setnull(val.tenvoibom) + "</td><td class='l'>"
                + setnull(val.tencot) + "</td><td class='r'>"
                + setnull(val.thoidiemdau) + "</td><td class='r'>"
                + setnull(val.thoidiemcuoi) + "</td><td class=''>"
                + setnull(val.tenbon) + "</td><td class='r'>"
                + setnull(val.solitban) + "</td><td class='r'>"
                + setnull(val.dongia) + "</td><td class='r'>"
                + setnull(val.thanhtien) + "</td></tr>";
              
            $("#table_lvoibom").append(row);
        });

        LoadPhanTrang("pageLst_lvoibom", "pageCurent_lvoibom", data, function () {
            var p = getAllIdMod();
            load_lichsutram(p, $("#pagenumber").val());
        });
    } catch (e) {
        console.log(e);
    }
}
function clearnul_lvbom() {
    try {
        $("#table_lvoibom").empty();
        $("#pageCurent_lvoibom").empty();
        $("#pageLst_lvoibom").empty();
    } catch (e) {
        console.log(e);
    }
}
function loaddanhsachexecl() {
    try {
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var config = {
            namesql: "THONGTINTRAM.LISTLICHSUTRAM",
            namefile: "Lich_su_cot_tram",
            connstr: "ConnOracleXangDau",
            userid: 1
        };
        var para = JSON.parse(localStorage.getItem("lichsutram"));
        para.v_numrecs = 1000000000000;
        var colum = {

            kq: [{ field: "stt", name: "STT", type: "TextAndBoldCenter" },
               { field: "tencot", name: "Tên cột", type: "TextAndBoldCenter" },
               { field: "thoidiemdau", name: "Thời điểm đầu", type: "TextAndBoldCenter" },
               { field: "thoidiemcuoi", name: "Thời điểm cuối", type: "TextAndBoldCenter" },
               { field: "tenxang", name: "Tên xăng", type: "TextAndBoldCenter" },
               { field: "solitban", name: "Số lít bán", type: "TextAndBoldCenter" },
               { field: "dongia", name: "Đơn giá", type: "TextAndBoldCenter" },
                { field: "thanhtien", name: "Thành tiền", type: "TextAndBoldCenter" },
                { field: "tentram", name: "Tên trạm", type: "TextAndBoldCenter" }
            ]
        };
        excuteExcel(config, para, colum, true);


    } catch (e) {
        console.log(e);
    }
}
function gettimenowweek() {
    try {
        var myDate = new Date();
        var t = new Date(myDate.getTime() - (60 * 60 * 24 * 7 * 1000));
        var d = t.getDate().toString().length == 1 ? "0" + t.getDate() : t.getDate();
        var m = (t.getMonth() + 1).toString().length == 1 ? "0" + (t.getMonth() + 1) : (t.getMonth() + 1);
        var y = t.getFullYear().toString().length == 1 ? "0" + t.getFullYear() : t.getFullYear();
        var tt = d + "/" + m + "/" + y;
        return tt;

    } catch (e) {
        //console.log(e);
        return "";
    }
}