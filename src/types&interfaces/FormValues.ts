export type FormValues = {
  name: string;
  age: string;
  email: string;
  country: string;
  gender: 'male' | 'female' | 'other';
  photo: FileList;
  password: string;
  confirmPassword: string;
  terms: boolean;
};
