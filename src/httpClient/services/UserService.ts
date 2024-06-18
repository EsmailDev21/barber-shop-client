import { User } from 'src/types/models';
import HttpClient from '../HttpClient';
import axios from 'axios';

export default class UserService extends HttpClient<User> {
  /**
   *
   */
  constructor() {
    super('user');
  }

  async getBarbersByLocation(filter: { city?: string; address?: string }): Promise<User[]> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/${this.route}/location?city=${filter.city}&address=${filter.address}`,
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

  async banUser(id: string): Promise<User> {
    try {
      const response = await axios.put(`${this.baseUrl}/${this.route}/${id}/ban`, {
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

  async findByEmail(email: string): Promise<User> {
    try {
      const response = await axios.get(`${this.baseUrl}/${this.route}/by-email`, {
        params: { email },
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

  async unbanUser(id: string): Promise<User> {
    try {
      const response = await axios.put(`${this.baseUrl}/${this.route}/${id}/unban`, {
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

  async updatePassword(data: Partial<User> | User, id: string): Promise<User> {
    try {
      console.log(this.authToken);
      const response = await axios.put(
        `${this.baseUrl}/${this.route}/${id}`,
        {
          ...data,
        },
        
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
