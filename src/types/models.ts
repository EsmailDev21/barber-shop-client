export class Service {
  id: string;
  name: string;

  price: number;

  duration: string;

  note: string;

  reduction: number;

  barberId: string;
  imageUrl: string;
  genderType?: 'MALE' | 'FEMALE' | 'KID';
}

export class Review {
  id: string;
  rating: number;

  comment: string;

  createdAt: Date;

  serviceId: string;

  reviewPosterId: string;
}

export class Booking {
  id: string;
  status: ReservationStatus;

  note: string;

  serviceId: string;

  customerId: string;

  date: Date;
}

export class User {
  id: string;
  email: string;

  role: Role;
  isVerified: boolean;
  password: string;

  name: string;

  city: string;

  address: string;

  phoneNumber: string;

  specialNote: string;

  isBanned: boolean;
  photoUrl?: string;
  gender?: 'MALE' | 'FEMALE' | 'KID';
}

export type Role = 'ADMIN' | 'BARBER' | 'CUSTOMER';
export type ReservationStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'REFUSED'
  | 'CANCELLED_BY_CUSTOMER'
  | 'CANCELLED_BY_BARBER'
  | 'DONE';

export type Notification = {
  id: string;
  title: string | null;
  content: string | null;
  recipientId: string;
  isUnread?: boolean;
  sentAt: Date;
  type: string;
};
