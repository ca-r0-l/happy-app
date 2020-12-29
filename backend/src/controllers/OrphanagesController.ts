import { Request, Response } from 'express';
import Orphanage from "../models/Orphanage";
import * as yup from 'yup';
import OrphanageService from "../services/OrphanageService";

const orphanageService: OrphanageService = new OrphanageService();

export default {
    async showAll(req: Request, res: Response) { 
        return res.json(await orphanageService.showAll());
    },

    async showOne(req: Request, res: Response) {
        const { id } = req.params;
        return res.json(await orphanageService.showOne(id));
    },

    async create(req: Request, res: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = req.body;
         
        const schema = yup.object().shape({
            name: yup.string().required(),
            latitude: yup.number().required(),
            longitude: yup.number().required(),
            about: yup.string().required().max(300),
            instructions: yup.string().required(),
            opening_hours: yup.string().required(),
            open_on_weekends: yup.boolean().required(),
            images: yup.array(yup.object().shape({
                path: yup.string().required()
            }))
        });

        const requestImages = req.files as Express.Multer.File[];

        const images = requestImages.map(img => {
            return { path: img.filename }
        });
        
        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        };
    
        await schema.validate(data, {
            abortEarly: false
        });

        return res.status(201).json(await orphanageService.create(data as Orphanage));
    }
}