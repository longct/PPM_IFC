using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ServiceSql_Oracle_New.Controllers
{
    public class DocTucThoi_CheckErrorController : ApiController
    {
        // GET: api/DocTucThoi_CheckError
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/DocTucThoi_CheckError/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/DocTucThoi_CheckError
        public string Post(DocTucThoi value)
        {
            try
            {
                Dictionary<string, string> dicAppSet = null;
                Dictionary<string, string> dicProce = null;
                if (dicAppSet == null || dicAppSet.Count == 0)
                {
                    general gn = new general();
                    dicAppSet = gn.ReadAppseting();
                    if (dicAppSet == null || dicAppSet.Count == 0)
                    return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Đọc appsetting lỗi\"}]}";
                }

                if (value == null || value.config == null)
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Kiểm tra lại định dạng json đầu vào\"}]}";
                var json = "";

                gnSqlNomal sqln = new gnSqlNomal();
              
                var dicConfig = sqln.convertConfigToDic(value.config);
                var dicPara = sqln.convertParaToDic(value.para);

                var strfileInfo = File.ReadAllText(dicAppSet["dtt_infodoctucthoi"]);
                var dicFileInfo = sqln.convertParaToDic(strfileInfo);

                var fileExists = dicFileInfo["pathwritefilealltext"] + "\\" + dicPara["namefile"];
                
                var lines = File.Exists(fileExists) ? File.ReadAllLines(fileExists) : null;

                if (lines == null) return "";

                foreach (var line in lines)
                {
                    var sp = line.Split(new string[] { "<==" , "==>" }, StringSplitOptions.None);
                    if (line.ToLower().IndexOf("dcu0") >=0)
                    {
                        return "{\"result\":\"DCU0\",\"data\":\"\"}";
                        break;
                    }
                    if (line.ToLower().IndexOf("stopall") >= 0)
                    {                        
                        return "{\"result\":\"StopAll\",\"data\":\"" + (sp.Length>1? sp[1].Replace("(StopAll)", ""):"") + "\"}";
                        break;
                    }
                    if (line.ToLower().IndexOf("readfail")>=0 && line.ToLower().IndexOf(dicPara["socongto"]) >= 0)
                    {
                        return "{\"result\":\"ReadFail\",\"data\":\"" + dicPara["socongto"] + "\"}";
                        break;
                    }
                    if (line.ToLower().IndexOf("read meter success") >= 0 )
                    {
                        return "{\"result\":\"Read Meter Success\",\"data\":\"\"}";
                        break;
                    }
                }

                return "";
            }
            catch (Exception ex)
            {
                return "";
            }
        }

        // PUT: api/DocTucThoi_CheckError/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/DocTucThoi_CheckError/5
        public void Delete(int id)
        {
        }
    }
}
