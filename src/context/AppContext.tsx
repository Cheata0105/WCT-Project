import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiRequest } from '../lib/api';

interface User {
  id: string;
  name: string;
  email: string;
  studentId?: string;
  role: 'student' | 'admin';
}

interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  contactNumber: string;
  department: string;
  academicYear: string;
  amount: number;
  transactionId: string;
  paymentDate: string;
  courseName: string;
  receiptFile: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  dateSubmitted: string;
}

interface AppContextType {
  user: User | null;
  payments: Payment[];
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string, studentId: string) => Promise<boolean>;
  submitPayment: (payment: Omit<Payment, 'id' | 'dateSubmitted'>) => Promise<void>;
  approvePayment: (id: string) => Promise<void>;
  rejectPayment: (id: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const AUTH_TOKEN_KEY = 'authToken';

interface AuthResponse {
  token: string;
  user: User;
}

interface MeResponse {
  user: User;
}

interface PaymentsResponse {
  payments: Payment[];
}

interface PaymentResponse {
  payment: Payment;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(AUTH_TOKEN_KEY));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const me = await apiRequest<MeResponse>('/me', {}, token);
        const paymentData = await apiRequest<PaymentsResponse>('/payments', {}, token);

        setUser(me.user);
        setPayments(paymentData.payments);
      } catch {
        setUser(null);
        setPayments([]);
        setToken(null);
        localStorage.removeItem(AUTH_TOKEN_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, [token]);

  const persistAuth = async (auth: AuthResponse) => {
    setToken(auth.token);
    setUser(auth.user);
    localStorage.setItem(AUTH_TOKEN_KEY, auth.token);

    const paymentData = await apiRequest<PaymentsResponse>('/payments', {}, auth.token);
    setPayments(paymentData.payments);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const auth = await apiRequest<AuthResponse>('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      await persistAuth(auth);
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    if (token) {
      apiRequest('/logout', { method: 'POST' }, token).catch(() => undefined);
    }

    setUser(null);
    setPayments([]);
    setToken(null);
    localStorage.removeItem(AUTH_TOKEN_KEY);
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    studentId: string
  ): Promise<boolean> => {
    try {
      const auth = await apiRequest<AuthResponse>('/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, studentId }),
      });

      await persistAuth(auth);
      return true;
    } catch {
      return false;
    }
  };

  const submitPayment = async (payment: Omit<Payment, 'id' | 'dateSubmitted'>) => {
    if (!token) return;

    const data = await apiRequest<PaymentResponse>(
      '/payments',
      {
        method: 'POST',
        body: JSON.stringify(payment),
      },
      token
    );

    setPayments((current) => [data.payment, ...current]);
  };

  const updatePaymentStatus = async (id: string, status: 'Approved' | 'Rejected') => {
    if (!token) return;

    const data = await apiRequest<PaymentResponse>(
      `/payments/${id}/status`,
      {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      },
      token
    );

    setPayments((current) =>
      current.map((payment) => (payment.id === id ? data.payment : payment))
    );
  };

  const approvePayment = async (id: string) => {
    await updatePaymentStatus(id, 'Approved');
  };

  const rejectPayment = async (id: string) => {
    await updatePaymentStatus(id, 'Rejected');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        payments,
        isLoading,
        login,
        logout,
        register,
        submitPayment,
        approvePayment,
        rejectPayment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
