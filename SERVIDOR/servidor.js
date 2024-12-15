import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors"
import Agenda from './routers/agenda.js';

const app = express();

app.use(morgan("dev"))
app.use(cookieParser())
app.use(express.json());
app.use(express.static("public"))
app.use(cors());

app.use("/contactos", Agenda)

let usuarios = []

function tokens() {
  return Math.random().toString().substring(2);
}

function validacion(req, res, next) {
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

app.post('/registro', (req, res) => {
  let { user, password } = req.body
  if (!user || !password) {
    return res.status(400).json({ error: 'Faltan datos' })
  }

  let existe = usuarios.find(usuario => usuario.user === user)
  if (existe) {
    res.status(402).json({ error: 'El usuario ya existe' })
  } else {
    usuarios.push({ user, password })
    res.send('Usuario registrado correctamente')
  }
})

app.post('/login', (req, res) => {
  let { user, password } = req.body
  if (!user || !password) {
    return res.status(400).json({ error: 'Usuario o Contraseña invalidos' })
  }

  let usuario = usuarios.find(usuario => usuario.user === user && usuario.password === password)
  if (usuario) {
    let token = tokens()
    usuario.token = token
    res.cookie("token", token)
    return res.json("Logueado correctamente")
  } else {
    return res.status(401).json({ error: 'Usuario o Contraseña invalidos' })
  }
})

app.put('/logout', validacion, (req, res) => {
  let usuario = req.usuario
  delete usuario.token
  res.clearCookie('token')
  res.json('Sesion Cerrada')
}) 

app.get('/privado', validacion, (req, res) => {
  res.json('Esta es una ruta privada, solo para usuarios logueados')
})

app.listen(3000, () => {
  console.log("Servidor iniciado en http://localhost:3000")
})
