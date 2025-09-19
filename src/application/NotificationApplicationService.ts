import { NotificationRepository } from "../domain/NotificationsPorts";
import { CreateNotificationDTO, UpdateNotificationDTO } from "../infraestructure/DTO/NotificationDTO";

export class NotificationApplicationService {
    constructor(private notificationRepo: NotificationRepository) {}

    create(data: CreateNotificationDTO) {
        return this.notificationRepo.create(data);
    }

    findAll() {
        return this.notificationRepo.findAll();
    }

    findById(id: number) {
        return this.notificationRepo.findById(id);
    }

    update(id: number, data: UpdateNotificationDTO) {
        return this.notificationRepo.update(id, data);
    }

    delete(id: number) {
        return this.notificationRepo.delete(id);
    }
}