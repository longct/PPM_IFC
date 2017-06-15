$(document).ready(function () {
    try {

        lstngahang();
        loadcoquanthue();
        $("#btn_khang").click(function () {


        });

        $("#txt_tencoquan_kbct").change(function () {

            loadcoquanthue();
        });

    } catch (e) {
        console.log(e);
    }
});
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#txt_imgae')
                .attr('src', e.target.result)
                .width(150)
                .height(200);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
function check_kbct() {
    try{
        var p = getAllIdMod();
        if (p.txt_masothue_kbct == "") return "Mã số thuế không được bỏ trống";
        if (p.txt_ctydienluc_kbct == "") return "Công ty điện lực không được bỏ trống";
        if (p.txt_diachi_kbct = "") return "Địa chỉ không được bỏ trống";
        if (p.txt_dienthoai_kbct = "") return "Điện thoại không được bỏ trống";
        if ($.isNumeric(p.txt_dienthoai_kbct) == false) return "Số điện thoại phải là số";
        if (p.txt_email_kbct == "" ) return "Email không được để trống";
        if (IsEmail(p.txt_email_kbct) == false) return "Không đúng định dạng email";
        if (p.txt_nlienhe_kbct == "") return "Người liên hệ không được bỏ trống";
        if (p.txt_nguoipluat_kbct == "") return "Người đại diện pháp luật không được bỏ trống";
        if (p.txt_sotainhn_kbct == "") return "Số tài khoản ngân hàng không được bỏ trống";
        if (p.txt_chutaikhoan_kbct == "") return "Chủ tài khoản không được bỏ trống";
        if (p.cb_tenhang_kbct == "-1") return "Vui lòng chọn tên ngân hàng";
        if (p.txt_chutaikhoan_kbct == "") return "Chủ tài khoản không được bỏ trống";
        if (p.txt_coquanthue_kbct == "") return "Cơ quan thuế không được bỏ trống";

    } catch (e) {
        console.log(e);
    }
}
function lstngahang() {
    try{
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_NGANHANG", callback: "result_lstngahang" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lstngahang(config, para, lst) {
    try{
        var data = lst.data;
        if (data == "" || data == '[]' || data == null || data == undefined) return;
        dataToCob("cb_tenhang_kbct", data, "id", "tenn_hang", "-1", "Chọn ngân hàng ");
    } catch (e) {
        console.log(e);
    }
}
function loadcoquanthue() {
    try {
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_COQTHUE", callback: "result_loadcoquanthue" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_loadcoquanthue(config, para, lst) {
    try{
        var data = lst.data;
        if (data == [] || data == null || data == undefined || data.length == 0) return;
      
        var nameArr = [];
        nameArr.length = 0;
        $.each(data, function (key, val) {
            nameArr.push({
                id: val.ma_cqt,
                value: val.tencqt,
                label: val.tencqt   
            });
        });
       
        $("#txt_tencoquan_kbct").autocomplete({
            minLength: 1,
            delay: 200,
            source: nameArr,
            select: function (event, ui) {
                setValToTxt("txt_coquanthue_kbct", ui.item.id);
                setValToTxt("txt_tencoquan_kbct", ui.item.label);
                }
        });

    } catch (e) {
        console.log(e);
    } 
}