$(document).ready(function () {
    try {
        showhideTree();
        var denngay = localStorage.getItem("dateT");
        if (denngay == "") {
            setValToTxt("date_denngay", gettimenow());
        } else {
            setValToTxt("date_denngay", denngay);
        }

        if (localStorage.getItem("tree_node")) {
            selectlang();
            var istype = JSON.parse(localStorage.getItem("tree_node"))[0].type;
            var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
            var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
            if (socongto != "0") {
                $("#tendiemdo_span").html("<i class='icon fa fa-ban'></i>Vui lòng chọn Sổ ghi hoặc đơn vị để xem dữ liệu");
               
                $(".loc_chisohienthi").hide();
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
            selectlang();
            $("#tendiemdo_span").html("Vui lòng chọn đơn vị để xem dữ liệu");
            $("#tab_content").empty();
            $(".loc_chisohienthi").hide();
        }
        selectlang();
        initformelement();
        if (localStorage.getItem("dateF") == "" && localStorage.getItem("dateT") == "") {
            $("#date_denngay").val(gettimenow());
        } else {
            $("#date_denngay").val(localStorage.getItem("dateT"));
        }
        $("#date_denngay").change(function () {
            localStorage.setItem("dateT", $("#date_denngay").val());
        });
        //loadContent();
        get_locthongso(0);
        $("#btn_thuchien_lts").click(function () {
            get_locthongso(0);
        })
        $("#BaoCao_pha").change(function () {
            if ($("#BaoCao_pha option:selected").val() == 1) {
                $("#cb_locbang option[value='CSCTT']").hide();
                $("#cb_locbang option[value='CSC']").show();
            }
            else if ($("#BaoCao_pha option:selected").val() == 3 || $("#BaoCao_pha option:selected").val() == 31) {
                $("#cb_locbang option[value='CSCTT']").show();
                $("#cb_locbang option[value='CSC']").hide();
            }
            else {
                $("#cb_locbang option[value='CSCTT']").show();
                $("#cb_locbang option[value='CSC']").show();
            }
        })
        $("#excel_locchso").click(function () {
            try{
                excel_locthongso();
            } catch (e) {
                console.log(e);
            }
        });

    } catch (e) {
        console.log(e.message);
    }
});

function get_locthongso(page) {
    try {
        var p =getAllIdMod();
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_LOCCHISO.LOCCHISO", callback: "result_locthongso" };
        var para = {
            v_Value: code,
            v_To: p.date_denngay,
            v_Code: p.BaoCao_pha,
            v_TypeBaocao: p.cb_locbang,
            v_Dulieu: p.cb_locdulieu,
            v_dTo: p.date_denngay,
            v_dFrom: p.date_denngay,
            v_pagenum: page,
            v_numrecs: 20,
        };
        callLoad();
        console.log(para);
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_locthongso(config, para, lst) {
    try {
        var data = lst.data;
     
        if (data.length == 0) {
            $(".sobanghi").html("<span tkey='khongcodulieu'></span>");
            $("#lts_data tbody").empty();
            $("#pageCurent_lts_kh").html('');
            $("#pageLst_lts_kh").html('');
            selectlang();
            stopLoad();
            return;
        }
        var tr = "";
        $.each(data, function (i, val) {
            tsbanghi = val.rowscount;
            tr += '<tr>' +
                    '<td class="a_c">' + val.rnum + '</td>' +
                    '<td class="text-bold">' + setnull(val.madiemdo) + '</td>' +
                    '<td class=" a_c">' + setnull(val.socongto) + '</td>' +
                    '<td class=" a_c">' + setnull(val.tendiemdo) + '</td>' +
                    '<td class=" a_c">' + setnull(val.matram) + '</td>' +
                    '<td class=" a_c">' + setnull(val.maso) + '</td>' +
                    '<td class=" a_c">' + setnull(val.macot) + '</td>' +
                    '<td class=" a_c">' + setnull(val.sort) + '</td>' +
                    '<td class=" a_c">' + setnull(val.diachikhachhang) + '</td>' +
                    '<td class=" a_c">' + setnull(val.dienluc) + '</td>' +
                    '<td class=" a_c">' + setnull(val.dulieu) + '</td>' +
                    '<td class=" a_c">' + setnull(val.pgiaotong) + '</td>'+
                    '<td class=" a_c">' + setnull(val.thoidiem) + '</td>';
                    if (val.ison == "Offline")
                        tr += '<td class="a_c mkn">' + val.ison + '</td>';
                    else
                        tr += '<td class="a_c kn">' + val.ison + '</td>';
                    tr += '</tr>';
        });
        $("#lts_data tbody").empty();
        $("#lts_data tbody").append(tr);
        $(".sobanghi").html("<span tkey='hienthi'></span>" + data.length + "/" + data[0].rowscount + "<span tkey='banghi'></span>");
        selectlang();
        stopLoad();
        LoadPhanTrang_("pageLst_lts_kh", "pageCurent_lts_kh", data, function () {
            get_locthongso($("#pagenumber").val() - 1);
        });
    } catch (e) {
        console.log(e);
    }
}
function excel_locthongso() {
    try {
        var p = getAllIdMod();
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var tungay = p.date_denngay
        var date = tungay.replace("/", "_").replace("/", "_");
      //  var namef_l = 'LOCBAOCAOCAO';
        var namef_l = 'LOCBAOCAOCAO_' + date;
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "AMISS_VANHANH.BAOCAOTHONGTIN", namefile: namef_l };
        var para = {
            v_Type: 1,//-- 1: Dienluc(Code); 2:Tram(CodeDM)  3:Nhom(GroupId) 4: List ID;
            v_Value: code,
            v_From: '',
            v_To: p.date_denngay,
            v_SoGhi: '', //-- SoGhi -- lay tai bang Meter_Info
            v_ChungLoai: '',//--Loaicongto - lay trong TreoThao
            v_LoaiCongTo: '',//--TypePha -- lay trong TreoThao
            v_TrangThai: 0,
            v_ChuKiChot: 0,
            v_UserId: 1,
            v_Permission: 1,
            v_TypeValue: 2,//-- 2: Code di?n l?c, 1 là MeterId ma diem do
            v_HeThong: 1,
            v_Code: p.BaoCao_pha,
            v_TypeBaocao: p.cb_locbang,
            v_Dulieu: p.cb_locdulieu,
            v_dTo: p.date_denngay,
            v_dFrom: p.date_denngay,
            v_pagenum: 1,
            v_numrecs: 100000,
        };
        
        var colum = {
            kq: [
            { field: "rnum", name: "STT", type: "TextAndBoldCenter" },
            { field: "madiemdo", name: "Mã điểm đo", type: "TextAndBoldCenter" },
            { field: "makhachhang", name: "Mã khách hàng", type: "TextAndBoldCenter" },
            { field: "imei", name: "imei", type: "TextAndBoldCenter" },
            { field: "tendiemdo", name: "Tên khách hàng", type: "TextAndBoldCenter" },
            { field: "socongto", name: "Số công tơ", type: "TextAndBoldCenter" },
            { field: "matram", name: "Mã trạm", type: "Text" },
            { field: "maso", name: "Mã sổ", type: "Text" },
            { field: "macot", name: "Mã cột", type: "Text" },
            { field: "sort", name: "Số thứ tự", type: "Text" },
            { field: "diachikhachhang", name: "Địa chỉ", type: "Text" },
            { field: "dienluc", name: "Điện lực", type: "Text" },
            { field: "dulieu", name: "Có dữ liệu", type: "Text" },
            { field: "pgiaotong", name: "Chỉ số", type: "Text" },
            { field: "thoidiem", name: "Ngày có dữ liệu gần nhất", type: "Text" },
            { field: "ison", name: "Trạng thái", type: "Text" }
            ]
        };
        ExecuteExportExcelOracle(config, para, colum);
    } catch (e) {
        console.log(e);
    }
}

