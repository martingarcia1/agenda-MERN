import { useState, useEffect } from 'react';
import Editar from './Editar';

function ListarContactos() {
    const [contactos, setContactos] = useState([]);
    const [contactoEditando, setContactoEditando] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false); // Esto debería venir de tu contexto de autenticación

    useEffect(() => {
        cargarContactos();
        // Aquí deberías verificar si el usuario es admin
        // setIsAdmin(verificarSiEsAdmin());
    }, []);

    const cargarContactos = async () => {
        try {
            const response = await fetch('/api/contactos');
            if (response.ok) {
                const data = await response.json();
                setContactos(data);
            }
        } catch (error) {
            console.error('Error al cargar contactos:', error);
        }
    };

    const handleActualizar = async (datosActualizados) => {
        if (datosActualizados) {
            try {
                const method = contactoEditando?._id ? 'PUT' : 'POST';
                const url = contactoEditando?._id
                    ? `/api/contactos/${contactoEditando._id}`
                    : '/api/contactos';

                const response = await fetch(url, {
                    method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(datosActualizados)
                });

                if (response.ok) {
                    await cargarContactos(); // Recargar la lista después de actualizar
                }
            } catch (error) {
                console.error('Error al guardar contacto:', error);
            }
        }
        setContactoEditando(null); // Cerrar el formulario
    };

    const handleEliminar = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este contacto?')) {
            try {
                const response = await fetch(`/api/contactos/${id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    await cargarContactos();
                }
            } catch (error) {
                console.error('Error al eliminar contacto:', error);
            }
        }
    };

    const toggleVisibilidad = async (contacto) => {
        if (isAdmin) {
            try {
                const response = await fetch(`/api/contactos/${contacto._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...contacto,
                        es_visible: !contacto.es_visible
                    })
                });
                if (response.ok) {
                    await cargarContactos();
                }
            } catch (error) {
                console.error('Error al cambiar visibilidad:', error);
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            {/* Botón para agregar nuevo contacto */}
            <button
                onClick={() => setContactoEditando({})}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Agregar Contacto
            </button>

            {/* Formulario de edición */}
            {contactoEditando && (
                <Editar
                    contacto={contactoEditando}
                    alActualizar={handleActualizar}
                    esAdmin={isAdmin}
                />
            )}

            {/* Lista de contactos */}
            <div className="grid gap-4">
                {contactos.map(contacto => (
                    <div
                        key={contacto._id}
                        className="p-4 border rounded shadow-sm flex justify-between items-center"
                    >
                        <div>
                            <h3 className="font-bold">{contacto.nombre} {contacto.apellido}</h3>
                            <p className="text-gray-600">{contacto.email}</p>
                            <p className="text-sm text-gray-500">
                                {contacto.empresa && `${contacto.empresa} • `}
                                {contacto.telefono}
                            </p>
                        </div>
                        <div className="flex space-x-2">
                            {isAdmin && (
                                <button
                                    onClick={() => toggleVisibilidad(contacto)}
                                    className={`px-3 py-1 rounded ${contacto.es_visible
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                        }`}
                                >
                                    {contacto.es_visible ? 'Visible' : 'Oculto'}
                                </button>
                            )}
                            <button
                                onClick={() => setContactoEditando(contacto)}
                                className="px-3 py-1 bg-blue-100 text-blue-800 rounded"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleEliminar(contacto._id)}
                                className="px-3 py-1 bg-red-100 text-red-800 rounded"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListarContactos;