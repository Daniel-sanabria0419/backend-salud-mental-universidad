import { Repository } from "typeorm";
import { ResourceEntity } from "../entities/ResourceEntity";
import { ResourcePorts } from "../../domain/ResourcePorts";
import { Resource } from "../../domain/Resource";
import { CreateResourceDTO, UpdateResourceDTO } from "../DTO/ResourceDTO";
import { AppDataSource } from "../config/data-base";

export class ResourceAdapter implements ResourcePorts {
    private repository: Repository<ResourceEntity>;

    constructor() {
        this.repository = AppDataSource.getRepository(ResourceEntity);
    }

    private toDomain(entity: ResourceEntity): Resource {
        return {
            id: entity.id_recurso,
            titulo: entity.titulo,
            descripcion: entity.descripcion,
            tipo: entity.tipo,
            url: entity.url,
            idProfesional: entity.id_profesional,
            fechaPublicacion: entity.fecha_publicacion,
        };
    }

    async createResource(resource: CreateResourceDTO): Promise<number> {
        const newEntity = this.repository.create({
            titulo: resource.titulo,
            descripcion: resource.descripcion,
            tipo: resource.tipo,
            url: resource.url,
            id_profesional: resource.idProfesional,
        });
        const saved = await this.repository.save(newEntity);
        return saved.id_recurso;
    }

    async getResourceById(id: number): Promise<Resource | null> {
        const resource = await this.repository.findOneBy({ id_recurso: id });
        return resource ? this.toDomain(resource) : null;
    }

    async getAllResources(): Promise<Resource[]> {
        const resources = await this.repository.find();
        return resources.map(this.toDomain);
    }

    async updateResource(id: number, resource: UpdateResourceDTO): Promise<boolean> {
        const existing = await this.repository.findOneBy({ id_recurso: id });
        if (!existing) return false;
        Object.assign(existing, resource);
        await this.repository.save(existing);
        return true;
    }

    async deleteResource(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }
}