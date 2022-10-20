import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function PrivateRoute({ children }) {
    const authUser = useAuth();
    return authUser ? children : <Navigate to="/" />;
}
