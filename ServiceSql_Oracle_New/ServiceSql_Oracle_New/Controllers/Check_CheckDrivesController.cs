using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;

namespace ServiceSql_Oracle_New.Controllers
{
    public class Check_CheckDrivesController : ApiController
    {
        // GET: api/Check_CheckDrives
        public string Get()
        {
            // Check Ổ đĩa
            var sum = "";

            gnSqlNomal sqln = new gnSqlNomal();
            general gn = new general();
            var dicAppSet = gn.ReadAppseting();

            if (!dicAppSet.ContainsKey("pathcheckserver"))
                return "{\"status\":\"Không chứa pathcheckserver\"}";

            var strfileInfo = File.ReadAllText(dicAppSet["pathcheckserver"]);
            var dicFileInfo = sqln.convertParaToDic(strfileInfo);


            DriveInfo[] allDrives = DriveInfo.GetDrives();

            var str = "";
            foreach (DriveInfo d in allDrives)
            {
                try
                {
                    str += "{\"driver\":\"" + d.Name.Substring(0,1) + "\",\"totalfreespace\":\"" + Math.Round(Convert.ToDouble(d.TotalFreeSpace) / 1073741824) + " GB\",\"totalsize\":\"" + Math.Round(Convert.ToDouble(d.TotalSize) / 1073741824) + " GB\",\"istype\":\"CheckDrive\",\"servername\":\"" + dicFileInfo["servername"] + "\"},";
                }
                catch { }
            }

            sum = str != "" ? str.Substring(0, str.Length - 1) : "";

            return "[" + sum + "]";
        }

        // GET: api/Check_CheckDrives/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Check_CheckDrives
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Check_CheckDrives/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Check_CheckDrives/5
        public void Delete(int id)
        {
        }
    }
}
