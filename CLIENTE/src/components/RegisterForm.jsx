import { useState } from "react";
/* eslint-disable react/prop-types */
function RegisterForm({ onRegister, onCancel }) {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    function registro(e) {
        e.preventDefault();
        e.stopPropagation();

        if (user && password) {
            onRegister({ user, password });
        } else {
            alert("Todos los campos son obligatorios")
        }
    }
    

    function handleCancel(e) {
        e.preventDefault();
        e.stopPropagation();
        setUser("");
        setPassword("");
        onCancel();
    }
    return (
        <div className="modal">
            <div className="content">
                <h2>Registro</h2>
                <form onSubmit={registro} >
                    <div>
                        <label>Crear Nombre de Usuario</label>
                        <input type="text" placeholder="Usuario" value={user} onChange={(e) => setUser(e.target.value)} />
                        <label>Contraseña</label>
                        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <span>
                        <button type="submit" className="buttons">Registrarse</button>
                        <button onClick={handleCancel} className="buttons">Cancelar</button>

                    </span>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;