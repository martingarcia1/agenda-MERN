import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors"
import Agenda from './routers/agenda.js';
import { conectar, contactos } from './models/agenda.js';
// import { listar, cambiarPrivacidad, cambiarVisibilidad } from './models/agenda.js';
import {listar, cambiarPrivacidad, cambiarVisibilidad} from './controllers/agenda.js';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',  // Permitir solo solicitudes desde el frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos permitidos
    credentials: true,  // Permitir cookies (credenciales)
  })
);
app.use(morgan("dev"))
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"))
app.use("/contactos", Agenda)

let usuarios = []

function tokens() {
  return Math.random().toString().substring(2);
}

function validacion(req, res, next) {
  console.log("Validando usuario, Cookies recibidas:", req.cookies)
  let token = req.cookies.token
  let usuario = usuarios.find(usuario => usuario.token === token)
  if (usuario) {
    req.usuario = usuario
    next()
  } else {
    res.status(401).send("No estas autorizado")
  }
}

//RUTAS

app.post('/registro', async(req, res) => {
  let { user, password } = req.body
  if (!user || !password) {
    return res.status(400).json({ error: 'Faltan datos' })
  }

  let existe = usuarios.find(usuario => usuario.user === user)
  if (existe) {
    res.status(402).json({ error: 'El usuario ya existe' })
  }
  usuarios.push({ user, password })

  await conectar();
  await contactos.insertOne({
    nombre: user,
    apellido: "",
    telefono: "",
    email: "",
    propietario: user,
    es_publico: false,
    es_visible: false,
    contraseña: password
  });
  res.send('Usuario registrado correctamente');
});

app.post('/login', (req, res) => {
  let { user, password } = req.body
  if (!user || !password) {
    return res.status(400).json({ error: 'Usuario o Contraseña invalidos' })
  }

  let usuario = usuarios.find(usuario => usuario.user === user && usuario.password === password)
  if (usuario) {
    let token = tokens()
    usuario.token = token
    res.cookie("token", token);
    return res.json("Logueado correctamente")
  } else {
    return res.status(401).json({ error: 'Usuario o Contraseña invalidos' })
  }
})

app.put('/logout', validacion, (req, res) => {
  console.log("Cerrando sesion para:", req.cookies)
  if (!req.usuario) {
    return res.status(401).send("No estas autorizado")
  }
  let usuario = req.usuario
  delete usuario.token
  res.clearCookie('token')
  res.json('Sesion Cerrada')
})

app.put('/editarUsuario', validacion, (req, res) => {
  let { user, password } = req.body;
  let usuario = req.usuario;

  if (user) usuario.user = user;
  if (password) usuario.password = password;

  res.json('Datos de usuario actualizados correctamente');
});

app.get('/contactos', validacion, listar);
app.put('/contactos/:id', validacion, cambiarPrivacidad
  //(req, res) => {
  // res.json('Contacto actualizado')}
);
app.put('/contactos/:id/privacidad', validacion, cambiarPrivacidad);
app.put('/contactos/:id/visibilidad', validacion, cambiarVisibilidad);
app.get('/privado', validacion, (req, res) => {
  res.json('Esta es una ruta privada, solo para usuarios logueados')
})

app.listen(3000, () => {
  console.log("Servidor iniciado en http://localhost:3000")
})