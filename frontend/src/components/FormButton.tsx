import type { ButtonHTMLAttributes, ReactNode } from 'react';

type FormButtonVariant = 'primary' | 'secondary';
type FormButtonSize = 'sm' | 'md';

type FormButtonProps = {
  children: ReactNode;
  variant?: FormButtonVariant;
  size?: FormButtonSize;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function FormButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  ...props
}: FormButtonProps) {
  return (
    <button
      type={type}
      className={`form-button form-button--${variant} form-button--${size}${
        className ? ` ${className}` : ''
      }`}
      {...props}
    >
      {children}
    </button>
  );
}

export { FormButton };
export type { FormButtonProps, FormButtonVariant, FormButtonSize };
