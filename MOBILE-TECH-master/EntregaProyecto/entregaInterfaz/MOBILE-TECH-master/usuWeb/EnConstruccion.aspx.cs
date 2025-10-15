using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace mobileWeb
{
    public partial class EnConstruccion : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ScriptManager.RegisterClientScriptBlock(this, typeof(Page), "redirectJS",
            "setTimeout(function() { window.location.replace('Default.aspx') }, 2700);", true);
        }
    }
}