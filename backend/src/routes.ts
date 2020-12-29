import { Router } from 'express';
import OrphanagesController from "./controllers/OrphanagesController";

const routes = Router();

routes.get('/orphanages', OrphanagesController.findAll);
routes.get('/orphanages/:id', OrphanagesController.getById);
routes.post('/orphanages', OrphanagesController.create);

export default routes;