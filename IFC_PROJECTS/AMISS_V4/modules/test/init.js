$(document).ready(function () {
    get_TSVH_KH(0);
    getHH();
});

function getHH() {
    $.ajax({
        url: "http://116.212.51.1:8081/Data.aspx/GetCanhBao",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa("username:password"));
        },
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        data: '{ "makhang": "", "madv": "PA2205", "loaicanhbao": "0", "tungay": "/Date(1484265600000)/", "denngay": "/Date(1484265600000)/" }',
        success: function (data) {
            alert(JSON.stringify(data));
        },

        disableCaching: false,
        error: function () {
            alert("Cannot get data");
        }
    });
}

function get_TSVH_KH(page) {
    try {
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_VANHANH.TSVH_KHACHHANG", callback: "result_tsvh_kh" };
        var para = {
            v_MeterId: 201052,
            v_Socongto: '201607018909',
            v_dFrom: '30/11/2016',
            v_dTo: '13/01/2017',
            v_pagenum: 0,
            v_numrecs: 20,
            v_Phase: "",
            v_UFrom: "",
            v_UTo: "",
            v_IFrom: "",
            v_ITo: "",
            v_AngleFrom: "",
            v_AngleTo: "",
            v_FregFrom: "",
            v_FregTo: "",
            v_CosFrom: "",
            v_CosTo: "",
            v_PFrom: "",
            v_PTo: "",
            v_QFrom: "",
            v_QTo: "",
        };
        callLoad();
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function result_tsvh_kh(config, para, lst) {
    genTable("test", dataAnalyze(lst));
    //$.jsontotable(JSON.stringify(lst), { id: "#test", header: false });
}

function dataAnalyze(lst) {
    var orgData = lst.data;
    var analyzeData = [];
    $.each(orgData, function (key, val) {
        var temp = [];
        $.each(val, function (key, col) {
            temp.push(col);
        })
        analyzeData.push(temp);
    })
    return analyzeData;
}
function genTable(id, data) {
    $("#" + id).attr("class", "table table-responsive table-bordered table-striped");
    $("#" + id + " thead").addClass("bg-aqua-gradient");
    var tr = "";
    $.each(data, function (key, row) {
        var td = "";
        $.each(row,function(key,col){
            td += '<td>' + col + '</td>';
        })
        tr += '<tr>' + td + '</tr>';
    })
    $("#" + id + " tbody").empty();
    $("#" + id + " tbody").append(tr);
}


