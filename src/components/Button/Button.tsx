import { ButtonHTMLAttributes, FC } from 'react';

import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button: FC<ButtonProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <button {...props} className={`${styles.root} ${className || ''}`}>
      {children}
    </button>
  );
};

export default Button;
