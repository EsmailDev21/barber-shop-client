import { Notification } from 'src/types/models';
import HttpClient from '../HttpClient';

export default class NotificationService extends HttpClient<Notification> {
  /**
   *
   */
  constructor() {
    super('notifications');
  }
}
