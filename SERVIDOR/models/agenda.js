import { MongoClient, ObjectId } from "mongodb";

const url = 'mongodb://localhost:27017';
const cliente = new MongoClient(url);
let contactos = null;

async function cargarDatos() {
    const cantidad = await contactos.countDocuments();
    if (cantidad == 0) {
        await contactos.insertMany([
            { nombre: 'Juan', apellido: 'Perez', empresa: '', domicilio: '', telefono: '11111111', email: '', propietario: '', es_publico: '', es_visible: '', contraseña },
            { nombre: 'Maria', apellido: 'Gomez', empresa: '', domicilio: '', telefono: '22222222', email: '', propietario: '', es_publico: '', es_visible: '', contraseña: '' },
            { nombre: 'Pedro', apellido: 'Lopez', empresa: '', domicilio: '', telefono: '33333333', email: '', propietario: '', es_publico: '', es_visible: '', contraseña: '' },
            { nombre: 'Ana', apellido: 'Martinez', empresa: '', domicilio: '', telefono: '44444444', email: '', propietario: '', es_publico: '', es_visible: '', contraseña: '' },
            { nombre: 'Luis', apellido: 'Gonzalez', empresa: '', domicilio: '', telefono: '55555555', email: '', propietario: '', es_publico: '', es_visible: '', contraseña: '' },
            { nombre: 'Carla', apellido: 'Rodriguez', empresa: '', domicilio: '', telefono: '66666666', email: '', propietario: '', es_publico: '', es_visible: '', contraseña: '' }

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
// async function desconectar() {
//     await cliente.close();
// }

export default {
    leerTodo,
    crear,
    borrar,
    actualizar,
    buscarPorId,
    editar
};
