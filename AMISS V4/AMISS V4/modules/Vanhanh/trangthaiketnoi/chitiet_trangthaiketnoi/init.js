var GData = [];
$(document).ready(function () {
    showhideTree();
    try{
        selectlang();
        var sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        //console.log(sct);
        if (sct != "0") {
            $("#mesMain").html("Vui lòng chọn Sổ ghi hoặc Đơn vị");
            return;
        }
        initformelement();
        get_Thongkeloi_chitiet(1);
        $(".content").scroll(function () {
            if ($(this).scrollTop() > 200) {
                set_fixheader_bdpt();
            } else if ($(this).scrollTop() <= 200) {
                remove_fixheader_bdpt();
            }
        });
        $("input[name$='r3']").click(function () {
            if ($('#docthanhcong').is(':checked')) {
                draw(0);
            }
            else if ($('#chuacodulieu').is(':checked')) {
                draw(1);
            }
            else if ($('#loimatdien').is(':checked')) {
                draw(2);
            }
            else if ($('#thanhly').is(':checked')) {
                draw(3);
            }
        });
        $("#btn_execlttketnoi").click(function () {
        
                if ($('#docthanhcong').is(':checked')) {
                    excel_chitiettrangthai(0);
                }
                else if ($('#chuacodulieu').is(':checked')) {
                    excel_chitiettrangthai(1);
                }
                else if ($('#loimatdien').is(':checked')) {
                    excel_chitiettrangthai(2);
                }
                else if ($('#thanhly').is(':checked')) {
                    excel_chitiettrangthai(3);
                }
        });

    } catch (e) {
        console.log(e.message);
    }
    
});
function set_fixheader_bdpt() {
    $(".scroll_header").css("width", $("#tsvh_data").width() + 3);
    $("#fix_header thead tr th.th_stt").css("width", $("#tsvh_data thead tr th.th_stt").width() + 16);
    $("#fix_header thead tr th.th_tdd").css("width", $("#tsvh_data thead tr th.th_tdd").width() + 16);
    $("#fix_header thead tr th.th_pha").css("width", $("#tsvh_data thead tr th.th_pha").width() + 16);
    $("#fix_header thead tr th.th_u").css("width", $("#tsvh_data thead tr th.th_u").width() + 16);
    $("#fix_header thead tr th.th_v").css("width", $("#tsvh_data thead tr th.th_v").width() + 16);
    $("#fix_header thead tr th.th_goc").css("width", $("#tsvh_data thead tr th.th_goc").width() + 16);
    $("#fix_header thead tr th.th_cos").css("width", $("#tsvh_data thead tr th.th_cos").width() + 16);
    $("#fix_header thead tr th.th_p").css("width", $("#tsvh_data thead tr th.th_p").width() + 16);
    $("#fix_header thead tr th.th_q").css("width", $("#tsvh_data thead tr th.th_q").width() + 16);
    $("#fix_header thead tr th.th_f").css("width", $("#tsvh_data thead tr th.th_f").width() + 16);
    $(".scroll_header").slideDown();
}
function remove_fixheader_bdpt() {
    $(".scroll_header").slideUp();
}


function get_Thongkeloi_chitiet(page) {
    try {
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_TRANGTHAIKETNOI.THONGKELOICHITIET", callback: "result_thongkelois_chitietttkn" };
        var para = {
           
            v_Code: code
            //v_pagenum:page,
            // v_numrecs:5 
        };
      
        callLoad();
        ExecuteServiceSyns(config, para);
        //  
    } catch (e) {
        console.log(e);
    }
}

function result_thongkelois_chitietttkn(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "[]") return;
        var data = lst.data;
        GData = data;
        draw(0);
    } catch (e) {
        console.log(e);
    }
}
function draw(d) {
    try {
        var tr = "";
        var data = GData[d];
        switch (d) {
            case 0:
                data = GData[d].kq0;
                break;
            case 1:
                data = GData[d].kq1;
                break;
            case 2:
                data = GData[d].kq2;
                break;
            case 3:
                data = GData[d].kq3;
                break;
        }
        //////console.log(data);
        $.each(data, function (key, val) {
            tr += '<tr>' +
                        '<td class="th_stt1pha">' + val.stt + '</td>' +
                        '<td class="td_1pha">' + val.madiemdo + '</td>' +
                        '<td class="td_1pha">' + val.imei + '</td>' +
                        '<td class="td_1pha a_r">' + val.socongto + '</td>' +
                        '<td class="td_1pha a_r">' + rep_trangthai(val.status) + '</td>' +
                        '<td class="td_1pha a_r">' + val.time_gannhat + '</td>' +
                        '<td class="td_1pha">' + val.tendiemdo + '</td>' +
                    '</tr>';
        })
        $("#thongkechitiet_data tbody").empty();
        $("#thongkechitiet_data tbody").append(tr);
        $(".sobanghi").html("<span tkey='co'></span>" +'Số bản ghi ' + data.length + "<span tkey='banghi'></span>");
        selectlang();
        stopLoad();
        //LoadPhanTrang("pageLst_ttkn_kh", "pageCurent_ttkn_kh", data, function () {
        //    get_Thongkeloi_chitiet($("#pagenumber").val());
        //});
    } catch (e) {
        console.log(e);
    }
}
function rep_trangthai(t) {
    try{
        if (t == 1) {
            return "Đang kết nối";
        }
        else {
            return "Chưa xác định";
        }
    } catch (e) {
        console.log(e);
    }
}
function excel_chitiettrangthai(bang) {
    try {
        console.log('bang');
        console.log(bang);
        var tungay = gettimenow();
        var date = tungay.replace("/", "_").replace("/", "_");
        var namef_l = 'THONGKECHITIET_' + date;
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_TRANGTHAIKETNOI.THONGKELOICHITIET", namefile: namef_l, exporttable: bang };
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id; 
        var para = {
            v_Type: 1,// 1: Dienluc(Code); 2: Nhom(UserId); 3:Nhom(GroupId); 4:Tram(CodeDM)
            v_Value: code,
            v_From: '',
            v_To: '',
            v_SoGhi: '', // SoGhi -- lay tai bang Meter_Info
            v_ChungLoai: '',// Loaicongto - lay trong TreoThao
            v_LoaiCongTo: 0,// TypePha -- lay trong TreoThao
            v_TrangThai: 0,
            v_ChuKiChot: 0,
            v_UserId: 1,
            v_Permission: 1
        };
        var colum = {
            kq: [
                { field: "stt", name: "STT", type: "TextAndBoldCenter" },
                { field: "madiemdo", name: "Mã Điểm đo", type: "TextAndBoldCenter" },
                { field: "imei", name: "IMEI", type: "Text" },
                { field: "socongto", name: "Số Công Tơ", type: "Text" },
                { field: "status", name: "Trạng Thái Modem", type: "Text" },
                { field: "time_gannhat", name: "Thời Điểm Có Dữ Liệu", type: "Text" },
                { field: "ghichu", name: "Ghi Chú", type: "Text" },
                { field: "tendiemdo", name: "Tên Khách Hàng", type: "Text" },
                { field: "dienluc", name: "Điện Lực", type: "Text" },
                { field: "repeaterid", name: "RF ID", type: "Text" },
                { field: "ma_cot", name: "Cột", type: "Text" },
                { field: "so_ho", name: "Số hộ", type: "Text" },
            ]
        };
        ExecuteExportExcelOracle(config, para, colum);

    } catch (e) {
        console.log(e);
    }
}