import z from 'zod';

export const schema = z
  .object({
    name: z
      .string()
      .min(1, 'Enter your name')
      .refine((val) => /^[A-Z]/.test(val), {
        message: 'Name must start with an uppercase letter',
      }),
    age: z
      .string()
      .refine(
        (val) => !isNaN(Number(val)) && Number(val) > 13,
        'Age must be at least 13'
      ),
    email: z.email({ message: 'Invalid email address.' }),
    country: z.string().min(1, 'Choose country'),
    gender: z.enum(['male', 'female', 'other'], {
      message: 'Field is required',
    }),
    photo: z
      .any()
      .refine((files) => files instanceof FileList && files.length > 0, {
        message: 'Upload a photo',
      })
      .refine(
        (files) =>
          files instanceof FileList &&
          ['image/png', 'image/jpeg'].includes(files[0]?.type),
        { message: 'Only PNG or JPEG allowed' }
      )
      .refine(
        (files) =>
          files instanceof FileList && files[0]?.size <= 2 * 1024 * 1024,
        { message: 'Max size 2MB' }
      ),
    password: z
      .string()
      .min(8, { message: 'Minimum 8 characters.' })
      .refine((value) => /[a-z]/.test(value), {
        message: 'Must have a lowercase letter.',
      })
      .refine((value) => /[A-Z]/.test(value), {
        message: 'Must have an uppercase letter.',
      })
      .refine((value) => /[0-9]/.test(value), {
        message: 'Must have a number.',
      })
      .refine((value) => /[!@#$%^&*]/.test(value), {
        message: 'Must have at least one special character (e.g., !@#$%^&*)',
      })
      .refine((value) => /^[^\s]+$/.test(value), {
        message: 'Password cannot contain spaces.',
      }),
    confirmPassword: z.string().nonempty('Confirm password is required'),
    terms: z
      .boolean()
      .refine((value) => value === true, { message: 'Field is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
