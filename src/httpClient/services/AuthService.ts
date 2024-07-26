import axios from 'axios';
import useAuth from 'src/hooks/use-auth';
import { LoginDTO, SignupDTO } from 'src/types/auth';

export default class AuthService {
  protected baseUrl: string;
  protected authToken: string;
  protected mailingUrl: string;
  constructor() {
    this.baseUrl = `https://barber-shop-server-xer9.onrender.com/v1/api/auth`;
    this.mailingUrl = `https://barber-shop-server-xer9.onrender.com/v1/api/mailing`;
    this.authToken = localStorage.getItem('AUTH_TOKEN');
    console.log('instanciated');
  }

  async login(data: LoginDTO) {
    try {
      const response = await axios.post(`${this.baseUrl}/login`, { ...data });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async register(data: SignupDTO) {
    try {
      const response = await axios.post(`${this.baseUrl}/signup`, { ...data, isBanned: false });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }

  async resetPassword(email: string) {
    try {
      const response = await axios.get(`${this.mailingUrl}/resetPassword`, { params: { email } });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }

  async verifyAccount(email: string) {
    try {
      const response = await axios.get(`${this.mailingUrl}/verifyAccount`, { params: { email } });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }

  async checkCode(token: string) {
    try {
      const response = await axios.get(`${this.mailingUrl}/checkToken`, { params: { token } });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }

  async getProfile() {
    try {
      const response = await axios.get(`${this.baseUrl}/profile`, {
        headers: {
          Authorization: `Bearer ${this.authToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  logout() {
    localStorage.removeItem('AUTH_TOKEN');
  }
}
