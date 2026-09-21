--- src/App.tsx (原始)
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import TrackingPage from './pages/TrackingPage';
import FAQPage from './pages/FAQPage';
import LoginPage from './pages/LoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import StudentDashboard from './pages/StudentDashboard';
import NewRequestPage from './pages/NewRequestPage';
import RequestDetailPage from './pages/RequestDetailPage';
import AdminDashboard from './pages/AdminDashboard';
import { ReactNode } from 'react';

// Protected route for students
const StudentRoute = ({ children }: { children: ReactNode }) => {
  const { user, isAdmin } = useAuth();
  if (!user || isAdmin) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

// Protected route for admin
const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { isAdmin } = useAuth();
  if (!isAdmin) return <Navigate to="/admin-login" replace />;
  return <>{children}</>;
};

function AppRoutes() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/suivi" element={<TrackingPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />

        {/* Student routes */}
        <Route path="/dashboard" element={<StudentRoute><StudentDashboard /></StudentRoute>} />
        <Route path="/nouvelle-demande" element={<StudentRoute><NewRequestPage /></StudentRoute>} />
        <Route path="/demande/:id" element={<StudentRoute><RequestDetailPage /></StudentRoute>} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;


+++ src/App.tsx (修改后)
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAuth } from './context/AuthContext';
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import TrackingPage from './pages/TrackingPage';
import FAQPage from './pages/FAQPage';
import LoginPage from './pages/LoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import StudentDashboard from './pages/StudentDashboard';
import NewRequestPage from './pages/NewRequestPage';
import RequestDetailPage from './pages/RequestDetailPage';
import AdminDashboard from './pages/AdminDashboard';
import { ReactNode } from 'react';

// Protected route for students
const StudentRoute = ({ children }: { children: ReactNode }) => {
  const { user, isAdmin } = useAuth();
  if (!user || isAdmin) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

// Protected route for admin
const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { isAdmin } = useAuth();
  if (!isAdmin) return <Navigate to="/admin-login" replace />;
  return <>{children}</>;
};

function AppRoutes() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/suivi" element={<TrackingPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />

        {/* Student routes */}
        <Route path="/dashboard" element={<StudentRoute><StudentDashboard /></StudentRoute>} />
        <Route path="/nouvelle-demande" element={<StudentRoute><NewRequestPage /></StudentRoute>} />
        <Route path="/demande/:id" element={<StudentRoute><RequestDetailPage /></StudentRoute>} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
