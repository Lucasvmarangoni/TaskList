import { PrismaNotificationsRepository } from "../../prisma/repositories/notification/Prisma-notifications-repository";
import { convertExcessDaysAtTheTurnOfTheMonth } from "./functions/convertExcessDaysAtTheTurnOfTheMonth";
import { numberOfDaysInTheMonth } from "./functions/numberOfDaysInTheMonth";
import { Notification } from "../../entities/Notification";

export interface IParamsNotifications {
  notificationsWithinThePeriod: number;
  type: number;
}

interface NotificationResponse {
  notification: Notification[];
}

export class NotificationOfTasksNearTheDeadline {
  private params: IParamsNotifications;

  constructor(params: IParamsNotifications) {
    this.params = {
      notificationsWithinThePeriod: params.notificationsWithinThePeriod,
      type: params.type,
    };
  }

  async execute(): Promise<NotificationResponse> {
    const prismaNotificationsRepository: any =
      new PrismaNotificationsRepository();

    const tasks: Notification[] =
      await prismaNotificationsRepository.findNotifications(false);

    const todayDate: string = `${
      new Date().getMonth() + 1
    }/${new Date().getDate()}/${new Date().getFullYear()}`;

    if (this.params.type === 1) {
      return {
        notification: tasks.filter(
          (task: Notification) =>
            /* No inicio o banco de dados estava criando a data com cada elemento separadamente,
            por esse motivo criei a função  "convertExcessDaysAtTheTurnOfTheMonth", 
            decidi mantê-la pela lógica que criei, mas poderia usar também: */
            
            // String(new Date(todayDate + this.params.notificationsWithinThePeriod))
            convertExcessDaysAtTheTurnOfTheMonth(
              numberOfDaysInTheMonth(todayDate),
              this.params.notificationsWithinThePeriod
            ) === task.date
        ),
      };
    }

    return {
      notification: tasks.filter(
        (task: Notification) =>
          new Date(task.date) <=
            new Date(todayDate + this.params.notificationsWithinThePeriod) &&
          new Date(task.date) >= new Date(todayDate)
      ),
    };
  }
}
