var countpage = 10;
$(document).ready(function () {
    try {
        loadchecklog_master();
        initformelement();
        setValToTxt("txt_tungay_dnht", gettimenow());
        setValToTxt("txt_denngay_dnht", gettimenow());
        f_lay_danh_sach_khach_hang_tk();
         thongkednht(1);
        $("#btn_searchHD").on("click", function () {
            var check = check_dnht();
            if (check != "") {
                messInfo("messinfo_dnht", check, 'error');
                return;
            }
            $("#anhload").show();
            thongkednht(1);
        });
       
    } catch (e) {
        console.log(e);
    }

});

function thongkednht(page) {
    try {
        var p = getAllIdMod();
        var config = { connstr: "Oracle_HDDT", namesql: "HD_THONGKEGUIMAIL.THONGKEDANGNHAPHETHONG", callback: "result_thongkedangnhaphethong" };
        var para = {
            v_tungay: p.txt_tungay_dnht,
            v_denngay: p.txt_denngay_dnht,
            v_tukhoa: p.txt_tenkhachang_dnht,
            v_pagenum: page,
            v_numrecs: countpage
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function result_thongkedangnhaphethong(config, para, lst) {
    try {
        $("#anhload").hide();
        $("#table_thongke_dnht").empty();
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            if ($("#txt_tenkhachang_dnht").val() == "") {
                messInfo("messinfo_dnht", "Không có khách hàng nào đăng nhập", 'error');
            } else {
                messInfo("messinfo_dnht", "Khách hàng " + $("#txt_tenkhachang_dnht").val() + " chưa đăng nhập vào hệ thống", 'error');
            }
           
            clecar_tkmail();
            return;
        }
       
        messInfo("messinfo_dnht", "", 'error');
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + setnull(val.ten) + "</td><td>"
                + setnull(val.socongto) + "</td><td>"
                + setnull(val.usercode) + "</td><td  class='c'>"
                + setnull(val.solanlogin) + "</td><td class='c'>"
                + setnull(val.thoidiemlogin) + "</td></tr>";
            $("#table_thongke_dnht").append(row);

        });

        LoadPhanTrang("pageLst_lsttdnht", "pageCurent_lsttdnht", data, function () {
            thongkednht($("#pagenumber").val());
        });

    } catch (e) {
        console.log(e);
    }
}

function clecar_tkmail() {
    try {
        $("#table_thongke_tkmaihd").empty();
        $("#pageCurent_lsttkhd").empty();
        $("#pageLst_lsttbhd").empty();
    } catch (e) {
        console.log(e);
    }
}
function check_dnht() {
    try {
        var p = getAllIdMod();
        var ovderday = compareDates(new Date(), timeyyyymmdd(p.txt_tungay_dnht));
        if (ovderday.days > 0)
            return "Từ ngày không được chọn quá ngày hiện tại";
        var ovderday1 = compareDates(new Date(), timeyyyymmdd(p.txt_denngay_dnht));
        if (ovderday1.days > 0)
            return "Đến ngày không được chọn quá ngày hiện tại";
        var compare = compareDates(timeyyyymmdd(p.txt_tungay_dnht), timeyyyymmdd(p.txt_denngay_dnht));
        if (compare.days < 0)
            return "Từ ngày phải nhỏ hơn đến ngày";

        return "";

    } catch (e) {
        console.log(e);
    }
}

function f_lay_danh_sach_khach_hang_tk() {
    try {
        var config = { namesql: "HD_THONGKEGUIMAIL.DANHSACHUSER", callback: "f_result_danhsachuser_tk", connstr: "Oracle_HDDT" };
        var para = {};
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_danhsachuser_tk(config, para, data) {


    var dskh = data.data;
    var nameArr = [];
    nameArr.length = 0;
    $.each(dskh, function (key, val) {
        nameArr.push({
            label: val.tenkhachhang + ' - ' + val.makhachhang + ' - ' + val.socongto,
            value: val.tenkhachhang,
            id: val.usercode,
        });
    });
    $("#txt_tenkhachang_dnht").autocomplete({
        minLength: 1,
        delay: 200,
        source: nameArr
       
    });

}