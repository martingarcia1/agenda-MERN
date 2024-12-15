import React, { useState, useEffect } from 'react'
import Datos from './Datos'
import Editar from './Editar'
import Listar from './Listar'

function App() {
  const [contacto, setContacto] = useState(null)
  const [contactos, setContactos] = useState([])
  let [mensaje, setMensaje] = React.useState('')
  let [user, setUser] = React.useState('')
  let [password, setPassword] = React.useState('')
  let [showRegistro, setShowRegistro] = React.useState(true)
  let [showLogin, setShowLogin] = React.useState(false)
  let [showInfo, setShowInfo] = React.useState(false)
  let [loginUser, setLoginUser] = React.useState('')
  let [loginPassword, setLoginPassword] = React.useState('')

  async function registro(e) {
    e.preventDefault()
    let res = await fetch('/registro', {
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
      setShowLogin(true);
      setShowRegistro(false);
    }
  }

  async function login(e) {
    e.preventDefault();
    let res = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: loginUser, password: loginPassword })
    });
    let data = await res.text();
    setMensaje(data.mensaje)
    if (res.ok) {
      setShowLogin(false);
      setShowInfo(true);
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
    let res = await fetch('/logout', {
      method: 'PUT',
      credentials: 'include',
    })
    let data = await res.text();
    setMensaje(data.mensaje);
    setShowInfo(false);
    setShowLogin(true);
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

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: '#fff', borderBottom: '1px solid #ccc' }}>
        <h1 style={{ margin: 0 }}>AgendaPro</h1>
        {!showInfo && (
          <div>
            {showLogin || showRegistro ? (
              <>
                <button onClick={() => { setShowRegistro(true); setShowLogin(false); }}>Registrar</button>
                <button onClick={() => { setShowRegistro(false); setShowLogin(true); }}>Ingresar</button>
              </>
            ) : null}
          </div>
        )}
        {showInfo && (
          <button onClick={logout}>Cerrar sesión</button>
        )}
      </header>

      <main>
        {showRegistro && (
          <form>
            <h2>Registro</h2>
            <section>
              <label>Crear Nombre de Usuario</label>
              <input type="text" placeholder="Usuario" value={user} onChange={(e) => setUser(e.target.value)} />
              <label>Contraseña</label>
              <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
              <span>
                <button type="button" onClick={registro}>Registrarse</button>
                <button type="button" onClick={() => { setShowRegistro(false); setShowLogin(true); }}>Ya tengo cuenta</button>
              </span>
            </section>
          </form>
        )}

        {showLogin && (
          <form>
            <h2>Login</h2>
            <section>
              <label>Nombre de Usuario</label>
              <input type="text" placeholder="Usuario" value={loginUser} onChange={(e) => setLoginUser(e.target.value)} />
              <label>Contraseña</label>
              <input type="password" placeholder="Contraseña" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
              <span>
                <button onClick={login}>Iniciar sesión</button>
                <button onClick={() => { setShowRegistro(true); setShowLogin(false); }}>Registrarse</button>
              </span>
            </section>
          </form>
        )}

        {showInfo && (
          <div>
            <h2>Información privada</h2>
            <button onClick={info}>Ver información</button>
            <button onClick={logout}>Cerrar sesión</button>
            {contacto ? (
              <Editar contacto={contacto} alActualizar={actualizar} />
            ) : (
              <Listar contactos={contactos} alAgregar={agregar} alBorrar={borrar} />
            )}
          </div>
        )}
        <pre>{mensaje}</pre>
      </main>
    </div>
  );
}

export default App