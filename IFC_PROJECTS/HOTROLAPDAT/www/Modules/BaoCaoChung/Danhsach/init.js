$(document).ready(function () {
    try {
        loadContent();
        //$(".datepicker").click(show);
        var sheight = $(window).height();
        var swidth = $(window).width();
        $(".tbl_view_xuly").css("height", sheight - 230);
        $('.date').datepicker({ dateFormat: "dd-mm-yy" });
        $("#txt_tungay").datepicker().datepicker("setDate", "-1m");
        $("#txt_denngay").datepicker().datepicker("setDate", "0");
        localStorage.setItem("tungay", $("#txt_tungay").val());
        localStorage.setItem("denngay", $("#txt_denngay").val());
        $("#txt_tungay").change(function () {
            localStorage.setItem("tungay", $("#txt_tungay").val());
        });
        $("#denngay").change(function () {
            localStorage.setItem("denngay", $("#txt_denngay").val());
        });
        $("#btn_thuchien_xuly").click(function () {
            Get_Danhsach();
            //sendMail(content);
        })
        Get_Danhsach();

    } catch (e) {
        console.log(e);
    }
});
function Get_Danhsach() {
    var user = JSON.parse(localStorage.getItem("userinfo")).tendangnhap;
    var config = { connstr: "Oracle_HTLAPDAT", namesql: "HT_THONGTINDIEMDO.GET_DSLOI" };
    var tungay = localStorage.getItem("tungay");
    var denngay = localStorage.getItem("denngay");
    var para = {
        v_nguoigui: user,
        v_from: tungay,
        v_to: denngay,
        v_page: 0,
        v_numr: 20,
    };
    console.log(para);
    var lst = ExecuteServiceSyns(config, para);
    console.log(lst);
    var ds = lst.data;
    localStorage.setItem("ds", JSON.stringify(ds));
    $(".data_sum").html("Có " + ds.length + " điểm phát sinh lỗi");
    $('#tbl_data_xuly tbody').empty();
    var tr = "";
    $.each(ds, function (key, val) {
        tr += '<tr>' +
                        '<td class="r1">' + (key + 1) + '</td>' +
                        '<td class="r1">' + val.imei + '</td>' +
                        '<td class="r1">';
        if (val.trangthai == "LOIMOI") tr += convert_Date(val.ngaygui);
        else tr += convert_Date(val.ngaycapnhat);
        tr += '</td>' +
                        '<td class="r1">' + convert_status(val.trangthai) + '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td colspan="4" class="noidung">' + replaceNULL(val.chitietloi) + '</td>' +
                    '</tr>';
    })

    $('#tbl_data_xuly tbody').append(tr);
}
function convert_Date(d) {
    var d_c = d.replace("T00:00:00", "");
    var d_a = d_c.split("-");
    return d_a[2] + "/" + d_a[1] + "/" + d_a[0];
}
function convert_status(t) {
    if (t == 'LOIMOI') return t = 'Lỗi mới';
    else if (t == 'CAPNHAT') return t = 'Cập nhật';
    else if (t == 'DAXULY') return t = 'Đã xử lý';
}
function replaceNULL(b) {
    if (b == null) return "-";
    else return b;
}