import styles from 'styles/components/Button.module.scss';
import { ReactNode } from 'react';
import clsx from 'clsx';

interface Props extends React.ButtonHTMLAttributes<{}> {
  className?: string;
  children?: ReactNode;
  active?: boolean;
}

const Button: React.FC<Props> = ({
  className,
  children,
  active = false,
  ...props
}) => {
  return (
    <button
      className={clsx(styles.button, className, active ? styles.active : null)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
