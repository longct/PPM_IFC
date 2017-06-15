var i = 0;
$(document).ready(function () {
    try {
        loadchecklog_master();

        $("#addHtml_apgia").append(addHtml_Dktdtd(i));
        lstnhomkh_hdkh();
        $("#btnThem_apgia").click(function () {
            var check = checkvalidate();
            if (check != "") {
                messInfo("messinfo_apgia", check, 'error');
                return;
            }
            messInfo("messinfo_apgia", '', 'error');
            $("#btnRemove_apgia").removeAttr('disabled');
            i += 1;
            $("#addHtml_apgia").append(addHtml_Dktdtd(i));
            lstnhomkh_hdkh();
        });

        $("#cb_giatri_Ag" + i).change(function () {
            if ($('#cb_giatri_Ag' + i).val() != "-1") {
                $('#btnThem_apgia').removeAttr('disabled');
            } else {
                $("#btnThem_apgia").attr('disabled', 'disabled');
            }
        });
        $('#btnRemove_apgia').click(function () {
            $('#btnThem_apgia').removeAttr('disabled');
            var row = ($('#addHtml_apgia tr').length);
            if (row == 1) {
                $("#btnRemove_apgia").attr('disabled', 'disabled');
            } else {
                $('#row' + i).remove();
                i--;
            }
        });

        $("#btCapnhat_ap").click(function () {
            var check = checkcapnhat();
            if (check != "") {
                
                messInfo("messinfo_apgia", check, 'error');
                return;
            }
            daycapnhatbang();
          
            insertcapnhatbang();
        });
    } catch (e) {
        console.log(e);
    }
});
function lstnhomkh_hdkh() {
    try {
 
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_NHOMKH", callback: "result_lstnhomkh_hdkh" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lstnhomkh_hdkh(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_giatri_Ag" + i, data, "id", "ten", "-1", "Chọn cấp điện áp");
        $('select#cb_giatri_Ag' + i).find('option').each(function () {
            var text;
            if ($(this).val().length === 4) {
                text = $(this).text();
                $(this).text("-- " + text);
            }
            if ($(this).val().length == 6) {
                text = $(this).text();
                $(this).text("----- " + text);
            }
            if ($(this).val().length == 8) {
                text = $(this).text();
                $(this).text("-------- " + text);
            }
        });
    } catch (e) {
        console.log(e);
    }
}
function lstnhomkh_hdkha(i) {
    try {
    
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_NHOMKH", callback: "result_lstnhomkh_hdkha" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function result_lstnhomkh_hdkha(config, para, lst) {
    try {
        var i = 0;
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_giatri_Ag" + i, data, "id", "ten", "-1", "Chọn cấp điện áp");
        $('select#cb_giatri_Ag' + i).find('option').each(function () {
            var text;
            if ($(this).val().length === 4) {
                text = $(this).text();
                $(this).text("-- " + text);
            }
            if ($(this).val().length == 6) {
                text = $(this).text();
                $(this).text("----- " + text);
            }
            if ($(this).val().length == 8) {
                text = $(this).text();
                $(this).text("-------- " + text);
            }
        });
    } catch (e) {
        console.log(e);
    }
}

function addHtml_Dktdtd(i) {
    try {
        console.log(i);
        var str = "<tr id='row" + i + "' style='overflow:auto;'>"
                  + "<td style='width: 28%' class='text-bold'>Chọn nghành nghề điện áp</td>"
                  + "<td style='width: 40%' class='inp_txt'>"
                  + "<select class='form-control input-sm m-bot15' id='cb_giatri_Ag" + i + "' >" + "<td>"
                  + "<td  style='width:10%'> Tỷ lệ</td>"
                  + "<td  class='inp_txt'>"
                  + "<input type='text'  id='txt_tyle_Ag" + i + "' class='form-control'   style='width: 60px;' />" + "</td>"
        "</tr>";

        return str;
    } catch (e) {
        console.log(e);
    }
}
function checkvalidate() {
    try {
        var row = ($('#addHtml_apgia tr').length) - 1;
        if ($('#cb_giatri_Ag' + row).val() == "-1") return "Bạn chưa chọn nhóm nghành nghề";
        if ($('#txt_tyle_Ag' + row).val() == "") return " Tỷ lệ không được bỏ trống";
        if ($.isNumeric($('#txt_tyle_Ag' + row).val()) == false) return "Tỷ lệ  phải là số";
        return "";

    } catch (e) {
        console.log(e);
    }
}
// check cập nhật validate
function checkcapnhat() {
    try {
        var row = ($('#addHtml_apgia tr').length) - 1;
        // giá tỷ lệ không được bỏ trống
        if ($('#cb_giatri_Ag' + row).val() == "-1") return "Bạn chưa chọn nhóm nghành nghề";
        //tạo mạng để tìm kiếm giá trị trùng
        var array = [];
        for (var a = 0; a <= row; a++) {
            var cot = { qn: $('#cb_giatri_Ag' + a).val() }
            array.push(cot);
        }
        var temp = [];
        var count = 0;
        $.each(array, function (key, value) {
            if ($.inArray(value.qn, temp) === -1) {
                temp.push(value.qn);
            } else {
                count++;
            }
        });
        if (count > 0) return "Trong nhóm nghành nghề có bản ghi trùng nhau";
        // giá tỷ lệ không được bỏ trống
        if ($('#txt_tyle_Ag' + row).val() == "") return " Tỷ lệ không được bỏ trống";
        if ($.isNumeric($('#txt_tyle_Ag' + row).val()) == false) return "Tỷ lệ  phải là số";
        var sum = 0;
        for (var a = 0; a <= row; a++) {
            sum += parseFloat($('#txt_tyle_Ag' + a).val());
        }
        if (sum > 100 || sum < 100) return " Tổng tỉ lệ phải bằng 100";
        if ($('#txt_ten_apgia').val() == "") return "Tên áp đặt cho cấp điện áp không được bỏ trống";
        return "";
    } catch (e) {
        console.log(e);
    }
}
//lấy giá trị để cập nhật vào bảng tạm
function daycapnhatbang() {
    try {
        var lstObj = [];
        var row = ($('#addHtml_apgia tr').length) - 1;
        for (var a = 0; a <= row ; a++) {
            var cot = {
                COT1: $('#txt_tyle_Ag' + a).val(),
                COT2: $('#cb_giatri_Ag' + a).val(),
                COT3: $('#txt_ten_apgia').val(),
                COT4: "APGIA"
            }
            lstObj.push(cot);
        }
        return lstObj;
    } catch (e) {
        console.log(e);
    }
}
// day gia tri vao bang tam
function insertcapnhatbang() {
    try {
        var lstData = daycapnhatbang();
        var config = {
            connstr: "Oracle_HDDT",
            insertto: "HD_TEMNHIEU",
        }

        var table = {
            table: JSON.stringify(lstData)
        };
        var lst = ExecuteBulkCopyOracle(config, table);
        if (lst != null)
            f_update_apgia();
        else
          
        messInfo("messinfo_apgia", "Lỗi cập nhật bảng", "error");
    } catch (e) {
        console.log(e);
    }
}
function f_update_apgia() {
    try {
        var config = {
            connstr: "Oracle_HDDT",
            namesql: "HD_APGIAKH.CAPNHATAPGIA",
            callback: "f_result_update_apgia"
        }
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var para = {
            v_TENAG: $('#txt_ten_apgia').val(),
            V_USERID: ''
        }
        var ls = ExecuteServiceSyns(config, para);
    } catch (e) { console.log(e); }
}

function f_result_update_apgia(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
             messInfo("messinfo_apgia", row, 'ok');
             setTimeout(function () { clearcapnhat(); loadapgia_kh(1); }, 500);
        } else {
            messInfo("messinfo_apgia", row, 'error');
        }
    } catch (e) {
        console.log(e);
    }
}

// cập nhật thành công thì xóa bỏ các bảng cũ
function clearcapnhat() {
    try {
        var i = 0;
        $("#addHtml_apgia").empty();
        $("#addHtml_apgia").append(addHtml_Dktdtd(i));
      
        setTimeout(function () { lstnhomkh_hdkha(i); }, 2000);
        $('#txt_ten_apgia').val('');
    } catch (e) {
        console.log(e);
    }
}





