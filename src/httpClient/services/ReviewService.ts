import { Review } from 'src/types/models';
import HttpClient from '../HttpClient';

export default class ReviewService extends HttpClient<Review> {
  /**
   *
   */
  constructor() {
    super('reviews');
  }
}
