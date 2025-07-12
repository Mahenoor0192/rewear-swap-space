
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { loginSuccess, loginFailure } from '../../store/slices/authSlice';
import authService from '../../services/authService';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token && !user) {
        try {
          const profile = await authService.getProfile();
          dispatch(loginSuccess(profile.user));
        } catch (error) {
          localStorage.removeItem('authToken');
          dispatch(loginFailure('Session expired'));
        }
      }
    };

    checkAuth();
  }, [dispatch, user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated || !localStorage.getItem('authToken')) {
    return <Navigate to="/login" replace />;
  }

  if (user?.userType !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
