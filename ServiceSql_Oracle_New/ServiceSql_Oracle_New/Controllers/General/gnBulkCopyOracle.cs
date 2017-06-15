using Oracle.DataAccess.Client;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Text;

namespace ServiceSql_Oracle_New.Controllers
{
    public class gnBulkCopyOracle
    {
        public string BulkCopyToOracle(DataTable dt, Dictionary<string, string> config)
        {
            try
            {
                string connectOracle = ConfigurationManager.ConnectionStrings[config["connstr"]].ConnectionString;
                gnOracle gn = new gnOracle();
                using (var connection = new OracleConnection(connectOracle))
                {
                    connection.Open();
                    using (var bulkCopy = new OracleBulkCopy(connection, OracleBulkCopyOptions.UseInternalTransaction))
                    {
                        
                        bulkCopy.DestinationTableName = config.ContainsKey("insertto")? config["insertto"]: dt.TableName;
                        var table = gn.potentialFix(dt);
                        bulkCopy.WriteToServer(table);
                    }
                }
                return "{\"result\":\"OK\",\"data\":\"OK\"}";
            }
            catch (Exception ex)
            {
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"" + ex.Message.Replace("\n", "") + "\"}]}";
            }

        }

        
    }
}
