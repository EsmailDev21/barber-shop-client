import { Booking, Report, ReservationStatus } from 'src/types/models';
import HttpClient from '../HttpClient';
import axios from 'axios';

export default class ReportsService extends HttpClient<Report> {
  /**
   *
   */
  constructor() {
    super('reports');
  }
}
