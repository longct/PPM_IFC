using Newtonsoft.Json;
using Oracle.DataAccess.Client;
using SignLib;
using System;
using System.Collections.Generic;
using System.Configuration;
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
    

    public class ReadFileKmlController : Controller
    {
        public string readKml()
        {
            try
            {
                general gn = new general();

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
                    

                // CHUYEN SANG DATASET
                var ds = new DataSet();
                XmlDocument xmlDoc = new XmlDocument();
                xmlDoc.Load(filePath);
                var xmlReader = new XmlNodeReader(xmlDoc);
                ds.ReadXml(xmlReader);
                
                var ds1 = gn.convertDatasetToLower(ds);

                if(ds1==null || ds1.Tables.Count==0)
                    return "{\"result\":\"OK\",\"data\":[{\"status\":\"Lỗi không đọc được file xml\"}]}";

                var dt = new DataTable("dt");
                dt.Columns.Add("name");
                dt.Columns.Add("coordinates");
                dt.Columns.Add("description");

                foreach(DataRow row in ds.Tables["Placemark"].Rows)
                {
                    var name = row["name"].ToString();
                    var description = row["description"].ToString();
                    var coor = ds1.Tables["Point"].Select("Placemark_id=" + row["Placemark_id"].ToString());
                    var coordinates = "";
                    if (coor != null && coor.Length > 0)
                    {
                        coordinates = coor[0]["coordinates"].ToString();
                    }
                    else
                    {
                        var coor1 = ds1.Tables["LineString"].Select("Placemark_id=" + row["Placemark_id"].ToString());
                        if (coor1 != null && coor1.Length > 0)
                        {
                            coordinates = coor1[0]["coordinates"].ToString();
                        }

                    }
                    dt.Rows.Add(name, coordinates, description);
                }

                var ds2 = new DataSet();
                ds2.Tables.Add(dt);
                var data = gn.ConvertDatasetToListJson(ds2);
                if (data == null)
                    return "{\"result\":\"OK\",\"data\":[{\"status\":\"Lỗi khi ConvertDatasetToListJson\"}]}";

                var json = gn.ConvertListToJson(data);
                return "{\"result\":\"OK\",\"data\":" + json + "}";
            }
            catch (Exception ex)
            {
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"" + ex.Message.Replace("\n", "") + "\"}]}";
            }

        }
        
    }
}