import { Routes, Route, Navigate } from "react-router-dom";
import { useApp } from "./context/AppContext";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";
import PaymentSubmission from "./pages/PaymentSubmission";
import AdminDashboard from "./pages/AdminDashboard";
import ReceiptViewer from "./pages/ReceiptViewer";

function ProtectedRoute({
    children,
    role,
}: {
    children: JSX.Element;
    role: "student" | "admin";
}) {
    const { user, isLoading } = useApp();
    if (isLoading) return null;
    if (!user || user.role !== role) return <Navigate to="/login" replace />;
    return children;
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
                path="/student/dashboard"
                element={
                    <ProtectedRoute role="student">
                        <StudentDashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/student/payment"
                element={
                    <ProtectedRoute role="student">
                        <PaymentSubmission />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedRoute role="admin">
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/receipt/:id"
                element={
                    <ProtectedRoute role="student">
                        <ReceiptViewer />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;
