using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using System.Configuration;

namespace library
{
    public class ENUsuario
    {
        private string email;
        private string contra;
        private string nombre;
        private string apellidos;
        private string dni;
        private int telef;
        private int codPos;

        public string emailUsuario;
        public string contraUsuario;
        public string nombreUsuario;
        public string apellidosUsuario;
        public string dniUsuario;
        public int telefUsuario;
        public int codPosUsuario;

        public ENUsuario()
        {
            email = "";
            contra = "";
            nombre = "";
            apellidos = "";
            dni = "";
            telef = 0;
            codPos = 0;

            emailUsuario = email;
            contraUsuario = contra;
            nombreUsuario = nombre;
            apellidosUsuario = apellidos;
            dniUsuario = dni;
            telefUsuario = telef;
            codPosUsuario = codPos;
    }


        public ENUsuario(string email, string contra, string nombre, string apellidos, string dni, int telef, int codPos)
        {
            this.email = email;
            this.contra = contra;
            this.nombre = nombre;
            this.apellidos = apellidos;
            this.dni = dni;
            this.telef = telef;
            this.codPos = codPos;

            this.emailUsuario = email;
            this.contraUsuario = contra;
            this.nombreUsuario = nombre;
            this.apellidosUsuario = apellidos;
            this.dniUsuario = dni;
            this.telefUsuario = telef;
            this.codPosUsuario = codPos;
        }

        public void inicioSesion()
        {
            CADUsuario c = new CADUsuario();
            c.inicioSesion(this);
        }

        public bool createUsuario()
        {
            CADUsuario c = new CADUsuario(); 
            return c.createUsuario(this);
        }

        public bool loginUsuario()
        {
            CADUsuario c = new CADUsuario();
            return c.loginUsuario(this);
        }

        public void cerrarSesion()
        {
            CADUsuario c = new CADUsuario();
            c.cerrarSesion(this);
        }
    }
}
