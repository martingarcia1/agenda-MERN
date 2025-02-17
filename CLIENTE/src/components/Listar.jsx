/* eslint-disable react/prop-types */

function Listar({ contactos, alAgregar, alBorrar }) {
    function agregar() {
        alAgregar({nombre: "", apellido: "", telefono: "", empresa: "", domicilio: "", email: "", propietario: "", es_publico: "", es_visible: "", contraseña: ""})
    }

    return (
        <>
           <h1>Contactos <button onClick={agregar}>Agregar</button></h1>
           {contactos.map(c =>
              <section key={c.id}>
                <p>{c.nombre} <b>{c.apellido}</b></p>
                <p>{c.telefono}</p>
                <p>{c.email}</p>
                <p>{c.empresa}</p>
                <p>{c.domicilio}</p>
                <p>{c.propietario}</p>
                <p>{c.es_publico}</p>
                <p>{c.es_visible}</p>
                <p>{c.contraseña}</p>
                <button><b>Editar</b></button>
                <button onClick={() => alBorrar(c)}><b>Borrar</b></button>
              </section>
           )}
        </>
    )
}

export default Listar