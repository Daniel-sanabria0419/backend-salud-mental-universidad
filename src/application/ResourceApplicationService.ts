import { ResourcePorts } from "../domain/ResourcePorts";
import { CreateResourceDTO, UpdateResourceDTO } from "../infraestructure/DTO/ResourceDTO";
import { Resource } from "../domain/Resource";

export class ResourceApplicationService {
    constructor(private resourcePort: ResourcePorts) {}

    async createResource(resource: CreateResourceDTO): Promise<number> {
        return this.resourcePort.createResource(resource);
    }

    async getResourceById(id: number): Promise<Resource | null> {
        return this.resourcePort.getResourceById(id);
    }

    async getAllResources(): Promise<Resource[]> {
        return this.resourcePort.getAllResources();
    }

    async updateResource(id: number, resource: UpdateResourceDTO): Promise<boolean> {
        return this.resourcePort.updateResource(id, resource);
    }

    async deleteResource(id: number): Promise<boolean> {
        return this.resourcePort.deleteResource(id);
    }
}