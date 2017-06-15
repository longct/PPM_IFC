$(document).ready(function () {
    try {
        if (localStorage.getItem("tree_node")) {
            var istype = JSON.parse(localStorage.getItem("tree_node"))[0].type;
            var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
            var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;

            if (socongto != "0") {
                $("#tendiemdo_span").html("Vui lòng chọn đơn vị");
                return;
            }
        }
        else {
            $("#tendiemdo_span").html("Vui lòng chọn đơn vị");
            return;
        }
        get_Thongkeloi();
        $("#btn_ttthaiken_execl").click(function () {
            xuatexecl_thongkettt();
        });

    } catch (e) {
        console.log(e.message);
    }
});

function get_Thongkeloi() {
    try {
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_TRANGTHAIKETNOI.THONGKELOI", callback: "draw_bdthongke" };
        var para = {
            v_Value: code,
        };
        ExecuteServiceSyns(config, para);

    

    } catch (e) {
        console.log(e);
    }
}

function draw_bdthongke(config, para, lst) {
    try {
        var data = lst.data;
        console.log(data);
        var tr = "";
        var docthanhcong = 0;
        var chuacodulieu = 0;
        var matdien = 0;
        var thanhly = 0;
        var tongdiemdo = 0;
        $.each(data, function (key, val) {

            tr += '<tr>' +
                                '<td class="a_c">' + (key+1) + '</td>' +
                                '<td class="a_c">' + val.name + '</td>' +
                                '<td class="a_r">' + val.docthanhcong + '</td>' +
                                '<td class="a_r">' + val.loionlinenotdata + '</td>' +
                                '<td class="a_r">' + val.loimatdien + '</td>' +
                                '<td class="a_r">' + val.thanhly + '</td>' +
                                '<td class="a_r">' + val.tong + '</td>' +
                            '</tr>';
            docthanhcong += docthanhcong + parseInt(val.docthanhcong);
            chuacodulieu += chuacodulieu + parseInt(val.loionlinenotdata);
            matdien += matdien + parseInt(val.loimatdien);
            thanhly += thanhly + parseInt(val.thanhly);
        });

        $("#thongke_trangthaiketnoi tbody").empty();
        $("#thongke_trangthaiketnoi tbody").append(tr);
        // Get context with jQuery - using jQuery's .get() method.

        var barChartData = {
            labels: [],
            datasets: [
              {
                  label: "Đọc thành công",
                  //backgroundColor: ["#8BC34A", "#FF9800", "#F44336"],
                  backgroundColor: ["#00a65a"],
                  borderColor: [],
                  borderWidth: 1,
                  data: [docthanhcong]
              },
              {
                  label: "Chưa có dữ liệu",
                  //backgroundColor: ["#8BC34A", "#FF9800", "#F44336"],
                  backgroundColor: ["#dd4b39"],
                  borderColor: [],
                  borderWidth: 1,
                  data: [chuacodulieu]
              },
              {
                  label: "Lỗi mất điện",
                  //backgroundColor: ["#8BC34A", "#FF9800", "#F44336"],
                  backgroundColor: ["#3c8dbc"],
                  borderColor: [],
                  borderWidth: 1,
                  data: [matdien]
              },
              {
                  label: "Thanh lý",
                  //backgroundColor: ["#8BC34A", "#FF9800", "#F44336"],
                  backgroundColor: ["#f39c12"],
                  borderColor: [],
                  borderWidth: 1,
                  data: [thanhly]
              }
            ]
        };
        console.log(barChartData);
        var ctx = $("#barChart_thongkeketnoi").get(0).getContext("2d");
        ctx.canvas.height = 300;
        window.myBar = new Chart(ctx, {
            type: 'bar',
            data: barChartData,
            options: {
                elements: {
                    rectangle: {
                    }
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false
                        },
                        barPercentage: 0.5
                    }],
                    yAxes: [{
                        type: "linear",
                        display: true,
                        position: "left",
                        id: "y-axis-1",
                    }]
                },
                maintainAspectRatio: false,
                responsive: true,
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        fontColor: '#09f'
                    },

                },
                title: {
                    display: false,
                    text: 'Thống kê trạng thái kết nối'
                }
            }
        });
    } catch (e) {
        console.log(e);
    }

};

function xuatexecl_thongkettt() {
    try {

        var tungay = gettimenow();
        var date = tungay.replace("/", "_").replace("/", "_");
        //  var namef_l = 'LOCBAOCAOCAO';
        var namef_l = 'THONGKETRANGTHAIKETNOI' + date;
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_TRANGTHAIKETNOI.THONGKELOI", namefile: namef_l };
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
            v_InDay: '0',
            v_UserId: 1,
            v_Permission: 1,
        };

        var colum = {
            kq: [
            { field: "stt", name: "STT", type: "TextAndBoldCenter" },
            { field: "name", name: "Đơn vị", type: "TextAndBoldCenter" },
            { field: "docthanhcong", name: "Số điểm đo đọc thành công", type: "Text" },
            { field: "loitocdo", name: "Lỗi khai báo tốc độ RS232, RS485", type: "Text" },
            { field: "loionlinenotdata", name: "Online, tạm thời chưa có dữ liệu hoặc thay thế công tơ mới", type: "Text" },
            { field: "loimatdien", name: "Số điểm đo mất kết nối không có dữ liệu về", type: "Text" },
            { field: "thanhly", name: "Mất điện do thanh lý trạm hoặc bảo dưỡng", type: "Text" },
            { field: "tong", name: "Tổng điểm đo", type: "Text" },
            ]
        };
        ExecuteExportExcelOracle(config, para, colum);
    } catch (e) {
        console.log(e);
    }
}

