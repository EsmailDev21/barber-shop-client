import axios from 'axios';
import HttpClient from '../HttpClient';

export default class AnalyticsService extends HttpClient<any> {
  /**
   *
   */
  constructor() {
    super('analytics');
  }

  async numberOfUsers(): Promise<number> {
    try {
      const response = await axios.get(`${this.baseUrl}/${this.route}/numOfUsers`, {
        headers: {
          Authorization: `Bearer ${this.authToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async numberOfBarbers(): Promise<number> {
    try {
      const response = await axios.get(`${this.baseUrl}/${this.route}/numOfBarbers`, {
        headers: {
          Authorization: `Bearer ${this.authToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async numberOfCustomers(): Promise<number> {
    try {
      const response = await axios.get(`${this.baseUrl}/${this.route}/numOfCustomers`, {
        headers: {
          Authorization: `Bearer ${this.authToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async totalSales(): Promise<number> {
    try {
      const response = await axios.get(`${this.baseUrl}/${this.route}/totalSales`, {
        headers: {
          Authorization: `Bearer ${this.authToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async monthlySales(): Promise<object> {
    try {
      const response = await axios.get(`${this.baseUrl}/${this.route}/monthlySales`, {
        headers: {
          Authorization: `Bearer ${this.authToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async weeklySales(): Promise<object> {
    try {
      const response = await axios.get(`${this.baseUrl}/${this.route}/weeklySales`, {
        headers: {
          Authorization: `Bearer ${this.authToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async topServices(): Promise<{ serviceName: string; revenue: number }[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/${this.route}/topServices`, {
        headers: {
          Authorization: `Bearer ${this.authToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async customerInsights(): Promise<
    { customerId: string; name: string; totalSpent: number; bookingCount: number }[]
  > {
    try {
      const response = await axios.get(`${this.baseUrl}/${this.route}/customerInsights`, {
        headers: {
          Authorization: `Bearer ${this.authToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async serviceRatings(): Promise<
    { serviceName: string; averageRating: number; totalRatings: number }[]
  > {
    try {
      const response = await axios.get(`${this.baseUrl}/${this.route}/serviceRatings`, {
        headers: {
          Authorization: `Bearer ${this.authToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async serviceGenderType(): Promise<{ genderType: string; count: number }[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/${this.route}/serviceGenderType`, {
        headers: {
          Authorization: `Bearer ${this.authToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async bookingTrends(): Promise<
    {
      dailyBookings: object;
      weeklyBookings: object;
      monthlyBookings: object;
      hourlyBookings: object;
    }[]
  > {
    try {
      const response = await axios.get(`${this.baseUrl}/${this.route}/bookingTrends`, {
        headers: {
          Authorization: `Bearer ${this.authToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async barbersPerformance(): Promise<
    {
      barberId: string;
      name: string;
      totalRevenue: number;
      totalBookings: number;
      averageRating: number;
      totalReviews: number;
    }[]
  > {
    try {
      const response = await axios.get(`${this.baseUrl}/${this.route}/barbersPerformance`, {
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
