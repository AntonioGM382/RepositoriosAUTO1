using library;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Configuration;
using System.Text;
using System.Threading.Tasks;
using System.Data.Common;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using System.Web.Services;

namespace mobileWeb
{
    public partial class Salir : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ENUsuario en = new ENUsuario();

            en.cerrarSesion();

                ScriptManager.RegisterClientScriptBlock(this, typeof(Page), "redirectJS",
            "setTimeout(function() { window.location.replace('Default.aspx') }, 2700);", true);
        }
    }
}