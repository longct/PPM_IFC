using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net.Mime;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using System.Xml;

namespace ServiceSql_Oracle_New.Controllers
{


    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public virtual ActionResult DownloadXml()
        {
            try
            {
                var sp = Request.FilePath.Split('/');
                if (sp == null) return null;
                var fileName = sp[sp.Length - 1];
                string fullPath = Path.Combine(Server.MapPath("~/UploadFile/Xml"), fileName);
                return File(fullPath, "application/xml", fileName);
            }
            catch { return null; }
        }


        public JsonResult ReadExcel()
        {
            try
            {
                Dictionary<string, string> dicAppSet = null;
                if (dicAppSet == null || dicAppSet.Count == 0)
                {
                    general gn = new general();
                    dicAppSet = gn.ReadAppseting();
                    if (dicAppSet == null || dicAppSet.Count == 0)
                        Json("{\"result\":\"ERROR\",\"data\":[{\"status\":\"Đọc appsetting lỗi\"}]}");
                }

                var path = dicAppSet["path_saveonserver"];

                string fileName = "";
                for (int i = 0; i < Request.Files.Count; i++)
                {

                    HttpPostedFileBase file = Request.Files[i]; //Uploaded file
                    //Use the following properties to get file's name, size and MIMEType
                    int fileSize = file.ContentLength;
                    fileName = file.FileName;
                    string mimeType = file.ContentType;
                    System.IO.Stream fileContent = file.InputStream;
                    if (!Directory.Exists(path))
                        Directory.CreateDirectory(path);
                    //To save file, use SaveAs method
                    file.SaveAs(path + fileName); //File will be saved in application root
                    var itemp = this.Request.Form;
                    var parr = new Dictionary<string, string>();
                    foreach (var key in itemp.AllKeys)
                    {
                        parr.Add(key.ToLower(), itemp[key]);
                    }

                    gnReadExcel ex = new gnReadExcel();
                    var dt = ex.readfileExcel(path + fileName, parr["select"] + " ", " " + parr["where"]);

                    var ds = new DataSet();
                    ds.Tables.Add(dt);
                    general gn = new general();
                    var data = gn.ConvertDatasetToListJson(ds);
                    if (data == null) return Json("{\"result\":\"ERROR\",\"data\":[{\"status\":\"Lỗi khi ConvertDatasetToListJson\"}]}");
                    var json = gn.ConvertListToJson(data);
                    var strResult = Json("{\"result\":\"OK\",\"data\":" + json + "}");

                    System.IO.File.Delete(path + fileName);

                    return strResult;
                }
                return Json("{\"result\":\"OK\",\"data\":[{\"status\":\"Không nhận được file\"}]}");
            }
            catch (Exception ex)
            {
                return Json("{\"result\":\"ERROR\",\"data\":[{\"status\":\"" + ex.Message.Replace("\n", "") + "\"}]}");
            }

        }


        public JsonResult ReadFileXml()
        {
            try
            {
                Dictionary<string, string> dicAppSet = null;
                if (dicAppSet == null || dicAppSet.Count == 0)
                {
                    general gn = new general();
                    dicAppSet = gn.ReadAppseting();
                    if (dicAppSet == null || dicAppSet.Count == 0)
                        Json("{\"result\":\"OK\",\"data\":\"Đọc appsetting lỗi\"}");
                }

                string fileName = "";
                for (int i = 0; i < Request.Files.Count; i++)
                {
                    HttpPostedFileBase file = Request.Files[i]; //Uploaded file
                                                                //Use the following properties to get file's name, size and MIMEType
                    int fileSize = file.ContentLength;
                    fileName = file.FileName;
                    string mimeType = file.ContentType;
                    System.IO.Stream fileContent = file.InputStream;


                    //To save file, use SaveAs method
                    string filePath = dicAppSet["path_saveonserver"] + fileName;
                    file.SaveAs(filePath); //File will be saved in application root
                    var itemp = this.Request.Form;
                    var parr = new Dictionary<string, string>();
                    foreach (var key in itemp.AllKeys)
                    {
                        parr.Add(key.ToLower(), itemp[key]);
                    }

                    XmlDocument doc = new XmlDocument();
                    doc.Load(filePath);

                    var dsHead = new DataSet();
                    DataSet ds = new DataSet();
                    ds.ReadXml(new XmlNodeReader(doc));

                    var dt = new DataTable("dt");
                    dt.Columns.Add("Header");
                    dt.Rows.Add(ds.GetXmlSchema());
                    ds.Tables.Add(dt);

                    general gn = new general();
                    var data = gn.ConvertDatasetToListJsonNoLower(ds);
                    if (data == null) return Json("{\"result\":\"ERROR\",\"data\":\"Lỗi khi ConvertDatasetToListJson\"}");
                    var json = gn.ConvertListToJson(data);
                    var strResult = Json("{\"result\":\"OK\",\"data\":" + json + "}");

                    System.IO.File.Delete(filePath);
                    return strResult;
                }
                return Json("{\"result\":\"OK\",\"data\":\"Không nhận được file\"}");
            }
            catch (Exception ex)
            {
                return Json("{\"result\":\"ERROR\",\"data\":\"" + ex.Message + "\"}");
            }

        }

        public JsonResult UploadFile()
        {
            try
            {
                general gn = new general();
                var dicAppSet = gn.ReadAppseting();
                string fileName = "";
                for (int i = 0; i < Request.Files.Count; i++)
                {
                    HttpPostedFileBase file = Request.Files[i]; //Uploaded file
                    //Use the following properties to get file's name, size and MIMEType
                    int fileSize = file.ContentLength;
                    fileName = file.FileName;
                    string mimeType = file.ContentType;
                    System.IO.Stream fileContent = file.InputStream;

                    //To save file, use SaveAs method
                    file.SaveAs(dicAppSet["path_saveonserver"] + fileName);
                    // var pathSave = Server.MapPath("~/UploadFile/") ;
                    //  file.SaveAs(Server.MapPath(pathSave)); //File will be saved in application root


                }
                var strResult = Json("{\"result\":\"OK\",\"data\":\"" + fileName + "\"}");
                return strResult;
                //  return Json("{\"result\":\"OK\",\"data\":\"Không nhận được file\"}");
            }
            catch (Exception ex)
            {
                return Json("{\"result\":\"ERROR\",\"data\":\"" + ex.Message + "\"}");
            }

        }


        [HttpGet]
        //public FileResult DownloadFileHoaDon(ValueModelOracle value)
        //{
        //    if (value == null || value.config == null) return null;
        //    try
        //    {
        //        general gn = new general();
        //        Dictionary<string, string> dicAppSet = gn.ReadAppseting();
        //        if (dicAppSet == null || dicAppSet.Count == 0)
        //            return null;
        //        // Nếu user download là chính KH thì cập nhật trạng thái download vào db
        //        var dicConfig = gn.ParaConvertDicPara(value.config);
        //        if (dicConfig["filename"].Contains(dicConfig["user"]))
        //        {
        //            gnOracle orc = new gnOracle();
        //            var json = orc.ExcuteStores(value.config, value.para, dicAppSet);
        //        }

        //        //var filepath =  System.IO.Path.Combine(Server.MapPath("/Files/"), fileName);

        //        var filepath = dicAppSet["hddt_path_downloadfilehoadon"] + dicConfig["filename"];
        //        return File(filepath, MimeMapping.GetMimeMapping(filepath), dicConfig["filename"]);
        //    }
        //    catch (Exception)
        //    {
        //        return null;
        //    }
        //}

        //public FileResult DownloadFileHoaDonDaKy(ValueModelOracle value)
        //{
        //    if (value == null || value.config == null) return null;
        //    try
        //    {
        //        general gn = new general();
        //        Dictionary<string, string> dicAppSet = gn.ReadAppseting();
        //        if (dicAppSet == null || dicAppSet.Count == 0)
        //            return null;
        //        // Nếu user download là chính KH thì cập nhật trạng thái download vào db
        //        var dicConfig = gn.ParaConvertDicPara(value.config);
        //        if (dicConfig["filename"].Contains(dicConfig["user"]))
        //        {
        //            gnOracle orc = new gnOracle();
        //            var json = orc.ExcuteStores(value.config, value.para, dicAppSet);
        //        }

        //        //var filepath =  System.IO.Path.Combine(Server.MapPath("/Files/"), fileName);

        //        var filepath = dicAppSet["hddt_path_filehoadondaky"] + dicConfig["filename"];
        //        return File(filepath, MimeMapping.GetMimeMapping(filepath), dicConfig["filename"]);
        //    }
        //    catch (Exception)
        //    {
        //        return null;
        //    }
        //}
        public FileResult DownloadFileHoaDonDaKy()
        {
            var sp = Request.FilePath.Split('/');
            if (sp == null) return null;
            var fileName = sp[sp.Length - 1];
            gnSqlNomal gn = new gnSqlNomal();
            general gns = new general();
            var dicAppSet = gns.ReadAppseting();
            //var filepath =  System.IO.Path.Combine(Server.MapPath("/Files/"), fileName);

            var filepath = dicAppSet["hddt_path_filehoadondaky"] + fileName;
            //File z = File(filepath, MimeMapping.GetMimeMapping(filepath), fileName);
            return File(filepath, MimeMapping.GetMimeMapping(filepath), fileName);
        }

        public FileResult DownloadFileHoaDon()
        {
            var sp = Request.FilePath.Split('/');
            if (sp == null) return null;
            var fileName = sp[sp.Length - 1];
            gnSqlNomal gn = new gnSqlNomal();
            general gns = new general();
            var dicAppSet = gns.ReadAppseting();
            //var filepath =  System.IO.Path.Combine(Server.MapPath("/Files/"), fileName);

            var filepath = dicAppSet["hddt_path_downloadfilehoadon"] + fileName;
            //File z = File(filepath, MimeMapping.GetMimeMapping(filepath), fileName);
            return File(filepath, MimeMapping.GetMimeMapping(filepath), fileName);
        }
        public FileResult DownloadFileSaveOnServer()
        {
            var sp = Request.FilePath.Split('/');
            if (sp == null) return null;
            var fileName = sp[sp.Length - 1];
            gnSqlNomal gn = new gnSqlNomal();
            general gns = new general();
            var dicAppSet = gns.ReadAppseting();
            //var filepath =  System.IO.Path.Combine(Server.MapPath("/Files/"), fileName);

            var filepath = dicAppSet["path_saveonserver"] + fileName;
            return File(filepath, MimeMapping.GetMimeMapping(filepath), fileName);
        }

        public JsonResult UploadFileMau()
        {
            try
            {
                general gn = new general();
                var dicAppSet = gn.ReadAppseting();
                string fileName = "";
                for (int i = 0; i < Request.Files.Count; i++)
                {
                    HttpPostedFileBase file = Request.Files[i]; //Uploaded file
                    //Use the following properties to get file's name, size and MIMEType
                    int fileSize = file.ContentLength;
                    fileName = file.FileName;
                    string mimeType = file.ContentType;
                    System.IO.Stream fileContent = file.InputStream;

                    //To save file, use SaveAs method
                    file.SaveAs(dicAppSet["hddt_path_filetemplate"] + fileName);
                    // var pathSave = Server.MapPath("~/UploadFile/") ;
                    //  file.SaveAs(Server.MapPath(pathSave)); //File will be saved in application root


                }
                var strResult = Json("{\"result\":\"OK\",\"data\":\"" + fileName + "\"}");
                return strResult;
                //  return Json("{\"result\":\"OK\",\"data\":\"Không nhận được file\"}");
            }
            catch (Exception ex)
            {
                return Json("{\"result\":\"ERROR\",\"data\":\"" + ex.Message + "\"}");
            }

        }

        public JsonResult MCF_Upload_Firmware()
        {
            try
            {
                general gn = new general();
                var dicAppSet = gn.ReadAppseting();
                string fileName = "";
                HttpPostedFileBase file = Request.Files[0];

                int fileSize = file.ContentLength;
                fileName = file.FileName;
                string mimeType = file.ContentType;
                System.IO.Stream fileContent = file.InputStream;
                var strResult = Json("{\"result\":\"OK\",\"data\":\"OK\"}");
                if (!System.IO.File.Exists(dicAppSet["mcf_path_firmware"] + fileName))
                {
                    file.SaveAs(dicAppSet["mcf_path_firmware"] + fileName);
                    strResult = Json("{\"result\":\"OK\",\"data\":\"" + fileName + "\"}");
                }
                else
                {
                    strResult = Json("{\"result\":\"ERROR\",\"data\":\"Đã tồn tại, vui lòng chọn firmware khác hoặc xóa file cũ trước khi upload\"}");
                }
                //string fullpath = dicAppSet["mcf_path_firmware"] + fileName;
                //fullpath = Regex.Replace(fullpath, @"\\", @"\\");

                return strResult;
                //  return Json("{\"result\":\"OK\",\"data\":\"Không nhận được file\"}");
            }
            catch (Exception ex)
            {
                return Json("{\"result\":\"ERROR\",\"data\":\"" + ex.Message + "\"}");
            }
        }

        public JsonResult MCF_Delete_Firmware(string fileName)
        {
            try
            {
                general gn = new general();
                var dicAppSet = gn.ReadAppseting();
                if (System.IO.File.Exists(dicAppSet["mcf_path_firmware"] + fileName))
                    System.IO.File.Delete(dicAppSet["mcf_path_firmware"] + fileName);
                var strResult = Json("{\"result\":\"OK\",\"data\":\"" + fileName + "\"}");
                return strResult;
            }
            catch (Exception ex)
            {
                return Json("{\"result\":\"ERROR\",\"data\":\"" + ex.Message + "\"}");
            }
        }

        public JsonResult MCF_Getlist_Firmware()
        {
            try
            {
                general gn = new general();
                var dicAppSet = gn.ReadAppseting();
                string[] filePaths = Directory.GetFiles(dicAppSet["mcf_path_firmware"], "*.hex",
                                         SearchOption.TopDirectoryOnly);

                var json = gn.ConvertListToJson2(filePaths.ToList());
                var strResult = Json("{\"result\":\"OK\",\"data\":" + json + "}");
                return strResult;
                //  return Json("{\"result\":\"OK\",\"data\":\"Không nhận được file\"}");
            }
            catch (Exception ex)
            {
                return Json("{\"result\":\"ERROR\",\"data\":\"" + ex.Message + "\"}");
            }
        }

        [HttpGet]
        public virtual ActionResult Download_MCF_Firmware(string fileName)
        {
            try
            {
                general gn = new general();
                var dicAppSet = gn.ReadAppseting();
                string fullPath = dicAppSet["mcf_path_firmware"] + fileName;
                return File(fullPath, "application/text", fileName);
            }
            catch { return null; }
        }

        public JsonResult UploadFileHopDongScan()
        {
            try
            {
                general gn = new general();
                var dicAppSet = gn.ReadAppseting();
                string fileName = "";
                for (int i = 0; i < Request.Files.Count; i++)
                {
                    HttpPostedFileBase file = Request.Files[i]; //Uploaded file
                    //Use the following properties to get file's name, size and MIMEType
                    int fileSize = file.ContentLength;
                    fileName = file.FileName;
                    string mimeType = file.ContentType;
                    System.IO.Stream fileContent = file.InputStream;

                    //To save file, use SaveAs method
                    file.SaveAs(dicAppSet["hddt_path_filescan"] + fileName);
                    // var pathSave = Server.MapPath("~/UploadFile/") ;
                    //  file.SaveAs(Server.MapPath(pathSave)); //File will be saved in application root


                }
                var strResult = Json("{\"result\":\"OK\",\"data\":\"" + fileName + "\"}");
                return strResult;
                //  return Json("{\"result\":\"OK\",\"data\":\"Không nhận được file\"}");
            }
            catch (Exception ex)
            {
                return Json("{\"result\":\"ERROR\",\"data\":\"" + ex.Message + "\"}");
            }

        }

        public FileResult DownloadFileMau()
        {
            var sp = Request.FilePath.Split('/');
            if (sp == null) return null;
            var fileName = sp[sp.Length - 1];
            gnSqlNomal gn = new gnSqlNomal();
            general gns = new general();
            var dicAppSet = gns.ReadAppseting();
            //var filepath =  System.IO.Path.Combine(Server.MapPath("/Files/"), fileName);

            var filepath = dicAppSet["hddt_path_filetemplate"] + fileName;
            return File(filepath, MimeMapping.GetMimeMapping(filepath), fileName);
        }

        public FileResult DownloadFileChuaKy()
        {
            var sp = Request.FilePath.Split('/');
            if (sp == null) return null;
            var fileName = sp[sp.Length - 1];
            gnSqlNomal gn = new gnSqlNomal();
            general gns = new general();
            var dicAppSet = gns.ReadAppseting();
            //var filepath =  System.IO.Path.Combine(Server.MapPath("/Files/"), fileName);

            var filepath = dicAppSet["hddt_path_downloadfilechuaky_log"] + fileName;
            return File(filepath, MimeMapping.GetMimeMapping(filepath), fileName);
        }

        public JsonResult UploadFileDaKy()
        {
            try
            {
                general gn = new general();
                var dicAppSet = gn.ReadAppseting();
                string fileName = "";
                for (int i = 0; i < Request.Files.Count; i++)
                {
                    HttpPostedFileBase file = Request.Files[i]; //Uploaded file
                    //Use the following properties to get file's name, size and MIMEType
                    int fileSize = file.ContentLength;
                    fileName = file.FileName;
                    string mimeType = file.ContentType;
                    System.IO.Stream fileContent = file.InputStream;

                    //To save file, use SaveAs method
                    //file.SaveAs(dicAppSet["hddt_path_downloadfilehoadon"] + fileName);
                    file.SaveAs(dicAppSet["hddt_path_filehoadondaky"] + fileName);
                    // var pathSave = Server.MapPath("~/UploadFile/") ;
                    //  file.SaveAs(Server.MapPath(pathSave)); //File will be saved in application root


                }
                var strResult = Json("{\"result\":\"OK\",\"data\":\"" + fileName + "\"}");
                return strResult;
                //  return Json("{\"result\":\"OK\",\"data\":\"Không nhận được file\"}");
            }
            catch (Exception ex)
            {
                return Json("{\"result\":\"ERROR\",\"data\":\"" + ex.Message + "\"}");
            }

        }


    }
}