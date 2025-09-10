import { Request, Response } from "express";
import { ResourceApplicationService } from "../../application/ResourceApplicationService";
import { CreateResourceDTO, UpdateResourceDTO } from "../DTO/ResourceDTO";

export class ResourceController {
    constructor(private resourceService: ResourceApplicationService) {}

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const dto: CreateResourceDTO = req.body;
            const id = await this.resourceService.createResource(dto);
            return res.status(201).json({ id, message: "Recurso creado exitosamente" });
        } catch (error) {
            return res.status(500).json({ error: "Error creando recurso" });
        }
    }

    async getById(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id);
        const resource = await this.resourceService.getResourceById(id);
        return resource ? res.json(resource) : res.status(404).json({ error: "Recurso no encontrado" });
    }

    async getAll(_req: Request, res: Response): Promise<Response> {
        const resources = await this.resourceService.getAllResources();
        return res.json(resources);
    }

    async update(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id);
        const dto: UpdateResourceDTO = req.body;
        const success = await this.resourceService.updateResource(id, dto);
        return success ? res.json({ message: "Recurso actualizado" }) : res.status(404).json({ error: "No encontrado" });
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id);
        const success = await this.resourceService.deleteResource(id);
        return success ? res.json({ message: "Recurso eliminado" }) : res.status(404).json({ error: "No encontrado" });
    }
}