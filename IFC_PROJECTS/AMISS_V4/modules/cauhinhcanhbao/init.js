var isnewbit = 0;
var pid_;
$(document).ready(function () {
    showhideTree();
    try {
        if (localStorage.getItem("tree_node")) {
            var istype = JSON.parse(localStorage.getItem("tree_node"))[0].type;
            var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
            var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
            if (socongto != "0") {
                $("#tendiemdo_span").html("Vui lòng chọn Sổ ghi hoặc đơn vị để xem dữ liệu");
                return;
            }
            else if (istype == "4")
                $("#tendiemdo_span").html("<span tkey='soghi'></span>: " + tendiemdo);
            else if (socongto == "0" && istype != "4")
                $("#tendiemdo_span").html("<span tkey='donvi'></span>: " + tendiemdo);
            else if (istype >= "6")
                $("#tendiemdo_span").html("Trạm: " + tendiemdo);
            $("#btn_thuchien").removeAttr("disabled");
        }
        else {
            $("#tendiemdo_span").html("Vui lòng chọn đơn vị để xem thiết lập");
            $("#tab_content").empty();
        }
        initformelement();
        get_Profile();
        selectlang();
        $('#cboWhichPha').change(function () {
            var value = $("#cboWhichPha").val() + '';
            switch (value) {
                case '1':
                    $('.turnOnOff3pha').hide();
                    if (isnewbit == 1)
                        load_default(304, 303, 1);
                    else
                        load_default(pid_, (pid_ - 1), 0);
                    break;
                case '3':
                    $('.turnOnOff3pha').show();
                    if (isnewbit == 1)
                        load_default(304, 303, 1);
                    else
                        load_default(pid_, (pid_ - 1), 0);
                    break;
            }
        });
        $("#btnBack").click(function () {
            $("#Main").slideUp();
        })
        $("#btnDefault").click(function () {
            if ($('#cboWhichPha option:selected').val() == 1)
                load_default(304, 303, 1);
            else
                load_default(304, 303, 1);
        })
        $("#btn_taomoicauhinh").click(function () {
            $("#Main").slideDown();
            clearForm();
        })
    } catch (e) {
        //console.log(e.message);
    }
});
function clearForm() {
    $("#Main .form-control").val("");
    $('#Main').find(':checkbox').each(function () {
        $(this).iCheck('uncheck');
    });
}
function get_Profile() {
    try {
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var pcode = JSON.parse(localStorage.getItem("tree_node"))[0].code;
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CANHBAOVANHANH.GetListProfile_pro", callback: "result_get_Profile" };
        var para = {
            v_TypeNode: 2,// -- 2: Node cha; 1: Ði?m do; 3:Danh sách di?m do
            v_ParentNode: pcode,//  -- Code cha c?a node
            v_ValueNode: code,//  -- Code c?a node
            v_UserId: 1
        };
        callLoad();
        console.log(para);
        ExecuteServiceSyns(config, para);
       
        //  

    } catch (e) {
        console.log(e);
    }
}
function result_get_Profile(config, para, lst) {
    try {
        var data = lst.data;
        console.log(data);
        if (data.length == 0) {
            $(".sobanghi").html("<span tkey='khongcodulieu'></span>");
            $("#cauhinh_profile tbody").empty();
            selectlang();
            stopLoad();
            return;
        }
        var tr = "";
        var tr1 = "";
        $.each(data, function (i, val) {
            ////console.log(data);
            tsbanghi = val.rowscount;
            tr += '<tr id="' + val.profileid + '" id2="' + val.profileid2 + '">' +
                    '<td class="a_c">' + (i + 1) + '</td>' +
                    '<td class="text-bold">' + setnull(val.profilename) + '</td>' +
                    '<td class=" a_c">' + setnull(val.username) + '</td>' +
                    '<td class=" a_c">' + setnull(val.insertdate) + '</td>' +
                    '<td class=" a_c">' + setnull(val.updatedate) + ' </td>' +
                    '<td class=" a_c">' + setnull(val.thuocdienluc) + '</td>';
            if (val.permissionapply == '0') {
                if (val.phasetype == '1') tr += '<td  class=" a_c"><button class="btn btn-success" data-count="' + val.countapply1 + '" data-total="' + val.total + '">Áp dụng</button></td>';
                else tr += '<td  class=" a_c"><button class="btn btn-success" data-count="' + val.countapply3 + '" data-total="' + val.total + '">Áp dụng</button></td>';
            } else {
                if (val.phasetype == '1') tr += '<td  class=" a_c"><button class="btn btn-danger" data-count="' + val.countunapply1 + '" data-total="' + val.total + '">Bỏ áp dụng</button></td>';
                else tr += '<td  class=" a_c"><button class="btn btn-danger" data-count="' + val.countunapply3 + '" data-total="' + val.total + '">Bỏ áp dụng</button></td>';
            }
            ////console.log('lstProfile[i].permissionedit' + lstProfile[i].permissionedit);
            if (val.permissionedit == '1')
                tr += '<td  class=" a_c"><i class="glyphicon glyphicon-eye-open preview" data-value="' + val.profileid + '" data-value2="' + val.profileid2 + '"></id></td>';
            else
                tr += '<td  class=" a_c"> </td>';
            if (val.permissiondelete == '1')
                tr += '<td  class=" a_c"><i class="fa fa-trash delete" data-value="' + val.profileid + '"data-value=2"' + val.profileid2 + '"></i></td>';
            else
                tr += '<td  class=" a_c"> </td>';
            '</tr>';


            //$('.delete').click(function () {
            //    CommonFunction.HideNotification('messSuccessProfile');
            //    var count = $(this).attr("counttotal");
            //    if (count == undefined) count = '0';
            //    var textTotal = CommonFunction.StringFormat(AMISSLanguages.COUNTUNAPPLY, count);
            //    var objdeleteId = $(this).parent('td').parent('tr')[0].id;
            //    var textOfTd = $("#" + objdeleteId).children("td").eq(1).html();
            //    try {
            //        if (objdeleteId == "0") return;
            //        //------------------ Tạo confirm
            //        var msgTitle = '<h2>' + AMISSLanguages.CONFIRM_DELETE_PROFILE + '</h2>';
            //        var msgContent = '<p>';
            //        msgContent += '<strong style="color:red">' + textOfTd + ' - ' + textTotal + '</strong>';
            //        msgContent += '</p>';
            //        var msgNote = '<p class="note">' + CommonFunction.StringFormat(AMISSLanguages.NOTE_DELETE, userInfo2.dienluc) + '</p>';
            //        CommonFunction.InitConfirm(this, msgTitle, msgContent, msgNote, 'btnOk', function () { DeleteProfileCanhBaoByID(objdeleteId); });
            //    } catch (e) {
            //        //console.log("error: " + e);
            //    }
            //});
            //$('.unapply').click(function () {
            //    CommonFunction.HideNotification('messSuccessProfile');
            //    var count = $(this).attr("counttotal");
            //    var textTotal = CommonFunction.StringFormat(AMISSLanguages.COUNTUNAPPLY, count);
            //    var objapplyId = $(this).parent('td').parent('tr')[0].id;
            //    var nameUnProfile = $("#" + objapplyId).children("td").eq(1).html();
            //    try {
            //        if (objapplyId == "0") return;
            //        //------------------ Tạo confirm
            //        var msgTitle = '<h2>' + AMISSLanguages.TITLEAPPLY + '</h2>';
            //        var msgContent = '<p>';
            //        msgContent += AMISSLanguages.OBJECTAPPLY;
            //        msgContent += '<strong>' + nameNode + ' - ' + textTotal + '</strong>';
            //        msgContent += '</p>';
            //        msgContent += '<p>';
            //        msgContent += AMISSLanguages.PROFILEUNAPPLY;
            //        msgContent += '<strong>' + nameUnProfile + '</strong>';
            //        msgContent += '</p>';
            //        var msgNote = '<p class="note">' + CommonFunction.StringFormat(AMISSLanguages.NOTE_UNAPPLY, nameNode) + '</p>';
            //        CommonFunction.InitConfirm(this, msgTitle, msgContent, msgNote, 'btnOk', function () { ApplyProfile('1', objapplyId) });
            //    } catch (e) {
            //        //console.log("error: " + e);
            //    }
            //});
            //$('.apply').click(function () {
            //    CommonFunction.HideNotification('messSuccessProfile');
            //    var count = $(this).attr("count");
            //    var counttotal = $(this).attr("counttotal");
            //    var textTotal = CommonFunction.StringFormat(AMISSLanguages.COUNTAPPLY, counttotal);
            //    var objapplyId = $(this).parent('td').parent('tr')[0].id;
            //    var nameApplyProfile = $("#" + objapplyId).children("td").eq(1).html();
            //    try {
            //        if (objapplyId == "0") return;
            //        //------------------ Tạo confirm
            //        var msgTitle = '<h2>' + AMISSLanguages.TITLEAPPLY + '</h2>';
            //        var msgContent = '<p>';
            //        msgContent += AMISSLanguages.OBJECTAPPLY;
            //        msgContent += '<strong>' + nameNode + ' - ' + textTotal + '</strong>';
            //        msgContent += '</p>';
            //        msgContent += '<p>';
            //        msgContent += AMISSLanguages.PROFILEAPPLY;
            //        msgContent += '<strong>' + nameApplyProfile + '</strong>';
            //        msgContent += '</p>';
            //        var msgNote = '<p class="note">' + AMISSLanguages.NOTE_APPLY + '</p>';
            //        CommonFunction.InitConfirm(this, msgTitle, msgContent, msgNote, 'btnOk', function () { ApplyProfile('2', objapplyId); });
            //        //--------------------- End
            //    } catch (e) {
            //        //console.log("error: " + e);
            //    }
            //});
        });
        $("#cauhinh_profile tbody").empty();
        $("#cauhinh_profile tbody").append(tr);
        $(".sobanghi").html("<span tkey='hienthi'></span>" + data.length + "<span tkey='banghi'></span>");

        $('.preview').click(function () {
            pid_ = $(this).data("value");
            $('#Main').slideDown(load_default($(this).data("value"), $(this).data("value2"), 0));
        });
        selectlang();
        stopLoad();


    } catch (e) {
        console.log(e);
    }
}
function load_default(pid1, pid2, isnew) {
    try {
        if ($('#cboWhichPha option:selected').val() == 1)
            var pid = pid2;
        else
            var pid = pid1;
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CANHBAOVANHANH.GetProfileCanhBao_pro", callback: "result_get_ProfilebyID" };
        var para = {
            v_ProfileId: pid
        };
        ////console.log(para);
        callLoad();
        ExecuteServiceSyns(config, para);
        //////console.log(para);
        //  
        isnewbit = isnew;
    } catch (e) {
        console.log(e);
    }
}
function result_get_ProfilebyID(config, para, lst) {
    var objProfile = lst.data[0];
    //console.log(objProfile);
    if (isnewbit == 0) {
        $('#txtNameProfile').val(objProfile.profilename);
    }
    $('#txtUDinhMuc').val(objProfile.u_dinhmuc);
    $('#txtI_DinhMuc').val(objProfile.i_dinhmuc);
    $('#txtP_DinhMuc').val(objProfile.p_dinhmuc);
    $('#txtF_DinhMuc').val(objProfile.freg_dinhmuc);
    $('#txtU_Tren').val(objProfile.u_tren);
    $('#txtU_Duoi').val(objProfile.u_duoi);
    $('#chkCanhbaoU').iCheck(objProfile.u_status == "1" ? 'check' : 'uncheck');
    $('#txtIQua').val(objProfile.iqua_value);
    $('#chkCanhbaoI1').iCheck(objProfile.iqua_status == "1" ? 'check' : 'uncheck');
    $('#txtI1Pha').val(objProfile.i1pha_value);
    $('#chkCanhbaoI2').iCheck(objProfile.i1pha_status == "1" ? 'check' : 'uncheck');
    $('#txtI2Pha').val(objProfile.i2pha_value);
    $('#chkCanhbaoI3').iCheck(objProfile.i2pha_status == "1" ? 'check' : 'uncheck');
    $('#txtILech').val(objProfile.ilech_value);
    $('#chkCanhbaoI4').iCheck(objProfile.ilech_status == "1" ? 'check' : 'uncheck');
    $('#txtCos').val(objProfile.cos_value);
    $('#chkCanhbaoCos').iCheck(objProfile.cos_status == "1" ? 'check' : 'uncheck');
    $('#txtFreg_Tren').val(objProfile.freg_tren);
    $('#txtFreg_Duoi').val(objProfile.freg_duoi);
    $('#chkCanhbaoFreg').iCheck(objProfile.freg_status == "1" ? 'check' : 'uncheck');
    $('#txtAngleA_Duoi').val(objProfile.anglea_duoi);
    $('#txtAngleA_Tren').val(objProfile.anglea_tren);
    $('#txtAngleB_Duoi').val(objProfile.angleb_duoi);
    $('#txtAngleB_Tren').val(objProfile.angleb_tren);
    $('#txtAngleC_Duoi').val(objProfile.anglec_duoi);
    $('#txtAngleCTren').val(objProfile.anglec_tren);
    $('#chkCanhbaoAngle').iCheck(objProfile.angle_status == "1" ? 'check' : 'uncheck');
    $('#txtTime').val(objProfile.time_value);
    $('#chkCanhbaoTime').iCheck(objProfile.time_status == "1" ? 'check' : 'uncheck');
    $('#txtP_Tren').val(objProfile.pqua_value);
    $('#chkCanhbaoP').iCheck(objProfile.pqua_status == "1" ? 'check' : 'uncheck');
    $('#txtSoNgay').val(objProfile.slkodoi_songay);
    $('#chkCanhbaoSL_KoDoi').iCheck(objProfile.slkodoi_status == "1" ? 'check' : 'uncheck');
    $('#txtSLKy_Tren').val(objProfile.slkytren);
    $('#txtSLKy_Duoi').val(objProfile.slkyduoi);
    $('#chkCanhbaoSL_KyTren').iCheck(objProfile.slkytren_status == "1" ? 'check' : 'uncheck');
    $('#chkCanhbaoSL_KyDuoi').iCheck(objProfile.slkyduoi_status == "1" ? 'check' : 'uncheck');
    $('#txtemaillist').val(objProfile.emails);
    $('#txtphonelist').val(objProfile.tels);
    stopLoad();
}