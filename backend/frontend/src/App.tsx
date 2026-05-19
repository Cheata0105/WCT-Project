import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/StudentDashboard';
import PaymentSubmission from './pages/PaymentSubmission';
import AdminDashboard from './pages/AdminDashboard';
import ReceiptViewer from './pages/ReceiptViewer';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/payment" element={<PaymentSubmission />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/receipt/:id" element={<ReceiptViewer />} />
    </Routes>
  );
}

export default App;
