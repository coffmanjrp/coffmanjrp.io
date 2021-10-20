import { FC, ReactElement } from 'react';
import { IconContext } from 'react-icons';

type Props = {
  icon: ReactElement;
  className: string;
};

const IconContainer: FC<Props> = ({ icon, className }) => {
  return (
    <IconContext.Provider value={{ className }}>{icon}</IconContext.Provider>
  );
};

export default IconContainer;
