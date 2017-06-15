
using Oracle.DataAccess.Client;
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
    public class gnDocTucThoi
    {

        public string getResultDocTucThoi(string config, string para, Dictionary<string, string> dicAppset)
        {
            gnSqlNomal sqln = new gnSqlNomal();
            general gn = new general();
            var dicAppSet = gn.ReadAppseting();

            var dicConfig = sqln.convertConfigToDic(config);
            var dicPara = sqln.convertParaToDic(para);

            var strfileInfo = File.ReadAllText(dicAppSet["dtt_infodoctucthoi"]);
            var dicFileInfo = sqln.convertParaToDic(strfileInfo);

            var fileExists = dicFileInfo["pathwritefiletxterror"] + "\\" + dicConfig["namefile"] ;

            var lines = File.Exists(fileExists) ? File.ReadAllText(fileExists) : "[]";

            return  "{\"result\":\"OK\",\"data\":\""+lines+"\"}"; 
        }
        //get All text 
        public string getResultAllTextDocTucThoi(string config, string para, Dictionary<string, string> dicAppset)
        {
            try
            {
                gnSqlNomal sqln = new gnSqlNomal();
                general gn = new general();
                var dicAppSet = gn.ReadAppseting();

                var dicConfig = sqln.convertConfigToDic(config);
                var dicPara = sqln.convertParaToDic(para);

                var strfileInfo = File.ReadAllText(dicAppSet["dtt_infodoctucthoi"]);
                var dicFileInfo = sqln.convertParaToDic(strfileInfo);

                var fileExists = dicFileInfo["pathwritefilealltext"] + "\\" + dicConfig["namefile"];

                var lines = File.Exists(fileExists) ? File.ReadAllText(fileExists) : "[]";
                // var lines = File.ReadAllText(fileExists);
                return "{\"result\":\"OK\",\"data\":\"" + lines + "\"}";
            }
            catch(Exception ex)
            {
                return ex.Message;
            }

        }
        public string ExcuteDocTucThoi(DocTucThoi value)
        {
            Dictionary<string, string> dicAppSet = new Dictionary<string, string>();
            try
            {
                if (dicAppSet == null || dicAppSet.Count == 0)
                {
                    general gn = new general();
                    dicAppSet = gn.ReadAppseting();
                    if (dicAppSet == null || dicAppSet.Count == 0)
                    return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Đọc appsetting lỗi\"}]}";
                }

                if (value == null || value.config == null) return "{\"result\":\"ERROR\",\"data\":\"Kiểm tra lại định dạng json đầu vào\"}";
                //var json = "";

                //gnDocTucThoi orc = new gnDocTucThoi();
                //json = orc.ExcuteDocTucThoi(value.config, value.para, dicAppSet);

                //return json;
            }
            catch (Exception ex)
            { general.WriterLogTracking(ex.Message, dicAppSet); return ""; }

            try
            {
                gnSqlNomal sqln = new gnSqlNomal();
                var dicConfig = sqln.convertConfigToDic(value.config);
                var dicPara = sqln.convertParaToDic(value.para);

                // doc file json
                var strfileInfo = File.ReadAllText(dicAppSet["dtt_infodoctucthoi"]);
                var dicFileInfo = sqln.convertParaToDic(strfileInfo);

                if (dicPara == null && dicConfig == null)
                    return "{\"result\":\"ERROR\",\"data\":\"Kiểm tra lại định dạng json đầu vào\"}";

                if (!dicPara.ContainsKey("v_imei"))
                {
                    return "{\"result\":\"ERROR\",\"data\":\"Kiểm tra lại định dạng json đầu vào\"}";
                }
              return  SaveFileToFolderFix(dicAppSet, dicFileInfo, dicConfig, dicPara);
               
                // khong xoa vi tam thoi fix ip / port
                //if (dicFileInfo["dtt_connectto"].ToUpper() == "ORACLE")
                //{
                //    return "{\"result\":\"ERROR\",\"data\":\"Hiện trưa hỗ trợ oracle\"}";
                //    var lstPara = dicParaToOracleDocTucThoi(dicPara);
                //    var oracle = new gnOracle();
                //    var json = oracle.ExcuteReturnDataSet(dicFileInfo["dtt_procedureoracle"], lstPara, CommandType.StoredProcedure, dicAppset["connectoracle"]);
                //}
                //if (dicFileInfo["dtt_connectto"].ToUpper() == "SQL")
                //{
                //    var sql = new gnSql();
                //    var gn = new general();
                //    // lay ra port tuong ung imei
                //    var conn = dicAppset[dicConfig["connstr"].ToString().ToLower()];
                //    var lstPara = gn.ConvertDicToSqlPara(dicPara);
                //    var dsPort = sql.DynamicSelectDataset(dicFileInfo["dtt_proceduresql"], lstPara, CommandType.StoredProcedure, conn);

                //    if (dsPort == null || dsPort.Tables.Count == 0)
                //        return "{\"result\":\"ERROR\",\"data\":\"Không tìm thấy thông tin ip/port\"}";
                //    // lay ra ip tuong ung o ifcsmart
                //    var lstParaPort = ConvertDatatableToSqlPara(dsPort.Tables[0]);
                //    var dsIpPort = sql.DynamicSelectDataset("DOCTUCTHOI_GetInfoIpPort", lstParaPort, CommandType.StoredProcedure, dicAppset["ifcsmart"]);

                //    if (dsIpPort == null || dsIpPort.Tables.Count == 0)
                //        return "{\"result\":\"ERROR\",\"data\":\"Không tìm thấy thông tin ip/port\"}";
                //    return SaveFileToFolder(dicAppset, dicFileInfo, dicConfig, dicPara, dsIpPort.Tables[0], dsPort.Tables[0]);
                //}

                //        v_IMEI: "8661040203522850",
                //v_SoCongTo: "001502000145",
                //v_Ip: "",
                //v_Port: ""


            }
            catch (Exception ex)
            {
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"" + ex.Message.Replace("\n", "") + "\"}]}";
            }
        }

        public string SaveFileToFolderFix(Dictionary<string, string> dicAppSet,  Dictionary<string, string> dicFileInfo, Dictionary<string, string> dicConfig,
           Dictionary<string, string> dicPara)
        {
            try
            {
              
                var NoiDung = "";

                //  var nameFile = dicPara["v_imei"]+"_" + dicPara["v_readall"] + dicPara["v_typecmd"] + "TypeNew_" + DateTime.Now.ToString("ddMMyyyy_HHmmssfff");
                var nameFile = dicPara["v_namefile"];
                NoiDung += "Read" + dicPara["v_typecmd"] + "TypeNew\r\n";

                NoiDung += dicPara["v_imei"] + "\r\n";
                NoiDung += dicPara["v_socongto"] + "\r\n";

                NoiDung += dicPara["v_ip"] + "\r\n";
                NoiDung += dicPara["v_port"] + "\r\n";
                NoiDung += dicPara["v_soluong"] + "\r\n";

                NoiDung += "StopReadTypeNew\r\n";
                NoiDung += dicPara["v_readall"] + dicPara["v_typecmd"] + "TypeNew";

                WriterToFileTxt(dicAppSet, dicFileInfo, nameFile, NoiDung);

                return "{\"result\":\"OK\",\"data\":\"Modem bắt đầu đọc...\",\"namefile\":\"" + nameFile  + "\"}";
            }
            catch (Exception ex) { return ex.Message; }
        }


        public string SaveFileToFolder(Dictionary<string, string> dicAppset, Dictionary<string, string> dicFileInfo, Dictionary<string, string> dicConfig,
            Dictionary<string, string> dicPara, DataTable dtIpPort, DataTable dtType)
        {
            try
            {
                int i = 0, j = 0;
                foreach (DataColumn col in dtIpPort.Columns)
                {
                    dtIpPort.Columns[i].ColumnName = col.ColumnName.ToLower();
                    i++;
                }
                foreach (DataColumn col1 in dtType.Columns)
                {
                    dtType.Columns[j].ColumnName = col1.ColumnName.ToLower();
                    j++;
                }

                var NoiDung = "";
                var type = dtType.Rows[0]["v_typecmd"].ToString();

                var nameFile = dicPara["v_imei"] + "_" + dicConfig["readall"] +  type + "PhaNew_" + DateTime.Now.ToString("dd_MM_yyyy_HH_mm_ss");

                NoiDung += "Type" + type + "TypeNew\r\n";

                NoiDung += dicPara["v_imei"] + "\r\n";
                NoiDung += dicPara["v_socongto"] + "\r\n";

                NoiDung += dtIpPort.Rows[0]["ip"] + "\r\n";
                NoiDung += dtIpPort.Rows[0]["port"] + "\r\n";

                NoiDung += "StopRead" + type + "PhaNew\r\n";
                NoiDung += dicConfig["readall"] + dicConfig["v_typecmd"] + type + "PhaNew";

                WriterToFileTxt(dicAppset, dicFileInfo, nameFile, NoiDung);

                return "{\"result\":\"OK\",\"data\":\"Modem bắt đầu đọc...\",\"namefile\":\"" + nameFile+".txt" + "\"}";
            }
            catch (Exception ex) {
                general.WriterLogTracking(ex.Message, dicAppset); 
            return ex.Message;
            }
        }

        public void WriterToFileTxt(Dictionary<string,string> dicAppSet, Dictionary<string, string> dicFileInfo, string nameFile, string NoiDung)
        {
            try
            {
                var path = dicFileInfo["dtt_savefiletofolder"] + "\\" + nameFile ;

                if (File.Exists(path))
                {
                    lock (path)
                    {
                        using (StreamWriter writer = File.AppendText(path))
                        {
                            writer.WriteLine(NoiDung);
                            writer.Close();
                        }
                    }
                }
                else
                {
                    lock (path)
                    {
                        using (StreamWriter writer = File.AppendText(path))
                        {
                            writer.WriteLine(NoiDung);
                            writer.Close();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                general.WriterLogTracking(ex.Message, dicAppSet);
            }
        }

        public SqlParameter[] ConvertDatatableToSqlPara(DataTable dt)
        {
            try
            {
                List<SqlParameter> lstParr = new List<SqlParameter>();

                lstParr.Add(new SqlParameter("@V_PORT", dt.Rows[0]["PORT"]));

                return lstParr.ToArray();
            }
            catch { return null; }
        }

        public List<OracleParameter> dicParaToOracleDocTucThoi(Dictionary<string, string> dicPara)
        {

            List<OracleParameter> orlPara = new List<OracleParameter>();
            var thu = dicPara["v_imei"];
            OracleParameter or = new OracleParameter("v_imei", OracleDbType.Varchar2, dicPara["v_imei"], ParameterDirection.Input);
            OracleParameter or1 = new OracleParameter("cv_1", OracleDbType.RefCursor, ParameterDirection.Output);

            orlPara.Add(or);
            orlPara.Add(or1);
            return orlPara;
        }

    }
}
