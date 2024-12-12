function listar(contactos, alAgregar, alBorrar) {
    return (
        <>
            <h1>Contactos <button onClick={alAgregar}>Agregar</button></h1>
            {contactos.map(c =>
                <section key={c.id}>
                    <p>{c.nombre}<b> {c.apellido}</b> </p>
                    <p>{c.telefono}</p>
                    <button onClick={() => alBorrar(c)}>Borrar</button>
                </section>
            )}
        </>
    )
}

export default listar;