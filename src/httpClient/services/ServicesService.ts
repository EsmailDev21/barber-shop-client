import { Service } from 'src/types/models';
import HttpClient from '../HttpClient';
import axios from 'axios';

export default class ServicesService extends HttpClient<Service> {
  /**
   *
   */
  constructor() {
    super('services');
  }

  async filterByPriceRange(min: number, max: number): Promise<Service[]> {
    try {
      const response = await axios.get<Service[]>(
        `${this.baseUrl}/${this.route}/filter/price-range`,
        {
          params: { min, max },
          headers: {
            Authorization: `Bearer ${this.authToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async filterByRating(rating: number): Promise<Service[]> {
    try {
      const response = await axios.get<Service[]>(
        `${this.baseUrl}/${this.route}/filter/rating/${rating}`,
        {
          headers: {
            Authorization: `Bearer ${this.authToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async filterByGenders(genders: ('KID' | 'MALE' | 'FEMALE')[]): Promise<Service[]> {
    try {
      const response = await axios.post<Service[]>(
        `${this.baseUrl}/${this.route}/filter/genders`,
        { genders },
        {
          headers: {
            Authorization: `Bearer ${this.authToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
