import { useState, useEffect } from "react";
import LoginForm from "../components/auth/LoginPage";

function ProfilePage() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [showForm, setShowForm] = useState(true);


    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setName(user);
        }
    }, [])

    async function updateUser(data) {
        let res = await fetch("http://localhost:3000/editarUsuario", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include"
        });

        let response = await res.text();
        alert(response);

        if (res.ok) {
            setName(data.user);
            localStorage.setItem("user", data.user);
            setShowForm(false);
        }
    }

    function handleUpdate(e) {
        e.preventDefault();
        updateUser({ name, password, email });
    }

    function handleCancel(e) {
        e.preventDefault();
        setShowForm(false);
    }

    return (
        <div>
            <h1>Perfil de Usuario</h1>

            {/* Si showForm es false, mostrar el botón para editar */}
            {!showForm ? (
                <button onClick={() => setShowForm(true)} className="buttons">Editar Perfil</button>
            ) : (
                <form onSubmit={handleUpdate}>
                    <div>
                        <label>Nombre de Usuario</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        <label>Contraseña</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label>Correo Electrónico</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <span>
                        <button type="submit" className="buttons">Actualizar</button>
                        <button onClick={handleCancel} className="buttons">Cancelar</button>
                    </span>
                </form>
            )}
        </div>
    );

}

export default ProfilePage;