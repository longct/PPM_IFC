using Newtonsoft.Json;
using SignLib;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net.Mime;
using System.Runtime.Serialization.Formatters.Binary;
using System.Web;
using System.Web.Mvc;
using System.Xml;

namespace ServiceSql_Oracle_New.Controllers
{
    

    public class DigitallySign_VeryfyController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public string Verify_Xml()
        {
            try
            {
                string fileName = "";
                
                    HttpPostedFileBase file = Request.Files[0]; //Uploaded file
                                                                //Use the following properties to get file's name, size and MIMEType
                    int fileSize = file.ContentLength;
                    fileName = file.FileName;
                    string mimeType = file.ContentType;
                    System.IO.Stream fileContent = file.InputStream;
                    if (!Directory.Exists(Server.MapPath("~/UploadFile/")))
                        Directory.CreateDirectory(Server.MapPath("~/UploadFile/"));

                    //To save file, use SaveAs method
                    string filePath = Server.MapPath("~/UploadFile/") + fileName;
                    file.SaveAs(filePath); //File will be saved in application root
                    var itemp = this.Request.Form;
                    var parr = new Dictionary<string, string>();
                    foreach (var key in itemp.AllKeys)
                    {
                        parr.Add(key.ToLower(), itemp[key]);
                    }

                var serialNumber = parr["serialnumber"];
                bool check = false;
                XmlSignature cv = new XmlSignature(serialNumber);
                try
                {
                     check = cv.VerifyDigitalSignature(filePath, 1);
                }catch(Exception ex)
                {
                    return "{\"result\":\"OK\",\"data\":\"ERROR\"}";
                }
                if(check)
                    return "{\"result\":\"OK\",\"data\":\"SUCCESS\"}";
                return "{\"result\":\"OK\",\"data\":\"ERROR\"}";
            }
            catch (Exception ex)
            {
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"" + ex.Message.Replace("\n", "") + "\"}]}";
            }

        }
        
    }
}