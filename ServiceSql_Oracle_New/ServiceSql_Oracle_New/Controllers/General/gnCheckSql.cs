using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceSql_Oracle_New.Controllers
{
    public class gnCheckSql
    {
        public string CheckSqlPing()
        {
            gnSqlNomal sqln = new gnSqlNomal();
            general gn = new general();
            var dicAppSet = gn.ReadAppseting();
            if (!dicAppSet.ContainsKey("pathcheckserver"))
                return "{\"status\":\"Không chứa pathcheckserver\"}";

            var strfileInfo = File.ReadAllText(dicAppSet["pathcheckserver"]);
            var dicFileInfo = sqln.convertParaToDic(strfileInfo);
            var str = "";
            foreach(var dir in dicFileInfo)
            {
                if (dir.Key.Contains("pingsqlserver"))
                {
                    var Conn = new SqlConnection(dir.Value);
                    if (Conn.State != ConnectionState.Open)
                    {
                        string ConnGood = "";
                        try {
                            Conn.Open();
                            ConnGood = "OK";
                        }
                        catch (Exception ex){ ConnGood = ex.Message; }
                        str += "{\"pingsqlserver\":\"" + dir.Value.Substring(0,dir.Value.ToUpper().IndexOf("USER ID")) + "\",\"status\":\"" + ConnGood + "\",\"istype\":\"CheckSql\",\"servername\":\"" + dicFileInfo["servername"] + "\"},";
                    }
                }
            }
            var sum = str != "" ? str.Substring(0, str.Length - 1) : "";

            return "[" + sum + "]";
        }
    }
}
