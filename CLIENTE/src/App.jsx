import { useState, useEffect } from 'react'
import Datos from './Datos'
import Editar from './Editar'
import Listar from './Listar'

function App() {
  const [contacto, setContacto] = useState(null)
  const [contactos, setContactos] = useState([])

  async function cargar() {
    let lista = await Datos.listar()
    setContactos(lista)
  }
  useEffect(() => { cargar() }, [])
  async function actualizar(contacto) {
    if (contacto) {
      if (contacto._id) {
        //await Datos.editar(contacto)
      } else {
        await Datos.agregar(contacto)
      }
      cargar()
    }
    setContacto(null)
  }

  async function agregar(contacto) {
    setContacto(contacto)
  }

  async function borrar(contacto) {
    await Datos.borrar(contacto._id)
  }

  return (
    <>
      {contacto ?
        <Editar contacto={contacto} alActualizar={actualizar} /> :
        <Listar contactos={contactos} alAgregar={agregar} alBorrar={borrar} />
      }
    </>
  )
}

export default App
