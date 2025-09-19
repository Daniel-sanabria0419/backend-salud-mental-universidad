import { Notification } from "./Notifications";
import { CreateNotificationDTO, UpdateNotificationDTO } from "../infraestructure/DTO/NotificationDTO";

export interface NotificationRepository {
    create(data: CreateNotificationDTO): Promise<Notification>;
    findAll(): Promise<Notification[]>;
    findById(id: number): Promise<Notification | null>;
    update(id: number, data: UpdateNotificationDTO): Promise<Notification | null>;
    delete(id: number): Promise<boolean>;
}