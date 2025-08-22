import type { ComponentProps } from 'react';

export type UncontrolledInputProps = ComponentProps<'input'> & {
  children?: React.ReactNode;
};
