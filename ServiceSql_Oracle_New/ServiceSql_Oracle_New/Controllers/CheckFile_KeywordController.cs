using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ServiceSql_Oracle_New.Controllers
{
    public class CheckFile_KeywordController : ApiController
    {
        // GET: api/CheckFile_Keyword
        public string Get()
        {
            return "ok";
        }

        // GET: api/CheckFile_Keyword/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/CheckFile_Keyword
        public string Post(CheckFile value)
        {
            gnSqlNomal gn = new gnSqlNomal();
            if (value == null) 
            return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Kiểm tra lại định dạng json đầu vào\"}]}";
            var config = gn.convertConfigToDic(value.config);
            var para = gn.convertParaToDic(value.para);

            gnCheckFile cf = new gnCheckFile();
            if(para["istype"]== "TreeDefault")            
               return cf.GetDriverDefault();           

            if (para["istype"] == "TreeSub")
                return cf.GetSubFolder(para["id"]);

            if (para["istype"] == "XemTongQuan")
                return cf.SeartchAllFileHaveWord(para["path"], para["noidung"], para["tungay"],para["toingay"]);

            if (para["istype"] == "XemChiTiet")
                return cf.ViewInFile(para["path"], para["keyword"]);

            return "[]";
        }

        // PUT: api/CheckFile_Keyword/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/CheckFile_Keyword/5
        public void Delete(int id)
        {
        }
    }
    public class CheckFile
    {
        public string config { get; set; }
        public string para { get; set; }
    }
}
