using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ServiceSql_Oracle_New.Controllers
{
    public class DocTucThoiUpdateCmdController : ApiController
    {
        
        // GET: api/DocTucThoiUpdateCmd
        public string Get()
        {
            Dictionary<string, string> dicAppSet = new Dictionary<string, string>();
            
            try
            {
                
                general gn = new general();
                gnSqlNomal sqln = new gnSqlNomal();
                dicAppSet = gn.ReadAppseting();
                // doc file json
                var strfileInfo = File.ReadAllText(dicAppSet["dtt_infodoctucthoi"]);
                var dicFileInfo = sqln.convertParaToDic(strfileInfo);

                gnDocTucThoi dtt = new gnDocTucThoi();
                dtt.WriterToFileTxt(dicAppSet, dicFileInfo, "nameFile", "NoiDung");

                return strfileInfo;
            }
            catch(Exception ex)
            {
                general.WriterLogTracking(ex.Message, dicAppSet);
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"" + ex.Message.Replace("\n", "") + "\"}]}";
            }
        }

        // GET: api/DocTucThoiUpdateCmd/5
        public string Get(int i)
        {
            return "value";
        }

        // POST: api/DocTucThoiUpdateCmd
        public string Post(DocTucThoi value)
        {
            
            try
            {
                gnDocTucThoi orc = new gnDocTucThoi();
                var json = orc.ExcuteDocTucThoi(value);

                return json;
            }
            catch (Exception ex)
            {  return ""; }
        }

        // PUT: api/DocTucThoi/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/DocTucThoi/5
        public void Delete(int id)
        {
        }
        
    }
    public class DocTucThoi
    {
        public string config { get; set; }
        public string para { get; set; }
    }
}
