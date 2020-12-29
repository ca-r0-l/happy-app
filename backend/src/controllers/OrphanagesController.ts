import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from "../models/Orphanage";
import orpahange_view from '../views/orphanages_view';

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
        
        const orphanage = orphanagesRepository.create({
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        });
    
        await orphanagesRepository.save(orphanage);

        return res.status(201).json(orpahange_view.render(orphanage));
    }
}