import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from "../models/Orphanage";
import orpahange_view from '../views/orphanages_view';
import * as yup from 'yup';

export default {
    async findAll(req: Request, res: Response) {
        const orphanagesRepository = getRepository(Orphanage);
        const orphanages = await orphanagesRepository.find({
            relations: ["images"]
        });

        return res.json(orpahange_view.renderMany(orphanages));
    },
    async getById(req: Request, res: Response) {
        const { id } = req.params;

        const orphanagesRepository = getRepository(Orphanage);
        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ["images"]
        });

        return res.json(orpahange_view.render(orphanage));
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
    
        const orphanagesRepository = getRepository(Orphanage);
    
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

        await schema.validate(data, {
            abortEarly: false
        });

        const orphanage = orphanagesRepository.create(data);
    
        await orphanagesRepository.save(orphanage);

        return res.status(201).json(orpahange_view.render(orphanage));
    }
}