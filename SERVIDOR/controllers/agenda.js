import Datos from '../models/agenda.js'
import { ObjectId } from 'mongodb';
import { conectar, contactos } from '../models/agenda.js';

export async function listar(req, res) {
    await conectar();
    req.usuario = req.usuario || { user: '' };
    // req.usuario = 'admin';
    try {
        const usuario = req.usuario;
        let datos;

        if (usuario.user === 'admin') {
            datos = await contactos.find({}).toArray();
        } else {
            datos = await contactos.find({
                $or: [
                    { propietario: usuario.user },
                    { es_publico: true, es_visible: true }
                ]
            }).toArray();
        }
        res.json(datos);
    } catch (error) {
        console.log("Error al listar los contactos", error);
        res.status(500).json({ error: 'Error al listar los contactos' });
    }
}

export async function cambiarPrivacidad(req, res) {
    await conectar();
    const {id} = req.params;
    const usuario = req.usuario;

    try {
        const contacto = await contactos.findOne({ _id: new ObjectId(id) });
        if (!contacto) {
            return res.status(404).json({ error: 'Contacto no encontrado' });
        }

        if (contacto.propietario !== req.usuario.user) {
            return res.status(403).json({ error: 'No tienes permisos para modificar este contacto' });
        }

        const nuevoEstado = !contacto.es_publico;
        await contactos.updateOne(
            { _id: new ObjectId(id) },
            { $set: { es_publico: nuevoEstado } }
        );

        res.json({ mensaje: 'Privacidad del contacto actualizada', es_publico: nuevoEstado });
    } catch (error) {
        res.status(500).json({ error: 'Error al cambiar la privacidad del contacto' });
    }
}

export async function cambiarVisibilidad(req, res) {
    await conectar();
    const id = req.params.id;
    const { es_visible } = req.body;
    try {
        const contacto = await contactos.findOne({ _id: new ObjectId(id) });
        if (!contacto) {
            return res.status(404).json({ error: 'Contacto no encontrado' });
        }

        if (req.usuario.user !== 'admin') {
            return res.status(403).json({ error: 'No tienes permisos para modificar este contacto' });
        }

        
        await contactos.updateOne(
            { _id: new ObjectId(id) },
            { $set: { es_visible } }
        );

        res.json({ mensaje: 'Visibilidad del contacto actualizada', es_visible });
    } catch (error) {
        res.status(500).json({ error: 'Error al cambiar la visibilidad del contacto' });
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

async function leer(req, res) {
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
        console.log(error)

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

export default { listar, crear, borrar, leer, actualizar, editar, cambiarPrivacidad, cambiarVisibilidad };









// async function actualizar(req, res) {
//     const { id } = req.params;
//     const usuario = req.usuario;
//     const contacto = await contactos.findOne({ _id: new ObjectId(id) });

//     if (!contacto) return res.status(404).json({ error: "Contacto no encontrado" });
//     if (contacto.propietario !== usuario.user && usuario.user !== "admin") {
//         return res.status(403).json({ error: "No tienes permisos para editar este contacto" });
//     }

//     await contactos.updateOne({ _id: new ObjectId(id) }, { $set: req.body });
//     res.json({ mensaje: "Contacto actualizado" });
// }