import React from 'react';
import { auth } from '../firebase';
import { Navigate } from 'react-router-dom';

//wrapper component for state of user log in
export default function protectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser;
  if (user === null) {
    return <Navigate to="/login" />;
  }
  return children;
}
