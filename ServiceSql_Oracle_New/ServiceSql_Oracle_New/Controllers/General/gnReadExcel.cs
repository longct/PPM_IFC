using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.IO;
using System.Linq;
using System.Text;

namespace ServiceSql_Oracle_New.Controllers
{
    public class gnReadExcel
    {
        public  DataTable readfileExcel(string pathFile, string strSelect, string strWhere)
        {
            OleDbCommand command;
            OleDbDataReader dr;
            DataTable dt = new DataTable("dt");
            // var pathFile = "";
            try
            {
                if (pathFile != "")
                {
                    #region Đọc excel
                    string connStr =
                        string.Format(
                            "Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties=Excel 8.0;",
                             pathFile);
                    var conn = new OleDbConnection(connStr);
                    conn.Open();
                    var dbSchema = conn.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
                    if (dbSchema == null || dbSchema.Rows.Count < 1)
                    {
                        return null;
                    }
                    string excelSheetName = "";
                    if (dbSchema != null)
                        foreach (DataRow drSheet in dbSchema.Rows)
                        {
                            if (drSheet["TABLE_NAME"].ToString().Contains("$"))
                            {
                                excelSheetName = drSheet["Table_Name"].ToString();
                                break;
                            }
                        }

                    command = new OleDbCommand(strSelect + " from [" + excelSheetName + "] " + strWhere, conn);
                    try
                    {
                        dr = command.ExecuteReader();
                    }
                    catch (Exception ex)
                    {
                        conn.Dispose();
                        conn.Close();
                        command.Clone();
                        if (pathFile != "" && File.Exists(pathFile)) File.Delete(pathFile);
                        //MessageBox.Show("File chưa đúng định dạng, hoặc đang mở, xin vui lòng kiểm tra lại" + ex.ToString());
                        return null;
                    }
                    if (dr != null)
                        dt.Load(dr);

                    conn.Dispose();
                    conn.Close();
                    command.Clone();
                    dr.Close();
                    if (pathFile != "" && File.Exists(pathFile)) File.Delete(pathFile);
                    #endregion
                }
                return dt;
            }
            catch (Exception ex)
            {
                //MessageBox.Show("File chưa đúng định dạng, hoặc đang mở, xin vui lòng kiểm tra lại" + ex.ToString());
                return null;
            }
        }

    }
}
