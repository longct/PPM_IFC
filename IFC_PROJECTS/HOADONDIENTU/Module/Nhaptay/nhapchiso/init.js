var countpage = 10;
$(document).ready(function () {
    try {
        loadConetent();
        lst_donvi_cso();
        lst_tram_cso();
        lst_soghi_cso();
        $('#txt_thang').datepicker({
            format: 'mm/yyyy',
            todayHighlight: true,
            minViewMode: "months",
            autoclose: true
        });
        $('#txt_thang').datepicker('setDate', new Date());
        $("#cb_dienluc_ncso").change(function () {
            lst_tram_cso();
        });
        $("#cb_tram_ncso").change(function () {
            lst_soghi_cso();
        });
        loaddanhsachchiso(1);
        $("#btn_timkiem_ncso").click(function () {
            loaddanhsachchiso(1);
        });
        $("#btn_capnhat_ncso").click(function () {
            f_confimYesNo("Cập nhật thông tin chỉ số", "Bỏ qua", "Xác nhận", function () {
                laysolieu_cs();
            });
        
        });

    } catch (e) {
        console.log(e);
    }
});

function lst_donvi_cso() {
    try {
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_DONVI", callback: "result_lst_donvi_cso" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lst_donvi_cso(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_dienluc_ncso", data, "id", "ten", "-1", "Tất cả");
    } catch (e) {
        console.log(e);
    }
}
function lst_tram_cso() {
    try {
        var p=getAllIdMod();
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_TRAMCHANGE", callback: "result_lst_tram_cso" };
        var para = { v_CODE: p.cb_dienluc_ncso };
     
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lst_tram_cso(config, para, lst) {
    try {

        var data = lst.data;
     
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_tram_ncso", data, "id", "ten", "-1", "Tất cả");
    } catch (e) {
        console.log(e);
    }
}
function lst_soghi_cso() {
    try {
        var p = getAllIdMod();
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_SOGHI", callback: "result_lst_soghi_cso" };
        var para = { v_CODE: p.cb_tram_ncso };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lst_soghi_cso(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_soghi_ncso", data, "id", "ten", "-1", "Tất cả");
    } catch (e) {
        console.log(e);
    }
}
function checkchon_cso() {
    try {
        var p = getAllIdMod();
        var gia = "";
        if (p.cb_soghi_ncso != '-1') {
            gia = p.cb_soghi_ncso;
        } else if (p.cb_tram_ncso != '-1') {
            gia = p.cb_tram_ncso;
        } else   {
            gia = p.cb_dienluc_ncso;
        }
        return gia;
    } catch (e) {
        console.log(e);
    }
}
function loaddanhsachchiso(page) {
    try{
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var p = getAllIdMod();
        var ngay = p.txt_thang.split("/");
        var config = { connstr: "Oracle_HDDT", namesql: "HD_NHAPCSBTAY.LOADDANHSACH", callback: "result_loaddanhsachchiso" };
        var para = {
            v_USERID: userinfo.userid,
            v_CODE:checkchon_cso(),
            v_KY:p.cb_kychot_ncso,
            v_THANG:ngay[0],
            v_NAM:ngay[1],
            v_pagenum: page,
            v_numrecs: countpage
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_loaddanhsachchiso(config, para, lst) {
    try {
        var data = lst.data;
        if (data == "[]" || data == null || data.length == 0) {
            messInfo("messinfo_ncso", "Không có dữ liệu hiển thị", "error");
            clear_cs();
            $("#txt_tong_cnso").html('0');

            return;
        }
        $("#txt_tong_cnso").html(data[0].rowscount);
        messInfo("messinfo_ncso", "", "error");
        $("#table_khhd_ncso").empty();
        $.each(data, function (key, val) {
            var ngaycongto = '<input type="text" id="ngaycongto_' + val.id + '" class="form-control datepicker date" style="width:100px;display: inline-block;" />';
            row = "";
            row += "<tr id_auto='" + val.id + "' socongto='" + val.socongto + "' loai='" + val.loaidiemdo + "'  ><td>"
                + val.stt + "</td><td>"
                + val.tenkhachhang + "</td><td>"
                + val.socongto + "</td><td class='text-center'>"
                + ngaycongto + "</td><td>"
                + hamve_ncso(val.loaidiemdo) + "</td></tr>"
             //  + "<form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action' data-toggle='modal' href='#confimYesNo' value='" + val.id + "' id='btn_xoa" + val.id + "'><i class='fa fa-edit'></i> Xóa</a> &nbsp</div></form></td> </tr>";
            $("#table_khhd_ncso").append(row);
        });
        $('.datepicker.date').datepicker({
            format: 'dd/mm/yyyy',
            todayHighlight: true,
            autoclose: true,
        });
        $('.datepicker.date').datepicker('setDate', new Date());

        $('.datepicker.date').datepicker().on('changeDate', function (ev) {
            var thoigian = $(this).val();
            var thang = $("#txt_thang").val();
            if (thoigian.toString().indexOf(thang) < 0) {
                alert('Ngày công tơ không thuộc tháng ' + thang);
                $(this).addClass('date-error');
                return;
            } else {
                $(this).removeClass('date-error');
            }
        });

        LoadPhanTrang("pageCurent_lst_ncso", "pageLst_lst_ncso", data, function () {
            var p = getAllIdMod();
            loaddanhsachchiso($("#pagenumber").val());

        });

    } catch (e) {
        console.log(e);
    }
}
function hamve_ncso(loai) {
    try {
        if (loai =="1") {
            return "</td><td></td><td></td><td><input type='number' size='10' class='form-control pgiaotong' min='0' max='1000000000000000' />";
        } else {
            return "<input type='number' size='10' class='form-control pgiao1'  min='0' max='1000000000000000'/></td><td><input type='number' size='10' class='form-control pgiao2'  min='0' max='1000000000000000' /></td><td><input type='number'  size='10'  class='form-control pgiao3'  min='0' max='1000000000000000' /></td><td><input type='number'  size='10'  class='form-control qgiaotong'  min='0' max='1000000000000000' /></td><td>";
        }

    } catch (e) {
        console.log(e);
    }
}
function laysolieu_cs() {
    try{
        var paraa = [];
        $('#table_khhd_ncso tr').each(function () {
            var pgiao1=$($(this).find('.pgiao1')).val(); if (pgiao1 == undefined) { var pgiao1 = ""; } else { var pgiao1; }
            var pgiao2 = $($(this).find('.pgiao2')).val(); if (pgiao2 == undefined) { var pgiao2 = ""; } else { var pgiao2; }
            var pgiao3 = $($(this).find('.pgiao3')).val(); if (pgiao3 == undefined) { var pgiao3 = ""; } else { var pgiao3; }
            var pgiaotong = $($(this).find('.pgiaotong')).val(); if (pgiaotong == undefined) { var pgiaotong = ""; } else { var pgiaotong; }
            var qgiaotong = $($(this).find('.qgiaotong')).val(); if (qgiaotong == undefined) { var qgiaotong = ""; } else { var qgiaotong; }
            var info = {
                id: $(this).attr("id_auto"), socongto: $(this).attr("socongto"), loai: $(this).attr("loai"), pgiao1: pgiao1, pgiao2: pgiao2, pgiao3: pgiao3, pgiaotong: pgiaotong, qgiaotong: qgiaotong
            };
            paraa.push(info);
        });

        var p = getAllIdMod();
        var lstId = [];
        var ngay = p.txt_thang.split("/");
        
        var ky = p.cb_kychot_ncso;
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var data = paraa;

        for (var i = 0; i < data.length; i++) {
            console.log(data[i].id, data[i].pgiao1, data[i].pgiao2, data[i].pgiao3, data[i].pgiaotong);
            if (data[i].id != null 
                && (data[i].pgiao1 ||
                    data[i].pgiao2 ||
                    data[i].pgiao3 ||
                    data[i].qgiaotong ||
                    data[i].pgiaotong)) {
                
                var thoigian = $("#ngaycongto_" + data[i].id).val();
                var thang = p.txt_thang;
                if (thoigian.toString().indexOf(thang) < 0) {
                    alert('Ngày công tơ không thuộc tháng ' + thang);
                    $("#ngaycongto_" + data[i].id).addClass('date-error');
                    return;
                }
                var ID = {
                    cot1: data[i].id,
                    cot2: data[i].socongto,
                    cot3: data[i].pgiao1,
                    cot4: data[i].pgiao2,
                    cot5: data[i].pgiao3,
                    cot6: data[i].pgiaotong,
                    cot7: ngay[0],
                    cot8: ngay[1],
                    cot9: data[i].loai,
                    cot10: userinfo.userid,
                    cot11: 'CSBTAY',
                    cot12: ky,
                    cot13: thoigian,
                    cot14: data[i].qgiaotong
                };
                lstId.push(ID);
            } 
        }
        var config = {
            connstr: "Oracle_HDDT",
            insertto: "HD_TEMNHIEU",
        }
        var table = {
            table: JSON.stringify(lstId)
        };
        var lst = ExecuteBulkCopyOracle(config, table);
        if (lst != null) {
       
            capnhat_chisobangtay();
        }
        else {
            messInfo("messinfo_ncso", 'Lỗi không cập bằng tay', "error");
        }

    } catch (e) {
        console.log(e);
    }
}
function chekvaildate() {
    try{
      var pgiao1=  $(".pgiao1").val();
      var pgiao2 = $(".pgiao2").val();
      var pgiao3 = $(".pgiao3").val();
      var pgiaotong = $(".pgiaotong").val();
      var qgiaotong = $(".qgiaotong").val();
      if (pgiao1 == "") return "Chỉ số Pgiao1 không được bỏ trống";
      if (pgiao2 == "") return "Chỉ số Pgiao2 không được bỏ trống";
      if (pgiao3 == "") return "Chỉ số Pgiao3 không được bỏ trống";
      if (pgiaotong == "") return "Chỉ số Pgiaotong không được bỏ trống";
      if (qgiaotong == "") return "Chỉ số Qgiaotong không được bỏ trống";

      return "";

    }catch(e){
        console.log(e);
    }
}
function capnhat_chisobangtay() {
    try {
        var p = getAllIdMod();
        var ngay = p.txt_thang;
        var date = "01/" + ngay;
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { connstr: "Oracle_HDDT", namesql: "HD_NHAPCSBTAY.CAPNHATCHISO", callback: "result_capnhat_chisobangtay" };
        var para = {
            v_USERID: userinfo.userid,
            v_NGAY: date,
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_capnhat_chisobangtay(config, para, lst) {
    try{
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_ncso", row, 'ok');
            setTimeout(function () {
                loaddanhsachchiso(1);
            }, 1500);
        } else {
            messInfo("messinfo_ncso", row, 'error');
        }
    } catch (e) {
        console.log(e);
    }
}
function clear_cs() {
    try{
        $("#table_khhd_ncso").empty();
        $("#pageLst_lst_ncso").empty();
        $("#pageCurent_lst_ncso").empty();
    } catch (e) {
        console.log(e);
    }
}






