using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Xml;
using System.IO;

namespace ServiceSql_Oracle_New.Controllers
{
    public class ExportXmlReplaceTemplateController : ApiController
    {
        // GET: api/ExportXmlReplaceTemplate
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/ExportXmlReplaceTemplate/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/ExportXmlReplaceTemplate
        public string Post(ExportXmlReplace value)
        {
            try
            {
                gnSqlNomal gn = new gnSqlNomal();
                general gns = new general();
                var dicAppSet = gns.ReadAppseting();

                if (value == null || value.config == null)
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Kiểm tra lại định dạng json đầu vào\"}]}";
                var config = gn.convertConfigToDic(value.config);
                var para = gn.convertParaToDic(value.para);

                var pathFile = dicAppSet["hddt_path_filetemplate"] + config["namefiletemplate"];
                var mau = File.ReadAllText(pathFile);
                foreach(var val in para)
                {
                    mau = mau.Replace(val.Key, val.Value); 
                }

                XmlDocument xmlDoc = new XmlDocument();
                xmlDoc.LoadXml(mau);
                var pathExport =   dicAppSet["path_saveonserver"]  +config["namefilecreate"];
                xmlDoc.Save(pathExport);

                //if (!config.ContainsKey("savefileonserver"))
                //    File.Delete(dicAppSet["path_saveonserver"] + config["namefilecreate"]);

                return  "{\"result\":\"ERROR\",\"data\":\"" + pathExport + "\"}"; 
            }
            catch (Exception ex) {
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"" + ex.Message.Replace("\n", "") + "\"}]}";
            }
        }

        // PUT: api/ExportXmlReplaceTemplate/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/ExportXmlReplaceTemplate/5
        public void Delete(int id)
        {
        }
    }
    public class ExportXmlReplace
    {
        public string config { set; get; }
        public string para { set; get; }
    }
}
