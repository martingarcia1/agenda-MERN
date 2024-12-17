import { useState } from "react";
/* eslint-disable react/prop-types */
function LoginForm({ onLogin, onCancel }) {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();

        if (name && password) {
            onLogin({ name, password });
        } else {
            alert("Todos los campos son obligatorios");
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
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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