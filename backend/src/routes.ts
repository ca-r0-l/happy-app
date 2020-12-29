import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from "./controllers/OrphanagesController";

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages/:id', OrphanagesController.getById);
routes.get('/orphanages', OrphanagesController.findAll);
routes.post('/orphanages', upload.array("images"), OrphanagesController.create);

export default routes;