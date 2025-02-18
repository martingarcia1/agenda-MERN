const base = "http://localhost:3000"
async function llamar(ruta, metodo = "GET", datos = {}) {
    let opciones = {
        method: metodo,
        headers: { 'Content-Type': 'application/json' }
    }
    if (metodo != "GET") {
        opciones.body = JSON.stringify(datos)
    }
    let repuesta = await fetch(`${base}${ruta}`, opciones)
    return await repuesta.json()
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

async function es_visible(id) {
    return await llamar(`/contactos/${id}`, "PUT")
}

export default { listar, agregar, borrar, editar, leer, actualizar, buscar, es_visible };