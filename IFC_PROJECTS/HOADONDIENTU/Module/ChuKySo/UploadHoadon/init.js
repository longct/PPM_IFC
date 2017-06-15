$(document).ready(function () {
    try {
        loadConetent();

        $("#btnUpload").click(function () {
            f_uploadFileMauHd_thdm();
        });
    } catch (e) {
        console.log(e);
    }
});
function f_uploadFileMauHd_thdm()
{
    var fdata = new FormData();
    var file = $("#txt_file_khhd_t").get(0).files;
    console.log($("#txt_file_khhd_t").get(0));
    console.log($("#txt_file_khhd_t"));
    if (!file || file.length === 0) {
        messInfo("messinfo_khhd_t", "Hãy chọn file hóa đơn tải lên", "error");
        return;
    }
    $(file).each(function (i, item) {
        fdata.append("file" + i, item);
    });

    console.log(fdata);
    console.log(fdata.entries);
    console.log(fdata.values);
    console.log(fdata.getAll);

    var config = { callback: "f_result_uploadFileMauHd_thdm", namefile: file.name };
    api_uploadDaKy(config, fdata);

}

function f_result_uploadFileMauHd_thdm(config, para, lst)
{
    console.log(lst);
    if (!lst || lst.result !== 'OK') {
        messInfo("messinfo_khhd_t", "Quá trình tải lên có lỗi, thao tác không thành công.", "error");
        return;
    }
    showToast("Tải hóa đơn lên thành công.", "success");
    
}
