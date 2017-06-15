$(document).ready(function () {
    showhideTree();
    initformelement();
    var tungay = localStorage.getItem("dateF");
    if (tungay == "") {
        setValToTxt("chonngay_txt", gettimenow());
    }else{
        setValToTxt("chonngay_txt", tungay);
    }
    if (localStorage.getItem("tree_node")) {
        var istype = JSON.parse(localStorage.getItem("tree_node"))[0].type;
        var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        if (socongto != "0") {
            $("#mesMain").html("<i class='icon fa fa-ban'></i>Chức năng không áp dụng cho một điểm đo.");
            $("#thongke_cbvh_matap_details").empty();
            $("#thongke_cbvh_matap_toolbar").empty();
            return;
        }
    }
    get_CBVH_MatAp();
    $("#btn_thuchien_matap").click(function () {

        get_CBVH_MatAp();
    });
    $("#btn_execl_matap").click(function () {
        excel_locaptheotuan();
    });
});
function get_CBVH_MatAp() {
    try {
        var count = $("#count_").val();
        var chonngay = $("#chonngay_txt").val();
        if (chonngay == "") {
            showToast("Chưa chọn ngày xem dữ liệu", "error");
            return;
        }
        var tungay = localStorage.getItem("dateF");
        var denngay = localStorage.getItem("dateT");
        if (tungay == "") tungay = gettimenow();
        if (denngay == "") denngay = gettimenow();
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_CANHBAOVANHANH.ThongKeCanhBao_Matdienap", callback: "drawTable_thongkecbvh_matap" };
        var para = {
          
            V_CODE: code,
            v_Count: count,
            v_NgayChon: chonngay
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function drawTable_thongkecbvh_matap(config, para, lst) {
    try {
        var data = lst.data;       
        var ngaythang = data[1].kq1[0];
        if (ngaythang.length != 0) {
            $("#cbvh_thu2").html("(" + ngaythang.t2 + ")");
            $("#cbvh_thu3").html('(' + ngaythang.t3 + ')');
            $("#cbvh_thu4").html('(' + ngaythang.t4 + ')');
            $("#cbvh_thu5").html('(' + ngaythang.t5 + ')');
            $("#cbvh_thu6").html('(' + ngaythang.t6 + ')');
            $("#cbvh_thu7").html('(' + ngaythang.t7 + ')');
            $("#cbvh_cn").html('(' + ngaythang.cn + ')');
        }
        var data_ = data[0].kq0;

        if (data_ == null || data_ == undefined || data_ == "" || data_.length == 0) {
            $(".sobanghi").html("Không có dữ liệu hiển thị");
            $("#thongke_cbvh_matap_details tbody").empty();
            return;
        }
        var tr= "";
        $.each(data_, function (key, val) {
            tr += '<tr class="a_c">' +
                        '<td class="a_c">' + val.stt + '</td>' +
                        '<td class="">' + val.name + '</td>' +
                        '<td class="a_c">' + val.t2 + '</td>' +
                        '<td class="a_c">' + val.t3 + '</td>' +
                        '<td class="a_c">' + val.t4 + '</td>' +
                        '<td class="a_c">' + val.t5 + '</td>' +
                        '<td class="a_c">' + val.t6 + '</td>' +
                        '<td class="a_c">' + val.t7 + '</td>' +
                        '<td class="a_c">' + val.cn + '</td>' +
                    '</tr> ';
        });
        $("#thongke_cbvh_matap_details tbody").empty();
        $("#thongke_cbvh_matap_details tbody").append(tr);
    } catch (e) {
        console.log(e);
    }
}
function excel_locaptheotuan() {
    try {
        var count = $("#count_").val();
        var chonngay = $("#chonngay_txt").val();
        var tungay = localStorage.getItem("dateF");
        if (tungay == "") tungay = gettimenow();
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var date = chonngay.replace("/", "_").replace("/", "_");
        //  var namef_l = 'LOCBAOCAOCAO';
        var namef_l = 'THONGKECANHBAOTTUAN' + date;
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_CANHBAOVANHANH.ThongKeCanhBao_Matdienap", namefile: namef_l };
        var para = {
            v_Type: 1,//-- 1: Dienluc(Code); 2: Nhom(UserId); 3:Nhom(GroupId); 4:Tram(CodeDM)
            v_Value: code,
            v_UserId: 1,
            v_Permission: 1,
            v_Count:parseInt(count),
            v_NgayChon: chonngay
        };
        var colum = {
            kq: [
            { field: "rnum", name: "STT", type: "TextAndBoldCenter" },
            { field: "name", name: "Đơn vị", type: "TextAndBoldCenter" },
            { field: "t2", name: "Thứ 2", type: "Text" },
            { field: "t3", name: "Thứ 3", type: "Text" },
            { field: "t4", name: "Thứ 4", type: "Text" },
            { field: "t5", name: "Thứ 5", type: "Text" },
            { field: "t6", name: "Thứ 6", type: "Text" },
            { field: "t7", name: "Thứ 7", type: "Text" },
            { field: "cn", name: "Chủ nhật", type: "Text" }
            ]
        };
        ExecuteExportExcelOracle(config, para, colum);
    } catch (e) {
        console.log(e);
    }
}

