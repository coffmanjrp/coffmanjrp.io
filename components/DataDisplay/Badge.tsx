import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  scheme: 'success' | 'warning' | 'danger';
};

type ColorScheme = {
  success: string;
  warning: string;
  danger: string;
};

const Badge: FC<Props> = ({ children, scheme }) => {
  const colorScheme: ColorScheme = {
    success: 'bg-blue-300',
    warning: 'bg-yellow-500',
    danger: 'bg-red-600',
  };

  return (
    <span
      className={`inline-block px-1 py-0.5  rounded text-xs text-gray-100 ${colorScheme[scheme]}`}
    >
      {children}
    </span>
  );
};

export default Badge;
