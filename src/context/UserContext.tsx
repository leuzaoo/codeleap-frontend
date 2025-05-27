import { createContext, useState, useEffect, ReactNode } from "react";

interface UserContextType {
  username: string;
  setUsername: (name: string) => void;
}

export const UserContext = createContext<UserContextType>({
  username: "",
  setUsername: () => {},
});

interface ProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: ProviderProps) {
  const [username, setUsername] = useState<string>(
    () => localStorage.getItem("codeleapUsername") || ""
  );

  useEffect(() => {
    if (username) localStorage.setItem("codeleapUsername", username);
  }, [username]);

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
}
