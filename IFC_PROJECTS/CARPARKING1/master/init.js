$(document).ready(function () {
    try {
        loadConetent();
        if (!localStorage.getItem("userinfo")) {
            $(location).attr('href', 'login.html');
        }
        var userinfo = localStorage.getItem("userinfo");
        if (userinfo == null || userinfo == undefined)
            window.location.replace = "login.html";
   
        $("#logout").click(function () {
            localStorage.removeItem("userinfo");
            $(location).attr('href', 'login.html');
        })
      
        listdonvi_master();

        $("#cbDonVi_master").change(function () {
            var p = getAllIdMod();
            var pt = getAllIdModText();
            var info = { code: p.cbDonVi_master, tendonvi: pt.cbDonVi_master }
            localStorage.setItem("infotree", JSON.stringify(info));
         
            try {
               
                f_loadChangeTree();
            }
            catch (e) { }
           
        });

    } catch (e) { console.log(e); }
});


function listdonvi_master() {
    try {
        var config = { namesql: "CAR_CAYLISTBOX.CAYCAR", callback: "f_result_listdonvi_master", connstr: "Oracle_HDDT" };
        var infouser = JSON.parse(localStorage.getItem('userinfo'));
        var para = { v_CODE:'01' };
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
        dataToCob("cbDonVi_master", lst.data, "code", "ten");
        $('select#cbDonVi_master').find('option').each(function () {
            var text;
            if ($(this).val().length === 4) {
                text = $(this).text();
                $(this).text("-- " + text);
            }
            if ($(this).val().length == 6) {
                text = $(this).text();
                $(this).text("----- " + text);
            }
            if ($(this).val().length == 8) {
                text = $(this).text();
                $(this).text("-------- " + text);
            }
        });
        var p = getAllIdMod();
        var pt = getAllIdModText();
        var info = { code: p.cbDonVi_master, tendonvi: pt.cbDonVi_master }
        localStorage.setItem("infotree", JSON.stringify(info));

    } catch (e) {
        console.log(e);
    }
}