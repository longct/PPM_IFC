var countPage = 10;
$(document).ready(function () {
    try {
 
        loadInitDate();

        Listsukien_lichsusk();
        setValToTxt("datefrom_lichsusk", gettimenow());
        setValToTxt("dateto_lichsusk", gettimenow());
        var p = getAllIdMod();
         load_lichsuchottram(p, 1);
        $("#btn_lichsusk").click(function () {
            try {
                var p = getAllIdMod();
                var check = checkoverday_lichsusk(p);
                if (check != "") {
                    messInfo("messinfo_lichsusk", check, "error");
                    clearnulllichsukien();
                    return;
                }
               load_lichsuchottram(p, 1);
            } catch (e) {
                console.log(e);
            }
        });

     
    } catch (e) {
        console.log(e);
    }
});

function f_loadChangeTree()
{
    var p = getAllIdMod();
    load_lichsuchottram(p, 1);
    Listsukien_lichsusk();
}

function checkoverday_lichsusk(p) {
    try {
        var compare = compareDates(timeyyyymmdd(p.datefrom_lichsusk), timeyyyymmdd(p.dateto_lichsusk));
        if (compare.days < 0)
            return "Từ ngày phải nhỏ hơn đến ngày";
        var ovderday = compareDates(new Date(), timeyyyymmdd(p.datefrom_lichsusk));
        if (ovderday.days > 0)
            return "Từ ngày không được chọn quá ngày hiện tại";
        var ovderday1 = compareDates(new Date(), timeyyyymmdd(p.dateto_lichsusk));
        if (ovderday1.days > 0)
            return "Đến ngày không được chọn quá ngày hiện tại";
        return "";
    } catch (e) {
        console.log(e);
    }
}
function Listsukien_lichsusk() {
    try{
        var config = { namesql: "THONGTINTRAM.LSTSUKIEN", callback: "f_result_lichsusklst", connstr: "ConnOracleXangDau" };
        var infotree = JSON.parse(localStorage.getItem('infotree'));
        var para =[];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_lichsusklst(config, para, lst) {
    try{
        var data = lst.data;
        if (data == "[]" || data == null || data.length == 0) return;
        dataToCob("cbcot_lichsucsk", data, "idsukien", "tensukien", "-1", "Tất cả");
    } catch (e) {
        console.log(e);
    }
}
function load_lichsuchottram(p, page) {
    try {
        var idvoi = localStorage.getItem("idvoiclick");
        var config = { namesql: "THONGTINTRAM.LISTLICHSUSK", callback: "f_result_lichsusk", connstr: "ConnOracleXangDau" };
        var infotree = JSON.parse(localStorage.getItem('infotree'));
        var para = {
            v_code: infotree.code,
            v_sukien: p.cbcot_lichsucsk,
            v_fromdate: p.datefrom_lichsusk,
            v_todate: p.dateto_lichsusk,
            v_pagenum: page,
            v_numrecs: countPage,
            v_mavoi: (idvoi ==null || idvoi ==undefined) ?-1 : idvoi
        };
       
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_lichsusk(config, para, lst) {
    try{
        var data = lst.data;
        if (data == "[]" || data == null || data.length == 0) {
            try {
                //$('#btn_lichsuchot_execl').attr('disabled', 'disabled');
                var p = getAllIdMod();
                     
                messInfo("messinfo_lichsusk", "Không có dữ liệu hiển thị từ " + p.datefrom_lichsusk + " đến " + p.dateto_lichsusk, "error");
                clearnulllichsukien();
                        return;
                    } catch (e) {
                        console.log(e);
                    }
        }
        messInfo("messinfo_lichsusk", "", "error");
        datloadlichsusk(data);

    } catch (e) {
        console.log(e);
    }
}
function datloadlichsusk(data) {
    try {
     
        $("#table_lichsusk").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td class='r'>"
                + setnull(val.imei) + "</td><td class='l'>"
                + setnull(val.tensukien) + "</td><td class='r'>"
                + setnull(val.thoidiembatdau) + "</td><td class='r'>"
                + setnull(val.giatri) + "</td><td>"
                + setnull(val.matram) + "</td></tr>";
            $("#table_lichsusk").append(row);
        });
        LoadPhanTrang("pageLst_lichsusk", "pageCurent_lichsusk", data, function () {
            var p = getAllIdMod();
            load_lichsuchottram(p, $("#pagenumber").val());
        });
    } catch (e) {
        console.log(e);
    }
}

function clearnulllichsukien() {
    try {
        $("#table_lichsusk").empty();
        $("#pageLst_lichsusk").empty();
        $("#pageCurent_lichsusk").empty();
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