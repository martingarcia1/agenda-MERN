import React, { useState, useEffect } from "react";
import Datos from "./Datos";
import Editar from "./components/Editar";
import Listar from "./components/Listar";
import LoginForm from "./components/auth/LoginPage";
import RegisterForm from "./components/auth/RegisterPage";
import Header from "./components/Header";

function App() {
  const [contacto, setContacto] = useState(null);
  const [contactos, setContactos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [userData, setUserData] = useState({});
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [editar, setEditar] = useState(false);
  const [showRegistro, setShowRegistro] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showForm, setShowForm] = useState(true);

  // REGISTRO DE USUARIO
  async function registro(datos) {
    let res = await fetch("http://localhost:3000/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });

    let data = await res.text();
    setMensaje(data);

    if (res.ok) {
      setShowRegistro(false);
    }
  }

  // LOGIN
  async function login(datos) {
    let res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });

    let data = await res.text();
    setMensaje(data);

    if (res.ok) {
      setLoggedInUser(datos.user);
      setShowLogin(false);
      setShowInfo(true);
      setShowForm(false);
      setUserData(datos);
    }
  }

  // LOGOUT
  async function logout() {
    let res = await fetch("http://localhost:3000/logout", {
      method: "PUT",
      credentials: "include",
    });

    let data = await res.text();
    setMensaje(data);
    setLoggedInUser(null);
    setShowInfo(false);
    setShowLogin(true);
    setShowForm(true);
  }

  // EDITAR USUARIO
  async function editarUsuario(datos) {
    let res = await fetch("http://localhost:3000/editarUsuario", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...userData, ...datos }),
    });

    let data = await res.text();
    setMensaje(data);

    if (res.ok) {
      setLoggedInUser(userData.user);
      setEditar(false);
    }
  }

  // CANCELAR EDICIÓN
  const cancelarEdicion = () => setEditar(true);

  // CARGAR CONTACTOS
  async function cargar() {
    let lista = await Datos.listar();
    setContactos(lista);
  }

  useEffect(() => { cargar(); }, []);

  // ACTUALIZAR CONTACTO
  async function actualizar(contacto) {
    if (contacto) {
      if (contacto._id) {
        //await Datos.editar(contacto)
      } else {
        await Datos.agregar(contacto);
      }
      cargar();
    }
    setContacto(null);
  }

  // AGREGAR CONTACTO
  async function agregar(contacto) {
    setContacto(contacto);
  }

  // BORRAR CONTACTO
  async function borrar(contacto) {
    await Datos.borrar(contacto._id);
    setContactos(contactos.filter((c) => c._id !== contacto._id));
  }

  // CANCELAR FORMULARIO
  async function cancelar() {
    setShowRegistro(false);
    setShowLogin(false);
  }

  return (
    <div>
      <Header 
        loggedInUser={loggedInUser} 
        logout={logout} 
        setShowRegistro={setShowRegistro}
        setShowLogin={setShowLogin} 
      />

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

export default App;
