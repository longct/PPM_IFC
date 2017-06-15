
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace ServiceSql_Oracle_New.Controllers
{
    public class Check_CheckAllWarningInFolderController : ApiController
    {
        // GET: api/Check_CheckAllWarningInFolder
        public string Get()
        {
            gnSqlNomal sqln = new gnSqlNomal();
            general gn = new general();
            var dicAppSet = gn.ReadAppseting();

            if (!dicAppSet.ContainsKey("pathcheckserver"))
                return "{\"status\":\"Không chứa pathcheckserver\"}";

            var strfileInfo = File.ReadAllText(dicAppSet["pathcheckserver"]);
            var dicFileInfo = sqln.convertParaToDic(strfileInfo);

            // lay ra cac file
            var files = Directory.GetFiles(dicAppSet["pathcontentwarning"]);
            var listFile = new List<string>();
            foreach (var file in files)
            {
                if (file.EndsWith(".json"))
                    listFile.Add(file);
            }

            // lay ra cac noi dung trong tung file
            string json = "";
            foreach (var file in listFile)
            {
                using (StreamReader r = new StreamReader(file))
                {
                     json += r.ReadToEnd();
                }
                json += ",";
                File.Delete(file);
            }
            
            var sum = json != "" ? json.Substring(0, json.Length - 1) : "";
            
            return "[" + sum.Replace("\r\n", string.Empty) + "]";

        }

        // GET: api/Check_CheckAllWarningInFolder/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Check_CheckAllWarningInFolder
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Check_CheckAllWarningInFolder/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Check_CheckAllWarningInFolder/5
        public void Delete(int id)
        {
        }
    }
}
