var countPage = 10;
var count = 0;
var loi = 0;
$(document).ready(function () {
    try {
        loadInitDate();

        lstcot_chotvoi();
        Lst_chotvoi();
        setValToTxt("datefrom_lichsuchot", gettimenow());
        setValToTxt("dateto_lichsuchot", gettimenow());
        var p = getAllIdMod();
        load_lichsuchottram(p, 1);
        $("#btn_lichsuchot").click(function () {
            try {
                var p = getAllIdMod();
                var check = checkoverday_lichsuchottram(p);
                if (check != "") {
                    messInfo("messinfo_lichsuchottram", check, "error");
                    clearnullchottram();
                    return;
                }
                load_lichsuchottram(p, 1);
            } catch (e) {
                console.log(e);
            }
        });
        $("#cbcot_lichsuchot").change(function () {
            Lst_chotvoi();
        });
       
        $("#btn_cachot").click(function () {
            capnhatchitiet_cachot();
        });
      
    } catch (e) {
        console.log(e);
    }
});

function f_checkAnHienCb_lsct()
{
    var idvoi = localStorage.getItem("idvoiclick");
    if (idvoi == null || idvoi == undefined)
        //$(".cb_voibom_lsct").css("display", "block");
        //console.log(idvoi);
    var a;
    else
        $(".cb_voibom_lsct").css("display", "none");
}
function f_loadchotbom1VoiBom_lsct() {
    try {
        var p = getAllIdMod();       
        load_lichsuchottram(p, 1);
    } catch (e) { console.log(e); }
}
function f_loadChangeTree()
{
    var p = getAllIdMod();
    load_lichsuchottram(p, 1);
    Listcot_lichsutramchot();

}

function checkoverday_lichsuchottram(p) {
    try {
        var compare = compareDates(timeyyyymmdd(p.datefrom_lichsuchot), timeyyyymmdd(p.dateto_lichsuchot));
        if (compare.days < 0)
            return "Từ ngày phải nhỏ hơn đến ngày";
        var ovderday = compareDates(new Date(), timeyyyymmdd(p.datefrom_lichsuchot));
        if (ovderday.days > 0)
            return "Từ ngày không được chọn quá ngày hiện tại";
        var ovderday1 = compareDates(new Date(), timeyyyymmdd(p.dateto_lichsuchot));
        if (ovderday1.days > 0)
            return "Đến ngày không được chọn quá ngày hiện tại";
        return "";
    } catch (e) {
        console.log(e);
    }
}
function lstcot_chotvoi() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "PKG_LSTCOMBOX.LSTCOT", callback: "f_result_lstcot_chotvoi", connstr: "ConnOracleXangDau" };
        var para = { v_Code: '' };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_lstcot_chotvoi(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cbcot_lichsuchot", data, "id", "name", "-1", "Tất cả");

    } catch (e) {
        console.log(e);
    }
}

function Lst_chotvoi() {
    try {

        var config = { namesql: "PKG_LSTCOMBOX.LST_VOIBOM", callback: "f_result_Lst_chotvoi", connstr: "ConnOracleXangDau" };
        var p = getAllIdMod();
        var para = { v_code: p.cbcot_lichsuchot };

        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_Lst_chotvoi(config, para, lst) {
    try {
        var data = lst.data;
        if (data == "[]" || data == null || data.length == 0) return;
        dataToCob("cbvoi_lichsuchot", data, "id", "name", "-1", "Tất cả");
    } catch (e) {
        console.log(e);
    }
}

function load_lichsuchottram(p, page) {
    try {
        f_checkAnHienCb_lsct();
        var idvoi = localStorage.getItem("idvoiclick");
       
        var config = { namesql: "PKG_TKCHOT.TKCHOT", callback: "f_result_lichsuchottram", connstr: "ConnOracleXangDau" };
        var infotree = JSON.parse(localStorage.getItem('infotree'));
        var para = {
            v_code: infotree.code,
            v_Macot: (idvoi == null || idvoi == undefined) ? p.cbcot_lichsuchot : -1,
            v_Mavoi: (idvoi == null || idvoi == undefined) ? p.cbvoi_lichsuchot:idvoi,
            v_datefrom: p.datefrom_lichsuchot,
            v_dateto: p.dateto_lichsuchot,
            v_pagenum: page,
            v_numrecs: countPage,
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_lichsuchottram(config, para, lst) {
    try{
        var data = lst.data;
        if (data == "[]" || data == null || data.length == 0) {
            try {
                var p = getAllIdMod();
                        $("#txt_lichsuchottd").hide();
                        messInfo("messinfo_lichsuchottram", "Không có dữ liệu hiển thị từ " + p.datefrom_lichsuchot + " đến " + p.dateto_lichsuchot, "error");
                        clearnullchottram();
                        return;
                    } catch (e) {
                        console.log(e);
                    }
        }
       
        $("#txt_lichsuchottd").show();
        messInfo("messinfo_lichsuchottram", "", "error");
        datloadlichsuchottram(data);

    } catch (e) {
        console.log(e);
    }
}
function datloadlichsuchottram(data) {
    try {
        $("#txt_lichsuchottram").empty();
        $("#txt_lichsuchottram").html(data[0].tongtienthat);
        $("#table_lichsuchottram").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr  id_auto='" + val.id_auto + "'><td>"
                + val.stt + "</td><td class='l'>"
                + setnull(val.tenvoibom) + "</td><td class='r'>"
                + setnull(val.thoidiemchot) + "</td><td class='r'>"
                + setnull(val.tonglit) + "</td><td class='r'>"
                + setnull(val.tongtiena) + "</td><td>"
                + setnull(val.tenbon) + "</td><td>"
                + "<select class='form-control input-sm m-bot15 cbchitiet_catrucchot " + val.catruc + "' value='" + val.catruc + "'> </select>" + "</td> <td>"
                + "<select class='form-control input-sm m-bot15 cbchitiet_nhanvien " + val.idnhanvien + "' value='" + val.idnhanvien + "'> </select>" + "</td> </tr>";
            $("#table_lichsuchottram").append(row);



          
            loadchitiet_catruchot();
            loadchitiet_nhavien();
            // loadchitietvoi();

            // đổ ra list combox
            setTimeout(function () {
                $('.cbchitiet_catrucchot').each(function () {
                    $(".cbchitiet_catrucchot." + $(this).attr("value") + " ").val($(this).attr("value"));
                });
                $('.cbchitiet_nhanvien').each(function () {
                    $(".cbchitiet_nhanvien." + $(this).attr("value") + " ").val($(this).attr("value"));
                });

            }, 300);
        });
        LoadPhanTrang("pageLst_lichsutram", "pageCurent_lichsutram", data, function () {
            var p = getAllIdMod();
            load_lichsuchottram(p, $("#pagenumber").val());
        });
    } catch (e) {
        console.log(e);
    }
}
function clearnullchottram() {
    try {
        $("#table_lichsuchottram").empty();
        $("#pageLst_lichsutram").empty();
        $("#pageCurent_lichsutram").empty();
    } catch (e) {
        console.log(e);
    }
}

function loadchitiet_catruchot() {
    try {
        var config = { namesql: "PKG_CAKIP.LISTCATTRUCTRAM", callback: "f_result_loadchitiet_catruchot", connstr: "ConnOracleXangDau" };
        var infotree = JSON.parse(localStorage.getItem('infotree'));
        var para = {
            v_code: infotree.code
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadchitiet_catruchot(config, para, lst) {
    try {
        var data = lst.data;
        dataToCobClass("cbchitiet_catrucchot", data, "id_maca", "tenca", "-1", "Chọn ca");
    } catch (e) {
        console.log(e);
    }
}
// load
function loadchitiet_nhavien() {
    try {
        var config = { namesql: "PKG_TKCHOT.LST_NHANVIEN", callback: "f_result_loadchitiet_nhavien", connstr: "ConnOracleXangDau" };
        var infotree = JSON.parse(localStorage.getItem('infotree'));
        var para = {
            v_code: infotree.code
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadchitiet_nhavien(config, para, lst) {
    try {
        var data = lst.data;
        dataToCobClass("cbchitiet_nhanvien", data, "manv", "tennhanvien", "-1", "Chọn nhân viên");
    } catch (e) {
        console.log(e);
    }
}



///cap nhat
function capnhatchitiet_cachot() {
    try {

        var paraa = [];
        $('#table_lichsuchottram tr').each(function () {
            var info = { id_auto: $(this).attr("id_auto"), catruc: $(this).find('.cbchitiet_catrucchot').first().val(), idnhavien: $(this).find('.cbchitiet_nhanvien').first().val() };
            paraa.push(info);
        });

        for (var i = 0; i < paraa.length; i++) {
            var config = { namesql: "PKG_TKCHOT.CAPNHATCACHOT", callback: "f_result_capnhatchitiet_cachota", connstr: "ConnOracleXangDau" };

            var para = {
                v_IDAUTO: paraa[i].id_auto,
                v_CATRUC: paraa[i].catruc,
                v_IDNHANVIEN: paraa[i].idnhavien
            };
           ExecuteServiceSyns(config, para);
        }


    } catch (e) {
        console.log(e);
    }
}

function f_result_capnhatchitiet_cachota(config, para, lst) {
    try {
      
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            count++;
            
            messInfo("messinfo_lichsuchottram", row +' ' + count +' bản ghi', "ok");

        } else {
            loi++
            messInfo("messinfo_lichsuchottram", row +' '+ loi + ' bản ghi', "error");
        }
    } catch (e) {
        console.log(e);
    }
}


function loadlichsuchottram() {
    try{
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var config = {
            namesql: "THONGTINTRAM.LICHCHOTTRAM",
            namefile: "Lich_su_chot_tram",
            connstr: "ConnOracleXangDau",
            userid: 1
        };
        var para = JSON.parse(localStorage.getItem("lichsuchotram"));
        para.v_numrecs = 100000000000;
        var colum = {

            kq: [{ field: "stt", name: "STT", type: "TextAndBoldCenter" },
               { field: "tencot", name: "Tên cột", type: "TextAndBoldCenter" },
               { field: "thoidiemchot", name: "Thời điểm chốt", type: "TextAndBoldCenter" },
               { field: "tonglit", name: "Tổng lít", type: "TextAndBoldCenter" },
               { field: "tongtien", name: "Tổng tiền", type: "TextAndBoldCenter" },
               { field: "tenbon", name: "Tên bồn", type: "TextAndBoldCenter" },
               { field: "tentram", name: "Tên trạm", type: "TextAndBoldCenter"}
            ]
        };
        excuteExcel(config, para, colum, true);

    } catch (e) {
        console.log(e);
    }
}