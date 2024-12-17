import { useState } from "react";
/* eslint-disable react/prop-types */
function RegisterForm({ onRegister, onCancel }) {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();

        if (name && password) {
            onRegister({ name, password });
        } else {
            alert("Todos los campos son obligatorios")
        }
    }

    function handleCancel(e) {
        e.preventDefault();
        e.stopPropagation();
        setName("");
        setPassword("");
        onCancel();
    }
    return (
        <div className="modal">
            <div className="content">
                <h2>Register</h2>
                <form onSubmit={handleSubmit} >
                    <div>
                        <label>Crear Nombre de Usuario</label>
                        <input type="text" placeholder="Usuario" value={name} onChange={(e) => setName(e.target.value)} />
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