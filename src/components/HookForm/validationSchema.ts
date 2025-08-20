import z from 'zod';

export const schema = z.object({
  name: z.string().min(1, 'Enter your name'),
  age: z
    .string()
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 13,
      'Age must be at least 13'
    ),
  email: z.string().email('Incorrect email'),
  country: z.string().min(1, 'Choose country'),
  gender: z.string().min(1, 'Field is required'),
  photo: z
    .any()
    .refine(
      (files) => files instanceof FileList && files.length > 0,
      'Upload any photo'
    ),
});
