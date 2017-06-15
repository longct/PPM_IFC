var lstMeter;
var listM;
var listM_string;
$(document).ready(function () {
    try {
        $("#md_phieudieudong").on('show.bs.modal', function () {
            lstMeter = [];
            listM = [];
            listM_string = "";
            $('#tbl_ctcb_data input:checkbox:checked').each(function (key, val) {
                lstMeter.push({ mid: $(val).data("value"), mkh: $(val).data("mkh"), tenkh: $(val).data("tenkh") });
            });
            //localStorage.setItem("lstM", JSON.stringify(lstMeter));
            console.log(lstMeter);

            var tr = "";
            $("#dskh_ tbody").empty();
            $.each(lstMeter, function (key, val) {
                listM.push(val.mid);
                tr += "<tr>" +
                      "<td>" + (key + 1) + "</td>" +
                      "<td>" + val.mkh + "</td>" +
                      "<td>" + val.tenkh + "</td>" +
                      "</tr>";
            })
            listM_string = listM.toString();
            $("#dskh_ tbody").append(tr);
            $("#ds_diemdo").click(function () {
                if ($(this).hasClass("hide_tab")) {
                    $(this).removeClass("hide_tab");
                    $("#ds_table").slideDown();
                }
                else {
                    $(this).addClass("hide_tab");
                    $("#ds_table").slideUp();
                }
            })
        });

        initformelement();

        $("#btn_lapphieu").click(function () {
            createBallot();
        })
    } catch (e) {
        console.log(e);
    }
});
function createBallot() {
    console.log(listM_string);
    try {
        //console.log("OK");        
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_BAOCAO_CBVH.UPDATE_BALLOT_PRO", callback: "result_update_ballot" };
        var para = {
            v_ListMeter: listM_string,
            v_BallotId: 0,
            v_BallotName: $("#txt_tenphieu").val(),
            v_NhanVien: $("#txt_nvdienluc").val(),
            v_StatusKp: $("#cb_trangthaiphieu option:selected").val(),
            v_Note: $("#ta_ghichu").val(),
            v_UserId: 1,
        };
        //console.log(para);
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }

}


function result_update_ballot(config, para, lst) {
    var data = lst.data[0];
    console.log(JSON.stringify(data).substring(7, 8));
    if (JSON.stringify(data).substring(7,8) == "1") {
        $("#mesMod").html("<label class='text-green'>Tạo phiếu thành công</label>");
    } else {
        $("#mesMod").html("<label class='text-red'>Cập nhật không thành công !</label>");
    }

}