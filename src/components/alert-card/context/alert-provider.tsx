import { useContext, useState } from "react";
import { AlertCard } from "../AlertCard";
import { AlertContext } from "./alert-context";
import { AlertOptions } from "../AlertCard";

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState<AlertOptions | null>(null);

  const showAlert = ({ message, severity = 'error', duration = 3000 }: AlertOptions) => {
    setAlert({ message, severity, duration });
    setTimeout(() => setAlert(null), duration);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && <AlertCard alert={alert} />}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlertContext must be used within an AlertProvider');
  }
  return context;
};