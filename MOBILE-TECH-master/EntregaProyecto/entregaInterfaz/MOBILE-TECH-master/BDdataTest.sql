/*#####################        ADD USUARIOS TEST        ######################*/

INSERT INTO USUARIOS(email, contraseña, nombre, apellidos, dni, telefono, fechaNac, codPostal, ciudad, provincia, calle, edificio, checkAdmin, checkPremium) 
VALUES('test1@email.com', 'test123', 'Test', 'Test1', '123456A', '600000000', '1990-01-01', '01000', 'Vitoria', 'Álava', 'Calle test', '1', 0, 0)

INSERT INTO USUARIOS(email, contraseña, nombre, apellidos, dni, telefono, fechaNac, codPostal, ciudad, provincia, calle, edificio, checkAdmin, checkPremium) 
VALUES('test2@email.com', 'test234', 'Test', 'Test2', '123456B', '610000000', '1990-01-02', '02000', 'Albacete', 'Albacete', 'Calle test', '2', 0, 0)

INSERT INTO USUARIOS(email, contraseña, nombre, apellidos, dni, telefono, fechaNac, codPostal, ciudad, provincia, calle, edificio, checkAdmin, checkPremium) 
VALUES('test3@email.com', 'test345', 'Test', 'Test3', '123456C', '620000000', '1990-01-03', '03000', 'Alicante', 'Alicante', 'Calle test', '3', 0, 0)

INSERT INTO USUARIOS(email, contraseña, nombre, apellidos, dni, telefono, fechaNac, codPostal, ciudad, provincia, calle, edificio, checkAdmin, checkPremium) 
VALUES('test4@email.com', 'test456', 'Test', 'Test4', '123456D', '630000000', '1990-01-04', '04000', 'Almería', 'Almería', 'Calle test', '4', 0, 0)

INSERT INTO USUARIOS(email, contraseña, nombre, apellidos, dni, telefono, fechaNac, codPostal, ciudad, provincia, calle, edificio, checkAdmin, checkPremium) 
VALUES('test5@email.com', 'test567', 'Test', 'Test5', '123456E', '640000000', '1990-01-05', '05000', 'Ávila', 'Ávila', 'Calle test', '5', 0, 0)



/*#####################        ADD MARCAS TEST        ######################*/

INSERT INTO MARCA(marca, empresa, logo, enlace)
VALUES('Apple', 'Apple', 'assets/iphoneLogo.png', 'http://www.apple.com/es/iphone/')

INSERT INTO MARCA(marca, empresa, logo, enlace)
VALUES('Samsung', 'Samsung', 'assets/samsungLogo.png', 'https://www.samsung.com/es/smartphones/')

INSERT INTO MARCA(marca, empresa, logo, enlace)
VALUES('LG', 'LG', 'assets/lgLogo.png', 'https://www.lg.com/es/moviles')

INSERT INTO MARCA(marca, empresa, logo, enlace)
VALUES('Oppo', 'Oppo', 'assets/oppoLogo.png', 'https://www.oppo.com/es/')

INSERT INTO MARCA(marca, empresa, logo, enlace)
VALUES('Xiaomi', 'Xiaomi', 'assets/xiaomiLogo.png', 'https://www.mi.com/')


/*#####################        ADD ARTICULO TEST        ######################*/

INSERT INTO ARTICULO(codigo, nombre, precio, descuento, especificaciones, imagen, marca)
VALUES('0000001', 'Mi Note 10 Lite', 239, 00.00, '64GB', 'assets/xiaminote10.png', 'Xiaomi')

INSERT INTO ARTICULO(codigo, nombre, precio, descuento, especificaciones, imagen, marca)
VALUES('0000002', 'Galaxy Note 20', 799, 00.00, '256GB', 'assets/galaxynote20.png', 'Samsung')

INSERT INTO ARTICULO(codigo, nombre, precio, descuento, especificaciones, imagen, marca)
VALUES('0000003', 'A73', 249, 00.00, '128GB', 'assets/oppoa73.png', 'Oppo')

INSERT INTO ARTICULO(codigo, nombre, precio, descuento, especificaciones, imagen, marca)
VALUES('0000004', 'iPhone XS', 1069, 00.00, '512GB', 'assets/iphonexs.png', 'Apple')

INSERT INTO ARTICULO(codigo, nombre, precio, descuento, especificaciones, imagen, marca)
VALUES('0000005', 'iPhone 12', 959, 00.00, '128GB', 'assets/iphone12.png', 'Apple')

INSERT INTO ARTICULO(codigo, nombre, precio, descuento, especificaciones, imagen, marca)
VALUES('0000006', 'K61', 179, 00.00, '128GB', 'assets/lgk61.png', 'LG')

INSERT INTO ARTICULO(codigo, nombre, precio, descuento, especificaciones, imagen, marca)
VALUES('0000007', 'iPhone 7', 299, 00.00, '256GB', 'assets/iphone7.png', 'Apple')

INSERT INTO ARTICULO(codigo, nombre, precio, descuento, especificaciones, imagen, marca)
VALUES('0000008', 'iPhone 8', 352, 00.00, '256GB', 'assets/iphone8.png', 'Apple')

INSERT INTO ARTICULO(codigo, nombre, precio, descuento, especificaciones, imagen, marca)
VALUES('0000009', 'Galaxy 9', 299, 00.00, '64GB', 'assets/galaxy9.png', 'Samsung')

INSERT INTO ARTICULO(codigo, nombre, precio, descuento, especificaciones, imagen, marca)
VALUES('0000010', 'iPhone 10', 559, 00.00, '256GB', 'assets/iphone10.png', 'Apple')



/*#####################        INFO MOVIL TEST        ######################*/

INSERT INTO MOVIL(codigo, cpu, ram, memoria, pantalla, so)
VALUES('0000001', 'Qualcomm Snapdragon 730G', '6GB', '64GB', '6.47', 'Android')

INSERT INTO MOVIL(codigo, cpu, ram, memoria, pantalla, so)
VALUES('0000002', 'Exynos 990', '8GB', '256GB', '6.7', 'Android')

INSERT INTO MOVIL(codigo, cpu, ram, memoria, pantalla, so)
VALUES('0000003', 'MediaTek MT6853V', '8GB', '128GB', '6.5', 'Android')

INSERT INTO MOVIL(codigo, cpu, ram, memoria, pantalla, so)
VALUES('0000004', 'A12', '4GB', '512GB', '5.8', 'iOS 12')

INSERT INTO MOVIL(codigo, cpu, ram, memoria, pantalla, so)
VALUES('0000005', 'A14', '4GB', '128GB', '6.1', 'iOS 14')

INSERT INTO MOVIL(codigo, cpu, ram, memoria, pantalla, so)
VALUES('0000006', 'MediaTek MT6765', '4GB', '128GB', '6.53', 'Android')

INSERT INTO MOVIL(codigo, cpu, ram, memoria, pantalla, so)
VALUES('0000007', 'A10', '2GB', '256GB', '4.7', 'iOS 11')

INSERT INTO MOVIL(codigo, cpu, ram, memoria, pantalla, so)
VALUES('0000008', 'A11', '2GB', '256GB', '4.7', 'iOS 11')

INSERT INTO MOVIL(codigo, cpu, ram, memoria, pantalla, so)
VALUES('0000009', 'Exynos 9180', '4GB', '64GB', '5.8', 'Android')

INSERT INTO MOVIL(codigo, cpu, ram, memoria, pantalla, so)
VALUES('0000010', 'A11', '3GB', '256GB', '5.8', 'iOS 11')

