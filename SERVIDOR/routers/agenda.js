import Agenda from "../controllers/agenda.js";
import express  from "express";
import { cambiarPrivacidad, cambiarVisibilidad } from "../controllers/agenda.js";

const router = express.Router();

router.get('/', Agenda.listar);
router.post('/', Agenda.crear);
router.delete('/:id', Agenda.borrar);

router.get('/:id', Agenda.leer);
router.put('/:id', Agenda.actualizar)
router.put('/contactos/:id/visibilidad', cambiarVisibilidad)
router.put('/contactos/:id/privacidad', cambiarPrivacidad)

export default router