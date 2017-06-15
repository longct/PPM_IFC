$(document).ready(function () {
    try {
        loadConetent();
        if (!localStorage.getItem("userinfo")) {
            $(location).attr('href', 'login.html');
        }
        var userinfo = localStorage.getItem("userinfo");
        if (userinfo == null || userinfo == undefined)
            window.location.replace = "login.html";
        listdonvi_master();
        $("#logout").click(function () {
            localStorage.removeItem("userinfo");
            $(location).attr('href', 'login.html');
        })
        //localStorage.getItem("action");
        Loadbreadcrumb();
        $("a.linktomod").click(function () {
            var link = ($(this).parent().parent().parent()[0].innerText.replace(/\n.*/g, ""));
            localStorage.setItem("action", link + " → " + $(this).text()); 
            //console.log(link.replace(/\n.*/g,""));
            Loadbreadcrumb();
        })


        $("#cbDonVi_master").change(function () {
            var p = getAllIdMod();
            var pt = getAllIdModText();
            var info = { code: p.cbDonVi_master, tendonvi: pt.cbDonVi_master }
            localStorage.setItem("infotree", JSON.stringify(info));
            console.log(localStorage.getItem("infotree"));

            try {
                f_loadChangeTree();
            }
            catch (e) { }
        });
    } catch (e) { console.log(e); }
});

function Loadbreadcrumb() {
    $("#bread").empty();
    if (localStorage.getItem("action").toLowerCase() != "xăng dầu → xăng dầu")
        $("#bread").append(" " + localStorage.getItem("action"));
    else
        $("#bread").append("Trang chủ");

}
function listdonvi_master() {
    try {
        var config = { namesql: "PKG_USER.LST_DONVI", callback: "f_result_listdonvi_master", connstr: "ConnOracleXangDau" };
        var infouser = JSON.parse(localStorage.getItem('userinfo'));
        var para = { V_IDNHANVIEN: infouser.idnhanvien };

        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_listdonvi_master(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst.data == null || lst.data == undefined || lst.data.length == 0) {
            // messInfo("messinfo_master", "Username hoăc Password của bạn đã sai ", "error");
            return;
        }
        dataToCob("cbDonVi_master", lst.data, "code", "tendonvi");
        var p = getAllIdMod();
        var pt = getAllIdModText();
        var info = { code: p.cbDonVi_master, tendonvi: pt.cbDonVi_master }
        localStorage.setItem("infotree", JSON.stringify(info));

    } catch (e) {
        console.log(e);
    }
}