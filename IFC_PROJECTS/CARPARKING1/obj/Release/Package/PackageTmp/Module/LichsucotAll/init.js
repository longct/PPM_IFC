var countPage = 9;
$(document).ready(function () {
    try {
     //   loadConetent();
        loadInitDate();
        Listcot_lichsutram();
      
        setValToTxt("datefrom_lichsutram", gettimenow());
        setValToTxt("dateto_lichsutram", gettimenow());
        var p = getAllIdMod();
        load_lichsutram(p, 1);
        $("#btn_lichsutram").click(function () {
            try {
                var p = getAllIdMod();
                var check = checkoverday_lichsutram(p);
                if (check != "") {
                    messInfo("messinfo_lichsutram", check, "error");
                    return;
                }
                load_lichsutram(p, 1);
            } catch (e) {
                console.log(e);
            }
        });
        //$("#btn_execl_lichsuatram").click(function () {
        //    loaddanhsachexecl();
        //});


        $('#pagenumber').on('keypress', function (event) {
            if (event.which === 13) {
                alert("trang " + $(this).val());
            }
        });
      
    } catch (e) {
        console.log(e);
    }
});

function f_loadChangeTree() {
    var p = getAllIdMod();
    load_lichsutram(p, 1);
    Listcot_lichsutram();
}

function checkoverday_lichsutram(p) {
    try {
        var compare = compareDates(timeyyyymmdd(p.datefrom_lichsutram), timeyyyymmdd(p.dateto_lichsutram));
        if (compare.days < 0)
            return "Từ ngày phải nhỏ hơn đến ngày";
        var ovderday = compareDates(new Date(), timeyyyymmdd(p.datefrom_lichsutram));
        if (ovderday.days > 0)
            return "Từ ngày không được chọn quá ngày hiện tại";
        var ovderday1 = compareDates(new Date(), timeyyyymmdd(p.dateto_lichsutram));
        if (ovderday1.days > 0)
            return "Đến ngày không được chọn quá ngày hiện tại";
        return "";
    } catch (e) {
        console.log(e);
    }
}
function Listcot_lichsutram() {
    try {
       
        var config = { namesql: "THONGTINTRAM.LISTCOTTRAM", callback: "f_result_listcot", connstr: "ConnOracleXangDau" };
        var infotree = JSON.parse(localStorage.getItem('infotree'));
        var para = { v_code: infotree.code };
       
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_listcot(config, para, lst) {
    try {
       
        var data = lst.data;
        dataToCob("cbcot_lichsutram", data, "ma_cot", "tencot", "-1", "Tất cả");
    } catch (e) {
        console.log(e);
    }
}


function load_lichsutram(p, page) {
    try {
        var config = { namesql: "THONGTINTRAM.LISTLICHSUTRAM", callback: "f_result_lichsutram", connstr: "ConnOracleXangDau" };
        var infotree = JSON.parse(localStorage.getItem('infotree'));
        var para = {
          v_Code:infotree.code,
          v_Cot: p.cbcot_lichsutram,
          v_dFrom:p.datefrom_lichsutram,
          v_dTo: p.dateto_lichsutram,
          v_userid:'',
          v_pagenum:page,
          v_numrecs: countPage,
        };
        localStorage.setItem("lichsutram", JSON.stringify(para));
        ExecuteServiceSyns(config, para);
       

    } catch (e) {
        console.log(e);
    }
}
function f_result_lichsutram(config, para, lst) {
    try {
       
        var data = lst.data;
        if (data == "[]" || data == null || data.length == 0) {
            try {
                //$('#btn_execl_lichsuatram').attr('disabled', 'disabled');
                var p = getAllIdMod();
                        $("#txt_tongtientram").hide();
                        messInfo("messinfo_lichsutram", "Không có dữ liệu hiển thị từ " + p.datefrom_lichsutram + " đến " + p.dateto_lichsutram, "error");
                        $("#table_lichsutram").empty();
                        return;
                    } catch (e) {
                        console.log(e);
                    }
        }
        //$('#btn_execl_lichsuatram').removeAttr('disabled');
        $("#txt_tongtientram").show();
        messInfo("messinfo_lichsutram", "", "error");
        datloadlichsutram(data);

    } catch (e) {
        console.log(e);
    }
}
function datloadlichsutram(data) {
    try {
       
        $("#txt_tongtien_lichsutram").empty();
        $("#txt_tongtien_lichsutram").html(numberformat(data[0].tongtien));
        $("#table_lichsutram").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + val.tencot + "</td><td>"
                + val.thoidiemdau + "</td><td>"
                + val.thoidiemcuoi + "</td><td>"
                + val.tenxang + "</td><td>"
                + val.solitban + "</td><td>"
                + numberformat(val.dongia) + "</td><td>"
                + numberformat(val.thanhtien) + "</td><td>"
                + val.tentram + "</td></tr>";
            $("#table_lichsutram").append(row);
        });

        LoadPhanTrang("pageLst", "pageCurent", data, function () {
            var p = getAllIdMod();
            load_lichsutram(p, $("#pagenumber").val());
        });
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