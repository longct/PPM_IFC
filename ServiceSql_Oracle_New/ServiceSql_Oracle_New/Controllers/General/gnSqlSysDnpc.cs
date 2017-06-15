using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading;
using System.Web;
using ServiceSql_Oracle_New.WebReference;
namespace ServiceSql_Oracle_New.Controllers
{
    public class gnSqlSysDnpc
    {
        string password = "";
        Dictionary<string, string> _dicConfig;
        //#region code đồng bộ đà nẵng PC
        general gn = new general();
        public void autoInsertAll(string config, string para)
        {
            try
            {
                if (config == null || para == null) return;
                general gn = new general();
                var appSet = gn.ReadAppseting();
                password = appSet["passdnpc"];

                var dicConfig = convertConfigToDic(config);
                var dicPara = convertParaToDic(para);
                _dicConfig = dicConfig;

                Thread thread = new Thread(new ThreadStart(() =>
                    insertKh(dicPara, dicConfig)
                    ));
                thread.Start();

                Thread thread2 = new Thread(new ThreadStart(() =>
                    chiphidien_kh(dicPara, dicConfig)
                    ));
                thread2.Start();


                Thread thread4 = new Thread(new ThreadStart(() =>
                    chiphisanluongcacnam_3ThangGanNhat(dicPara, dicConfig)
                    ));
                thread4.Start();

                Thread thread5 = new Thread(new ThreadStart(() =>
                    chiphidien_vc(dicPara, dicConfig)
                    ));
                thread5.Start();

                Thread thread6 = new Thread(new ThreadStart(() =>
                  ghino(dicPara, dicConfig)
                  ));
                thread6.Start();
                Thread thread7 = new Thread(new ThreadStart(() =>
                  catdienkh(dicPara, dicConfig)
                  ));
                thread7.Start();


                Thread thread8 = new Thread(new ThreadStart(() =>
                  GetHetNo(dicPara, dicConfig)
                  ));
                thread8.Start();

                Thread thread9 = new Thread(new ThreadStart(() =>
                  GiaDien(dicPara, dicConfig)
                  ));
                thread9.Start();
                Thread thread10 = new Thread(new ThreadStart(() =>
                  LichGhiChiSo(dicPara, dicConfig)
                  ));
                thread10.Start();
            }
            catch (Exception ex)
            {
                //   WriterToFileLog(ex.Message);
            }


        }
        
        public void updatePass(Dictionary<string, string> dicPara, Dictionary<string, string> dicConfig)
        {
            try
            {
                WS ws = new WS();
                var dt = ws.updatePass(dicPara["usercode"], dicPara["passwordencrypt"], dicConfig["passcu"]);
            }
            catch { }
        }
        public void insertKh(Dictionary<string, string> dicPara, Dictionary<string, string> dicConfig)
        {
            try
            {
                WS ws = new WS();
                var json = ws.GetKH(dicPara["usercode"], password);
                var dt = gn.ConvertJsonToDataTable(json, "dt");
                if (dt != null && dt.Rows.Count > 0)
                {
                    var prDt = new SqlParameter("@dt", SqlDbType.Structured);
                    prDt.Value = dt;
                    var parameters = new[] { prDt };

                    ExecuteSqlDataset("DNPC.AutoInsertKhachHangDnpc_New", parameters);
                }
            }
            catch (Exception ex)
            {
                //WriterToFileLog(ex.Message);
            }
        }

        public void chiphidien_kh(Dictionary<string, string> dicPara, Dictionary<string, string> dicConfig)
        {
            for (int i = 0; i < 12; i++)
            {
                try
                {
                    WS ws = new WS();
                    var json = ws.GetCP_CT(dicPara["usercode"], DateTime.Now.AddMonths(-i).Month, DateTime.Now.AddMonths(-i).Year, password);
                    var dt = gn.ConvertJsonToDataTable(json, "dt");
                    if (dt != null && dt.Rows.Count > 0)
                    {
                        var prDt = new SqlParameter("@dt", SqlDbType.Structured);
                        prDt.Value = dt;
                        var parameters = new[] { prDt };

                        ExecuteSqlDataset("DNPC.AutoInsertChiPhiDienKh_New", parameters);
                    }
                }
                catch (Exception ex)
                {
                    WriterToFileLog(ex.Message);
                }
            }
        }

        public void chiphisanluongcacnam_3ThangGanNhat(Dictionary<string, string> dicPara, Dictionary<string, string> dicConfig)
        {
            for (int i = 0; i <= 3; i++)
            {
                for (int ky = 1; ky <= 3; ky++)
                {
                    try
                    {
                        WS ws = new WS();
                        var json = ws.GetCP(dicPara["usercode"], DateTime.Now.AddMonths(-i).Month, DateTime.Now.AddMonths(-i).Year, ky, password);
                        var dt = gn.ConvertJsonToDataTable(json, "dt");
                        if (dt != null && dt.Rows.Count > 0)
                        {
                            var prDt = new SqlParameter("@dt", SqlDbType.Structured);
                            prDt.Value = dt;
                            var parameters = new[] { prDt };

                            ExecuteSqlDataset("DNPC.AutoInsertChiPhiDienNam_LS_New", parameters);
                        }
                    }
                    catch (Exception ex)
                    {
                        WriterToFileLog(ex.Message);
                    }
                }
            }
        }
        
        public void chiphidien_vc(Dictionary<string, string> dicPara, Dictionary<string, string> dicConfig)
        {
            try
            {
                for (int i = 0; i < 12; i++)
                {
                    for (int ky = 1; ky <= 3; ky++)
                    {
                        try
                        {
                            WS ws = new WS();
                            var json = ws.GetCP_VC(dicPara["usercode"], DateTime.Now.AddMonths(-i).Month, DateTime.Now.AddMonths(-i).Year,ky, password);
                            var dt = gn.ConvertJsonToDataTable(json, "dt");
                            if (dt != null && dt.Rows.Count > 0)
                            {
                                var prDt = new SqlParameter("@dt", SqlDbType.Structured);
                                prDt.Value = dt;
                                var parameters = new[] { prDt };

                                ExecuteSqlDataset("DNPC.AutoInsertChiPhiDienVoCong_New", parameters);
                            }
                        }
                        catch { }
                    }
                }
            }
            catch (Exception ex)
            {
                WriterToFileLog(ex.Message);
            }
        }

        public void ghino(Dictionary<string, string> dicPara, Dictionary<string, string> dicConfig)
        {
            try
            {
                WS ws = new WS();

                var json = ws.GetNo(dicPara["usercode"], password);
                var dt = gn.ConvertJsonToDataTable(json, "dt");
                if (dt != null && dt.Rows.Count > 0)
                {
                    var prDt = new SqlParameter("@dt", SqlDbType.Structured);
                    prDt.Value = dt;
                    var parameters = new[] { prDt };

                    ExecuteSqlDataset("[DNPC].[AutoInsertNoKhachHang]", parameters);
                }
            }
            catch (Exception ex)
            {
                WriterToFileLog(ex.Message);
            }
        }
        public void catdienkh(Dictionary<string, string> dicPara, Dictionary<string, string> dicConfig)
        {
            try
            {
                WS ws = new WS();

                var json = ws.GetLichCD_KH(dicPara["usercode"], DateTime.Now.AddDays(-20).ToString("MM/dd/yyyy"), DateTime.Now.AddDays(20).ToString("MM/dd/yyyy"), password);
                var dt = gn.ConvertJsonToDataTable(json, "dt");
                if (dt != null && dt.Rows.Count > 0)
                {
                    DataColumn newColumn = new DataColumn("MA_KHANG", typeof(System.String));
                    newColumn.DefaultValue = dicPara["usercode"];
                    dt.Columns.Add(newColumn);
                    var prDt = new SqlParameter("@dt", SqlDbType.Structured);
                    prDt.Value = dt;
                    var parameters = new[] { prDt };
                    ExecuteSqlDataset("[DNPC].[AutoInsertThongBaoMatDien]", parameters);
                }
            }
            catch (Exception ex)
            {
                WriterToFileLog(ex.Message);
            }

        }

        public void GetHetNo(Dictionary<string, string> dicPara, Dictionary<string, string> dicConfig)
        {
            for (var i = 0; i < 12; i++)
            {
                try
                {
                    WS ws = new WS();
                    var json = ws.GetLSTT(dicPara["usercode"], DateTime.Now.AddMonths(-i).Month, DateTime.Now.AddMonths(-i).Year, password);
                    var dt = gn.ConvertJsonToDataTable(json, "dt");
                    if (dt != null && dt.Rows.Count > 0)
                    {
                        var prDt = new SqlParameter("@dt", SqlDbType.Structured);
                        prDt.Value = dt;
                        var parameters = new[] { prDt };
                        ExecuteSqlDataset("[DNPC].[AutoInsertHetNoKhachHang]", parameters);
                    }
                }
                catch (Exception ex)
                {
                    WriterToFileLog(ex.Message);
                }
            }
        }

        public void GiaDien(Dictionary<string, string> dicPara, Dictionary<string, string> dicConfig)
        {
            try
            {
                WS ws = new WS();

                var json = ws.GetGia(dicPara["usercode"], password);
                var dt = gn.ConvertJsonToDataTable(json, "dt");
                if (dt != null && dt.Rows.Count > 0)
                {
                    var prDt = new SqlParameter("@dt", SqlDbType.Structured);
                    prDt.Value = dt;
                    var parameters = new[] { prDt };
                    ExecuteSqlDataset("[DNPC].[AutoInsertGiaDien]", parameters);
                }
            }
            catch (Exception ex)
            {
                WriterToFileLog(ex.Message);
            }
        }

        public void LichGhiChiSo(Dictionary<string, string> dicPara, Dictionary<string, string> dicConfig)
        {

            for (var i = 0; i < 12; i++)
            {
                try
                {
                    WS ws = new WS();
                    var json = ws.GetLichGCS(dicPara["usercode"], DateTime.Now.AddMonths(-i).Month, DateTime.Now.AddMonths(-i).Year, password);
                    var dt = gn.ConvertJsonToDataTable(json, "dt");
                    if (dt != null && dt.Rows.Count > 0)
                    {
                        var prDt = new SqlParameter("@dt", SqlDbType.Structured);
                        prDt.Value = dt;
                        var parameters = new[] { prDt };
                        ExecuteSqlDataset("[DNPC].[AutoInsertLichGhiChiSo]", parameters);
                    }
                }
                catch (Exception ex)
                {
                    WriterToFileLog(ex.Message);
                }
            }
        }

        //#endregion

        //#region Chung
        public void WriterToFileLog(string NoiDung)
        {
            try
            {
                var path = "C:\\logMobi.txt";
                if (File.Exists(path))
                {
                    using (StreamWriter writer = File.AppendText(path))
                    {
                        writer.WriteLine(DateTime.Now.ToString() + " " + NoiDung);
                        writer.Close();
                    }
                }
                else
                {
                    File.WriteAllText(path, NoiDung);
                    using (StreamWriter writer = File.AppendText(path))
                    {
                        writer.WriteLine(DateTime.Now.ToString() + " " + NoiDung);
                        writer.Close();
                    }
                }
            }
            catch { }
        }

        public string ExecuteSqlDataset(string procName, SqlParameter[] sqlParameters)
        {
            SqlConnection Connection = new SqlConnection(ConfigurationManager.ConnectionStrings[_dicConfig["connstr"]].ConnectionString);
            var conStr = Connection != null ? Connection.ConnectionString : "";
            if (conStr == "") return null;
            SqlConnection Conn = new SqlConnection(conStr);

            SqlCommand command = null;
            command = new SqlCommand { Connection = Conn };
            SqlDataAdapter adapter = null;
            try
            {
                command.CommandText = procName;
                command.Parameters.Clear();
                command.CommandType = CommandType.StoredProcedure;
                if (sqlParameters != null)
                {
                    command.Parameters.AddRange(sqlParameters);
                }
                if (Conn.State != ConnectionState.Open)
                    Conn.Open();
                adapter = new SqlDataAdapter(command);
                var ds = new DataSet();
                adapter.Fill(ds);
            }
            catch (Exception ex)
            {
              //  WriterToFileLog(ex.Message);
                return "{\"result\":\"NG\",\"" + procName + "\":" + ex.Message + "}";
            }
            finally
            {
                if (command != null)
                {
                    command.Dispose();
                    command = null;
                }
                if (adapter != null)
                {
                    //if(adapter.is)
                    adapter.Dispose();
                    adapter = null;
                }
                if (Conn.State != ConnectionState.Closed)
                {
                    Conn.Close();
                }
            }
            return "";
        }

        public Dictionary<string, string> convertParaToDic(string para)
{
    try
    {
        var dicPara = new Dictionary<string, string>();

        //para
        if (para == null || para == "" || para == "[]")
            dicPara = null;
        else
        {
            JObject pr = JObject.Parse(para);
            foreach (var j in pr)
            {
                dicPara.Add(j.Key.Trim().ToLower(), j.Value.ToString().Trim());
            }
        }
        return dicPara;
    }
    catch (Exception e)
    { return null; }
}
public Dictionary<string, string> convertConfigToDic(string config)
{
    try
    {
        var dicConfig = new Dictionary<string, string>();

        // config
        if (config == null || config == "" || config == "[]")
            return null;
        JObject cf = JObject.Parse(config);
        foreach (var j in cf)
        {
            dicConfig.Add(j.Key.ToLower().Trim(), j.Value.ToString().Trim());
        }

        if (!dicConfig.ContainsKey("namesql"))
            return null;
        return dicConfig;
    }
    catch (Exception ex)
    {
        return null;
    }
}
//#endregion
    }
}