var countpage = 10;
$(document).ready(function () {
    try {

        loadInitDate();
        loadContent();
        $("#txt_ngayfrom").val(gettimenow());
        $("#txt_ngayto").val(gettimenow());
        $("#btn_thuchien").click(function () {
            f_load_thongke();
        });
        // loadhigchart();
    } catch (e) {
        console.log(e);
    }

});

function f_load_thongke() {
    try {
        alert(JSON.parse(localStorage.getItem("quan"))[0]);
        if (JSON.parse(localStorage.getItem("quan"))[0] == undefined || JSON.parse(localStorage.getItem("quan"))[0] == "") {
            showToast("Vui lòng chọn quận để xem báo cáo", "error");
        }
        var p = getAllIdMod();
        var config = { namesql: "PKG_BAOCAO.BC_TINHHINH_HOATDONG", callback: "f_result_BC_TINHHINH_HOATDONG", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_code: JSON.parse(localStorage.getItem("quan"))[0],
            v_datefrom: p.txt_ngayfrom,
            v_dateto: p.txt_ngayto,
            v_pagenum: 0,
            v_numrecs: 1000000,
        };
        console.log(para);
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}

function f_result_BC_TINHHINH_HOATDONG(config, para, lst) {
    try {
        var data = lst.data;
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            return;
        }
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + setnull(val.tuyen_duong) + "</td><td>"
                + setnull(val.quan_huyen) + "</td><td>"
                + setnull(val.tu_dieukien) + "</td><td>"
                + setnull(val.tenbong) + "</td><td>"
                + setnull(val.diachi) + "</td><td>"
                + setnull(val.trangthaibong) + "</td><td>"
                + setnull(val.thoidiembong) + "</td><td>"
                + setnull(val.tenbong) + "</td></tr>"

            ;
            $("#tbl_tinhhinh_hoatdong").append(row);
        });
    } catch (e) {
        console.log(e);
    }
}
