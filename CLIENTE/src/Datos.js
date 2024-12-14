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

export default { listar, agregar, borrar }