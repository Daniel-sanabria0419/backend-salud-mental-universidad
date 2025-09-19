import { Resource } from "./Resource";
import { CreateResourceDTO, UpdateResourceDTO } from "../infraestructure/DTO/ResourceDTO";

export interface ResourcePorts {
    createResource(resource: CreateResourceDTO): Promise<number>;
    getResourceById(id: number): Promise<Resource | null>;
    getAllResources(): Promise<Resource[]>;
    updateResource(id: number, resource: UpdateResourceDTO): Promise<boolean>;
    deleteResource(id: number): Promise<boolean>;
}