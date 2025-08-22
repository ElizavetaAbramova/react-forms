export interface Profile {
  name: string;
  age: string;
  email: string;
  country: string;
  gender: 'male' | 'female' | 'other';
  photo: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}
