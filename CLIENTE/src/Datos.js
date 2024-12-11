const base = "https://localhost:3000"
async function llamar(ruta, metodo = "GET", datos = {}) {
    let repuesta = await fetch(`${base}${ruta}`, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    })
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