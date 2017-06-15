using Newtonsoft.Json.Linq;
using ServiceSql_Oracle_New.WebReference;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;

namespace ServiceSql_Oracle_New.Controllers
{
    public class SqlSysDnpcController : ApiController
    {

        // GET api/sqlsysdnpc
        public IEnumerable<string> Get()
        {


            return new string[] { "value1", "value2" };
        }

        // GET api/sqlsysdnpc/5
        public string Get(string id)
        {
            WS ws = new WS();
            general gn = new general();

            var json = ws.GetGia(id, "dnpc@");
            var dt = gn.ConvertJsonToDataTable(json, "dt");
            if (dt != null && dt.Rows.Count > 0)
            {
                var prDt = new SqlParameter("@dt", SqlDbType.Structured);
                prDt.Value = dt;
                var parameters = new[] { prDt };
                //   ExecuteSqlDataset("[DNPC].[AutoInsertGiaDien]", parameters);
            }


            //for (int i = 0; i <= 3; i++)
            //{
            //    var thu = DateTime.Now.AddMonths(-i).Month;
            //    var thu1 = DateTime.Now.AddMonths(-i).Year;
            //    var  dt1 = ws.GetCP(id, DateTime.Now.AddMonths(-i).Month, DateTime.Now.AddMonths(-i).Year,1, "dnpc@");
            //    if (dt1 != null && dt1.Rows.Count > 0)
            //    {                   
            //        ds.Tables.Add(dt1);

            //    }
            //}
            //var data = gn.ConvertDatasetToListJson(ds);
            //if (data == null) return "{\"result\":\"ERROR\",\"data\":\"Lỗi khi ConvertDatasetToListJson\"}";
            //json += gn.ConvertListToJson(data);

            return json;
        }

        //  POST api/sqlsysdnpc
        public string Post(ValueSynDnpc value)
        {
            gnSqlSysDnpc gn = new gnSqlSysDnpc();
            gn.autoInsertAll(value.config, value.para);
            return "";
        }


        // PUT api/sqlsysdnpc/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/sqlsysdnpc/5
        public void Delete(int id)
        {
        }


    }
    public class ValueSynDnpc
    {
        public string config { get; set; }
        public string para { get; set; }
    }
}
