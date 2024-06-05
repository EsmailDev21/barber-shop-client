import axios from 'axios';
import HttpClient from '../HttpClient';

export default class BarberAnalyticsService extends HttpClient<any> {
  /**
   *
   */
  constructor() {
    super('barber-analytics');
  }

  async numberOfCustomers(barberId: string): Promise<number> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/${this.route}/numOfCustomers?barberId=${barberId}`,
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

  async totalSales(barberId: string): Promise<number> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/${this.route}/totalSales?barberId=${barberId}`,
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

  async monthlySales(barberId: string): Promise<object> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/${this.route}/monthlySales?barberId=${barberId}`,
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

  async weeklySales(barberId: string): Promise<object> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/${this.route}/weeklySales?barberId=${barberId}`,
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

  async topServices(barberId: string): Promise<{ serviceName: string; revenue: number }[]> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/${this.route}/topServices?barberId=${barberId}`,
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

  async customerInsights(
    barberId: string
  ): Promise<{ customerId: string; name: string; totalSpent: number; bookingCount: number }[]> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/${this.route}/customerInsights?barberId=${barberId}`,
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

  async serviceRatings(
    barberId: string
  ): Promise<{ serviceName: string; averageRating: number; totalRatings: number }[]> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/${this.route}/serviceRatings?barberId=${barberId}`,
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

  async serviceGenderType(barberId: string): Promise<{ genderType: string; count: number }[]> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/${this.route}/serviceGenderType?barberId=${barberId}`,
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
  async bookingTrends(barberId: string): Promise<
    {
      dailyBookings: object;
      weeklyBookings: object;
      monthlyBookings: object;
      hourlyBookings: object;
    }[]
  > {
    try {
      const response = await axios.get(
        `${this.baseUrl}/${this.route}/bookingTrends?barberId=${barberId}`,
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

  async barbersPerformance(barberId: string): Promise<
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
      const response = await axios.get(
        `${this.baseUrl}/${this.route}/performance?barberId=${barberId}`,
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
