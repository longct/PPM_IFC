var Profileida;
$(document).ready(function () {
    try {
        showhideTree();
        var sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        if (sct != "0") {
            $("#quanly_cht").html("Vui lòng chọn Sổ ghi hoặc Đơn vị");
            return;
        }
        CB_DSCAUHINH();
        $("#btn_cb_taomoi").click(function () {
            localStorage.removeItem("projectId");
            $(".tab_cbvh.active").attr("data-value", "cb_cauhinh/cb_thietlapcb");
            set_active("cb_cauhinh/cb_thietlapcb");
        });
    } catch (e) {
        console.log(e);
    }
});
// vẽ ra thiết lập cấu hình
function CB_DSCAUHINH() {
    try {
        var ParentNode = localStorage.getItem("CT"); // lưu điện lực 0101
        var ValueNode = localStorage.getItem("DL"); // lưu đơn vị điện lực 010102
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_CAUHINHCANHBAO.GETDANHSACHCAUHINH", callback: "result_cb_dscauhinh" };
        var para = {
            v_codeCT: ParentNode,
            v_codeDL: ValueNode
        };
        console.log(para);
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_cb_dscauhinh(config, para, lst) {
    try {
        console.log(lst);
        var data = lst.data;
        $("#tbl_cb_dscauhinh").empty();
        if (data == "" || data == null || data == undefined || data.length == 0) {
            return;
        }
        $.each(data, function (key, val) {
            var r = val.trangthai == 1 ? "<span style='font-size:12px;color:#00c0ef'>Đang áp dụng</span><br><a class='btn btn-success btn-action'  onclick='boapdung_tl_cb(" + val.profileid + "," + val.loaipha + ")'> Bỏ áp dụng</a>" : " <form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action'  onclick='apdung_tl_cb(" + val.profileid + "," + val.loaipha + ")'> Áp dụng </a></div></form>";
            var row = "";
            row += "<tr><td>"
                + (key + 1) + "</td><td>"
                + setnull(val.tencauhinh) + "</td><td>"
                + setnull(val.username) + "</td><td>"
                + setnull(val.insertdate) + "</td><td>"
                + setnull(val.updatedate) + "</td><td>"
                + setnull(val.thuocdienluc) + "</td><td>"
                + setnull(val.loaipha) + " pha</td><td class='c'>"
                + r + "</td><td class='c'>"
                + " <form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action'  onclick='chitiet_tl_cb(" + val.profileid + ")'> Xem </a></div></form></td><td class='c'>"
                + " <form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action'  onclick='btn_xoa_cd(" + val.profileid + "," + val.loaipha + ")'> Xóa </a></div></form></td></tr>";
            $("#tbl_cb_dscauhinh").append(row);


          
        });


    } catch (e) {
        console.log(e);
    }
}
function btn_xoa_cd(id,loaipha) {
    f_confimYesNo("Chắc chắn muốn xóa", "Bỏ qua", "Xác nhận", function () {
        Xoa_thietlap(id,loaipha);
    });
}
function apdung_tl_cb(id, loaipha) {
    var tree = JSON.parse(localStorage.getItem("tree_node"));
    f_confimYesNo("Chắc chắn muốn áp dụng cấu hình cho " + tree[0].tendiemdo, "Bỏ qua", "Xác nhận", function () {
        ApplyProfile_thietlap(id, loaipha);
    });
}
function chitiet_tl_cb(id) {
    $(".tab_cbvh.active").attr("data-value", "cb_cauhinh/cb_thietlapcb");
    set_active("cb_cauhinh/cb_thietlapcb");
    Profileida = id;
    localStorage.setItem("projectId", id);
}

// Hàm áp dụng thiết lập
function ApplyProfile_thietlap(profileid, loaipha) {
    try {
        var tree = JSON.parse(localStorage.getItem("tree_node"));
        var v_codeDL = tree[0].meterid;
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_CAUHINHCANHBAO.APDUNGCAUHINHCBDIEMDO", callback: "result_ApplyProfile_thietlap_cd" };
        var para = {
            v_ProfileId: profileid,
            v_LoaiPha: loaipha,
            v_CodeDL: v_codeDL
        };
        console.log(para);
        ExecuteServiceSyns(config, para);



    } catch (e) {
        console.log(e);
    }
}
function result_ApplyProfile_thietlap_cd(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row > 0) {
            showToast("Thiết lập thành công cho " + row + " điểm đo", "success");
        } else {
            showToast("Thiết lập thành công cho " + row + " điểm đo", "success");
        }
        CB_DSCAUHINH();
    } catch (e) {
        console.log(e);
    }
}
// xóa
function Xoa_thietlap(profileid,loaipha) {
    try {
        var tree = JSON.parse(localStorage.getItem("tree_node"));
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_CAUHINHCANHBAO.XOACAUHINHCANHBAO", callback: "result_Xoa_thietlap" };
        var para = {
            v_ProfileId: profileid,
            v_CODEDL: tree[0].meterid,
            v_LoaiPha: loaipha
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_Xoa_thietlap(config, para, lst) {
    try {
        if (lst == null) return;
        var data = lst.data;
        var row = data[0].count;
        if (row > 0) {
            showToast("Xóa thành công", "success");
        } else {
            showToast("Không xóa được", "error");
        }
        CB_DSCAUHINH();
    } catch (e) {
        console.log(e);
    }
}
