var countpage = 20;
$(document).ready(function () {

    // showhideTree();
    try {

        initformelement();
        loadContent();
        selectlang();
        setValToTxt("txttungay_bcdgtl", gettimenow());
        getBaoCaoDanhGiaTiLe();
        $("#btnSearch_bcdgtl").on("click", function () {
            getBaoCaoDanhGiaTiLe();
        });
    } catch (e) {
        //console.log(e.message);
    }
});
function getBaoCaoDanhGiaTiLe() {
    try {
        var config = { connstr: "ConnectOracle233", nameSql: "ADMISS_BAOCAO_BCDGTILE.BAOCAONGAY_SOCTRANG", callback: "f_resultBaoCaoDanhGiaTiLe" }
        var para = {
            v_Date: $("#txttungay_bcdgtl").val()
        }

        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);

    }
}
function f_resultBaoCaoDanhGiaTiLe(config, para, lst) {
    try {
        var data = lst.data;
        //console.log(data);
        var row = data[0].count; // trường hợp trả ra EXCEPTION WHEN NO_DATA_FOUND
        if (data.length == 0 || row !=undefined && row.length >=0) {
            $(".sobanghi").html("<span tkey='khongcodulieu'></span>");
            $("#tbl_bcdgtl tbody").empty();
            selectlang();
            stopLoad();
            return;
        }
        $(".sobanghi").html("");
        var tr = "";
        $.each(data, function (key, val) {

            tr += '<tr>' +
                  '<td>' + setnull(val.congnghe) + '</td>' +
                  '<td>' + setnull(val.loaikhachhang) + '</td>' +
                  '<td>' + setnull(val.tieuchi) + '</td>' +
                  '<td class="a_c">' + setnull(val.soluongtong) + '</td>' +
                  '<td class="a_c">' + setnull(val.tyle) + '</td>'

            tr += "</tr>";

        });
        $("#tbl_bcdgtl tbody").empty();
        $("#tbl_bcdgtl tbody").append(tr);

    } catch (ex) { //console.log(ex); }
}
function xuatexcel_cbcdgtl() {
    try {
        var p = getAllIdMod();
        var date = gettimenow().replace("/", "_").replace("/", "_");
        var namef_l = 'baocaodanhgiatile_' + date;
        var objFilter = JSON.parse(localStorage.getItem("tree_node"));
        var objuser = JSON.parse(localStorage.getItem("userinfo"));
        var config = { connstr: "ConnectOracle233", nameSql: "ADMISS_BAOCAO_BCDGTILE.BAOCAONGAY_SOCTRANG", namefile: namef_l }
        var para = {
            v_Date: $("#txttungay_bcdgtl").val(),
        }
        var colum = {
            kq: [
                { field: "congnghe", name: "Công nghệ", type: "Text" },
                { field: "loaikhachhang", name: "Loại khách hàng", type: "Text" },
                { field: "tieuchi", name: "Tiêu chí", type: "Text" },
                { field: "soluongtong", name: "Số lượng tổng", type: "Text" },
                { field: "tyle", name: "Tỷ lệ", type: "Text" },
            ]
        };
        ExecuteExportExcelOracle(config, para, colum);
    } catch (e) {
        console.log(e);
    }
}
