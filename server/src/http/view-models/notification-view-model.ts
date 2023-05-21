import { Notification } from "../../entities/notification";

export class NotificationViewModel {
  static toHTTP(task: Notification) {
    return {
      title: task.title,
      date: task.date,
      id: task.id,
    };
  }
}