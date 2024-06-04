import { Service } from 'src/types/models';
import HttpClient from '../HttpClient';

export default class ServicesService extends HttpClient<Service> {
  /**
   *
   */
  constructor() {
    super('services');
  }
}
