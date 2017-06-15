using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ServiceSql_Oracle_New.Controllers
{
    public class Check_PingServerController : ApiController
    {
        // GET: api/Check_PingServer
        public string Get()
        {
            gnSqlNomal sqln = new gnSqlNomal();
            general gn = new general();
            var dicAppSet = gn.ReadAppseting();
            if (!dicAppSet.ContainsKey("pathcheckserver"))
                return "{\"status\":\"Không chứa pathcheckserver\"}";
            
            var strfileInfo = File.ReadAllText(dicAppSet["pathcheckserver"]);
            var dicFileInfo = sqln.convertParaToDic(strfileInfo);
            return "{\"status\":\"OK\",\"istype\":\"PingServer\",\"servername\":\"" + dicFileInfo["servername"] + "\"}";
        }

        // GET: api/Check_PingServer/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Check_PingServer
        public void Post([FromBody]string value)
        {
            
        }

        // PUT: api/Check_PingServer/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Check_PingServer/5
        public void Delete(int id)
        {
        }
    }
}
