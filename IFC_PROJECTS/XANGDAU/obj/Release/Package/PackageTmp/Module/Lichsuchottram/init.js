var countPage = 10;
$(document).ready(function () {
    try {
        loadInitDate();

        Listcot_lichsutramchot();
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
                    return;
                }
                load_lichsuchottram(p, 1);
            } catch (e) {
                console.log(e);
            }
        });
        //$("#btn_lichsuchot_execl").click(function () {
        //    loadlichsuchottram();
        //});
      
    } catch (e) {
        console.log(e);
    }
});

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
function Listcot_lichsutramchot() {
    try{
        var config = { namesql: "THONGTINTRAM.LISTCOTTRAM", callback: "f_result_listcotchot", connstr: "ConnOracleXangDau" };
        var infotree = JSON.parse(localStorage.getItem('infotree'));
        var para = { v_code: infotree.code };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_listcotchot(config, para, lst) {
    try{
        var data = lst.data;
        dataToCob("cbcot_lichsuchot", data, "ma_cot", "tencot", "-1", "Tất cả");
    } catch (e) {
        console.log(e);
    }
}
function load_lichsuchottram(p, page) {
    try {
        var config = { namesql: "THONGTINTRAM.LICHCHOTTRAM", callback: "f_result_lichsuchottram", connstr: "ConnOracleXangDau" };
        var infotree = JSON.parse(localStorage.getItem('infotree'));
        var para = {
            v_matram: infotree.code,
            v_macot: p.cbcot_lichsuchot,
            v_tungay: p.datefrom_lichsuchot,
            v_denngay: p.dateto_lichsuchot,
            v_userid: '',
            v_pagenum: page,
            v_numrecs: countPage,
        };
        localStorage.setItem("lichsuchotram", JSON.stringify(para));
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
                //$('#btn_lichsuchot_execl').attr('disabled', 'disabled');
                var p = getAllIdMod();
                        $("#txt_lichsuchottd").hide();
                        messInfo("messinfo_lichsuchottram", "Không có dữ liệu hiển thị từ " + p.datefrom_lichsuchot + " đến " + p.dateto_lichsuchot, "error");
                        $("#table_lichsuchottram").empty();
                        return;
                    } catch (e) {
                        console.log(e);
                    }
        }
        //$('#btn_lichsuchot_execl').removeAttr('disabled');
        $("#txt_lichsuchottd").show();
        messInfo("messinfo_lichsuchottram", "", "error");
        datloadlichsuchottram(data);

    } catch (e) {
        console.log(e);
    }
}
function datloadlichsuchottram(data) {
    try {
     
        //$("#txt_lichsuchottram").empty();
        //$("#txt_lichsuchottram").html(numberformat(data[0].tongtien));
        $("#table_lichsuchottram").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + val.tencot + "</td><td>"
                + val.thoidiemchot + "</td><td>"
                + numberformat(val.tonglit) + "</td><td>"
                + numberformat(val.tongtien) + "</td><td>"
                + val.tenbon + "</td><td>"
                + val.tentram + "</td></tr>";
            $("#table_lichsuchottram").append(row);
        });
        LoadPhanTrang("pageLst_lichsutram", "pageCurent_lichsutram", data, function () {
            var p = getAllIdMod();
            load_lichsuchottram(p, $("#pagenumber").val());
        });
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