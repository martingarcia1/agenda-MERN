import React, { useState, useEffect } from 'react'
import Datos from './Datos'
import Editar from './components/Editar'
import Listar from './components/Listar'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

function App() {
  const [contacto, setContacto] = useState(null)
  const [contactos, setContactos] = useState([])
  let [mensaje, setMensaje] = React.useState('')
  let [user, setUser] = React.useState('')
  let [password, setPassword] = React.useState('')
  let [showRegistro, setShowRegistro] = React.useState(false)
  let [showLogin, setShowLogin] = React.useState(false)
  let [showInfo, setShowInfo] = React.useState(false)
  let [showForm, setShowForm] = React.useState(true)
  let [loginUser, setLoginUser] = React.useState('')
  let [loginPassword, setLoginPassword] = React.useState('')
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [editar, setEditar] = useState(false)
  const [userData, setUserData] = useState({})


  async function registro(datos) {
    const { user, password } = datos
    let res = await fetch('http://localhost:3000/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user, password })
    });

    let data = await res.text()
    setMensaje(data)

    if (res.ok) {
      setUser('');
      setPassword('');
      setShowRegistro(false);
    }
  }

  async function login(datos) {
    const { user, password } = datos
    let res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user, password })
    });
    let data = await res.text();
    setMensaje(data.mensaje)
    if (res.ok) {
      setLoggedInUser(user)
      setShowLogin(false);
      setShowInfo(true);
      setShowForm(false);
      setUserData({ user });
    }

  }

  async function info() {
    let res = await fetch('/privado', {
      method: 'GET',
      credentials: 'include',
    })
    let data = await res.text();
    setMensaje(data)
  }

  async function logout() {
    let res = await fetch('http://localhost:3000/logout', {
      method: 'PUT',
      credentials: 'include',
    });
    let data = await res.text();
    setMensaje(data.mensaje);
    setLoggedInUser(null);
    setShowInfo(false);
    setShowLogin(true);
    setShowForm(true);
  }

  async function editarUsuario(datos) {

    let res = await fetch('http://localhost:3000/editarUsuario', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...userData, ...datos }),
    });
    let data = await res.text();
    setMensaje(data);
    if (res.ok) {
      setLoggedInUser(userData.user);
      setEditar(false)
    }
  }
  const cancelarEdicion = () => {
    setEditar(true)
  }
  async function cargar() {
    let lista = await Datos.listar()
    setContactos(lista)
  }
  useEffect(() => { cargar() }, [])
  async function actualizar(contacto) {
    if (contacto) {
      if (contacto._id) {
        //await Datos.editar(contacto)
      } else {
        await Datos.agregar(contacto)
      }
      cargar()
    }
    setContacto(null)
  }

  async function agregar(contacto) {
    setContacto(contacto)
  }

  async function borrar(contacto) {
    await Datos.borrar(contacto._id)
    setContactos(contactos.filter(c => c._id !== contacto._id))
  }

  async function cancelar() {
    setShowRegistro(false);
    setShowLogin(false);
  }

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: '#fff', borderBottom: '1px solid #ccc' }}>
        <h1 style={{ margin: 0 }}>AgendaPro</h1>
        <div>
          {loggedInUser ? (
            <>
              <span>{loggedInUser}</span>
              <button onClick={logout}>Salir</button>
            </>
          ) : (
            <>
              <button onClick={() => { setShowRegistro(true); setShowLogin(false); }}>Registrar</button>
              <button onClick={() => { setShowRegistro(false); setShowLogin(true); }}>Ingresar</button>
            </>
          )}
        </div>
      </header>

      <main>
        {showRegistro && (<RegisterForm onRegister={registro} onCancel={cancelar} />)}

        {showLogin && (<LoginForm onLogin={login} onCancel={cancelar} />)}

        {editar && (
          <div>
            <h2>Editar Usuario</h2>
            <form onSubmit={(e) => { e.preventDefault(); editarUsuario(userData); }}>
              <label>Usuario:</label>
              <input
                type="text"
                value={userData.user}
                onChange={(e) => setUserData({ ...userData, user: e.target.value })}
              />
              <label>Contraseña:</label>
              <input
                type="password"
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              />
              <div>
                <button type="submit">Guardar</button>
                <button type="button" onClick={cancelarEdicion}>Cancelar</button>
              </div>
            </form>
          </div>
        )}
        <pre>{mensaje}</pre>
      </main>
      {contacto ? (
        <Editar contacto={contacto} alActualizar={actualizar} />
      ) : (
        <Listar contactos={contactos} alAgregar={agregar} alBorrar={borrar} />
      )}

    </div>
  );
}

export default App