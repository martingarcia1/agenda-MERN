import { useState } from "react"

function Editar({ contacto, alActualizar, esAdmin = false }) {
    const [datos, setDatos] = useState({
        nombre: contacto?.nombre || '',
        apellido: contacto?.apellido || '',
        empresa: contacto?.empresa || '',
        domicilio: contacto?.domicilio || '',
        telefono: contacto?.telefono || '',
        email: contacto?.email || '',
        es_publico: contacto?.es_publico || false,
        es_visible: contacto?.es_visible || true
    })

    const [errores, setErrores] = useState({})

    function cambiar(e) {
        const { name, value, type, checked } = e.target
        setDatos({
            ...datos,
            [name]: type === 'checkbox' ? checked : value
        })
        if (errores[name]) {
            setErrores({
                ...errores,
                [name]: ''
            })
        }
    }

    function validar() {
        const nuevosErrores = {}

        if (!datos.nombre.trim()) {
            nuevosErrores.nombre = 'El nombre es obligatorio'
        }

        if (!datos.apellido.trim()) {
            nuevosErrores.apellido = 'El apellido es obligatorio'
        }

        if (!datos.email.trim()) {
            nuevosErrores.email = 'El email es obligatorio'
        } else if (!/\S+@\S+\.\S+/.test(datos.email)) {
            nuevosErrores.email = 'Email inválido'
        }

        setErrores(nuevosErrores)
        return Object.keys(nuevosErrores).length === 0
    }

    function cancelar(e) {
        e.preventDefault()
        e.stopPropagation()
        alActualizar(null)
    }

    async function guardar(e) {
        e.preventDefault()
        e.stopPropagation()
        if (validar()) {
            alActualizar(datos)
        }
    }

    return (
        <section className="editar-contacto">
            <h2 className="titulo">
                {contacto ? 'Editar Contacto' : 'Nuevo Contacto'}
            </h2>
            <form className="formulario">
                <div className="grid-campos">
                    <div className="campo">
                        <label>
                            Nombre:
                            <input
                                type="text"
                                name="nombre"
                                value={datos.nombre}
                                onChange={cambiar}
                                className={errores.nombre ? 'error' : ''}
                            />
                        </label>
                        {errores.nombre && <p className="mensaje-error">{errores.nombre}</p>}
                    </div>

                    <div className="campo">
                        <label>
                            Apellido:
                            <input
                                type="text"
                                name="apellido"
                                value={datos.apellido}
                                onChange={cambiar}
                                className={errores.apellido ? 'error' : ''}
                            />
                        </label>
                        {errores.apellido && <p className="mensaje-error">{errores.apellido}</p>}
                    </div>

                    <div className="campo">
                        <label>
                            Empresa:
                            <input
                                type="text"
                                name="empresa"
                                value={datos.empresa}
                                onChange={cambiar}
                            />
                        </label>
                    </div>

                    <div className="campo">
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={datos.email}
                                onChange={cambiar}
                                className={errores.email ? 'error' : ''}
                            />
                        </label>
                        {errores.email && <p className="mensaje-error">{errores.email}</p>}
                    </div>

                    <div className="campo">
                        <label>
                            Domicilio:
                            <input
                                type="text"
                                name="domicilio"
                                value={datos.domicilio}
                                onChange={cambiar}
                            />
                        </label>
                    </div>

                    <div className="campo">
                        <label>
                            Teléfono:
                            <input
                                type="text"
                                name="telefono"
                                value={datos.telefono}
                                onChange={cambiar}
                            />
                        </label>
                    </div>
                </div>

                <div className="checkboxes">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            name="es_publico"
                            checked={datos.es_publico}
                            onChange={cambiar}
                        />
                        Es público
                    </label>

                    {esAdmin && (
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                name="es_visible"
                                checked={datos.es_visible}
                                onChange={cambiar}
                            />
                            Es visible
                        </label>
                    )}
                </div>

                <div className="botones">
                    <button
                        onClick={cancelar}
                        className="boton-cancelar"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={guardar}
                        className="boton-guardar"
                    >
                        {contacto ? 'Actualizar' : 'Guardar'}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default Editar;