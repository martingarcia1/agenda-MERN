import React from "react";

function Header({ loggedInUser, logout, setShowRegistro, setShowLogin }) {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        backgroundColor: "#fff",
        borderBottom: "1px solid #ccc",
      }}
    >
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
  );
}

export default Header;