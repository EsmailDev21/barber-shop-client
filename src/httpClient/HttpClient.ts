import axios from 'axios';

export default class HttpClient<T> {
  protected baseUrl: string;
  protected authToken: string;
  protected route: string;

  constructor(route: string) {
    //this.baseUrl = 'https://barber-shop-server-xer9.onrender.com/v1/api';
    this.baseUrl = 'http://localhost:3000/v1/api';

    this.authToken = localStorage.getItem('AUTH_TOKEN');
    this.route = route;
  }

  async getRecordById(id: string): Promise<T> {
    try {
      const response = await axios.get(`${this.baseUrl}/${this.route}/${id}`, {
        headers: {
          Authorization: `Bearer ${this.authToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllRecords(): Promise<T[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/${this.route}`, {
        headers: {
          Authorization: `Bearer ${this.authToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async createRecord(data: Partial<T> | T): Promise<T> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/${this.route}`,
        { ...data },
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
  async updateRecord(data: Partial<T> | T, id: string): Promise<T> {
    try {
      console.log(this.authToken);
      const response = await axios.put(
        `${this.baseUrl}/${this.route}/${id}`,
        {
          ...data,
        },
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
  async deleteRecord(id: string): Promise<T> {
    try {
      const response = await axios.delete(`${this.baseUrl}/${this.route}/${id}`, {
        headers: {
          Authorization: `Bearer ${this.authToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
