
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { loginSuccess, loginFailure } from '../store/slices/authSlice';
import authService from '../services/authService';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const profile = await authService.getProfile();
          dispatch(loginSuccess(profile.user));
        } catch (error) {
          localStorage.removeItem('authToken');
          dispatch(loginFailure('Session expired'));
        }
      }
    };

    initializeAuth();
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    loading
  };
};
