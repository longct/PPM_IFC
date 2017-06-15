using System;
using System.Collections.Generic;
using Word = Microsoft.Office.Interop.Word;
using System.Data;
using System.Data.OleDb;

namespace ServiceSql_Oracle_New.Controllers
{
    class WordUltil
    {
        private Word.Application _app;
        Word.Document _doc;
        private object _pathFile;
        public WordUltil(string vPath, bool vCreateApp)
        {
            _pathFile = vPath;
            _app = new Word.Application();
            _app.Visible = vCreateApp;
            object ob = System.Reflection.Missing.Value;
            _doc = _app.Documents.Add(ref _pathFile, ref ob, ref ob, ref ob);

        }

        public void WriteFields(Dictionary<string, string> vValues)
        {
            foreach (Word.Field field in _doc.Fields)
            {
                string fieldName = field.Code.Text.Substring(11, field.Code.Text.IndexOf("\\") - 12).Trim();
                if (vValues.ContainsKey(fieldName))
                {
                    field.Select();
                    if (vValues[fieldName] == null || vValues[fieldName] == "")
                        _app.Selection.TypeText("                         ");
                    else
                        _app.Selection.TypeText(vValues[fieldName]);
                }
            }

            // _app.ActiveDocument.SaveAs(@"H:\chuky\file mau\mauwords.docx");

        }

        public void WriteTable(DataTable vDataTable, int vIndexTable)
        {
            Word.Table tbl = _doc.Tables[vIndexTable];
            int lenrow = vDataTable.Rows.Count;
            int lencol = vDataTable.Columns.Count;
            for (int i = 0; i < lenrow; ++i)
            {
                object ob = System.Reflection.Missing.Value;
                tbl.Rows.Add(ref ob);
                for (int j = 0; j < lencol; ++j)
                {
                    tbl.Cell(i + 2, j + 1).Range.Text = vDataTable.Rows[i][j].ToString();
                }
            }
        }
        public void SaveToFile(string path)
        {
            _doc.SaveAs2(path);
            _doc.Close();

        }
    }
}
