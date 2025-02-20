import { MongoClient, ObjectId } from "mongodb";

const url = 'mongodb://localhost:27017';
const cliente = new MongoClient(url);
let contactos = null;

async function cargarDatos() {
    const cantidad = await contactos.countDocuments();
    const contraseña = '1234';
    if (cantidad == 0) {
        await contactos.insertMany([
            { nombre: 'Juan', apellido: 'Perez', empresa: '', domicilio: '', telefono: '11111111', email: '', propietario: '', es_publico: false, es_visible: true, contraseña:'' },
            { nombre: 'Maria', apellido: 'Gomez', empresa: '', domicilio: '', telefono: '22222222', email: '', propietario: '', es_publico: false, es_visible: true, contraseña: '' },
            { nombre: 'Pedro', apellido: 'Lopez', empresa: '', domicilio: '', telefono: '33333333', email: '', propietario: '', es_publico: false, es_visible: true, contraseña: '' },
            { nombre: 'Ana', apellido: 'Martinez', empresa: '', domicilio: '', telefono: '44444444', email: '', propietario: '', es_publico: false, es_visible: true, contraseña: '' },
            { nombre: 'Luis', apellido: 'Gonzalez', empresa: '', domicilio: '', telefono: '55555555', email: '', propietario: '', es_publico: false, es_visible: true, contraseña: '' },
            { nombre: 'Carla', apellido: 'Rodriguez', empresa: '', domicilio: '', telefono: '66666666', email: '', propietario: '', es_publico: false, es_visible: true, contraseña: '' }

        ])
    }
}
async function conectar() {
    if (contactos !== null) return;
    await cliente.connect();
    const db = cliente.db('agenda');
    contactos = db.collection('contactos');
    await cargarDatos();
}

async function listar(req, res){
    await conectar();

    if(!req.usuario){
        return res.status(401).json({ error: 'No estás autorizado' });
    }

    if(req.usuario.user === 'admin'){
        const datos = await contactos.find({}).toArray();
        res.json(datos);
    }

    const datos = await contactos.find({
        $or: [
            { propietario: req.usuario.user },
            { es_publico: true },
            { es_visible: true }
        ]
    }).toArray();
    res.json(datos);
}

async function cambiarPrivacidad(req, res){
    await conectar();
    const id = req.params.id;
    const contacto = await contactos.findOne({ _id: new ObjectId(id) });
    if(!contacto){
        return res.status(404).json({ error: 'Contacto no encontrado' });
    }

    if(contacto.propietario !== req.usuario.user){
        return res.status(403).json({ error: 'No tienes permisos para modificar este contacto' });
    }

    const nuevoEstado = !contacto.es_publico;
    await contactos.updateOne(
        { _id: new ObjectId(id) },
        { $set: { es_publico: nuevoEstado } }
    );
    res.json({ mensaje: 'Contacto actualizado', es_publico: nuevoEstado });
}

async function cambiarVisibilidad(req, res){
    await conectar();
    const id = req.params.id;
    const contacto = await contactos.findOne({ _id: new ObjectId(id) });
    if(!contacto){
        return res.status(404).json({ error: 'Contacto no encontrado' });
    }

    if(req.usuario.user !== 'admin'){
        return res.status(403).json({ error: 'No tienes permisos para modificar este contacto' });
    }

    const nuevoEstado = !contacto.es_publico;
    await contactos.updateOne(
        { _id: new ObjectId(id) },
        { $set: { es_visible: nuevoEstado } }
    );
    res.json({ mensaje: 'Contacto actualizado', es_visible: nuevoEstado })
}

async function leerTodo() {
    await conectar();
    return await contactos.find({}).sort({ apellido: 1, nombre: 1 }).toArray();
}

async function crear(contacto) {
    await conectar();
    return await contactos.insertOne(contacto);
}

async function borrar(id) {
    await conectar();
    await contactos.deleteOne({ _id: new ObjectId(id) });
}

async function actualizar(id, contacto) {
    await conectar();
    delete contacto._id
    return await contactos.updateOne(
        { _id: new ObjectId(id) },
        { $set: contacto }
    );
}

async function buscarPorId(id) {
    await conectar();
    return await contactos.findOne({ _id: new ObjectId(id) });
}

async function editar(id, contacto) {
    await conectar();
    return await contactos.updateOne(
        { _id: new ObjectId(id) },
        { $set: contacto }
    );
}

export default {
    leerTodo,
    crear,
    borrar,
    actualizar,
    buscarPorId,
    editar,
    listar,
    cambiarPrivacidad,
    cambiarVisibilidad
};
export { conectar, contactos };