export type LoginDTO = {
  email: string;
  password: string;
};

export type SignupDTO = {
  email: string;
  password: string;
  role: 'BARBER' | 'CUSTOMER';
  name: string;
  phoneNumber: string;
  gender: 'MALE' | 'FEMALE';
};
