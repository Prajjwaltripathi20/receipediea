import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { SignedIn, SignedOut, useAuth as useClerkAuth } from '@clerk/clerk-react';

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const { isLoaded: clerkLoaded } = useClerkAuth();

  if (loading || !clerkLoaded) {
    return (
      <div className="loading-container" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut><Navigate to="/" /></SignedOut>
    </>
  );
};

export default PrivateRoute;