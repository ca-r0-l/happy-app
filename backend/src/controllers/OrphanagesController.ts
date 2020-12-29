import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from "../models/Orphanage";

export default {
    async findAll(req: Request, res: Response) {
        const orphanagesRepository = getRepository(Orphanage);
        return res.json(await orphanagesRepository.find())
    },
    async getById(req: Request, res: Response) {
        const { id } = req.params;

        const orphanagesRepository = getRepository(Orphanage);
        return res.json(await orphanagesRepository.findOneOrFail(id))
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
    
        const orphanage = orphanagesRepository.create({
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        });
    
        await orphanagesRepository.save(orphanage);

        return res.status(201).json(orphanage);
    }
}