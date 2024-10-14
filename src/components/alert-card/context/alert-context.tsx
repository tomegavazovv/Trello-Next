import { createContext } from 'react';
import { AlertOptions } from '../AlertCard';

type AlertContext = {
  showAlert: (options: AlertOptions) => void;
};

export const AlertContext = createContext<AlertContext>({
  showAlert: () => {},
});
