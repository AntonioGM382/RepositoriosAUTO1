<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Inicio.aspx.cs" Inherits="mobileWeb.Inicio" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<link href="StyleSheet.css" rel="stylesheet" type="text/css" />
<link rel="icon" type="image/png" href="assets/favicon.png">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Panel Usuario</title>
</head>
<body>
    <form id="form1" runat="server">
         

        <script src="https://code.jquery.com/jquery-3.2.1.js"></script>
        <script type="text/javascript">
            $(document).ready(function() {
                setTimeout(function() {
                    $(".load").fadeOut(1500);
                },3000);
 
                setTimeout(function() {
                    $(".menu").fadeIn(1500);
                },4500);
            });
        </script>    

        <div dir="auto" class="load" style="text-align:center;">
            <img src="/assets/logo.png" class="logo">
            <br />
            <img src="https://acegif.com/wp-content/uploads/2021/4fh5wi/pepefrg-4.gif" alt="gif" class="pepe" />
            <h1 data-text="loading...">loading...</h1>
        </div>

        <div dir="auto" class="menu" style="text-align:center; display:none;" >

            <div dir="auto" class="slider">
                <button type="button" class="sliderbotonDefault" ID="Button1"> Iniciar sesión
               </button>

                <button type="button" class="sliderboton" ID="Button2""> Registrarse
               </button>
            </div>


        

            <div dir="auto" class="login">

               <img src="/assets/user.png" class="user">

               <asp:TextBox class="input" id="email" placeholder="Email" runat="server">
               </asp:TextBox>

               <asp:TextBox class="input" id="contra" placeholder="Contraseña" runat="server" TextMode="password">
               </asp:TextBox>

                <br />
                <br />
                <br />

               <asp:Button class="boton" ID="botonLogin" Text="Iniciar sesión" runat="server" OnClick="LoginClick">
               </asp:Button>
            </div>

            <div dir="auto" class="register" style="display:none;">

               <asp:TextBox class="input" id="emailReg" placeholder="Email" runat="server">
               </asp:TextBox>

               <asp:TextBox class="input" id="contraReg" placeholder="Contraseña" runat="server" TextMode="password">
               </asp:TextBox>

               <asp:TextBox class="input" id="nombre" placeholder="Nombre" runat="server">
               </asp:TextBox>

               <asp:TextBox class="input" id="apellidos" placeholder="Apellidos" runat="server">
               </asp:TextBox>

               <asp:TextBox class="input" id="dni" placeholder="DNI" runat="server">
               </asp:TextBox>

               <asp:TextBox class="input" id="telef" placeholder="Teléfono" runat="server">
               </asp:TextBox>

               <asp:TextBox class="input" id="codPos" placeholder="Código postal" runat="server">
               </asp:TextBox>

                <br />
                <br />
                <br />

                <asp:Button class="boton" ID="botonRegister" Text="Registrarse" runat="server" OnClick="RegistrarClick">
                </asp:Button>   
     
            </div> 
        </div>

    


        <script src="https://code.jquery.com/jquery-3.2.1.js"></script>
        <script type="text/javascript">
            $("#Button2").click(function () {
                $(".register").show();
                $(".login").hide();
                $("#Button1").css('background', 'transparent');
                $("#Button1").css('color', '#d8d8d8');
                $("#Button2").css('background', 'linear-gradient( 109.6deg, rgba(62,161,219,1) 11.2%, rgba(93,52,236,1) 100.2% )');
                $("#Button2").css('color', 'white');
            });

            $("#Button1").click(function () {
                $(".login").show();
                $(".register").hide();
                $("#Button2").css('background', 'transparent');
                $("#Button2").css('color', '#d8d8d8');
                $("#Button1").css('background', 'linear-gradient( 109.6deg, rgba(62,161,219,1) 11.2%, rgba(93,52,236,1) 100.2% )');
                $("#Button1").css('color', 'white');
            });
        </script>


    </form>
</body>
</html>
