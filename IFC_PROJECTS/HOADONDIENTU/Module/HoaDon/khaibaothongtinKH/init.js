$(document).ready(function () {
    loadInitDate();
    $("#KBKH_DateCreate").val(gettimenow());

    $("#btn_ThemKH").click(function () {
        f_themKH();
    });

    initformelement();
});

function f_themKH() {
    try {
        var p = getAllIdMod();

        var config = { namesql: "HD_PKG_KHACHHANG.ThemKH", callback: "f_result_themKh", connstr: "Oracle_HDDT" };
        var para = {
            v_MASOGHI : p.KBHK_MaSG,
            v_LOAIDIEMDO: p.KBKH_MaDD,
            v_MADIACHINH: p.KBKH_MaDChinh,
            v_MAKHACHHANG: p.KBKH_MaKhưH,
            v_TENKHACHHANG: p.KBKH_TenKH,
            v_MASOTHUEIN: p.KBKH_MaSThue,
            v_DIACHIIN: p.KBKH_DiaChi,
            v_MANN,
            v_MAKHUVUC,
            v_STT,
            v_MATRAM,
            v_MALO,
            v_MATO,
            v_SOHO,
            v_SOPHA,
            v_MACONGTO,
            v_SOCONGTO,
            v_HESONHAN,
            v_IDNHOMKH,
            v_NGAYTAO: p.KBKH_DateCreate
        };

        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
