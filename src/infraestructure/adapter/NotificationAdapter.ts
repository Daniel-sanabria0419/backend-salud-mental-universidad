import { AppDataSource } from "../config/data-base";
import { NotificationEntity } from "../entities/NotificationEntity";
import { NotificationRepository } from "../../domain/NotificationsPorts";
import { CreateNotificationDTO, UpdateNotificationDTO } from "../DTO/NotificationDTO";

export class NotificationAdapter implements NotificationRepository {
    private repo = AppDataSource.getRepository(NotificationEntity);

    async create(data: CreateNotificationDTO) {
        const newNotification = this.repo.create(data);
        return await this.repo.save(newNotification);
    }

    async findAll() {
        return await this.repo.find();
    }

    async findById(id: number) {
        return await this.repo.findOneBy({ id });
    }

    async update(id: number, data: UpdateNotificationDTO) {
        await this.repo.update(id, data);
        return await this.findById(id);
    }

    async delete(id: number) {
        const result = await this.repo.delete(id);
        return result.affected ? true : false;
    }
}