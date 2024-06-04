import axios from 'axios';
import useAuth from 'src/hooks/use-auth';
import { LoginDTO, SignupDTO } from 'src/types/auth';

export default class AuthService {
  protected baseUrl: string;
  protected authToken: string;
  constructor() {
    this.baseUrl = `http://localhost:3000/v1/api/auth`;
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
