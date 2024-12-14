import { MongoClient, ObjectId } from "mongodb";

const url = 'mongodb://localhost:27017';
const cliente = new MongoClient(url);
let contactos = null;

async function cargarDatos() {
    const cantidad = await contactos.countDocuments();
    if(cantidad == 0) {
        await contactos.insertMany([
            {nombre: 'Juan',  apellido: 'Perez',    telefono: '11111111'},
            {nombre: 'Maria', apellido: 'Gomez',    telefono: '22222222'},
            {nombre: 'Pedro', apellido: 'Gonzalez', telefono: '33333333'},
            {nombre: 'Ana',   apellido: 'Lopez',    telefono: '44444444'},
            {nombre: 'Luis',  apellido: 'Martinez', telefono: '55555555'}
        ])
    }
}
async function conectar() {
    if(contactos !== null) return;
    await cliente.connect();
    const db = cliente.db('agenda');
    contactos = db.collection('contactos');
    await cargarDatos();
}

async function leerTodo() {
    await conectar();
    return await contactos.find({}).sort({apellido: 1, nombre: 1}).toArray();
}

async function crear(contacto) {
    await conectar();
    return await contactos.insertOne(contacto);
}

async function borrar(id) {
    await conectar();
    await contactos.deleteOne({_id: new ObjectId(id)});
}

export default { leerTodo, crear, borrar }