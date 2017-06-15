
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
//using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using Oracle.DataAccess.Client;
using System.Xml;

namespace ServiceSql_Oracle_New.Controllers
{

    public class gnOracleXml
    {
        general gn = new general();
        public string ExcuteStores(string config, string para, Dictionary<string, string> dicAppset)
        {
            try
            {
                var dicPara = gn.ParaConvertDicPara(para);
                var dicConfig = gn.ConfigConvertToDicConfig(config);
                if (dicPara == null && dicConfig == null)
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Kiểm tra lại định dạng json đầu vào\"}]}";

                if (dicConfig.ContainsKey("commandtype") && dicConfig["commandtype"].ToLower() == "text")
                {
                    var json = "";
                    json = ExcuteReturnJson(dicConfig, null);
                    return json;
                }
               else
                {
                    var dsParaOnSql = DecodeProceduePara_New(dicConfig, dicAppset);
                    var paraOk = dicParaToOraclePara_New(dsParaOnSql, dicPara);
                    var json = "";
                    json = ExcuteReturnJson(dicConfig, paraOk);
                    return json;
                }

               
            }
            catch (Exception ex)
            {
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"" + ex.Message.Replace("\n", "") + "\"}]}";
            }
        }

        public string ExcuteReturnJson(Dictionary<string, string> dicConfig, List<OracleParameter> lstOrlPara)
        {
            OracleConnection conn = null;
            OracleCommand cmd = null;
            OracleDataAdapter adapter = null;
            try
            {
                string connectOracle = ConfigurationManager.ConnectionStrings[dicConfig["connstr"]].ConnectionString;
                conn = new OracleConnection(connectOracle);
                conn.Open();
                cmd = new OracleCommand();
                cmd.Connection = conn;
                cmd.CommandText = dicConfig["namesql"];
                cmd.CommandType = dicConfig.ContainsKey("commandtype") && dicConfig["commandtype"].ToLower()=="text" ? CommandType.Text: CommandType.StoredProcedure;
                cmd.BindByName = true;
                if(lstOrlPara!=null)
                cmd.Parameters.AddRange(lstOrlPara.ToArray());

                adapter = new OracleDataAdapter(cmd);
                var ds = new DataSet();
                adapter.Fill(ds);
                string  xmlDoc= ds.GetXml();
                return xmlDoc;
            }
            catch (Exception ex)
            {
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"" + ex.Message.Replace("\n", "") + "\"}]}";
            }
            finally
            {
                if (cmd != null)
                {
                    cmd.Dispose();
                }
                if (adapter != null)
                {
                    adapter.Dispose();
                }
                if (conn != null && conn.State != ConnectionState.Closed)
                {
                    conn.Close();
                }
            }
        }

        public DataSet DecodeProceduePara(List<string> lstPara, Dictionary<string, string> dicConfig, Dictionary<string, string> dicAppset)
        {
            var lst = dicConfig["namesql"].Replace("[", "").Replace("]", "").Split('.');
            var str = "SELECT ARGUMENT_NAME, DATA_TYPE,IN_OUT,PLS_TYPE FROM SYS.ALL_ARGUMENTS " +
                      "WHERE PACKAGE_NAME = '" + (lst.Length > 1 ? lst[0].ToUpper() : "") + "' AND " +
                      "OBJECT_NAME ='" + (lst.Length == 1 ? lst[0].ToUpper() : lst[1].ToUpper()) + "' and ARGUMENT_NAME IS NOT NULL  ORDER BY POSITION ASC";

            var ds = ExcuteReturnDataSet(str, null, CommandType.Text, dicAppset[dicConfig["connstr"].ToLower()]);
            return ds;
        }

        public DataSet DecodeProceduePara_New(Dictionary<string, string> dicConfig, Dictionary<string, string> dicAppset)
        {
            try
            {
                var lst = dicConfig["namesql"].Replace("[", "").Replace("]", "").Split('.');
                var str = "select distinct * from( SELECT  ARGUMENT_NAME, DATA_TYPE,IN_OUT,PLS_TYPE,POSITION FROM SYS.ALL_ARGUMENTS " +
                          "WHERE PACKAGE_NAME = '" + (lst.Length > 1 ? lst[0].ToUpper() : "") + "' AND " +
                          "OBJECT_NAME ='" + (lst.Length == 1 ? lst[0].ToUpper() : lst[1].ToUpper()) + "' and ARGUMENT_NAME IS NOT NULL AND OWNER  =(select user from dual))t ORDER BY POSITION ASC";

                var ds = ExcuteReturnDataSet(str, null, CommandType.Text, dicAppset[dicConfig["connstr"].ToLower()]);



                return ds;
            }
            catch (Exception ex)
            { return null; }
        }

        public List<OracleParameter> dicParaToOraclePara_New(DataSet dsParaSql, Dictionary<string, string> dicPara)
        {
           if (dsParaSql == null || dsParaSql.Tables[0].Rows.Count == 0) return null;

            List<OracleParameter> orlPara = new List<OracleParameter>();
            foreach (DataColumn column in dsParaSql.Tables[0].Columns)
                column.ColumnName = column.ColumnName.ToLower();
            var i = 0;
            foreach (DataRow row in dsParaSql.Tables[0].Rows)
            {
                OracleParameter or = null;// new OracleParameter();
                if (row["in_out"].ToString().ToLower() == "in")
                {
                    var thu = row["argument_name"].ToString();
                    or = new OracleParameter(row["argument_name"].ToString(), OracleDbType.Varchar2, dicPara[row["argument_name"].ToString().ToLower()], ParameterDirection.Input);
                }
                if (row["in_out"].ToString().ToLower() == "out")
                {
                    or = new OracleParameter(row["argument_name"].ToString(), OracleDbType.RefCursor, ParameterDirection.Output);
                }
                i++;
                orlPara.Add(or);
            }
            return orlPara;
        }

        public List<OracleParameter> dicParaToOraclePara(DataTable dtPara, List<string> lstPara)
        {
            if (dtPara == null || dtPara.Rows.Count == 0) return null;

            List<OracleParameter> orlPara = new List<OracleParameter>();
            foreach (DataColumn column in dtPara.Columns)
                column.ColumnName = column.ColumnName.ToLower();
            var i = 0;
            foreach (DataRow row in dtPara.Rows)
            {
                OracleParameter or = null;// new OracleParameter();
                if (row["in_out"].ToString().ToLower() == "in")
                {
                    or = new OracleParameter(row["argument_name"].ToString(), OracleDbType.Varchar2, lstPara[i], ParameterDirection.Input);
                }
                if (row["in_out"].ToString().ToLower() == "out")
                {
                    or = new OracleParameter(row["argument_name"].ToString(), OracleDbType.RefCursor, ParameterDirection.Output);
                }
                i++;
                orlPara.Add(or);
            }
            return orlPara;
        }


        public DataSet ExcuteReturnDataSet(string procName, List<OracleParameter> sqlParameters, CommandType cmdType,
           string ConnStr)
        {
            OracleConnection conn = null;
            OracleCommand cmd = null;
            OracleDataAdapter adapter = null;
            try
            {
                conn = new OracleConnection(ConnStr);
                conn.Open();
                cmd = new OracleCommand();
                cmd.Connection = conn;
                cmd.CommandText = procName;
                cmd.CommandType = cmdType;
                cmd.BindByName = true;
                if (sqlParameters != null)
                    cmd.Parameters.AddRange(sqlParameters.ToArray());

                adapter = new OracleDataAdapter(cmd);
                var ds = new DataSet();
                adapter.Fill(ds);

                return ds;
            }
            catch (Exception ex)
            {
                return null;
            }
            finally
            {
                if (cmd != null)
                {
                    cmd.Dispose();
                }
                if (adapter != null)
                {
                    adapter.Dispose();
                }
                if (conn != null && conn.State != ConnectionState.Closed)
                {
                    conn.Close();
                }
            }
        }

      
        public string ExcuteTextDataset(string config, string para, Dictionary<string, string> dicAppset)
        {
            try
            {
                var dicPara = gn.ParaConvertDicPara(para);
                config = config.Replace("\n", " ");
                var dicConfig = gn.ConfigConvertToDicConfig(config);
                if (dicPara == null && dicConfig == null)
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Kiểm tra lại định dạng json đầu vào\"}]}";

                if (dicConfig.ContainsKey("commandtype") && dicConfig["commandtype"].ToLower() == "text")
                {
                    var json = "";
                    json = ExcuteReturnJson(dicConfig, null);
                    return json;
                }
                else
                {
                    return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"API chỉ sử lý loại text\"}]}";
                }


            }
            catch (Exception ex)
            {
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"" + ex.Message.Replace("\n", "") + "\"}]}";
            }
        }


       

    }
}
