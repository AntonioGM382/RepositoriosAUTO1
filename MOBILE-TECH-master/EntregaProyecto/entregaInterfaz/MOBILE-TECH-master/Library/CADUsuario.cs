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
    class CADUsuario
    {
        private string constring;

        public CADUsuario()
        {
            constring = ConfigurationManager.ConnectionStrings["miconexion"].ToString();
        }

        public bool createUsuario(ENUsuario usuario)
        {
            bool check = false;
            SqlConnection c = new SqlConnection(constring);

            try
            {
                c.Open();
                SqlCommand com = new SqlCommand("INSERT INTO USUARIOS(email, contraseña, nombre, apellidos, dni, telefono, codPostal, ciudad, provincia, calle, edificio, checkAdmin, checkPremium, checkLogin) VALUES('" + usuario.emailUsuario + "', '" + usuario.contraUsuario + "', '" + usuario.nombreUsuario + "', '" + usuario.apellidosUsuario + "', '" + usuario.dniUsuario + "'," + usuario.telefUsuario + ", " + usuario.codPosUsuario + ", '  ', '  ', '  ', '  ', 0, 0, 0)", c);
                com.ExecuteNonQuery();
                c.Close();
                check = true;
            }
            catch (SqlException ex)
            {
                //error pantalla, return false
            }
            finally
            {
                c.Close();
            }

            return check;
        }

        public bool loginUsuario(ENUsuario usuario)
        {
            bool check = false;
            SqlConnection c = new SqlConnection(constring);

            try
            {
                c.Open();

                SqlCommand com = new SqlCommand("select * from Usuarios where email='" + usuario.emailUsuario + "'", c);
                SqlDataReader dr = com.ExecuteReader();
                if (dr.Read())
                {
                    usuario.emailUsuario = dr["email"].ToString();
                    usuario.contraUsuario = dr["contraseña"].ToString();
                }
                else
                {
                    return false;
                }
                dr.Close();

                check = true;
            }
            catch (SqlException ex)
            {
                //error pantalla, return false
            }
            finally
            {
                c.Close();
            }

            return check;
        }


        public void inicioSesion(ENUsuario usuario)
        {
            SqlConnection c = new SqlConnection(constring);

            try
            {
                c.Open();
                SqlCommand com = new SqlCommand("update USUARIOS set checkLogin= '1' where email='" + usuario.emailUsuario  + "' update USUARIOS set checkLogin= '0' where email!='" + usuario.emailUsuario + "'", c);
                com.ExecuteNonQuery();
                c.Close();
            }
            catch (SqlException ex)
            {
                //error pantalla, return false
            }
            finally
            {
                c.Close();
            }
        }

        public void cerrarSesion(ENUsuario usuario)
        {
            SqlConnection c = new SqlConnection(constring);

            try
            {
                c.Open();
                SqlCommand com = new SqlCommand("update USUARIOS set checkLogin= '0'", c);
                com.ExecuteNonQuery();
                c.Close();
            }
            catch (SqlException ex)
            {
                //error pantalla, return false
            }
            finally
            {
                c.Close();
            }
        }
    }
}



