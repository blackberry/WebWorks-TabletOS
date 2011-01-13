using System;
using System.Collections.Generic;
using System.Web.Services;
using TDAPIOLELib;

public partial class QC : System.Web.UI.Page
{
    static string rootPathPrefix = @"Root\";

    [WebMethod]
    public static string ReportResults(List<Results> results, string runName, string userName, string password)
    {
        string rc = "Nothing Reported";
        if (runName != null && userName != null && password != null)
        {
            TDConnection connection = null;
            try
            {
                connection = new TDConnection();

                String URL = "http://hpqualitycenter/qcbin/";
                String domainName = "Default";
                String projectName = "Production";

                //Response.Write("Server:" + URL + "  Domain:" + domainName + "  Project:" + projectName + "<br/>");
                //Prompt for QC credentials.

                connection.InitConnectionEx(URL);
                connection.Login(userName, password);
                connection.Connect(domainName, projectName);
                //Response.Write("Opening Connection <br/>");
                //Response.Write("Connection Status: " + (connection.Connected ? "connected" : "not connected") + "<br/>");
                if (connection != null && connection.Connected)
                {
                    foreach (Results r in results)
                    {
                        TestSetTreeManager treeManager = (TestSetTreeManager)connection.TestSetTreeManager;

                        //Response.Write("Folder: " + rootPathPrefix + path + " <br/>");

                        TestSetFolder folder = (TestSetFolder)treeManager.get_NodeByPath(rootPathPrefix + r.Path);
                        TestSetFactory tFactory = (TestSetFactory)folder.TestSetFactory;
                        TDFilter tFilter = (TDFilter)tFactory.Filter;
                        tFilter["TS_TEST_ID"] = r.Id;

                        //http://atg05-yyz/YUI/ReportResultToQC.aspx?id=2367453&path=BlackBerry%20Developer%20Tools\Sandbox&result=0
                        if (r.Id != null)
                        {
                            //Response.Write("testId= " + testId + "  result= " + result + "<br/>");
                            List tests = folder.FindTestInstances("", false, tFilter.Text);

                            if (tests.Count == 1)
                            {
                                TSTest t = (TSTest)tests[1];
                                //Response.Write(t.ID + " " + t.Status + " " + t.Name + " " + "<br/>");
                                RunFactory runFactory = (RunFactory)t.RunFactory;
                                Run newRun = (Run)runFactory.AddItem(runName);

                                switch (r.Result)
                                {
                                    case 0:
                                        newRun.Status = @"FAILED";
                                        break;
                                    case 1:
                                        newRun.Status = @"PASSED";
                                        break;
                                    case 2:
                                        newRun.Status = @"N/A";
                                        break;
                                }
                                //Response.Write("Status = " + newRun.Status + "<br/>");
                                newRun.Post();
                                rc = "Success";
                            }
                            else
                            {
                                rc = "Error: Multiple Tests Returned for ID # " + r.Id;
                                break;
                            }
                        }
                        else
                        {
                            rc = "No Test Specified";
                            break;
                        }
                    }//foreach result
                }//if connection
                else
                    rc =  "Connection to QC could not be established";
            }
            catch (Exception ex)
            {
                rc = ex.Message;
            }
            finally
            {
                if (connection != null)
                {
                    if (connection.Connected)
                        connection.Disconnect();

                    if (connection.LoggedIn)
                        connection.Logout();

                    connection.ReleaseConnection();
                    connection = null;
                }                
            }
        }
        return rc;
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        Response.Write("Nothing to see here");
    }

    public class Results
    {
        private string id;
        private string path;
        private int result;

        public string Id
        {
            get
            {
                return id;
            }
            set
            {
                id = value;
            }
        }

        public string Path
        {
            get
            {
                return path;
            }
            set
            {
                path = value;
            }
        }

        public int Result
        {
            get
            {
                return result;
            }
            set
            {
                result = value;
            }
        }
    }
}
