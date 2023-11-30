# diazaBus_backend_ME
Backend para diazabus con Mongo y Exprees conexion a frontend CORS
# diazbus_backend
API for diazBus app, Mongo - Express   
Insert User (POST)
http://localhost:4000/api//usuarios

{
    "name": "Julio Sesai",
    "password": "1234",
    "email": "j@s.com"


}

LOGIN (POST)
http://localhost:4000/api//usuarios
{
     
    "password": "1234",
    "email": "j@s.com"


}
GET   obtener el perfil
http://localhost:4000/api//usuarios/perfil

(GET) Confirmar Cuenta Via Token
http://localhost:4000/api//usuarios/confirmar/l1dsqak073o1hg9dqqvi

Solicitar recuperar password (POST)
http://localhost:4000/api//usuarios/password-olvidado
{
    "email": "j@s.com"

}
GET validar token para recuperar password

http://localhost:4000/api//usuarios/password-olvidado/48jhacujvoo1hg9drdcb
POST  Almacena Nuevo password

http://localhost:4000/api//usuarios/password-olvidado/48jhacujvoo1hg9drdcb

{
    "password":"1234"
}


