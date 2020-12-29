import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from "./controllers/OrphanagesController";

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages/:id', OrphanagesController.showOne);
routes.get('/orphanages', OrphanagesController.showAll);
routes.post('/orphanages', upload.array("images"), OrphanagesController.create);

export default routes;