$(document).ready(function () {
    showhideTree();
    try {
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
            else if (istype >= "6")
                $("#tendiemdo_span").html("Trạm: " + tendiemdo);
        }
        else {
            $("#tendiemdo_span").html("Vui lòng chọn điểm đo để xem dữ liệu");
            $("#tab_content").empty();
        }
        get_DSKhachHang();
        selectlang();
        $("#excel_ttkh").click(function () {
            excel();
        })
    } catch (e) {
        console.log(e.message);
    }
});
function get_DSKhachHang() {
    try {

        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_THONGTINDIEMDO.LOCTHONGTINDIEMDO", callback: "result_DSKhachHang" };
        var para = {
            v_Type: 1,//-- 1: Dienluc(Code); 2:Tram(CodeDM)  3:Nhom(GroupId) 4: List ID;
            v_Value: code,
            v_From: "",
            v_To: "",
            v_SoGhi: "", //-- SoGhi -- lay tai bang Meter_Info
            v_ChungLoai: "",//--Loaicongto - lay trong TreoThao
            v_LoaiCongTo: 0,//--TypePha -- lay trong TreoThao
            v_TrangThai: 0,
            v_ChuKiChot: 0,
            v_UserId: 1,
            v_Permission: 1
        };
        callLoad();
        ExecuteServiceSyns(config, para);
        //console.log(para);
        //  

    } catch (e) {
        console.log(e);
    }
}
function excel() {
    var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;

    var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
    var namef = 'DanhSachDiemDo_' + tendiemdo.replace('<span class=\"total\">', '_').replace('</span>', '');
    var config = { connstr: "ConnectOracle233", namesql: "AMISS_THONGTINDIEMDO.LOCTHONGTINDIEMDO", namefile: namef };
    var para = {
        v_Type: 1,//-- 1: Dienluc(Code); 2:Tram(CodeDM)  3:Nhom(GroupId) 4: List ID;
        v_Value: code,
        v_From: "",
        v_To: "",
        v_SoGhi: "", //-- SoGhi -- lay tai bang Meter_Info
        v_ChungLoai: "",//--Loaicongto - lay trong TreoThao
        v_LoaiCongTo: 0,//--TypePha -- lay trong TreoThao
        v_TrangThai: 0,
        v_ChuKiChot: 0,
        v_UserId: 1,
        v_Permission: 1
    };
    var colum = {
        kq: [
        { field: "rnum", name: "STT", type: "TextAndBoldCenter" },
        { field: "madiemdo", name: "Mã Điểm đo", type: "TextAndBoldCenter" },
        { field: "socongto", name: "Số công tơ", type: "TextAndBoldCenter" },
        { field: "makhachhang", name: "Mã khách hàng", type: "TextAndBoldCenter" },
        { field: "tendiemdo", name: "Tên khách hàng", type: "TextAndBoldCenter" },
        { field: "diachi", name: "Địa chỉ khách hàng", type: "Text" },
        { field: "dienluc", name: "Vị trí", type: "Text" },
        { field: "maquyen", name: "Mã quyển", type: "Text" },
        { field: "matram", name: "Mã trạm", type: "Text" },
        { field: "macot", name: "Mã cột", type: "Text" },
        { field: "type_pha", name: "Loai điểm đo", type: "Text" }
        ]
    };
    //console.log(para);
    ExecuteExportExcelOracle(config, para, colum);
    //		Mã quyển			

}
function result_DSKhachHang(config, para, lst) {
    var data = lst.data;
    //console.log(data);
    if (data.length == 0) {
        $(".sobanghi").html("<span tkey='khongcodulieu'></span>");
        selectlang();
        stopLoad();
        return;
    }
    var tr = "";
    $.each(data, function (key, val) {
        tr += '<tr>'+
                    '<td>' + val.stt + '</td>' +
                    '<td>' + val.madiemdo + '</td>' +
                    '<td>' + val.imei + '</td>' +
                    '<td>' + val.socongto + '</td>' +
                    '<td>' + val.tendiemdo + '</td>' +
                    '<td>' + val.dienluc + '</td>' +
                '</tr>';
    })
    $("#ttkh_data tbody").empty();
    $("#ttkh_data tbody").append(tr);
    $(".sobanghi").html("<span tkey='hienthi'></span>" + data.length + "<span tkey='banghi'></span>");
    selectlang();
    stopLoad();
}
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