var isMulti = 0;
$(document).ready(function () {
    try {
        showhideTree();
        selectlang();
        initformelement();
        if ($(".datepicker").val() == "") $(".datepicker").val(gettimenow_cscthang());
        setValToTxt("ngay_chot", gettimenow());
        if (localStorage.getItem("tree_node")) {
            var istype = JSON.parse(localStorage.getItem("tree_node"))[0].type;
            var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
            var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
            if (istype != "0" && istype != "4" && socongto != "0")
                $("#tendiemdo_span").html(tendiemdo + "(Số công tơ: " + socongto + "- Loại điểm đo: " + replacePha(istype) + ")");
            else if (istype == "4")
                $("#tendiemdo_span").html("Sổ ghi: " + tendiemdo);
            else if (socongto == "0" && istype != "4")
                $("#tendiemdo_span").html("Đơn vị: " + tendiemdo);

            //if (socongto != "0") {
            //    $('#filter_multimeter').hide();
            //    $('#filter_1meter').show();
            //} else {
            //    $('#filter_1meter').hide();
                $('#filter_multimeter').show();
            //}

            var s_socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto.split(';');
            $.each(s_socongto, function (i, val) {
                $('#cb_socongto').append('<option>' + val + '</option>');
            });
            if (s_socongto > 0)
                f_GetData_csdk_ddo(1);
            else
                f_GetData_csdk_nhom(1);
        }
        else {
            $("#tendiemdo_span").html("Vui lòng chọn điểm đo hoặc nhóm điểm đo để xem dữ liệu");
            $("#tab_content").empty();
            $("div.date-filter").hide();
            
        }
        
        if ($(".content").hasClass("hidetree")) {
            $(".colslape_tree").click();
        }
        
        $('#btnExecMulti').click(function () {
            if (localStorage.getItem("tree_node")) {
                var v_Value = JSON.parse(localStorage.getItem("tree_node"))[0].id; // codedl
                if (v_Value == "0") {
                    showToast('Hãy chọn một trạm trên cây điện lực', 'error');
                    return;
                }
                f_GetData_csdk_nhom();
            } else {
                showToast('Hãy chọn một trạm trên cây điện lực', 'error');
                return;
            }
            
        });

        $('#btnExec').click(function () {
            
            if (s_socongto > 0)
                f_GetData_csdk_ddo(1);
            else
                f_GetData_csdk_nhom(1);
        });
        $("#excel_xemcs").click(function () {
            var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
            if(socongto == "0")
                excel();
        });

        $("#btnThietLapChot").click(function () {
            $("#filter_multimeter").hide();
            $("#filter_1meter1").hide();
            $("#thietlapchot").show();
        })

        $("#btnQuayLai").click(function () {
            $("#filter_multimeter").show();
            $("#filter_1meter1").show();
            $("#thietlapchot").hide();
        })

        $('#btnthuchienthietlap').click(function () {
            
            var checknull = validate();
            //if (checknull != "") {
            //    showToast(checknull, 'error');
            //    return;
            //}
            var thangchot = $('#ngay_chot').val().split("/");
            f_confimYesNo('<p>Danh sách khách hàng đã được thiết lập ngày chốt. Nếu người dùng thiết lập lại'
                        + " thì tất cả dữ liệu của tháng " + thangchot[1]
                        + ' sẽ bị thay đổi so với thiết lập mới. Người dùng đồng ý thiết lập hay không?</p>', "Hủy", "Đồng ý",
                        function () {
                            
                            var tree_node = JSON.parse(localStorage.getItem("tree_node"))[0];
                            if (tree_node.socongto == "0") {
                                f_thietlap_nhom();
                            } else {
                                f_thietlap_ddo();
                            }
                        });

        });
        
    } catch (e) {
        console.log(e);
    }

});

function replacePha(pha) {
    if (pha == "1")
        return "1 Pha";
    else if (pha == "3")
        return "3 Pha";
    else if (pha == "31")
        return "3 Pha 1 biểu";
    else {
        return;
    }
}

function f_GetData_csdk_ddo(pagenum) {
    try {
        if (localStorage.getItem("tree_node") == null) return;
        isMulti = 0;
        var p = getAllIdMod();
        var v_Value = JSON.parse(localStorage.getItem("tree_node"))[0].id; // codedl
        var date = new Date(p.dateThang.split('/')[0] + '/01/' + p.dateThang.split('/')[1]);
        var firstDay = '01/' + p.dateThang;
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        var v_dFrom = firstDay;
        var v_dTo = lastDay + '/' + p.dateThang;
        
        var v_UserId = "1"; //JSON.parse(localStorage.getItem("userinfo")).id;
        
        var v_Socongto = p.cb_socongto;
        var v_numrecs = 100000; // bản ghi 1 trang
        var v_option = p.cboOptionGetData; // combo chọn loại dư liệu
        var v_kychot = p.kychot; // combo chọn kỳ chốt

        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_CHISOCHOT.CSC_DINHKY_DDO", callback: "f_result_csdk_ddo" };
        var para = {
            v_MeterId: v_Value,
            v_Socongto: v_Socongto,
            v_dFrom: v_dFrom,
            v_dTo: v_dTo,
            v_UserId: v_UserId,
            v_pagenum: pagenum,
            v_numrecs: v_numrecs,
            v_option: v_option,
            v_kychot: v_kychot
        };
        console.log(para);
        ExecuteServiceSyns(config, para);
        //callLoad();

    } catch (e) {
        console.log(e);
    }
}

function f_result_csdk_ddo(config, para, lst) {
    try {
        console.log(lst);
        $("#csdk_data tbody").empty();
        if (lst == null || lst == undefined || lst == "[]") {
            $(".sobanghi").html("Không có bản ghi nào");
            stopLoad();
            return;
        }
        var data = lst.data;    
        if (!data || data.length == 0) {
            $(".sobanghi").html("Không có bản ghi nào");
            stopLoad();
            return;
        }
        var stt = 1;
        var last = "";
        var strData = '';
        var arrNameCu = ['pgiao1cu', 'pgiao2cu', 'pgiao3cu', 'pgiaotongcu', 'qgiaotongcu'];
        var arrName = ['pgiao1', 'pgiao2', 'pgiao3', 'pgiaotong', 'qgiaotong'];
        var arrNameSl = ['slpgiao1', 'slpgiao2', 'slpgiao3', 'slpgiaotong', 'slqgiaotong'];
        var index = 0;
        $.each(data, function (i, val) {
            if (last != val.madiemdo && isMulti == 1) {
                index++;
                last = val.madiemdo;
                strData += '<tr class="tsvh_tendiemdo"><td colspan="7">' + val.madiemdo + ' - ' + val.tendiemdo + ' - ' + val.socongto + ' </td></tr>';
                strData += '<td class="" rowspan="6">' + index + '</td>';// stt
            }
            switch (true) {
                //case (val.phase == '1' || val.phase == '31'):
                //    
                //    strData += '<td class="" rowspan="6">' + index + '</td>';// stt
                //    //strData += '<td  class="">' + getNameInOrder(0, val.phase, 1) + '</td>';
                //    strData += '<td class="" >' + (val.chisocu == null ? '-' : val.ngaycu) + '</td>';
                //    strData += '<td class="">' + (val.chisocu == null ? '-' : val.chisocu) + '</td>';
                //    strData += '<td class="">' + setnull(val.billingdateend) + '</td>'; // ngày chốt
                //    strData += '<td  class="">' + setnull(val.pgiaotong) + '</td>';
                //    strData += '<td  class="">' + setnull(val.billingdateend) + '</td>';
                //    strData += '<td class="" >' + setnull((val.slgiao + '')) + '</td>';
                //    strData += '</tr>';
                //    break;
                default:
                    
                    $.each(arrName, function (idx, name) {
                        strData += '<tr class="totalcs" >';
                        strData += '<td class="" >' + (val.chisocu == null ? '-' : val.ngaycu) + '</td>';//ngay cũ
                        strData += '<td class="">' + setnull(val[arrNameCu[idx]]) + '</td>'; // chi so cu
                        strData += '<td class="">' + setnull(val.billingdateend) + '</td>'; // ngày chốt
                        strData += '<td class="">' + setnull(getNameInOrder(idx, val.phase, 5)) + '</td>';// bieu gia
                        strData += '<td class="">' + setnull(val[name]) + '</td>'; // chỉ sổ mới
                        strData += '<td class="">' + setnull(val[arrNameSl[idx]]) + '</td>';//san luong
                        strData += '</tr>';
                    });
                    break;
            }
        });

        $("#csdk_data tbody").append(strData);
        $(".sobanghi").html("<span>Tìm thấy " + data.length + " <span tkey='banghi'></span>");
        selectlang();
        stopLoad();
    } catch (e) {
        console.log("xem chi so dinh ky" + e);
    }
}

function f_GetData_csdk_nhom() {
    try {
        isMulti = 1;
        var p = getAllIdMod();
        var v_Value = JSON.parse(localStorage.getItem("tree_node"))[0].id; // codedl
        var v_Date = '01/' + p.dateThang;
        var v_pagenum = 0;
        var v_numrecs = 100000;
        var v_kychot = p.kychot;
        var v_TypeInsert = p.cboOptionTypeInsert;
        var v_option = p.cboOptionGetData;
        var v_UserId = JSON.parse(localStorage.getItem("userinfo")).userid;
        var config = {
            connstr: "ConnectOracle_Amiss4",
            namesql: "PKG_CHISOCHOT.CSC_DINHKY_NHOM",
            callback: "f_result_csdk_ddo"
        };
        var para = {
            v_Value: v_Value,
            v_Date: v_Date,
            v_TypeInsert: v_TypeInsert,
            v_pagenum: v_pagenum,
            v_numrecs: v_numrecs,
            v_kychot: v_kychot,
            v_option: v_option,
            v_UserId: v_UserId
        };

        ExecuteServiceSyns(config, para);


    } catch (e) {
        console.log(e);
    }
}

function checkNullToChar(value, newchar) {
    try {
        if (value == undefined) return newchar;
        if (value == null) return newchar;
    }
    catch (e) {
        return null;
    }

    return (value + '');
}

function getNameInOrder(index, phase, prior) {
    var arrNamePhase33 = ['BT', 'CD', 'TD', 'SG', 'VC'];
    var arrNamePhase311 = ['KT'];
    if ($.trim(phase) === '3' || $.trim(phase) === '33') return arrNamePhase33[index];
    if (prior > 3) {
        return arrNamePhase33[index];
    }

    return arrNamePhase311[index];
}

function excel() {
    if (document.getElementById("csdk_data").rows.length <= 1) { showToast('Không có dữ liệu', 'error'); return; }
    var p = getAllIdMod();
    var v_Value = JSON.parse(localStorage.getItem("tree_node"))[0].id; // codedl
    var v_Date = '01/' + p.dateThang;
    var v_pagenum = 0;
    var v_numrecs = 100000;
    var v_kychot = p.kychot;
    var v_TypeInsert = p.cboOptionTypeInsert;
    var v_option = p.cboOptionGetData;
    var v_UserId = JSON.parse(localStorage.getItem("userinfo")).userid;

    var para = {
        v_Value: v_Value,
        v_Date: v_Date,
        v_TypeInsert: v_TypeInsert,
        v_pagenum: v_pagenum,
        v_numrecs: v_numrecs,
        v_kychot: v_kychot,
        v_option: v_option,
        v_UserId: v_UserId
    };
    var namef_l = 'ChiSoDinhKy_' + v_Date.replace("/", "-");
    var config = {
        connstr: "ConnectOracle_Amiss4",
        namesql: "PKG_CHISOCHOT.CSC_DINHKY_NHOM",
        namefile: namef_l
    };
    var para = {
        v_Value: v_Value,
        v_Date: v_Date,
        v_TypeInsert: v_TypeInsert,
        v_pagenum: v_pagenum,
        v_numrecs: v_numrecs,
        v_kychot: v_kychot,
        v_option: v_option,
        v_UserId: v_UserId
    };
    var colum = {
        kq: [
         { field: "stt", name: "STT", type: "TextAndBoldCenter" },
        { field: "madiemdo", name: "Mã điểm đo", type: "TextAndBoldCenter" },
        { field: "tendiemdo", name: "Tên khách hàng", type: "TextAndBoldCenter" },
        { field: "socongto", name: "Số công tơ", type: "TextAndBoldCenter" },
        { field: "heso_nhan", name: "HSN trong công tơ", type: "Text" },
        { field: "chungloai", name: "Chủng loại công tơ", type: "Text" },
        { field: "ngaycu", name: "Ngày cũ", type: "Text" },
        { field: "pgiaotongcu", name: "Chỉ số cũ(kwh)", type: "Text" },
        { field: "billingdateend", name: "Ngày mới", type: "Text" },
        { field: "pgiaotong", name: "Chỉ số mới(kwh)", type: "Text" },
        //{ field: "ngaychotdl", name: "Thời gian chốt công tơ", type: "Text" },
        { field: "pgiao1cu", name: "Chỉ số cũ biểu 1(kwh)", type: "Text" },
        { field: "pgiao2cu", name: "Chỉ số cũ biểu 2(kwh)", type: "Text" },
        { field: "pgiao3cu", name: "Chỉ số cũ biểu 3(kwh)", type: "Text" },
        { field: "pgiao1", name: "Chỉ số biểu 1(kwh)", type: "Text" },
        { field: "pgiao2", name: "Chỉ số biểu 2(kwh)", type: "Text" },
        { field: "pgiao3", name: "Chỉ số biểu 3(kwh)", type: "Text" },
        { field: "qgiaotong", name: "Chỉ số vô công(kvarh)", type: "Text" },
        { field: "slpgiao1", name: "Sản lượng biểu 1(kwh)", type: "Text" },
        { field: "slpgiao2", name: "Sản lượng biểu 2(kwh)", type: "Text" },
        { field: "slpgiao3", name: "Sản lượng biểu 3(kwh)", type: "Text" },
        { field: "slpgiaotong", name: "Sản lượng biểu tổng(kwh)", type: "Text" },
        { field: "slqgiaotong", name: "Sản lượng vô công(kvarh)", type: "Text" }
        ]
    };
    ExecuteExportExcelOracle(config, para, colum);
}
//	
function validate() {
    try {
        //var k = $("#sokychot").val();
        //var t = $("#ngaychot").val();
        //if ($("#ngay_chot").val() == "") return "Vui lòng chọn ngày chốt";
        //else if (k == "1" && t == "") return "Vui lòng nhập đủ số ngày chốt";
        //else if (k == "2" && t == "") return "Vui lòng nhập đủ số ngày chốt";
        //else if (k == "3" && t == "") return "Vui lòng nhập đủ số ngày chốt";
        //return "";
    } catch (e) {
        console.log(e);
    }
}

function f_thietlap_nhom() {
    var objUser = JSON.parse(localStorage.getItem("userinfo"));
    var tree_node = JSON.parse(localStorage.getItem("tree_node"))[0];
    var p = getAllIdMod();
    var v_Code = tree_node.id;
    var timethietlap = p.ngay_chot;
    var v_fixday = 6;
    var v_circle = p.sokychot;
    var v_fixmonth = p.ngay_chot;
    var v_timeday = p.gio_chot
    //if (p.dt_thang.length > 9) {
    //    v_fixmonth = "01/" + p.dt_thang.substr(3, 7);
    //} else {
    //    v_fixmonth = "01/" + p.dt_thang;
    //};
    var ngaychot = v_fixday;
    var v_userId = objUser.userid

    var config = {
        connstr: "ConnectOracle_Amiss4",
        namesql: "PKG_THIETLAPCHOT.THIETLAPKYCHOT_NHOM",
        callback: "f_result_thietlap"
    };
    var para = {
        v_Code: v_Code,
        v_ngaychot: ngaychot,
        v_giochot: v_timeday,
        v_kychot: v_circle,
        v_thangchot: v_fixmonth,
        v_userId: v_userId,
        v_timethietlap: timethietlap,
        //v_IP: G_IP,
        //v_IPlocal: G_localIP
        v_IP: '',
        v_IPlocal: ''
    }

    callLoad();

    ExecuteServiceSyns(config, para);
}

function f_thietlap_ddo() {
    var objUser = JSON.parse(localStorage.getItem("userinfo"));
    var tree_node = JSON.parse(localStorage.getItem("tree_node"))[0];
    var p = getAllIdMod();

    var v_type = 1;
    var v_MeterId = tree_node.id;
    var v_madiemdo = "";
    var timethietlap = p.ngay_chot;
    var v_fixday = new Date(timethietlap).getDay();
    var v_giochot = p.gio_chot;
    var v_circle = p.sokychot;
    var v_fixmonth = p.ngay_chot;
    //if (p.dt_thang.length > 9) {
    //    v_fixmonth = "01/" + p.dt_thang.substr(3, 7);
    //} else {
    //    v_fixmonth = "01/" + p.dt_thang;
    //};
    var ngaychot = v_fixday;
    var v_userId = objUser.userid

    var config = {
        connstr: "ConnectOracle_Amiss4",
        namesql: "PKG_THIETLAPCHOT.THIETLAPKYCHOT_DDO",
        callback: "f_result_thietlap"
    };

    var para = {
        v_MeterId: v_MeterId,
        v_ngaychot: ngaychot,
        v_giochot: v_giochot,
        v_kychot: v_circle,
        v_thangchot: v_fixmonth,
        v_userId: v_userId,
        v_timethietlap: timethietlap,
        v_IP: '',
        v_IPlocal: ''
    }
    callLoad();
    ExecuteServiceSyns(config, para);
}

function f_result_thietlap(config, para, lst) {
    try {
        stopLoad();
        var data = lst.data;
        if (data[0].count > 0) {
            showToast('Cập nhật thành công ' + data[0].count + ' điểm đo', 'success');
            var s_socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto.split(';');
            
            if (s_socongto > 0)
                f_GetData_csdk_ddo(1);
            else
                f_GetData_csdk_nhom(1);
            //f_GetData_csdk_ddo(1);
            //f_loadThietlap(1);
            //f_call_job_tong_hop_csc_cmis();
        } else {
            showToast('Cập nhật thất bại', 'error');
        }
    }
    catch (e) {
        console.log(e)
    }
}

function f_loadThietlap(page) {
    try {
        if (localStorage.getItem("tree_node") == null) return;
        var objUser = JSON.parse(localStorage.getItem("userinfo"));
        var tree_node = JSON.parse(localStorage.getItem("tree_node"))[0];

        var p = getAllIdMod();

        var v_Value = tree_node.id
        var v_From = "";
        var v_To = "";
        v_From = "01/" + p.dateThang;
        var v_ChuKiChot = p.sokychot; //tree
        var v_UserId = objUser.userid;
        var v_TypeValue = tree_node.socongto == "0" ? 2 : 1;

        var config = {
            connstr: "ConnectOracle_Amiss4",
            namesql: "PKG_THIETLAPCHOT.THONGTINNGAYCHOT",
            callback: "f_result_load_thietlap"
        };
        var para = {
            v_Value: v_Value,
            v_From: v_From,
            v_ChuKiChot: v_ChuKiChot,
            v_TypeValue: v_TypeValue,
            v_pagenum: page,
            v_numrecs: 10,
        };
        ExecuteServiceSyns(config, para);
    }
    catch (e) {
        console.log(e);
    }
}

function f_result_load_thietlap(config, para, lst) {

    try {
        $("#tlnc_data tbody").empty();
        if (lst == null || lst == undefined || lst == "[]") return;

        var data = lst.data;
        if (data == null || data == undefined || data.length == 0) return;
        var strData = '';
        countData = data[0].rowscount;
        $.each(data, function (i, val) {

            var giochotdl = (val.giochotdl != '' && val.giochotdl != '-') ? val.giochotdl : "00:00";
            strData += "<tr class='bang'><td class='center'>"
                            + val.rnum + "</td><td class='center'>"
                            + val.madiemdo + "</td><td class='cl'>"
                            + val.tendiemdo + "</td><td class='center'>"
                            + val.socongto + "</td><td class='center'>"
                            + val.ngaychotdl + "</td>";
        });

        $("#tlnc_data tbody").append(strData);

        $(".sobanghi").html("Tổng số " + countData + "<span tkey='banghi'></span>");
        selectlang();
        LoadPhanTrang("pageLst_tlnc", "pageCurent_tlnc", data, function () {
            f_loadThietlap($("#pagenumber").val());
        });

    }
    catch (e) {
        console.log(e)
    }
}

function f_call_job_tong_hop_csc_cmis() {
    try {
        var config = {
            connstr: "ConnectOracle_Amiss4",
            namesql: "PKG_DONGBOCMIS.JOB_TinhCSC_Thietlap",
            callback: "f_result_call_job"
        };
        var para = {
        };
        ExecuteServiceSyns(config, para);
    }
    catch (e) {
        console.log(e);
    }
}

function f_result_call_job(config, para, result) {
    try {

        if (!result && !result.data && result.data[0].kq == 1) {
            showToast('Đã tính xong chỉ số chốt, có thể xem dữ liệu chốt ngay.', 'success');
        }
    } catch (e) {
        console.log(e);
    }
}