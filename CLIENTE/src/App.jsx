import React, { useState, useEffect } from "react";
import Datos from "./Datos";
import Editar from "./components/agregarConta";
import Listar from "./components/Listar";
import LoginForm from "./components/auth/LoginPage";
import RegisterForm from "./components/auth/RegisterPage";
import Header from "./components/Header";
import ProfilePage from "./pages/ProfilePage";

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
  const [showProfile, setShowProfile] = useState(false); // Nuevo estado para ProfilePage

  useEffect(() => {
    const usuario = localStorage.getItem("usuario");
    if (usuario) {
      setLoggedInUser(usuario);
    }
  }, []);

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
      localStorage.setItem("usuario", datos.user);
      setShowLogin(false);
      setShowInfo(true);
      setShowForm(false);
      setUserData(datos);
    }
  }

  async function logout() {
    let res = await fetch("http://localhost:3000/logout", {
      method: "PUT",
      credentials: "include",
    });
    if (res.ok) {
      localStorage.removeItem("usuario");
      window.location.reload();
    } else {
      alert("Error al cerrar sesión");
    }

    let data = await res.text();
    setMensaje(data);
    setLoggedInUser(null);
    localStorage.removeItem("usuario");
    setShowInfo(false);
    setShowLogin(true);
    setShowForm(true);
    setShowProfile(false); // Ocultar perfil al cerrar sesión
  }

  const cancelarEdicion = () => setEditar(true);

  async function cargar() {
    let lista = await Datos.listar();
    setContactos(lista);
  }

  useEffect(() => {
    cargar();
  }, []);

  async function actualizar(contacto) {
    if (contacto) {
      if (contacto._id) {
        await Datos.editar(contacto);
      } else {
        await Datos.agregar(contacto);
      }
      cargar();
    }
    setContacto(null);
  }

  async function agregar(contacto) {
    setContacto(contacto);
  }

  async function borrar(contacto) {
    await Datos.borrar(contacto._id);
    setContactos(contactos.filter((c) => c._id !== contacto._id));
  }

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
        setShowProfile={setShowProfile}
      />

      <main>
        {showProfile ? (
          <ProfilePage setShowProfile={setShowProfile} />
        ) : (
          <>
            {showRegistro && <RegisterForm onRegister={registro} onCancel={cancelar} />}
            {showLogin && <LoginForm onLogin={login} onCancel={cancelar} />}
            {contacto ? (
              <Editar contacto={contacto} alActualizar={actualizar} />
            ) : (
              <Listar contactos={contactos} alAgregar={agregar} alBorrar={borrar} />
            )}
          </>
        )}
      </main>

      <pre>{mensaje}</pre>
    </div>
  );

}

export default App;