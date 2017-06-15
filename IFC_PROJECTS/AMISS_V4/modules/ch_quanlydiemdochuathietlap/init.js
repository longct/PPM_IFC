$(document).ready(function () {
    showhideTree();
    try {
        var sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        //console.log(sct);
        if (sct != "0") {
            $("#apquyen").html("Vui lòng chọn Sổ ghi hoặc Đơn vị");
            $("#tl_danhsach").hide();
            return;
        }
        $("#tl_danhsach").show();
        LoadListProfile();
        Aplycauhinh();
    } catch (e) {
        console.log(e);
    }
});
// vẽ ra các điểm chưa thiết lập cấu hinh
function LoadListProfile() {
    try {
        var tree = JSON.parse(localStorage.getItem("tree_node"));
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CAUHINHCANHBAO.GetListDiemDoNotApply", callback: "result_LoadListProfile" };
        var para = {
            v_ValueNode: tree[0].id
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_LoadListProfile(config, para, lst) {
    try {

        var data = lst.data;

        $("#sobanghi_dd_tl").html("TỔNG CÓ " + data.length + "  ĐIỂM ĐO");
        if (data == "" || data == null || data == undefined || data.length == 0) {
            $("#sobanghi_dd_tl").html("Không có dữ liệu");
            $("#ch_quanlydiemdotl_data").empty();
            return;
        }
        $("#ch_quanlydiemdotl_data").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr idcau=" + val.id + "><td>"
                + val.stt + "</td><td>"
                + setnull(val.madiemdo) + "</td><td>"
                + setnull(val.socongto) + "</td><td>"
                + setnull(val.tendiemdo) + "</td><td>"
                + setnull(val.diachikhachhang) + "</td><td>"
                + setnull(val.ngaylap) + "</td><td>"
                + '<input type="checkbox"  name="cauhinh" class="cauhinh" /></td></tr>';

            $("#ch_quanlydiemdotl_data").append(row);

        });

    } catch (e) {
        console.log(e);
    }
}
// vẽ ra thiết lập cấu hình
function Aplycauhinh() {
    try {
        var tree = JSON.parse(localStorage.getItem("tree_node"));
        var ParentNode = localStorage.getItem("CT");
        var ValueNode = localStorage.getItem("DL");
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CAUHINHCANHBAO.GetListProfile", callback: "result_Aplycauhinh" };
        var para = {
            v_TypeNode: '2',
            v_ParentNode: ParentNode,
            v_ValueNode: ValueNode,
            v_UserId: userinfo.userid
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_Aplycauhinh(config, para, lst) {
    try {
        var data = lst.data;
        if (data == "" || data == null || data == undefined || data.length == 0) {
            $("#tabl_thietlapch").hide();
            $("#cauhinhapdung").empty();
            return;
        }
        $("#tabl_thietlapch").show();
        $("#cauhinhapdung").empty();

        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + (key + 1) + "</td><td>"
                + setnull(val.profilename) + "</td><td>"
                + setnull(val.insertdate) + "</td><td>"
                + setnull(val.username) + "</td><td>"
                + setnull(val.updatedate) + "</td><td>"
                + setnull(val.thuocdienluc) + "</td><td>"
                + " <form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action'  value='" + val.profileid + "' id='btn_apdung" + val.profileid + "'> Áp dụng </a></div></form></td></tr>";
            //+ " <form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action' data-toggle='modal' href='#confimYesNo' value='" + val.profileid + "' id='btn_apdung" + val.profileid + "'> Áp dụng </a></div></form></td></tr>";

            $("#cauhinhapdung").append(row);

            $("#btn_apdung" + val.profileid).click(function () {
                f_confimYesNo("Chắc chắn muốn áp dụng cấu hình", "Bỏ qua", "Xác nhận", function () {
                    Layidkhachhang(val.profileid);
                });

            });
        });


    } catch (e) {
        console.log(e);
    }
}
// Áp dụng cấu hình
function Layidkhachhang(profileid) {
    try {
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var paraa = [];
        $('#ch_quanlydiemdotl_data tr').each(function () {
            if ($(($(this).find(".cauhinh"))).is(':checked') == true) {
                var info = $(this).attr("idcau");
                paraa.push(info);
            } else {
                var info = '';
            }
        });
        if (paraa == "[]" || paraa.length == 0) {
            
            showToast("Vui lòng chọn điểm đo để thiết lập cấu hình ", "error");
            return;
        }

        var tree = JSON.parse(localStorage.getItem("tree_node"));
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CAUHINHCANHBAO.ApplyProfileCanhBao", callback: "result_Layidkhachhang" };
        var para = {
            v_Type: '2',
            v_TypeValue: '3',
            v_Value:  paraa.toString(),
            v_ProfileId: profileid,
            v_UserId: userinfo.userid
        };
      
        ExecuteServiceSyns(config, para);


    } catch (e) {
        console.log(e);
    }
}
function result_Layidkhachhang(config, para, lst) {
    try{
        var data = lst.data;
        var row = data[0].count;
      
        if (row > 0) {
            showToast("Thiết lập thành công cho " + row + " điểm đo", "success");
            setTimeout(function () { LoadListProfile(); }, 1500);
        } else {
            showToast("Lỗi thiết lập ", "error");
        }


    } catch (e) {
        console.log(e);
    }
}




















