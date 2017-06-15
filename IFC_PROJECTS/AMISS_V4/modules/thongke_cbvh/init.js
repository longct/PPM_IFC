$(document).ready(function () {
    showhideTree();
    try{        
        //initformelement();
        //////////////////////////////////////////
        if (localStorage.getItem("tree_node")) {
            var istype = JSON.parse(localStorage.getItem("tree_node"))[0].type;
            var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
            console.log(socongto, istype);
            if (socongto != "0") {
                $("#mesMain").html("<i class='icon fa fa-ban'></i>Chức năng không áp dụng cho một điểm đo.");
                $("#thongke_cbvh_details").empty();
                $("#toolbar_thongke_cbvh").empty();
                return;
            }
        }
        get_CBVH();
        $("#lammoi").click(function () {
            $('.tab_cbvh[data-value="thongke_cbvh"]').click();
        })
        $("#xuatexec_details").click(function () {
            excel_locthongso();
        });

    }catch(e){
        console.log(e.message);
    }
});

function get_CBVH() {
    try {
        //console.log("OK");
        var tungay = localStorage.getItem("dateF");
        var denngay = localStorage.getItem("dateT");
        if (tungay == "") tungay = gettimenow();
        if (denngay == "") denngay = gettimenow();
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CANHBAOVANHANH.ThongKeCanhBao", callback: "drawTable_thongkecbvh" };
        var para = {
            v_Type:1,
            v_Value: code,
            v_From: "",
            v_To: "",
            v_SoGhi: "",
            v_ChungLoai: "",
            v_LoaiCongTo: 0,
            v_TrangThai: 0,
            v_ChuKiChot: 0,
            v_UserId: 1,
            v_Permission: 1
        };

       console.log(para);
        ExecuteServiceSyns(config, para);

        //  

    } catch (e) {
        console.log(e);
    }
}
function drawTable_thongkecbvh(config, para, lst) {
    var data = lst.data;
    var tr = "";
    var u = 0;
    var i = 0;
    var cos = 0
    var time = 0;
    var f = 0;
    var p = 0;
    $.each(data,function(key,val){
        
       if(val.aa=='1') {
            tr += '<tr>' +
              '<td class="td_stt1pha">'+(key+1)+'</td>' +
              '<td id="' + val.code + '">' + replace_n(val.name) + '</td>' +
              '<td class="a_c">' + setnullnumber(val.count_u) + '</td>' +
              '<td class="a_c">' + setnullnumber(val.count_i) + '</td>' +
              '<td class="a_c">' + setnullnumber(val.count_cos) + '</td>' +
              '<td class="a_c">' + setnullnumber(val.count_time) + '</td>' +
              '<td class="a_c">' + setnullnumber(val.count_f) + '</td>' +
              '<td class="a_c">' + setnullnumber(val.count_p) + '</td>' +
              '</tr>';
    }else{
        tr += '<tr class="text-bold">' +
        '<td class="a_c text-bold" colspan="2">' + val.name + '</td>' +
        '<td class="a_c"><a href="#"  onClick="menuClickTab(\'chitiet_cbvh\',\'U\')">' + setnullnumber(val.count_u) + '</a></td>' +
        '<td class="a_c"><a href="#"  onClick="menuClickTab(\'chitiet_cbvh\',\'I\')">' + setnullnumber(val.count_i) + '</a></td>' +
        '<td class="a_c"><a href="#"  onClick="menuClickTab(\'chitiet_cbvh\',\'COS\')">' + setnullnumber(val.count_cos) + '</a></td>' +
        '<td class="a_c"><a href="#"  onClick="menuClickTab(\'chitiet_cbvh\',\'TIME\')">' + setnullnumber(val.count_time) + '</a></td>' +
        '<td class="a_c"><a href="#"  onClick="menuClickTab(\'chitiet_cbvh\',\'FREG\')">' + setnullnumber(val.count_f) + '</a></td>' +
        '<td class="a_c"><a href="#"  onClick="menuClickTab(\'chitiet_cbvh\',\'P\')">' + setnullnumber(val.count_p) + '</a></td>' +
        '</tr>';
    }

    })
  
    $("#thongke_cbvh_details tbody").empty();
    $("#thongke_cbvh_details tbody").append(tr);
}
function replace_n(v) {
    if (v == null)
        return "Điểm đo không thuộc sổ";
    else
        return v;
}

function excel_locthongso() {
    try {
        var tungay = localStorage.getItem("dateF");
        var denngay = localStorage.getItem("dateT");
        if (tungay == "") tungay = gettimenow();
        if (denngay == "") denngay = gettimenow();
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var date = tungay.replace("/", "_").replace("/", "_");
        //  var namef_l = 'LOCBAOCAOCAO';
        var namef_l = 'THONGKECANHBAO' + date;
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CANHBAOVANHANH.ThongKeCanhBao", namefile: namef_l };
        var para = {
            v_Type: 1,
            v_Value: code,
            v_From: "",
            v_To: "",
            v_SoGhi: "",
            v_ChungLoai: "",
            v_LoaiCongTo: 0,
            v_TrangThai: 0,
            v_ChuKiChot: 0,
            v_UserId: 1,
            v_Permission: 1
        };
        var colum = {
            kq: [
            { field: "rnum", name: "STT", type: "TextAndBoldCenter" },
            { field: "name", name: "Đơn vị", type: "TextAndBoldCenter" },
            { field: "count_u", name: "Cảnh báo điện áp (U)", type: "Text" },
            { field: "count_i", name: "Cảnh báo dòng điện (I)", type: "Text" },
            { field: "count_cos", name: "Cảnh báo Cos", type: "Text" },
            { field: "count_f", name: "Cảnh báo tần số", type: "Text" },
            { field: "count_pha", name: "Cảnh báo ngược pha", type: "Text" },
            { field: "count_p", name: "Cảnh báo công suất", type: "Text" },
            { field: "count_angle", name: "Cảnh báo góc lệch pha", type: "Text" },
            { field: "count_time", name: "Cảnh báo lệch thời gian", type: "Text" },
            { field: "count_sl", name: "Cảnh báo sản lượng", type: "Text" },
            ]
        };
        ExecuteExportExcelOracle(config, para, colum);
    } catch (e) {
        console.log(e);
    }
}

