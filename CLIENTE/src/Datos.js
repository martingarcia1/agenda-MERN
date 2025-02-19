const base = "http://localhost:3000"
async function llamar(ruta, metodo = "GET", datos = {}) {
    let opciones = {
        method: metodo,
        headers: { 'Content-Type': 'application/json' }
    };

    if (metodo != "GET") {
        opciones.body = JSON.stringify(datos);
    }

    try {
        let repuesta = await fetch(`${base}${ruta}`, opciones);
        if (!repuesta.ok) {
            throw new Error(`Error ${repuesta.status}: ${repuesta.statusText}`);
        }
        return await repuesta.json();
    } catch (error) {
        console.log("Error al llamar a la API", error.message);
        return null;
    }
}

async function listar() {
    return await llamar("/contactos")
}

async function agregar(datos) {
    return await llamar("/contactos", "POST", datos)

}

async function borrar(id) {
    return await llamar(`/contactos/${id}`, "DELETE")
}

async function editar(id, datos) {
    return await llamar(`/contactos/${id}`, "PUT", datos)
}

async function leer(id) {
    return await llamar(`/contactos/${id}`)
}

async function actualizar(id, datos) {
    return await llamar(`/contactos/${id}`, "PUT", datos)
}

async function buscar(id) {
    return await llamar(`/contactos/${id}`)
}

async function cambiarVisibilidad(id, es_visible) {
    return await llamar(`/contactos/${id}`, "PUT", { es_visible })
}

export default { listar, agregar, borrar, editar, leer, actualizar, buscar, cambiarVisibilidad };