import axios from 'axios';

export default class StorageService {
  protected baseUrl: string;
  protected authToken: string;
  constructor() {
    this.baseUrl = `https://barber-shop-server-xer9.onrender.com/v1/api/storage`;
    this.authToken = 'change later';
  }

  async upload(data: { file: any }) {
    try {
      const formData = new FormData();
      formData.append('file', data.file);

      const response = await axios.post(`${this.baseUrl}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
