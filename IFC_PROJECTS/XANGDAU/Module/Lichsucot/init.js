var countPage = 10;
var macot_lichsucot;

$(document).ready(function () {
    try {
        loadInitDate();
        setValToTxt("datefrom_lichsutramct", gettimenow());
        setValToTxt("dateto_lichsutramct", gettimenow());
        $("#btn_lichsutramct").click(function () {
            try {
                var p = getAllIdMod();
                var check = checkoverday_lichsutramct(p);
                if (check != "") {
                    messInfo("messinfo_lichsutramct", check, "error");
                    clearnullcottramct();
                    return;
                }
                load_lichsutramct(macot_lichsucot, p, 1);
            } catch (e) {
                console.log(e);
            }
        });

        $('#pagenumber').on('keypress', function (event) {
            if (event.which === 13) {
                alert("trang " + $(this).val());
            }
        });
      
    } catch (e) {
        console.log(e);
    }
});

function checkoverday_lichsutramct(p) {
    try {
        var compare = compareDates(timeyyyymmdd(p.datefrom_lichsutramct), timeyyyymmdd(p.dateto_lichsutramct));
        if (compare.days < 0)
            return "Từ ngày phải nhỏ hơn đến ngày";
        var ovderday = compareDates(new Date(), timeyyyymmdd(p.datefrom_lichsutramct));
        if (ovderday.days > 0)
            return "Từ ngày không được chọn quá ngày hiện tại";
        var ovderday1 = compareDates(new Date(), timeyyyymmdd(p.dateto_lichsutramct));
        if (ovderday1.days > 0)
            return "Đến ngày không được chọn quá ngày hiện tại";
        return "";
    } catch (e) {
        console.log(e);
    }
}


function f_ChuyenTrangLoadLichSuCot(macot)
{
    var p = getAllIdMod();
    macot_lichsucot = macot;
    load_lichsutramct(macot_lichsucot, p, 1)
}

function load_lichsutramct(macot,p, page) {
    try {
        var config = { namesql: "THONGTINTRAM.LISTLICHSUTRAM", callback: "f_result_lichsutramct", connstr: "ConnOracleXangDau" };
        var infotree = JSON.parse(localStorage.getItem('infotree'));
        var para = {
          v_Code:infotree.code,
          v_Cot: macot,
          v_dFrom:p.datefrom_lichsutramct,
          v_dTo: p.dateto_lichsutramct,
          v_userid:'',
          v_pagenum:page,
          v_numrecs: countPage,
        };
        ExecuteServiceSyns(config, para);
       

    } catch (e) {
        console.log(e);
    }
}
function f_result_lichsutramct(config, para, lst) {
    try{
        var data = lst.data;
        if (data == "[]" || data == null || data.length == 0) {
            try {
                //$('#btn_lichsuexecl').attr('disabled', 'disabled');
                        var p = getAllIdMod();
                        $("#txt_tongtientramct").hide();
                        messInfo("messinfo_lichsutramct", "Không có dữ liệu hiển thị từ " + p.datefrom_lichsutramct + " đến " + p.dateto_lichsutramct, "error");
                        clearnullcottramct();
                        return;
                    } catch (e) {
                        console.log(e);
                    }
        }
        $("#txt_tongtientramct").show();
        messInfo("messinfo_lichsutramct", "", "error");
        datloadlichsutramct(data);

    } catch (e) {
        console.log(e);
    }
}
function datloadlichsutramct(data) {
    try {
        $("#txt_tongtien_lichsutramct").empty();
        $("#txt_tongtien_lichsutramct").html(numberformat(data[0].tongtien));
        $("#table_lichsutramct").empty();
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
            $("#table_lichsutramct").append(row);
        });
        LoadPhanTrang("pagecurent_lichsutramct", "txt_plichsutramct", data, function () {
            var p = getAllIdMod();
            load_lichsutramct(macot_lichsucot, p, $("#pagenumber").val());
           
        });

    } catch (e) {
        console.log(e);
    }
}
function clearnullcottramct() {
    try {
        $("#table_lichsutramct").empty();
        $("#pagecurent_lichsutramct").empty();
        $("#txt_plichsutramct").empty();
    } catch (e) {
        console.log(e);
    }
}