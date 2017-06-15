var datacmiss;
$(document).ready(function () {
    try {
        showhideTree()
        selectlang();
        initformelement();
        $("#txt_file_thayct").change(function () {
            var fname = $("#txt_file_thayct").get(0).files[0].name;
            var fileExt = fname.split('.').pop();

            if (fileExt.indexOf("xml") == -1) {
                showToast('Vui lòng chọn file xml', "error");
                $("#txt_file_thayct").val("");
                return;
            }
            Xoa_thaycmiss();
        });
        $("#btnThietlap_thaytocmis").click(function () {
            var lenght_nkhtcmis = $("#txt_file_thayct").get(0).files.length;
            if (lenght_nkhtcmis > 0) {
                capnhatthaycmiss();
            } else {
                showToast('Vui lòng chọn file trước khi thực hiện', "error");
            }

        });
        $("#btnkiemtra_thaytocmis").click(function () {
            var lenght_nkhtcmis = $("#txt_file_thayct").get(0).files.length;
            if (lenght_nkhtcmis > 0) {
                kiemtra_thaycmiss();
            } else {
                showToast('Vui lòng chọn file trước khi thực hiện', "error");
            }
           
        });

    } catch (e) {
        console.log(e);
    }
});

function f_thaycongtocmis() {
    try {
        $(".progress-bar-dtt").show();
        $(".loadtext").text("Đang xử lý...");
        var idram_khmis = 'KT';
        var fdata = new FormData();
        var files = $('#txt_file_thayct')[0].files[0];
        fdata.append("file", files);
        fdata.append("connstr", "ConnectOracle233");
        fdata.append("insertto", "AM_TEMP_DBCMIS_NEW");
        fdata.append("idrandom", idram_khmis);
        var config = { callback: "f_result_inportFileXmlToOracle_cmtd" };
        api_uploadFileXmlAllToOracle(config, fdata);
    } catch (e) {
        console.log(e);
        messInfo("messinfo_thaycmiss", "File không hợp lệ, hãy sửa file và load lại", "error");
    }
}
function f_result_inportFileXmlToOracle_cmtd(config, para, lst) {
    try {
        var data = lst.data;
        if (data[0].idrandom == 'KT') {
            loaddulieuthaycongto();
        } else {
            messInfo("messinfo_thaycmiss", "File không đúng định dạng", "error");
        }

    } catch (e) {
        console.log(e);
        messInfo("messinfo_xuatexcel", "File không hợp lệ, hãy sửa file và load lại", "error")
    }
}
function Xoa_thaycmiss() {
    try {
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_THAYCONGTOCMISS.XOABANG", callback: "result_xoa" };
        var para = {
            v_ID: 'KT'
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_xoa(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row == "1") {
            f_thaycongtocmis();
        }
    } catch (e) {
        console.log(e);
    }
}

function loaddulieuthaycongto() {
    try {
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_THAYCONGTOCMISS.LOADDANHSACH", callback: "result_loaddulieuthaycongto" };
        var para = {
            v_ID: 'KT'
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_loaddulieuthaycongto(config, para, lst) {
    try {
        $("#tbl_thayct").show();
        $(".panel-nkhtcmis").show();
        var data = lst.data;
        datacmiss = data;
        $(".total_thaycmiss").html("Tổng số <b>" + data.length + "</b> Điểm đo");
        $("#table_khctocmiss").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr class='row_thay_" + val.sery_cto + "'><td>"
                + val.stt + "</td><td>"
                + val.ma_khang + "</td><td>"
                + val.ma_ddo + "</td><td>"
                + val.sery_cto + "</td><td>"
                + val.ma_quyen + "</td><td>"
                + val.ma_tram + "</td><td>"
                + val.ten_khang + "</td><td>"
                + val.loai_cs + "</td><td>"
                + val.sl_moi + "</td><td>"
                + val.cs_moi + "</td><td class='cnthay_" + val.sery_cto + "'>"
                + "" + "</td><td>"
                + "" + "</td></tr>";

            $("#table_khctocmiss").append(row);
        });
        $(".progress-bar-dtt").hide();

    } catch (e) {
        console.log(e);
    }
}
var count_success;
var count;
function capnhatthaycmiss() {
    try {
        $(".progress-bar-dtt").show();
        count_success = 0;
        count = 0;
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_THAYCONGTOCMISS.TREOTHAO_THUCHIEN", callback: "result_capnhatthaycmiss" };
        $.each(datacmiss, function (key, val) {
            var para = {
                v_madiemdo: val.ma_ddo,
                v_socongto: val.sery_cto,
                v_ngaythanhly: '',
                v_cstreo: val.cs_moi,
                v_chungloai: val.loai_cs == "DDN" ? "1" : "0",
                v_UserId: userinfo.userid,
                v_loai_bcs: val.loai_cs,
                v_loai_cs: val.loai_cs,
            };
            ExecuteServiceSyns(config, para);

        });


    } catch (e) {
        console.log(e);
    }
}
function result_capnhatthaycmiss(config, para, lst) {
    try {
        count++;

        var key = para.v_socongto;
        var data = lst.data;
        var row = data[0].count;
        if (row == 1) {
            count_success++;
            $('.row_thay_' + key).find('td:last').html("Cập nhật thành công treo");
        } else if (row == 2) {
            $('.row_thay_' + key).find('td:last').html("Không tồn tại mã điểm đo");
        } else if (row == 3) {
            $('.row_thay_' + key).find('td:last').html("Số công tơ mới");
        } else if (row == 4) {
            $('.row_thay_' + key).find('td:last').html("Không tồn tại điểm đo");
        } else if (row == 5) {
            $('.row_thay_' + key).find('td:last').html("Đã tồn tại điểm đo, số công tơ");
        } else if (row == 6) {
            $('.row_thay_' + key).find('td:last').html("Cập nhập chỉ số tháo");
        } else if (row == 7) {
            $('.row_thay_' + key).find('td:last').html("Không tồn tại điểm đo và số công tơ");
        } else if (row == 8) {
            count_success++;
            $('.row_thay_' + key).find('td:last').html("Cập nhật thành công tơ tháo  xuống");
        }
        if (datacmiss.length == count) {
            $(".progress-bar-dtt").hide();
            showToast('cập nhật thành công ' + count_success + ' điểm đo', "success");
        }
    } catch (e) {
        console.log(e);
    }
}
var capnhat;
var tontai;
var sctkbao;
var sctkontai;
function kiemtra_thaycmiss() {
    try {
        count = 0;
        capnhat = 0;
        tontai = 0;
        sctkbao = 0;
        sctkontai = 0;
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_THAYCONGTOCMISS.TREOTHAO_KIEMTRA", callback: "result_kiemtra_thaycmiss" };
        $.each(datacmiss, function (key, val) {
            var para = {
                a_list_socongto: val.sery_cto,
                a_list_ma_ddo: val.ma_ddo,
                a_list_loai_cs: val.loai_cs
            };
            ExecuteServiceSyns(config, para);
        });
    } catch (e) {
        console.log(e);
    }
}

function result_kiemtra_thaycmiss(config, para, lst) {
    try {
        var key = para.a_list_socongto;
        var data = lst.data;
        var row = data[0].count;
        count++;
        if (row == 1) {
            capnhat++
            $(".cnthay_" + key).html("Cập nhập chỉ số tháo");
        } else if (row == 4) {
            tontai++;
            $(".cnthay_" + key).html("Tồn tại mã điểm đo và số công tơ này trên hệ thống");
        } else if (row == 3) {
            sctkbao++;
            $(".cnthay_" + key).html("Số công tơ nằm trong chờ khai báo ");
        } else if (row == 2) {
            sctkontai++;
            $(".cnthay_" + key).html("Không có mã điểm đo và số công tơ này trên hệ thống ");
        }
        if (datacmiss.length == count) {
            $(".messinfo_thaycmiss").show();
            $(".messinfo_thaycmiss").html(" <b>" + capnhat + "</b> bản ghi cập nhập chỉ số tháo </br>"
                                           + "<b>" + tontai + "</b> bản ghi tồn tại mã điểm đo và số công tơ này trên hệ thống<br/>"
                                           + "<b>" + sctkontai + "</b> bản ghi Không có  mã điểm đo và số công tơ này trên hệ thống<br/>"
                                           +"<b>"+ sctkbao+"</b> bản ghi có số công tơ nằm trong chờ khai báo ");
        }

    } catch (e) {
        console.log(e);
    }
}


