import { getRepository } from 'typeorm';
import Orphanage from "../models/Orphanage";
import orpahange_view from '../views/orphanages_view';

export default class OrphanageService {

    public async showAll() {
        const orphanagesRepository = getRepository(Orphanage);
        const orphanages = await orphanagesRepository.find({
            relations: ["images"]
        });
        return orpahange_view.renderMany(orphanages);
    }

    public async showOne(id: string) {
        const orphanagesRepository = getRepository(Orphanage);
        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ["images"]
        });
        return orpahange_view.render(orphanage);
    }

    public async create(orphanage: Orphanage) {
        const orphanagesRepository = getRepository(Orphanage);
            
        await orphanagesRepository.save(orphanagesRepository.create(orphanage));

        return orpahange_view.render(orphanage);
    }
}