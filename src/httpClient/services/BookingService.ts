import { Booking, ReservationStatus } from 'src/types/models';
import HttpClient from '../HttpClient';
import axios from 'axios';

export default class BookingService extends HttpClient<Booking> {
  /**
   *
   */
  constructor() {
    super('bookings');
  }

  async updateStatus(data: { status: ReservationStatus }, id: string) {
    try {
      const response = await axios.put(`${this.baseUrl}/${this.route}/change-status/${id}`, data, {
        headers: {
          Authorization: `Bearer ${this.authToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}
