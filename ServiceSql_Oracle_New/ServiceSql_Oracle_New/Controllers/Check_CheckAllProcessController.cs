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
    public class Check_CheckAllProcessController : ApiController
    {
        // GET: api/Check_CheckAllProcess
        public string Get()
        {
             gnSqlNomal sqln = new gnSqlNomal();
            general gn = new general();
            var dicAppSet = gn.ReadAppseting();

            if (!dicAppSet.ContainsKey("pathcheckserver"))
                return "{\"status\":\"Không chứa pathcheckserver\"}";

            var strfileInfo = File.ReadAllText(dicAppSet["pathcheckserver"]);
            var dicFileInfo = sqln.convertParaToDic(strfileInfo);

            var str = "";
            foreach (Process p in Process.GetProcesses("."))
            {
                try
                {
                    var name = p.MainWindowTitle != "" ? p.MainWindowTitle : p.ProcessName;

                    str+= "{\"name\":\""+name+ "\",\"status\":\"" + (p.Responding ?"Runing":"NotRespond" ) +"\",\"istype\":\"GetAllProcess\",\"servername\":\"" + dicFileInfo["servername"] + "\"},";
                }
                catch { }
            }
            var sum = str != "" ? str.Substring(0, str.Length - 1) : "";

            return "[" + sum + "]";
        }

        // GET: api/Check_CheckAllProcess/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Check_CheckAllProcess
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Check_CheckAllProcess/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Check_CheckAllProcess/5
        public void Delete(int id)
        {
        }
    }
}
