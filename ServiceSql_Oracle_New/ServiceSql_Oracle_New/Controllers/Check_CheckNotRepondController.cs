using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ServiceSql_Oracle_New.Controllers
{
    public class Check_CheckNotRepondController : ApiController
    {
        // GET: api/Check_CheckNotRepond
        public string Get()
        {
            gnSqlNomal sqln = new gnSqlNomal();
            general gn = new general();
            var dicAppSet = gn.ReadAppseting();

            if (!dicAppSet.ContainsKey("pathcheckserver"))
                return "{\"status\":\"Không chứa pathcheckserver\"}";

            var strfileInfo = File.ReadAllText(dicAppSet["pathcheckserver"]);
            var dicFileInfo = sqln.convertParaToDic(strfileInfo);

            var dicProcess = new Dictionary<string,string>();
            foreach (Process p in Process.GetProcesses("."))
            {
                try
                {
                    var name = p.MainWindowTitle != "" ? p.MainWindowTitle : p.ProcessName;
                   
                        dicProcess.Add(name.ToLower(), p.Responding ? "Runing" : "NotRespond");                  
                }
                catch { }
            }

            if (!dicFileInfo.ContainsKey("checklstnotrespond"))
                return "{\"status\":\"Không chứa checklstnotrespond\"}";
            var lstCheck = dicFileInfo["checklstnotrespond"].Split(new string[] { "===" }, StringSplitOptions.None);
            var str = "";
            foreach (var name in lstCheck)
            {
                if (dicProcess.ContainsKey(name.ToLower()))               
                str += "{\"name\":\"" + name + "\",\"status\":\"" + dicProcess[name.ToLower()] + "\",\"istype\":\"CheckNotRespond\",\"servername\":\"" + dicFileInfo["servername"] + "\"},";
            }

            var sum = str != "" ? str.Substring(0, str.Length - 1) : "";

            return "[" + sum + "]";
            
        }

        // GET: api/Check_CheckNotRepond/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Check_CheckNotRepond
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Check_CheckNotRepond/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Check_CheckNotRepond/5
        public void Delete(int id)
        {
        }
    }
}
