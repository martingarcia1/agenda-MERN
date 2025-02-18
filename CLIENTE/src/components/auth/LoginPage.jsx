import { useState } from "react";
/* eslint-disable react/prop-types */
function LoginForm({ onLogin, onCancel }) {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    function login(e) {
        e.preventDefault();
        if (user && password) {
            onLogin({ user, password });
        } else {
            alert("Todos los campos son obligatorios");
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
                <h2>Login</h2>
                <form onSubmit={login}>
                    <div>
                        <label>Nombre de Usuario</label>
                        <input type="text" value={user} onChange={(e) => setUser(e.target.value)} />
                        <label>Contraseña</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label>Correo Electrónico</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <span> 
                        <button type="submit" className="buttons">Login</button>
                        <button onClick={handleCancel} className="buttons" >Cancelar</button>
                    </span>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;