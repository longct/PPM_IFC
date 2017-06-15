var countpage = 10;
$(document).ready(function () {
    try {
        
        var p = getAllIdMod();
        loadConetent();
        loadInitDate();
        
        $("#btnThucHienDanhsach_baocaovattuthietbi").click(function () {
            var check = validate();
            if (check != "") {
                messInfo("messinfo_baocaovattuthietbi", check, "error");
             
                return;
            }
            messInfo("messinfo_baocaovattuthietbi"," ", "error");
        });


    } catch (e) {
        console.log(e);
    }
});

function validate() {
    try {
        var p = getAllIdMod();
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        console.log(validatePhone(p.txt_phone_baocaovattuthietbi));
        if (validatePhone(p.txt_phone_baocaovattuthietbi) == false) return "không phải là số đt";
        if ($.isNumeric(p.txt_datefrom_baocaovattuthietbi) == false) return "Khong phải là số";
        if (IsEmail(p.txt_dateto_baocaovattuthietbi) == false) return "Không phải là email"
        

        return"";
    } catch (e) {
        console.log(e);
    }
}
// kiểm tra số :$.isNumeric(p.txt_datefrom_baocaovattuthietbi)
//kiểm tra email  IsEmail(p.txt_dateto_baocaovattuthietbi);
// if ($.isNumeric(p.txt_datefrom_baocaovattuthietbi) == false) return "Khong phải là số";
function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
        return false;
    } else {
        return true;
    }
}

function validatePhone(value) {
    var filter = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
    var t = value.length;
    console.log('hihihi');
    console.log(t);
    if (filter.test(value)) {
        console.log('t1');
        return true;
       
    }
    else {
        console.log('t2');
        return false;
        
    }

}
