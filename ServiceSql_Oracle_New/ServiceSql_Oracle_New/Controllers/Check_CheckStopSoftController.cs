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
    public class Check_CheckStopSoftController : ApiController
    {
        // GET: api/Check_CheckStopSoft
        public string Get()
        {
           
            gnSqlNomal sqln = new gnSqlNomal();
            general gn = new general();
            var dicAppSet = gn.ReadAppseting();

            if (!dicAppSet.ContainsKey("pathcheckserver"))
                return "{\"status\":\"Không chứa pathcheckserver\"}";

            var strfileInfo = File.ReadAllText(dicAppSet["pathcheckserver"]);
            var dicFileInfo = sqln.convertParaToDic(strfileInfo);

            List<string> lst = new List<string>();
            Process[] running_processes = Process.GetProcesses();
            foreach (Process proc in running_processes)
            {
                var name = proc.MainWindowTitle != "" ? proc.MainWindowTitle : proc.ProcessName;
              
                lst.Add(name.ToLower());
            }
            if(!dicFileInfo.ContainsKey("checkstoplstsoft"))
                return "{\"status\":\"Không chứa checkstoplstsoft\"}";
            var lstCheck = dicFileInfo["checkstoplstsoft"].Split(new string[] { "===" }, StringSplitOptions.None);
            var str = "";
            foreach(var name in lstCheck)
            {
                str += "{\"name\":\"" + name + "\",\"status\":\"" + (lst.Contains(name.ToLower())?"Runing":"Stoped" ) + "\",\"istype\":\"CheckStopSoft\",\"servername\":\"" + dicFileInfo["servername"] + "\"},";
            }

            var sum = str != "" ? str.Substring(0, str.Length - 1) : "";

            return "[" + sum + "]";
        }

        // GET: api/Check_CheckStopSoft/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Check_CheckStopSoft
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Check_CheckStopSoft/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Check_CheckStopSoft/5
        public void Delete(int id)
        {
        }
    }
}
