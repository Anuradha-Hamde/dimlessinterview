import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  college: string;
  course: string;
  graduationYear: string;
  interviewType: string;
  skillDomains: string[];
  experienceLevel: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  signup: (data: Partial<User> & { password: string }) => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (_email: string, _password: string) => {
    // AUTH_API_PLACEHOLDER
    setUser({
      name: "Student User",
      email: _email,
      college: "",
      course: "",
      graduationYear: "",
      interviewType: "",
      skillDomains: [],
      experienceLevel: "",
    });
  };

  const signup = (data: Partial<User> & { password: string }) => {
    // AUTH_API_PLACEHOLDER
    setUser({
      name: data.name || "",
      email: data.email || "",
      college: data.college || "",
      course: data.course || "",
      graduationYear: "",
      interviewType: "",
      skillDomains: [],
      experienceLevel: "",
    });
  };

  const logout = () => setUser(null);

  const updateProfile = (data: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null));
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
