using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ServiceSql_Oracle_New.Controllers
{
    public class DocTucThoi_ChecDangDocController : ApiController
    {
        // GET: api/DocTucThoi_ChecDangDoc
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/DocTucThoi_ChecDangDoc/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/DocTucThoi_ChecDangDoc
        public string Post(DocTucThoi value)
        {
            try
            {
                Dictionary<string, string> dicAppSet = null;
                if (dicAppSet == null || dicAppSet.Count == 0)
                {
                    general gn = new general();
                    dicAppSet = gn.ReadAppseting();
                    if (dicAppSet == null || dicAppSet.Count == 0)
                    return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Đọc appsetting lỗi\"}]}";
                }
                
                gnSqlNomal sqln = new gnSqlNomal();                
                var strfileInfo = File.ReadAllText(dicAppSet["dtt_infodoctucthoi"]);
                var dicFileInfo = sqln.convertParaToDic(strfileInfo);

                var files = Directory.GetFiles(dicFileInfo["dtt_savefiletofolder"]) ;

                return  files.Length >0 ? "{\"result\":\"OK\",\"data\":\"Đang trong quá trình đọc tức thời\"}" : "{\"result\":\"OK\",\"data\":\"\"}";

            }catch(Exception ex)
            {
                return "";
            }
            }

        // PUT: api/DocTucThoi_ChecDangDoc/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/DocTucThoi_ChecDangDoc/5
        public void Delete(int id)
        {
        }
    }
}
