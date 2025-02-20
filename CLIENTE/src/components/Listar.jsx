/* eslint-disable react/prop-types */

import Agrega from "./agregarConta"
import { useEffect, useState } from "react"
import Datos from "../Datos"
import { func } from "prop-types"

function Listar({ contactos, alAgregar, alBorrar }) {
    const [isAdmin, setIsAdmin] = useState(false)
    function agregar() {
        alAgregar({ nombre: "", apellido: "", telefono: "", empresa: "", domicilio: "", email: "", propietario: "", es_publico: false, es_visible: true, contraseña: "" })
    }

    function editar(contacto) {
        alAgregar(contacto)
    }

    useEffect(() => {
        setIsAdmin(true)
    }, [])


    console.log(contactos)
    const contactosOrdenados = Array.isArray(contactos)
        ? [...contactos].sort((a, b) => (a.apellido || "").localeCompare(b.apellido || ""))
        : [];
    return (
        <>
            <h1>Contactos <button onClick={agregar}>Agregar</button></h1>
            {contactosOrdenados.map(c =>
                <section key={c._id}>
                    <p>{c._id}</p>
                    <p>{c.apellido} <b> {c.nombre}</b></p>
                    <p>{c.telefono}</p>
                    <p>{c.email}</p>
                    <p>{c.empresa}</p>
                    <p>{c.domicilio}</p>
                    <p>{c.propietario}</p>
                    <p>{c.es_publico ? "Si" : "No"}</p>
                    <p>{c.es_visible ? "Si" : "No"}</p>
                    <p>{c.contraseña}</p>
                    <button onClick={() => editar(c)}><b>Editar</b></button>
                    <button onClick={() => alBorrar(c)}><b>Borrar</b></button>
                </section>
            )}
        </>
    )
}

export default Listar;