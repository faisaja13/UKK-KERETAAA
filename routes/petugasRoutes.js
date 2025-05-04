import express from "express";
import { getPetugas, addPetugas, updatePetugas, deletePetugas } from "../controllers/Petugas.js";

const petugasRoutes = express.Router();

petugasRoutes.post('/petugas/add', addPetugas );
petugasRoutes.get('/petugas/get', getPetugas);
petugasRoutes.put('/petugas/update/:id', updatePetugas);
petugasRoutes.delete('petugas/delete/:id', deletePetugas);

export default petugasRoutes;