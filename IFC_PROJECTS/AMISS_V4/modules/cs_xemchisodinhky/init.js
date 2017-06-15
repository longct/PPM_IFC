var isMulti = 0;

$(document).ready(function () {
    try {
        showhideTree();
        selectlang();
        initformelement();
        if ($(".datepicker").val() == "") $(".datepicker").val(gettimenow_cscthang());
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

            if (socongto != "0") {
                $('#filter_multimeter').hide();
                $('#filter_1meter').show();
            } else {
                $('#filter_1meter').hide();
                $('#filter_multimeter').show();
            }

            var s_socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto.split(';');
            $.each(s_socongto, function (i, val) {
                $('#cb_socongto').append('<option>' + val + '</option>');
            });

            if (s_socongto > 0)
                f_GetData_csdk_1();
            else
                f_GetData_csdk_multi();
        }
        else {
            $("#tendiemdo_span").html("Vui lòng chọn điểm đo hoặc nhóm điểm đo để xem dữ liệu");
            $("#tab_content").empty();
            $('#filter_1meter').hide();
            $('#filter_multimeter').show();
            return;
        }
        if ($(".content").hasClass("hidetree")) {
            $(".colslape_tree").click();
        }

        $('#btnExecMulti').click(function () {
            f_GetData_csdk_multi();
        });

        $('#btnExec').click(function () {
            f_GetData_csdk_1();
        });
        $("#excel_xemcs").click(function () {
            excel();
        })
    } catch (e) {
        console.log(e.message);
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

function f_GetData_csdk_multi() {
    try {
        isMulti = 1;
        var p = getAllIdMod();

        var v_Type = "1"; // dien luc, nhom
        var v_Value = JSON.parse(localStorage.getItem("tree_node"))[0].id; // codedl
        var v_From = ""; // lọc trên tree
        var v_To = "";   // lọc trên tree
        var v_SoGhi = "";  // lọc trên tree
        var v_ChungLoai = "";  // lọc trên tree
        var v_LoaiCongTo = ""; // lọc trên tree
        var v_TrangThai = "0";  // lọc trên tree
        var v_ChuKiChot = "0"; // lọc trên tree
        var v_UserId = "1"; JSON.parse(localStorage.getItem("userinfo")).id
        var v_Permission = "1"; // quyền
        var v_Date = "";
        if (p.dateThang.length > 9) {
            v_Date = "01/" + p.dateThang.substr(3, 7);
        } else {
            v_Date = "01/" + p.dateThang;
        }


        var v_Ngaychot = "0"; // multi thì  = 0
        var v_HienThi = "0"; // chịu
        var v_pagenum = 0; // trang
        var v_numrecs = 100000; // bản ghi 1 trang
        var v_option = p.cboOptionGetData; // combo chọn loại dư liệu
        var v_kychot = p.kychot_multi; // combo chọn kỳ chốt

        var config = { connstr: "ConnectOracle233", namesql: "AMISS_VANHANH.CSCNGAYCMISS_LISTKH_PAGE", callback: "f_result_csdk_multi" };
        var para = {
            v_Type: v_Type,
            v_Value: v_Value,
            v_From: v_From,
            v_To: v_To,
            v_SoGhi: v_SoGhi,
            v_ChungLoai: v_ChungLoai,
            v_LoaiCongTo: v_LoaiCongTo,
            v_TrangThai: v_TrangThai,
            v_ChuKiChot: v_ChuKiChot,
            v_UserId: v_UserId,
            v_Permission: v_Permission,
            v_Date: v_Date,
            v_Ngaychot: v_Ngaychot,
            v_HienThi: v_HienThi,
            v_pagenum: v_pagenum,
            v_numrecs: v_numrecs,
            v_option: v_option,
            v_kychot: v_kychot
        };
        console.log(para);

        ExecuteServiceSyns(config, para);
        callLoad();

    } catch (e) {
        console.log(e);
    }
}

function f_GetData_csdk_1() {
    try {
        isMulti = 0
        var p = getAllIdMod();
        var v_MeterId = JSON.parse(localStorage.getItem("tree_node"))[0].meterid;
        var v_Socongto = p.cb_socongto;
        var v_dFrom = "";
        if (p.dateThang.length > 9) {
            v_dFrom = "01/" + p.date_tungay.substr(3, 7);
        } else {
            v_dFrom = "01/" + p.date_tungay;
        }
        var v_dTo = "";
        if (p.dateThang.length > 9) {
            v_dTo = "31/" + p.date_denngay.substr(3, 7);
        } else {
            v_dTo = "31/" + p.date_denngay;
        }

        var v_dTo = '31/10/2016';
        var v_HienThi = "0";
        var v_pagenum = 0;
        var v_numrecs = 100000;
        var v_kychot = p.kychot;
        var v_option = 1;

        var config = { connstr: "ConnectOracle233", namesql: "AMISS_VANHANH.CSCNGAYCMISS_KHACHHANG_PAGE", callback: "f_result_csdk_multi" };
        var para = {
            v_MeterId: v_MeterId,
            v_Socongto: v_Socongto,
            v_dFrom: v_dFrom,
            v_dTo: v_dTo,
            v_HienThi: v_HienThi,
            v_pagenum: v_pagenum,
            v_numrecs: v_numrecs,
            v_kychot: v_kychot,
            v_option: v_option,

        };

        //console.log(para);

        ExecuteServiceSyns(config, para);


    } catch (e) {
        console.log(e);
    }
}

function f_result_csdk_multi(config, para, lst) {
    try {
        $("#csdk_data tbody").empty();
        var data = lst.data;
        //console.log(data);
        if (data.length == 0) {
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
        $.each(data, function (i, val) {
            if (last != val.madiemdo && isMulti == 1) {
                last = val.madiemdo;
                strData += '<tr class="tsvh_tendiemdo"><td colspan="6">' + val.rnum + " : " + val.madiemdo + ' - ' + val.tendiemdo + ' - ' + val.socongto + ' </td></tr>';
            }

            switch (true) {
                case (val.phase == '1' || val.phase == '31'):
                    strData += '<tr class="totalcs" >';
                    strData += '<td  class="">' + getNameInOrder(0, val.phase, 1) + '</td>';
                    //strData += '<td class="" >' + (val.chisocu == null ? '-' : val.ngaycu) + '</td>';
                    strData += '<td class="">' + (val.chisocu == null ? '-' : val.chisocu) + '</td>';
                    strData += '<td  class="">' + setnull(val.pgiaotong) + '</td>';
                    strData += '<td  class="">' + setnull(val.billingdateend) + '</td>';
                    strData += '<td class="" >' + setnull((val.slgiao + '')) + '</td>';
                    strData += '</tr>';
                    break;
                default:
                    $.each(arrName, function (idx, name) {
                        strData += '<tr class="totalcs" >';
                        strData += '<td class="">' + setnull(getNameInOrder(idx, val.phase, 5)) + '</td>';// bieu gia
                        //strData += '<td class="" >' + (val.chisocu == null ? '-' : val.ngaycu) + '</td>';//ngay cu
                        strData += '<td class="">' + setnull(val[arrNameCu[idx]]) + '</td>'; // chi so cu
                        strData += '<td class="">' + setnull(val[name]) + '</td>'; // chỉ sổ mới
                        strData += '<td class="">' + setnull(val.billingdateend) + '</td>'; // ngày chốt
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

    var v_Type = "1"; // dien luc, nhom
    var v_Value = JSON.parse(localStorage.getItem("tree_node"))[0].id; // codedl
    var v_From = ""; // lọc trên tree
    var v_To = "";   // lọc trên tree
    var v_SoGhi = "";  // lọc trên tree
    var v_ChungLoai = "";  // lọc trên tree
    var v_LoaiCongTo = ""; // lọc trên tree
    var v_TrangThai = "0";  // lọc trên tree
    var v_ChuKiChot = "0"; // lọc trên tree
    var v_UserId = "1"; JSON.parse(localStorage.getItem("userinfo")).id
    var v_Permission = "1"; // quyền
    var v_Date = "";
    if (p.dateThang.length > 9) {
        v_Date = "01/" + p.dateThang.substr(3, 7);
    } else {
        v_Date = "01/" + p.dateThang;
    }
    var v_Ngaychot = "0"; // multi thì  = 0
    var v_HienThi = "0"; // chịu
    var v_pagenum = 0; // trang
    var v_numrecs = 100000; // bản ghi 1 trang
    var v_option = p.cboOptionGetData; // combo chọn loại dư liệu
    var v_kychot = p.kychot_multi; // combo chọn kỳ chốt

    var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
    var namef_l = 'ChiSoDinhKy_' + tendiemdo.replace('<span class=\"total\">', '_').replace('</span>', '') + "_" + v_Date.replace("/", "-");
    var config = { connstr: "ConnectOracle233", namesql: "AMISS_VANHANH.CSCNGAYCMISS_LISTKH_PAGE", namefile: namef_l };
    var para = {
        v_Type: v_Type,
        v_Value: v_Value,
        v_From: v_From,
        v_To: v_To,
        v_SoGhi: v_SoGhi,
        v_ChungLoai: v_ChungLoai,
        v_LoaiCongTo: v_LoaiCongTo,
        v_TrangThai: v_TrangThai,
        v_ChuKiChot: v_ChuKiChot,
        v_UserId: v_UserId,
        v_Permission: v_Permission,
        v_Date: v_Date,
        v_Ngaychot: v_Ngaychot,
        v_HienThi: v_HienThi,
        v_pagenum: v_pagenum,
        v_numrecs: v_numrecs,
        v_option: v_option,
        v_kychot: v_kychot
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
