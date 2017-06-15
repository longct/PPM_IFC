var arrayThietLapCB_DM = new Array();

$(document).ready(function () {
    try {
        $("#btn_dongy_cbvh").on("click", function () {
            SaveDanhDinh();
        });
    }
    catch (e) {
        console.log(e);
    }
});
function ThemDongCB() {
    LoadSubThamSoCBDM();
}
function XoaDongCB(obj) {
    $(obj).parents("tr").remove();
}
function LoadSubThamSoCBDM() {
    var cbloai = $("#danhsach_cbvh tbody").find("tr").find("input[name='txt_cb_ts']").attr("data_loai");
    var tr = "";
    if (cbloai.indexOf("U") > -1) {
        tr += "<tr>";
        tr += "<td>TU</td>";
        tr += "<td><input type='text' name='txt_cb_ts' placeholder='1'/> (V)</td>";
        tr += "<td>=> Điện áp định mức</td>";
        tr += "<td><input type='text' name='txt_cb_tsdm' placeholder='220' /> (V)</td>";
        tr += "<td><a href='#' onclick='XoaDongCB(this)' title='Xóa'><span  class='glyphicon glyphicon-remove-sign' aria-hidden='true'></span></a></td>";
        tr += "</tr>";
    } else {
        tr += "<tr>";
        tr += "<td>TI</td>";
        tr += "<td><input type='text' name='txt_cb_ts'  placeholder='1' /> (A)</td>";
        tr += "<td>=> Dòng điện định mức</td>";
        tr += "<td><input type='text' name='txt_cb_tsdm'  placeholder='100'  /> (A)</td>";
        tr += " <td><a href='#' onclick='XoaDongCB(this)' title='Xóa'><span  class='glyphicon glyphicon-remove-sign' aria-hidden='true'></span></a></td>";
        tr += "</tr>";
    }
    $("#danhsach_cbvh").append(tr);
}

function SaveDanhDinh() {
    try {
        var v_idrandom = $("#danhsach_cbvh tbody").find("tr").find("input[name='txt_cb_ts']").attr("data-id");
        var v_loaicb = $("#danhsach_cbvh tbody").find("tr").find("input[name='txt_cb_ts']").attr("data_loai");
        clearTempCb(v_idrandom, v_loaicb);
    
    } catch (e) {
        console.log(e);
    }
}
function clearTempCb(v_idrandom, v_loaicb) {
    try{
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_CAUHINHCANHBAO.DELETE_TEMP_CB_TLDANHDINH", callback: "result_delete_cb_tldanhdinh" };
        var para = {     
            v_IDRanDom: v_idrandom,
            v_loaicb: v_loaicb
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_delete_cb_tldanhdinh(config, para, lst) {
    var check = true;
    arrayThietLapCB_DM.length = 0;
    $("#danhsach_cbvh tbody").find("tr").each(function () {
        var v_GiaTri = $(this).find("input[name='txt_cb_ts']").val() == "" ? "0" : $(this).find("input[name='txt_cb_ts']").val();
        var v_GiaTriDM = $(this).find("input[name='txt_cb_tsdm']").val();
        if (v_GiaTriDM == "") {
            check = false;
        };
        arrayThietLapCB_DM.push({
            LOAICB: para.v_loaicb,
            GIATRI: v_GiaTri,
            GIATRI_DM: v_GiaTriDM,
            ID_RANDOM: para.v_IDRanDom
        });
    });
    if (check == false) {
        showToast('Chưa nhập giá trị định mức', "error");
        return;
    }
    var table = {
        table: JSON.stringify(arrayThietLapCB_DM)
    };

    var config = {
        connstr: "ConnectOracle_Amiss4",
        insertto: "TEMP_CB_TLDANHDINH",
    }
    var lst1 = ExecuteBulkCopyOracle(config, table);
    if (lst1 != null) {

        var profileId = localStorage.getItem("projectId");
        $("#md_cb_tldm").modal("hide");
        if (para.v_loaicb.indexOf("U") > -1) {
           // gán data-id=1 để lấy dữ liệu ở bảng tạm khi click vào thêm thiết lập định mức
            if (profileId == null) {
                $("#l_tldm_u").attr("data-id", 1);// sửa giá trị lấy dữ liệu ở CB_THIETLAPDANHDINH
            } else {
                $("#l_tldm_u").attr("data-id", 2); // sửa giá trị lấy dữ liệu ở TEMP_CB_TLDANHDINH
            }
        }
        if (para.v_loaicb.indexOf("I") > -1) {
            if (profileId == null) {
                $("#l_tldm_i").attr("data-id", 1);
            } else {
                $("#l_tldm_i").attr("data-id", 2);
            }
           
        }
    }
    else {
        showToast("Lỗi cập nhật", "error");
    }

}