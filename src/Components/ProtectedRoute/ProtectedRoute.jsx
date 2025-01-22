import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useSearchParams } from 'react-router-dom';


export const ProtectedRoute = ({ children }) => {
    const [searchParams] = useSearchParams(); // Get the search params object
    const register_no = searchParams.get('register_no'); // Retrieve "param1"
  const jwtToken = Cookies.get('jwtToken'); // Get JWT token from cookies

  if (!jwtToken) {
    // Redirect to login if the token is missing
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken = jwtDecode(jwtToken);

    // Check if the token is expired
    if (decodedToken.exp * 1000 < Date.now()) {
      Cookies.remove('jwtToken'); // Remove expired token
      return <Navigate to="/login" replace />;
    }
    console.log("testing the register number",decodedToken.register_no)
    if(decodedToken.jwtPayload.reg != register_no){
        return <Navigate to='/login' replace />;
    }

    // Token is valid, allow access
    return children;
  } catch (error) {
    // Invalid token, redirect to login
    Cookies.remove('jwtToken');
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
