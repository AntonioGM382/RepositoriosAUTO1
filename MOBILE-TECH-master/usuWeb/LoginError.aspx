<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="LoginError.aspx.cs" Inherits="mobileWeb.LoginError" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<link href="StyleSheet.css" rel="stylesheet" type="text/css" />
<link rel="icon" type="image/png" href="assets/favicon.png">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Error!</title>
</head>
<body>
    <form id="form1" runat="server">
        <div dir="auto" class="menu2" style="text-align:center;">

            <br />
            <br />

            <h1 class="msg">
              <span class="text-wrapper">
                <span class="line line1"></span>
                <span class="letters">ERROR</span>
              </span>
            </h1>

            <label>Email o contraseña incorrecto.</label>
            <br />
            <br />
            <label>Volviendo a inicio de sesión...</label>

            <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js"></script>

            <script type="text/javascript">
                var textWrapper = document.querySelector('.msg .letters');
                textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

                anime.timeline({ loop: true })
                    .add({
                        targets: '.msg .line',
                        scaleY: [0, 1],
                        opacity: [0.5, 1],
                        easing: "easeOutExpo",
                        duration: 700
                    })
                    .add({
                        targets: '.msg .line',
                        translateX: [0, document.querySelector('.msg .letters').getBoundingClientRect().width + 10],
                        easing: "easeOutExpo",
                        duration: 700,
                        delay: 100
                    }).add({
                        targets: '.msg .letter',
                        opacity: [0, 1],
                        easing: "easeOutExpo",
                        duration: 600,
                        offset: '-=775',
                        delay: (el, i) => 34 * (i + 1)
                    }).add({
                        targets: '.msg',
                        opacity: 0,
                        duration: 1000,
                        easing: "easeOutExpo",
                        delay: 1000
                    });
            </script>

            

            <br />
            <br />

        </div>
    </form>
</body>
</html>
