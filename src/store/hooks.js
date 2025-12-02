import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { login, signup, logout, clearError } from './slices/authSlice';

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

// Custom hook for auth
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const handleLogin = useCallback(
    async (loginData) => {
      return dispatch(login(loginData));
    },
    [dispatch]
  );

  const handleSignup = useCallback(
    async (signupData) => {
      return dispatch(signup(signupData));
    },
    [dispatch]
  );

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    ...auth,
    login: handleLogin,
    signup: handleSignup,
    logout: handleLogout,
    clearError: handleClearError,
  };
};

