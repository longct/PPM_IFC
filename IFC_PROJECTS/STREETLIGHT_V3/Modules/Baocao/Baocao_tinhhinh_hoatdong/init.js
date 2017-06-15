var countpage = 10;
$(document).ready(function () {
    try {

        loadInitDate();
        loadContent();
        //alert(gettimenow_b4(-30));
        $('#txt_ngayfrom').datepicker({
            format: 'dd/mm/yyyy',
            startDate: gettimenow_b4(-30),
        });
        $('#txt_ngayto').datepicker({
            format: 'dd/mm/yyyy',
        });

        $("#txt_ngayfrom").val(gettimenow());
        $("#txt_ngayto").val(gettimenow());
        $("#btn_thuchien").click(function () {
            f_load_thongke();
        });

        $('.close').click(function () {
            $('#div_baocao_tinhhinh').hide();
        });

        $("#btn_showprint").click(function () {
            PrintElem('div_baocao_tinhhinh');
        });


        // loadhigchart();
    } catch (e) {
        console.log(e);
    }

});

function PrintElem(elem) {
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');


    mywindow.document.write('<html><head><title></title>');

    mywindow.document.write('</head><body >');
    mywindow.document.write('<h1></h1>');
    mywindow.document.write(document.getElementById(elem).innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;

}

function f_load_thongke() {
    try {
        var item_selected = JSON.parse(localStorage.getItem("item_selected"));
        var v_code = "";
        var v_type = "";
        var v_parent = "";
        if (item_selected.type.toLowerCase() == "tu") {
            v_code = item_selected.id;
            v_parent = item_selected.parent;
            v_type = "tu";
        }
        if (item_selected.type.toLowerCase() == "quan") {
            v_code = item_selected.id;
            v_parent = item_selected.id;
            v_type = "quan";
        }
        if (item_selected.type.toLowerCase() == "bong") {
            v_type = "bong";
            v_code = item_selected.id;
            v_parent = "01";
        }

        var p = getAllIdMod();
        var config = { namesql: "PKG_BAOCAO.BC_TINHHINH_HOATDONG2", callback: "f_result_BC_TINHHINH_HOATDONG", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_code: v_code,
            v_parent: v_parent,
            v_type: v_type,
            v_datefrom: p.txt_ngayfrom,
            v_dateto: p.txt_ngayto,
            v_pagenum: 0,
            v_numrecs: 1000000,
        };
       
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}

function f_result_BC_TINHHINH_HOATDONG(config, para, lst) {
    try {
        var data = lst.data;
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            $('#div_baocao_tinhhinh').hide();
            showToast("Không tìm thấy bản ghi nào", "error");
            return;
        }
        var p = getAllIdMod();
        $('#lbl_fromDate_toDate').html('Từ ngày: ' + p.txt_ngayfrom + ' đến ngày: ' + p.txt_ngayto);
        $('#lbl_tenquan').html(data[0].tuyen_duong.toUpperCase());
        $('#div_baocao_tinhhinh').show();
        $("#tbl_tinhhinh_hoatdong").html("");
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + setnull(val.tuyen_duong) + "</td><td>"
                + setnull(val.quan_huyen) + "</td><td>"
                + setnull(val.tu_dieukien) + "</td><td>"
                + setnull(val.tenbong) + "</td><td>"
                + setnull(val.diachi) + "</td><td style='text-align: center'>"
                + setnull(val.trangthaibong) + "</td><td style='text-align: center'>"
                + setnull(val.thoidiembong) + "</td><td></td></tr>"

            ;
            $("#tbl_tinhhinh_hoatdong").append(row);
        });
    } catch (e) {
        console.log(e);
    }
}
