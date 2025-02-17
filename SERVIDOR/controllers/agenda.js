import Datos from '../models/agenda.js'
async function listar(req, res) {
    try {
        const datos = await Datos.leerTodo();
        res.json(datos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
}

async function crear(req, res) {
    try {
        const contacto = req.body;
        const id = await Datos.crear(contacto)
        res.json(id);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el contacto' })
    }

}
async function borrar(req, res) {
    try {
        const id = req.params.id;
        await Datos.borrar(id);
        res.json({ mensaje: 'Contacto eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el contacto' });
    }
}

async function leer(req, res){
    try {
        const id = req.params.id;
        const contacto = await Datos.buscarPorId(id);
        if (contacto) {
            res.json(contacto);
        } else {
            res.status(404).json({ error: 'Contacto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el contacto' });
    }
}
async function actualizar(req, res) {   
    try {
        const id = req.params.id;
        const contacto = req.body;
        await Datos.actualizar(id, contacto);
        res.json({ mensaje: 'Contacto actualizado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el contacto' });
    }
}

async function editar(req, res) {
    try {
        const id = req.params.id;
        const contacto = req.body;
        await Datos.editar(id, contacto);
        res.json({ mensaje: 'Contacto actualizado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el contacto' });
    }
}

export default {listar,crear, borrar, leer, actualizar};